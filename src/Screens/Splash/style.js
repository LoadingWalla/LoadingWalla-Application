import {Dimensions, StyleSheet} from 'react-native';
export default StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ED1C24',
  },
  splashImage: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width / 1.3,
  },
});
