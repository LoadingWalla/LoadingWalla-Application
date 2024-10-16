import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './style'

const RadioButton = ({
  label,
  onPress,
  selected,
  OuterCircleSize,
  InnerCircleSize,
  font,
}) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={styles.outerCircle(OuterCircleSize)}>
        {selected ? <View style={styles.innerCircle(InnerCircleSize)} /> : null}
      </View>
      <Text style={styles.radioText(font)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

// const styles = StyleSheet.create({
//   radioButtonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   outerCircle: size => ({
//     height: size ? size : 24,
//     width: size ? size : 24,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: GradientColor2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }),
//   innerCircle: size => ({
//     height: size ? size : 12,
//     width: size ? size : 12,
//     borderRadius: 6,
//     backgroundColor: GradientColor2,
//   }),
//   radioText: font => ({
//     marginLeft: 10,
//     fontSize: font ? font : 15,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//   }),
// });
