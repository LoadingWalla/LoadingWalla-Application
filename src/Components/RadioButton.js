import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GradientColor2, titleColor} from '../Color/color';

const RadioButton = ({label, onPress, selected}) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={styles.outerCircle}>
        {selected ? <View style={styles.innerCircle} /> : null}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: GradientColor2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: GradientColor2,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
