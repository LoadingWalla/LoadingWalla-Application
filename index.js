import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  backgroundNotification,
  notificationListener,
} from './src/Utils/Notification_helper';

backgroundNotification();
notificationListener();
AppRegistry.registerComponent(appName, () => App);
