import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {pageBackground, textColor} from '../../Color/color';
import LottieView from 'lottie-react-native';
import Button from '../../Components/Button';

const PurchasingStatus = ({navigation, route}) => {
  // const {statusCode} = route.params;
  const statusCode = 300;

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.overlay} />
      <View style={styles.screenModalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {statusCode === 200
              ? '🎉YAY! Payment successful🎉'
              : 'Payment Failed!'}
          </Text>
          <LottieView
            source={
              statusCode === 200
                ? require('../../../assets/GIFs/succesLottie.json')
                : require('../../../assets/GIFs/Wrong.json')
            }
            autoPlay
            loop
            resizeMode="contain"
            style={styles.splashImage}
          />
        </View>
        <Button
          title={'Done'}
          onPress={() => navigation.navigate('Menu')}
          textStyle={styles.btnText}
          style={styles.btnStyle}
        />
      </View>
    </View>
  );
};

export default PurchasingStatus;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  screenModalView: {
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
    maxHeight: 320,
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    // borderWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  splashImage: {
    height: 200,
    width: 300,
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    // paddingHorizontal: 25,
    // paddingVertical: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
});
