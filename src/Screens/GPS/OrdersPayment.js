import {Image, Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const OrdersPayment = () => {
  useTrackScreenTime('OrdersPayment');
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
