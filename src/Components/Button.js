import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator, View} from 'react-native';
import Background from './BackgroundGradient';
import styles from './style';
import SmallArrow from '../../assets/SVG/svg/SmallArrow';
const Button = ({style, textStyle, title, onPress, loading, touchStyle}) => {
  return (
    <TouchableOpacity
      style={touchStyle}
      disabled={loading ? true : false}
      activeOpacity={0.5}
      onPress={onPress}>
      <Background style={style} bgcolors={['#EC1C24', '#EC1C24']}>
        {loading && (
          <ActivityIndicator
            style={styles.indicatorStyle}
            size="small"
            color="white"
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            // borderWidth: 1,
            // width: '30%',
          }}>
          <View style={{marginRight: 10}}>
            <Text style={textStyle}>{title}</Text>
          </View>
          <SmallArrow />
        </View>
      </Background>
    </TouchableOpacity>
  );
};
export default Button;
