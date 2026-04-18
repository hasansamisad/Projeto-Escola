import * as types from './types';

export function addTaskRequest(payload) {
  return {
    type: types.ADD_TASK_REQUEST,
    payload,
  };
}

export function addTaskSuccess(tarefa) {
  return {
    type: types.ADD_TASK_SUCCESS,
    payload: { tarefa },
  };
}

export function addTaskFailure(tarefa) {
  return {
    type: types.ADD_TASK_FAILURE,
    payload: { tarefa },
  };
}
