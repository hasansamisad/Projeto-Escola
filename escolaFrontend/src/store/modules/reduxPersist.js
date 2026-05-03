import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistRedurce = persistReducer(
    {
      key: 'CONSUMO-API',
      storage,
      whitelist: ['auth'],
    },
    reducers
  );

  return persistRedurce;
};
