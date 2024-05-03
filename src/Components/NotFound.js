import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const images = {
  noBookings: require('../../assets/GIFs/NoBookings.gif'),
  noPreviousBookings: require('../../assets/GIFs/NoPreviousBookings.gif'),
  noLoadFound: require('../../assets/GIFs/NoLoadFound.gif'),
  noTruckFound: require('../../assets/GIFs/NoTruckFound.gif'),
  nothing: require('../../assets/GIFs/Nothing.gif'),
  serverError: require('../../assets/GIFs/ServerError.gif'),
};

const NotFound = ({imageName}) => {
  const imageSource = images[imageName];

  return (
    <View style={styles.container}>
      <Image source={imageSource} resizeMode="contain" style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 500,
    marginTop: 10,
  },
});

export default NotFound;
