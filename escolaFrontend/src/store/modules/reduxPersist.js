import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistRedurce = persistReducer(
    {
      key: 'LISTA_SAGA',
      storage,
      whitelist: ['example'],
    },
    reducers
  );

  return persistRedurce;
};
