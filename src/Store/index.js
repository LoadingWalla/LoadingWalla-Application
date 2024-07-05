import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './Reducers';
import rootSaga from './Sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  //   middleware: () => [sagaMiddleware],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable immutable state check middleware
      serializableCheck: false, // Disable serializable state check middleware if necessary
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
