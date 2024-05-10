import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  backgroundNotification,
  notificationListner,
} from './src/Utils/Notification_helper';

backgroundNotification();
notificationListner();
AppRegistry.registerComponent(appName, () => App);
