import { combineReducers } from 'redux';
import exampleReducer from './example/reduce';

export default combineReducers({
  example: exampleReducer,
});
