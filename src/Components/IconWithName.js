import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const IconWithName = ({title, IconComponent, iconSize, onPress}) => (
  <TouchableOpacity style={styles.iconView} onPress={onPress}>
    <IconComponent size={iconSize} />
    <Text style={styles.iconText}>{title}</Text>
  </TouchableOpacity>
);

export default IconWithName;

const styles = StyleSheet.create({
  iconView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  iconText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
