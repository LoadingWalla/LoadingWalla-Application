import LottieView from 'lottie-react-native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import style from './style';
// import { backgroundColorNew } from '../Color/color';

const images = {
  successImage: require('../../assets/GIFs/Done.json'),
  loadDone: require('../../assets/GIFs/Load done.json'),
  noBookings: require('../../assets/GIFs/No bookings.json'),
  noInternet: require('../../assets/GIFs/No internet.json'),
  noLoadFound: require('../../assets/GIFs/No Load found.json'),
  noNotification: require('../../assets/GIFs/No Notification.json'),
  noPreviousBookings: require('../../assets/GIFs/No previous booking.json'),
  noRequest: require('../../assets/GIFs/No Request found.json'),
  noTruckFound: require('../../assets/GIFs/No truck found.json'),
  outForDelivery: require('../../assets/GIFs/Out for Delivery.json'),
  serverMaintainance: require('../../assets/GIFs/Server maintaince.json'),
  timeDelivered: require('../../assets/GIFs/Time Delivered.json'),
  trackingLoading: require('../../assets/GIFs/Tracking loading.json'),
  errorImage: require('../../assets/GIFs/Wrong.json'),
  // serverError: require('../../assets/GIFs/No_Load_Found.json'),
  nothing: require('../../assets/GIFs/No Load found.json'),
};

const NotFound = ({imageName, height, width, title}) => {
  const imageSource = images[imageName];

  return (
    <View style={styles.container}>
      <View>
        <LottieView
          source={imageSource}
          autoPlay
          loop
          resizeMode="contain"
          style={styles.splashImage(height, width)}
        />
      </View>
      {title ? <Text style={styles.textStyle}>{title}</Text> : ''}
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
  splashImage: (hei, wid) => ({
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width / 1.9,
    height: hei || 200,
    width: wid || 300,
  }),
  textStyle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
});

export default NotFound;
