import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from './types';
import history from '../../../services/history';
import axios from '../../../services/axios';
import { get } from 'lodash';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload); // Simplificado se o payload já for {email, password}

    const { user, token } = response.data;

    yield put(actions.loginSuccess({ user, token }));
    toast.success('Login realizado com sucesso!');

    // Define o token para as próximas requisições
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    history.push(payload.prevPath);
  } catch (error) {
    // Pega a mensagem de erro que vem do backend (se existir)
    const errors = get(error, 'response.data.errors', ['Erro ao fazer login.']);
    errors.forEach(err => toast.error(err));

    yield put(actions.loginFailure());
  }
}

function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

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
      history.push('/login');
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', ['Erro desconhecido']);
    const status = get(e, 'response.status', 0);

    if (status === 400 && errors.length > 0) {
      errors.forEach(err => toast.error(err));
    }
    errors.forEach(err => toast.error(err));
  }
}

// Nota: persistRehydrate não precisa ser uma function* (generator)
// se não fizer chamadas assíncronas (call)
function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', false);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest)]);

