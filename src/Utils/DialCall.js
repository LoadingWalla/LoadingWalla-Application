import {Linking, Platform} from 'react-native';

export const DialCall = phone => {
  const phoneNumber =
    Platform.OS === 'android' ? `tel:${phone}` : `telprompt:${phone}`;
  Linking.openURL(phoneNumber);
};
