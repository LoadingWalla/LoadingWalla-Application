import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {NetworkProvider} from './src/Context/NetworkContext';
import {StatusBar} from 'react-native';
import {foregroundNotification} from './src/Utils/Notification_helper';
import NoInternetScreen from './src/Screens/Details/NoInternetScreen';

const App = () => {
  useEffect(() => {
    foregroundNotification();
  }, []);

  return (
    <Provider store={store}>
      <NetworkProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
        <NavigationContainer>
          <Navigation />
          <NoInternetScreen />
        </NavigationContainer>
      </NetworkProvider>
    </Provider>
  );
};

export default App;
