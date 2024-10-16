import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './style'

const IconWithName = ({
  title,
  dynamicTitle,
  dynamicTitleColor,
  IconComponent,
  iconSize,
  onPress,
  color,
}) => (
  <TouchableOpacity style={styles.iconNameiconView} onPress={onPress}>
    <View style={{borderWidth: 0, minWidth: 20}}>
      <IconComponent size={iconSize} color={color} />
    </View>
    <Text style={styles.iconText}>
      {title}
      <Text style={[styles.dynamicText, {color: dynamicTitleColor}]}>
        {dynamicTitle}
      </Text>
    </Text>
  </TouchableOpacity>
);

export default IconWithName;

// const styles = StyleSheet.create({
//   iconView: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 5,
//     padding: 5,
//     marginHorizontal: 10,
//   },
//   iconText: {
//     fontSize: 10,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//   },
// });
