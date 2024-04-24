import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import style from './style';
import {GradientColor1} from '../Color/color';
import RightArrow from '../../assets/SVG/svg/RightArrow';

const MenuItem = ({title, onPress, Icon}) => {
  // const CustomIcon = Icon;

  return (
    <View>
      <TouchableOpacity style={style.detailItem} onPress={() => onPress()}>
        <View style={style.flexDirection}>
          {Icon}
          <Text style={style.detailText}>{title}</Text>
        </View>
        <RightArrow size={20} color={GradientColor1} />
      </TouchableOpacity>
    </View>
  );
};
export default MenuItem;
