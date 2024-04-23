import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import style from './style';
import {PrivacyPolicy} from '../../../Color/color';

const Rating = () => {
  return (
    <View>
      <Text style={style.colotss}>Rating</Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  colotss: {color: PrivacyPolicy},
});
