import './src/locales/index';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {NetworkProvider} from './src/Context/NetworkContext';

const App = () => {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </NetworkProvider>
    </Provider>
  );
};

export default App;
