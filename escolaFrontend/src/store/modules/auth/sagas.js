import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from './types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  // 1. O navigate e o prevPath são extraídos com segurança do payload enviado pelo componente
  const navigate = get(payload, 'navigate', null);
  const prevPath = get(payload, 'prevPath', '/');

  try {
    const response = yield call(axios.post, '/tokens', {
      email: payload.email,
      password: payload.password,
    });

    const { user, token } = response.data;

    yield put(actions.loginSuccess({ user, token }));
    toast.success('Login realizado com sucesso!');

    // Define o token padrão para as próximas requisições HTTP
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    // 2. Redireciona o usuário de forma segura se o hook existir no payload
    if (navigate) navigate(prevPath);
  } catch (error) {
    const errors = get(error, 'response.data.errors', ['Erro ao fazer login.']);
    errors.forEach((err) => toast.error(err));

    yield put(actions.loginFailure());
  }
}

function* registerRequest({ payload }) {
  const { id, nome, email, password, navigate } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('Conta alterada com sucesso!');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });
      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));

      // 3. Após criar a conta, manda de volta para a tela de login via payload
      if (navigate) navigate('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', ['Erro desconhecido']);
    const status = get(e, 'response.status', 0);

    if (status === 400 && errors.length > 0) {
      errors.forEach((err) => toast.error(err));
    } else {
      toast.error('Erro ao salvar os dados.');
    }

    yield put(actions.registerFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', false);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
