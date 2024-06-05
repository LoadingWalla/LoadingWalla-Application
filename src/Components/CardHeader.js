import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PrivacyPolicy, titleColor} from '../Color/color';
import * as Constants from '../Constants/Constant';

const CardHeader = ({from, to, icon, t}) => {
  return (
    <View style={styles.headerView}>
      <Pressable onPress={() => {}}>
        <Image
          style={styles.image}
          source={icon ? {uri: icon} : require('../../assets/placeholder.png')}
          resizeMode={'cover'}
        />
      </Pressable>
      <View style={styles.routeInfo}>
        <View style={styles.routeTextContainer}>
          <View style={styles.dot} />
          <Text style={styles.textHeading}>{t(Constants.FROM)}</Text>
          <Text style={styles.routeText}>: {from}</Text>
        </View>
        <View style={styles.routeTextContainer}>
          <View style={styles.square} />
          <Text style={styles.textHeading}>{t(Constants.TO)}</Text>
          <Text style={styles.routeText}>: {to ? to : 'Anywhere'}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  headerView: {flexDirection: 'row'},
  image: {height: 60, width: 60, borderRadius: 5},
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
  },
  square: {
    width: 8,
    height: 8,
    borderRadius: 1,
    backgroundColor: 'red',
  },
  routeInfo: {
    flex: 1,
    marginLeft: 20,
  },
  routeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeading: {
    minWidth: 45,
    marginLeft: 10,
    color: PrivacyPolicy,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  routeText: {
    flex: 1,
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
