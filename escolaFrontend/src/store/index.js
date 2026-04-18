import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './modules/rootSaga';
import persistReducer from './modules/reduxPersist';
import rootReducer from './modules/rootReducer';

const sagaMiddleware = createSagaMiddleware();

// Aplica o persistReducer sobre o seu rootReducer combinado
const store = createStore(
  persistReducer(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
