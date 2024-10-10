import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {
  Button,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {foregroundNotification} from './src/Utils/Notification_helper';
import NoInternetScreen from './src/Screens/Details/NoInternetScreen';
import {navigationRef} from './src/Navigation/NavigationService';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';

const App = () => {
  const [updateVersion, setUpdateVersion] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    foregroundNotification();
    checkNotificationPermission();
  }, []);

  const getVersion = async () => {
    try {
      const versionDoc = await firestore()
        .collection('AppVersion')
        .doc('latest')
        .get();
      const latestVersion = versionDoc.data()?.version;
      // Get current app version using react-native-device-info
      const currentVersion = DeviceInfo.getVersion(); // Get app version as a string
      console.log(
        'Current version:',
        currentVersion,
        'Latest version:',
        latestVersion,
      );
      if (latestVersion && latestVersion !== currentVersion) {
        setForceUpdate(true); // Set force update if versions don't match
      } else {
        setForceUpdate(false); // App is up to date
      }
      setUpdateVersion(latestVersion);
    } catch (error) {
      console.error('Error fetching version:', error);
    }
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

  if (forceUpdate) {
    // Show force update screen if an update is required
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 20}}>
          A new version is available!
        </Text>
        <Button
          title="Update Now"
          onPress={() => {
            // Redirect user to the app store for updating
            // You can use your preferred method to open the store or provide a download link
            console.log('Redirect to app store for update');
          }}
        />
      </View>
    );
  }

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
