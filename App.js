/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Transactions from './src/screens/Transactions';
// redux setup
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/redux/store';

// init store
const {store, persistor} = configureStore();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Transactions />
      </PersistGate>
    </Provider>
  );
};

export default App;
