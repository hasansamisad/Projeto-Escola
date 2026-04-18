import * as types from './types';

const initialState = {
  tarefas: [],
};
// O reducer é uma função que decide como o estado vai mudar
export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_TASK_SUCCESS: {
      // O action.payload aqui é { tarefa: "texto" }
      const { tarefa } = action.payload;

      const valorTarefa = typeof tarefa === 'object' ? tarefa.tarefa : tarefa;

      if (!valorTarefa) return state;

      return {
        ...state,
        // SALVE APENAS A STRING 'tarefa', não o objeto
        tarefas: [...state.tarefas, valorTarefa],
      };
    }
    default:
      return state;
  }
}
