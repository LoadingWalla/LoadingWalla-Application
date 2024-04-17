import Snackbar from 'react-native-snackbar';
const AlertBox = props => {
  Snackbar.show({
    text: props,
    // duration: Snackbar.LENGTH_INDEFINITE,
    duration: Snackbar.LENGTH_LONG,
    fontFamily: 'PlusJakartaSans-Medium',
  });
};
export default AlertBox;
