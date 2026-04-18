import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as actions from './actions';
import * as types from './types';
import history from '../../../services/history';

const requisisaoApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Sucesso' });
    }, 500);
  });
};

function* addTask({ payload }) {
  try {
    const { tarefa } = payload;

    if (!tarefa) {
      toast.error(
        'A tarefa não pode ser vazia. Por favor, insira uma tarefa válida.'
      );
      return;
    }

    yield call(requisisaoApi);

    yield put(actions.addTaskSuccess(tarefa));
    toast.success('Tarefa adicionada com sucesso!');
    setTimeout(() => {
      history.push('/');
    }, 100);
  } catch (error) {
    console.log('Erro ao adicionar tarefa:', error);
    yield put(actions.addTaskFailure(error.message));
    toast.error('Erro ao adicionar tarefa. Tente novamente.');
  }
}

export default all([takeLatest(types.ADD_TASK_REQUEST, addTask)]);
