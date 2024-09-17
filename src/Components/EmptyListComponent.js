import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import InnerButton from './InnerButton';

const EmptyListComponent = ({navigation}) => {
  return (
    <View style={styles.homeView}>
      <View style={styles.notFoundView}>
        <Image
          source={require('../../assets/noGps.png')}
          resizeMode="contain"
          style={styles.splashImage(200, 200)}
        />
        <Text style={styles.notFoundText}>No GPS available!</Text>
        <Text style={styles.subText}>Get a GPS Plan for your vehicle</Text>
      </View>
      <View style={styles.getNowView}>
        <Text style={styles.offerText}>Buy and save up to 50%</Text>
        <InnerButton
          navigation={() => navigation.navigate('BuyGPS')}
          title={'Get Now'}
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
    // marginVertical: 60,
    justifyContent: 'center',
    // borderWidth: 1,
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
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
});
