import './src/locales/index';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {NetworkProvider} from './src/Context/NetworkContext';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </NetworkProvider>
    </Provider>
  );
};

export default App;
