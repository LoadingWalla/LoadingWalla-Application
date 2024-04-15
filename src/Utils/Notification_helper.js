import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = getFcmToken();
    // console.log('Authorization status:', authStatus);
    // console.log('Authorization token:', token);
    return token;
  }
};

const getFcmToken = async () => {
  let token = await messaging().getToken();
  return token;
};

export const notificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    // navigation.navigate(remoteMessage.data.type);
    // console.log("killl mode", remoteMessage);
    Alert.alert(
      'A new FCM message arrived! kill',
      JSON.stringify(remoteMessage),
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        console.log('kill mode87', remoteMessage);
        Alert.alert(
          'A new FCM message arrived in Kill Mode!',
          JSON.stringify(remoteMessage),
        );
      }
      // setLoading(false);
    });
};

export const foregroundNotification = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert(
      'A new FCM message arrived in foregroundMode!',
      JSON.stringify(remoteMessage),
    );
  });
  return unsubscribe;
};

export const backgroundNotification = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    Alert.alert('Message handled in the background!', remoteMessage);
  });
};
