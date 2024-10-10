import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {PermissionsAndroid, Platform, StatusBar} from 'react-native';
import {foregroundNotification} from './src/Utils/Notification_helper';
import NoInternetScreen from './src/Screens/Details/NoInternetScreen';
import {navigationRef} from './src/Navigation/NavigationService';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  useEffect(() => {
    foregroundNotification();
    checkNotificationPermission();
  }, []);

  const getVersion = async () => {
    const users = await firestore();
    // const users = await firestore().collection('Users').get();
    console.log(1234567890, users);
  };
  useEffect(() => {
    getVersion();
  }, []);

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {}
    }
  };

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
