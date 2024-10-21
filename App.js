import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import * as Constants from './src/Constants/Constant';
import store from './src/Store';
import Navigation from './src/Navigation/router';
import NoInternetScreen from './src/Screens/Details/NoInternetScreen';
import Button from './src/Components/Button';
import {navigationRef} from './src/Navigation/NavigationService';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import analytics from '@react-native-firebase/analytics';
import {useTranslation} from 'react-i18next';
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
  ImageBackground,
} from 'react-native';
import {appStoreLink, playStoreLink} from './src/Utils/Url';
import {GradientColor2, textColor} from './src/Color/color';
import {foregroundNotification} from './src/Utils/Notification_helper';

const App = () => {
  const [forceUpdate, setForceUpdate] = useState(false);
  const {t} = useTranslation();
  const startTime = useRef(Date.now());

  /** Helper: Track screen views and time spent */
  const trackScreenView = useCallback(async screenName => {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenName,
      });

      const duration = (Date.now() - startTime.current) / 1000;
      await analytics().logEvent('screen_time', {
        screen_name: screenName,
        time_spent: duration,
      });

      startTime.current = Date.now();
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }, []);

  /** Helper: Handle force update by opening store link */
  const handleForceUpdate = useCallback(() => {
    const storeUrl = Platform.OS === 'android' ? playStoreLink : appStoreLink;
    Linking.openURL(storeUrl).catch(err =>
      console.error('Failed to open URL:', err),
    );
  }, []);

  /** Helper: Check and request notification permissions */
  const checkNotificationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
        console.error('Notification permission error:', error);
      }
    }
  }, []);

  /** Helper: Check app version and decide on force update */
  const getVersion = useCallback(async () => {
    try {
      const response = await axios.get('https://loadingwalla.com/api/version');
      if (response.status === 200) {
        const latestVersion = response.data;
        const currentVersion = DeviceInfo.getVersion();
        setForceUpdate(latestVersion > currentVersion);
      } else {
        console.error('Failed to fetch version, status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching version:', error);
    }
  }, []);

  /** Initialize app: Runs once on mount */
  useEffect(() => {
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

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        BackHandler.exitApp();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [checkNotificationPermission, getVersion]);

  /** Handle navigation state changes to track screen views */
  const handleStateChange = useCallback(
    state => {
      const currentRoute = state?.routes[state.index]?.name;
      if (currentRoute) {
        trackScreenView(currentRoute);
      }
    },
    [trackScreenView],
  );

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
        <View style={styles.textContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.updateTxt}>{t(Constants.UPDATE_TEXT)}</Text>
            <Text style={styles.updateBody}>{t(Constants.UPDATE_BODY)}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Button
              title={t(Constants.UPDATE_NOW)}
              onPress={handleForceUpdate}
              textStyle={styles.btnText}
              style={styles.btnStyle}
            />
            <Pressable onPress={() => BackHandler.exitApp()}>
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
      <NavigationContainer
        ref={navigationRef}
        onStateChange={handleStateChange}>
        <Navigation />
        <NoInternetScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  imageBackground: {flex: 1},
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  svgContainer: {flex: 2, width: '100%'},
  textContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  updateTxt: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  updateBody: {
    fontSize: 12,
    marginHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#949494',
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
