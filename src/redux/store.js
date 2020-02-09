import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
// Redux persist
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './reducers/root.reducer';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['errorReducer', 'loadingReducer'],
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux config
const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

// Middleware
const sagaMiddleware = createSagaMiddleware();

const composedEnhancer = compose(
  applyMiddleware(sagaMiddleware),
  ...enhancerList,
);

export default () => {
  const store = createStore(persistedReducer, {}, composedEnhancer);
  const persistor = persistStore(store);
  // kick off root saga
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};
