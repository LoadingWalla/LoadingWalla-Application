import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {StatusBar} from 'react-native';
import {foregroundNotification} from './src/Utils/Notification_helper';
import NoInternetScreen from './src/Screens/Details/NoInternetScreen';
import {navigationRef} from './src/Navigation/NavigationService';

const App = () => {
  useEffect(() => {
    foregroundNotification();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <NavigationContainer ref={navigationRef}>
        <Navigation />
        <NoInternetScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
