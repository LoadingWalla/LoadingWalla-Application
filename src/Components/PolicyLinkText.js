import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {PrivacyPolicy, warningTxt} from '../Color/color';

const PolicyLinkText = ({text, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.policyLinkTitle(true)}>{text}</Text>
  </TouchableOpacity>
);

export default PolicyLinkText;

const styles = StyleSheet.create({
  policyLinkTitle: activate => ({
    textDecorationLine: 'underline',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: activate ? warningTxt : PrivacyPolicy,
    textAlign: 'center',
  }),
});
