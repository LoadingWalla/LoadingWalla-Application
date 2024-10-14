import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {
  BackHandler,
  ImageBackground,
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
import DeviceInfo from 'react-native-device-info';
import Button from './src/Components/Button';
import * as Constants from './src/Constants/Constant';
import {useTranslation} from 'react-i18next';
import {appStoreLink, playStoreLink} from './src/Utils/Url';
import {GradientColor2, textColor} from './src/Color/color';
import axios from 'axios';

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    foregroundNotification();
    checkNotificationPermission();
  }, []);

  const getVersion = async () => {
    try {
      const response = await axios.get('https://loadingwalla.com/api/version');
      // console.log(4444, response);
      if (response.status === 200) {
        const latestVersion = response?.data;
        const currentVersion = DeviceInfo.getVersion();
        if (latestVersion && latestVersion > currentVersion) {
          setForceUpdate(true);
        } else {
          setForceUpdate(false);
        }
      } else {
        console.log('Failed to fetch version, status:', response.status);
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
        await getVersion();
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
        <StatusBar hidden />
        <View style={styles.svgContainer}>
          <ImageBackground
            source={require('./assets/ForceUpdateImage.png')}
            resizeMode="cover"
            style={styles.imageBackground}
          />
        </View>
        <View style={styles.svgContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.updateTxt}>{t(Constants.UPDATE_TEXT)}</Text>
            <Text style={styles.updateBody}>{t(Constants.UPDATE_BODY)}</Text>
            <Button
              title={t(Constants.UPDATE_NOW)}
              onPress={handleForceUpdate}
              textStyle={styles.btnText}
              style={styles.btnStyle}
            />
            <Pressable onPress={handleBackButton}>
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
  imageBackground: {flex: 1},
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 0.5,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTxt: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  updateBody: {
    fontSize: 12,
    marginHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 12,
    paddingHorizontal: 100,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btnText: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  btnText2: {
    color: GradientColor2,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
