import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Background from './BackgroundGradient';
import styles from './style';
const Button = ({style, textStyle, title, onPress, loading, touchStyle}) => {
  return (
    <TouchableOpacity
      style={touchStyle}
      disabled={loading ? true : false}
      activeOpacity={0.5}
      onPress={onPress}>
      <Background style={style}>
        {loading && (
          <ActivityIndicator
            style={styles.indicatorStyle}
            size="small"
            color="white"
          />
        )}
        <Text style={textStyle}>{title}</Text>
      </Background>
    </TouchableOpacity>
  );
};
export default Button;
