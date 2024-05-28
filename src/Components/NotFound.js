import LottieView from 'lottie-react-native';
import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const images = {
  noBookings: require('../../assets/GIFs/No Booking Found.json'),
  noPreviousBookings: require('../../assets/GIFs/No previous booking.json'),
  noLoadFound: require('../../assets/GIFs/No Load Found.json'),
  noTruckFound: require('../../assets/GIFs/No truck found.json'),
  nothing: require('../../assets/GIFs/Wrong.json'),
  serverError: require('../../assets/GIFs/Load Found.json'),
};

const NotFound = ({imageName}) => {
  const imageSource = images[imageName];

  return (
    <View style={styles.container}>
      {/* <Image source={imageSource} resizeMode="contain" style={styles.image} /> */}
      <LottieView
        source={imageSource}
        autoPlay
        loop
        resizeMode="contain"
        style={styles.splashImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  image: {
    height: 500,
    marginTop: 10,
  },
  splashImage: {
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width / 1.9,
    height: 600,
    width: 200,
  },
});

export default NotFound;
