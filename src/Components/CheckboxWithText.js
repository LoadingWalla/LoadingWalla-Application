import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {backgroundColorNew, PrivacyPolicy} from '../Color/color';
import CheckBox from '@react-native-community/checkbox';

const CheckboxWithText = ({isChecked, onValueChange, text}) => (
  <View style={styles.checkBoxContainer}>
    <CheckBox
      value={isChecked}
      onValueChange={onValueChange}
      tintColors={{
        true: backgroundColorNew,
        false: backgroundColorNew,
      }}
      style={styles.checkBoxStyle}
    />
    <Text style={styles.setPrivacyStyle}>{text}</Text>
  </View>
);

export default CheckboxWithText;

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    // borderWidth: 1,
  },
  checkBoxStyle: {
    marginRight: 5,
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  setPrivacyStyle: {
    fontSize: 12,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
