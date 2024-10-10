import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {textColor} from '../Color/color';
import InnerButton from './InnerButton';
import {useTranslation} from 'react-i18next';
import * as Constants from '../Constants/Constant';

const EmptyListComponent = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.homeView}>
      <View style={styles.notFoundView}>
        <Image
          source={require('../../assets/noGps.png')}
          resizeMode="contain"
          style={styles.splashImage(200, 200)}
        />
        <Text style={styles.notFoundText}>{t(Constants.NO_GPS_AVAILABLE)}</Text>
        <Text style={styles.subText}>
          {t(Constants.GET_GPS_FOR_YOUR_VEHICLE)}
        </Text>
      </View>
      <View style={styles.getNowView}>
        <Text style={styles.offerText}>{t(Constants.BUY_AND_SAVE)}</Text>
        <InnerButton
          navigation={() => navigation.navigate('BuyGPS')}
          title={t(Constants.GET_NOW)}
          enabledStyle={styles.btnStyle}
          textStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

export default EmptyListComponent;

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundView: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#707070',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
  subText: {
    color: '#707070',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    marginTop: 15,
  },
  getNowView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
  },
  offerText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#3BA700',
    textAlign: 'center',
    paddingVertical: 10,
  },
  splashImage: (height, width) => ({
    height: height,
    width: width,
  }),
  btnStyle: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#3CA604',
    borderColor: '#3CA604',
    alignItems: 'center',
    width: '50%',
    // height: 50,
    // justifyContent: 'center',
    // alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    color: textColor,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    // borderWidth: 1,
    width: 200
  },
});
