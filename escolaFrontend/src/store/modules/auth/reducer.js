import * as types from './types';
import axios from '../../../services/axios';

const initialState = {
  isLoggedIn: false,
  user: {},
  token: false,
  isLoading: false,
};
// O reducer é uma função que decide como o estado vai mudar
export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      const { user, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        user,
        token,
        isLoading: false,
      };
    }
    case types.LOGIN_FAILURE: {
      delete axios.defaults.headers.Authorization;
      const newState = { ...initialState };
      return newState;
    }
    case types.LOGIN_REQUEST: {
        const newState = { ...state, isLoading: true };
        return newState;
    };

    case types.REGISTER_REQUEST: {
      const newState = { ...state, isLoading: true };
      return newState;
    }

    case types.REGISTER_UPDATE_SUCCESS: {
      const {nome, email} = action.payload;
      const newState = { ...state, user: { ...state.user, nome, email }, isLoading: false };
      return newState;
    }

    case types.REGISTER_CREATE_SUCCESS: {
      const newState = { ...state, isLoading: false };
      return newState;
    }

    case types.REGISTER_FAILURE: {
      const newState = { ...state, isLoading: false };
      return newState;
    }

    default:
      return state;
  }
}
