import Snackbar from 'react-native-snackbar';
const AlertBox = props => {
  Snackbar.show({
    // text: props,
    // // duration: Snackbar.LENGTH_INDEFINITE,
    // duration: Snackbar.LENGTH_LONG,
    // fontFamily: 'PlusJakartaSans-SemiBold',
    text: props,
    duration: Snackbar.LENGTH_LONG,
    fontFamily: 'PlusJakartaSans-SemiBold',
    textColor: '#000000',
    backgroundColor: '#FFD7CC',
  });
};
export default AlertBox;
