import LottieView from 'lottie-react-native';
import React from 'react';
import {View, StyleSheet} from 'react-native';
// import { backgroundColorNew } from '../Color/color';

const images = {
  noBookings: require('../../assets/GIFs/No Booking Found.json'),
  noPreviousBookings: require('../../assets/GIFs/No previous booking.json'),
  noLoadFound: require('../../assets/GIFs/No Load found.json'),
  noTruckFound: require('../../assets/GIFs/No truck found.json'),
  nothing: require('../../assets/GIFs/Wrong.json'),
  serverError: require('../../assets/GIFs/Load Found.json'),
  errorImage: require('../../assets/GIFs/Wrong.json'),
  successImage: require('../../assets/GIFs/Done.json'),
};

const NotFound = ({imageName, height, width}) => {
  const imageSource = images[imageName];

  return (
    <View style={styles.container}>
      {/* <Image source={imageSource} resizeMode="contain" style={styles.image} /> */}
      <LottieView
        source={imageSource}
        autoPlay
        loop
        resizeMode="contain"
        style={styles.splashImage(height, width)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // backgroundColor: backgroundColorNew,
  },
  image: {
    height: 500,
    marginTop: 10,
  },
  splashImage: (hei, wid) => ({
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width / 1.9,
    height: hei || 600,
    width: wid || 200,
    // borderWidth: 1,
  }),
});

export default NotFound;
