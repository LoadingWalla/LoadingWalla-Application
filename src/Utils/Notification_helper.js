import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {navigationRef, navigate} from '../Navigation/NavigationService';

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

// export const notificationListener = () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     // navigation.navigate(remoteMessage.data.type);
//     // console.log("killl mode", remoteMessage);
//     // handleNavigation(remoteMessage.data);
//     Alert.alert(
//       'A new FCM message arrived! killlllll',
//       JSON.stringify(remoteMessage),
//     );
//   });
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//         console.log('kill mode87', remoteMessage);
//         Alert.alert(
//           'A new FCM message arrived in Kill Mode!',
//           JSON.stringify(remoteMessage),
//         );
//       }
//       // setLoading(false);
//     });
// };
export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage.data && remoteMessage.data.screen) {
      navigate(remoteMessage.data.screen, remoteMessage.data.params);
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage && remoteMessage.data && remoteMessage.data.screen) {
        navigate(remoteMessage.data.screen, remoteMessage.data.params);
      }
    });
};

export const foregroundNotification = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('ForeGround Message', remoteMessage);
    if (remoteMessage.data && remoteMessage.data.screen) {
      navigate(remoteMessage.data.screen, remoteMessage.data.params);
    }
    await onDisplayNotification(remoteMessage);
  });
  return unsubscribe;
};

export const backgroundNotification = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // Alert.alert('Message handled in the background!', remoteMessage);
    if (remoteMessage.data && remoteMessage.data.screen) {
      console.log('Navigate to:', remoteMessage.data.screen);
    }

    if (Platform.OS === 'ios') {
      await notifee.requestPermission();
    }

    const channelId = await notifee.createChannel({
      id: 'backgroundChannel',
      name: 'Background Channel',
      sound: 'notification',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      android: {
        channelId,
        smallIcon: 'ic_notification',
        pressAction: {
          id: 'default',
        },
      },
    });
  });
};

async function onDisplayNotification(remoteMessage) {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  const channelId = await notifee.createChannel({
    id: 'default9',
    name: 'Default Channel9',
    sound: 'notification',
    importance: AndroidImportance.HIGH,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId,
      smallIcon: 'ic_notification',
      pressAction: {
        id: 'default',
      },
    },
    // title:
    //   '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
    // subtitle: '&#129395;',
    // body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
    // android: {
    //   channelId,
    //   color: '#4caf50',
    //   actions: [
    //     {
    //       title: '<b>Dance</b> &#128111;',
    //       pressAction: {id: 'dance'},
    //     },
    //     {
    //       title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
    //       pressAction: {id: 'cry'},
    //     },
    //   ],
    // },
  });
}
