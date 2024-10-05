import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {titleColor} from '../../Color/color';
import styles from './style'

const OrdersPayment = () => {
  return (
    <View style={styles.container}>
      <View style={styles.notFoundView}>
        <Image
          source={require('../../../assets/noGps.png')}
          resizeMode="contain"
          style={styles.splashImage(300, 300)}
        />
        <Text
          style={styles.noGpsOrderTxt}>
          No GPS Order or Payment
        </Text>
      </View>
    </View>
  );
};

export default OrdersPayment;

// const styles = StyleSheet.create({
//   notFoundView: {
//     // borderWidth: 1,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   splashImage: (height, width) => ({
//     height: height,
//     width: width,
//   }),
// });
