import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {
  BackHandler,
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {foregroundNotification} from './src/Utils/Notification_helper';
import NoInternetScreen from './src/Screens/Details/NoInternetScreen';
import {navigationRef} from './src/Navigation/NavigationService';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import ForcUpdateSvg from './assets/SVG/svg/ForcUpdateSvg';
import Button from './src/Components/Button';
import * as Constants from './src/Constants/Constant';
import {useTranslation} from 'react-i18next';
import {appStoreLink, playStoreLink} from './src/Utils/Url';
import {GradientColor2, textColor} from './src/Color/color';

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const {t} = useTranslation();

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
        '--------- Current version: ----------',
        currentVersion,
        '--------- Latest version: -----------',
        latestVersion,
      );
      if (latestVersion && latestVersion !== currentVersion) {
        setForceUpdate(true); // Set force update if versions don't match
      } else {
        setForceUpdate(false); // App is up to date
      }
    } catch (error) {
      console.error('Error fetching version:', error);
    }
  };

  function handleBackButton() {
    BackHandler.exitApp();
    return true;
  }

  useEffect(() => {
    console.log('HandleExitApp');
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getVersion();
    const initializeApp = async () => {
      try {
        foregroundNotification();
        await checkNotificationPermission();
        await checkForAppUpdate();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    initializeApp();
  }, []);

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
        console.error('Notification permission error:', error);
      }
    }
  };

  const checkForAppUpdate = async () => {
    try {
      const versionDoc = await firestore()
        .collection('AppVersion')
        .doc('latest')
        .get();

      const latestVersion = versionDoc.data()?.version;
      const currentVersion = DeviceInfo.getVersion();

      if (latestVersion && latestVersion !== currentVersion) {
        setForceUpdate(true);
      }
    } catch (error) {
      console.error('Error checking app version:', error);
    }
  };

  const handleForceUpdate = () => {
    const url = Platform.OS === 'android' ? playStoreLink : appStoreLink;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error('Cannot open URL:', url);
        }
      })
      .catch(err => console.error('Error opening URL:', err));
  };

  if (forceUpdate) {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.svgContainer}>
          <ForcUpdateSvg />
        </View>
        <View style={styles.textMainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.updateTxt}>{t(Constants.UPDATE_TEXT)}</Text>
            <Text style={styles.updateBody}>{t(Constants.UPDATE_BODY)}</Text>
            <Button
              title={t(Constants.UPDATE_NOW)}
              onPress={handleForceUpdate}
              textStyle={styles.btnText}
              style={styles.btnStyle}
            />
            <Pressable
              onPress={() => {
                console.log('Exit from the app');
                handleBackButton();
              }}>
              <Text style={styles.btnText2}>{t(Constants.CLOSE_APP)}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <NavigationContainer ref={navigationRef}>
        <Navigation />
        <NoInternetScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 0.5,
    width: '100%',
  },
  textMainContainer: {
    flex: 0.5,
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTxt: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  updateBody: {
    fontSize: 11,
    marginBottom: 20,
    marginLeft: 105,
    marginRight: 105,
    textAlign: 'center',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingHorizontal: 120,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  btnText2: {
    color: GradientColor2,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
});
