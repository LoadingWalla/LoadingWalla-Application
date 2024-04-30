import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import style from './style';
import GoBackIcon from '../../assets/SVG/svg/GoBackIcon';

const Header = ({title, navigation}) => {
  return (
    <View style={style.headerView}>
      <View style={style.backIconView}>
        {/* <Icon
          onPress={() => navigation()}
          name="arrow-back-sharp"
          size={30}
          color="#000"
        /> */}
        <TouchableOpacity onPress={() => navigation()}>
          <GoBackIcon size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};
export default Header;
