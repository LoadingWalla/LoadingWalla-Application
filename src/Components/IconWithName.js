import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const IconWithName = ({title, IconComponent, iconSize, onPress}) => (
  <TouchableOpacity style={styles.iconView} onPress={onPress}>
    <View style={{borderWidth: 0, minWidth: 20}}>
      <IconComponent size={iconSize} />
    </View>
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
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
