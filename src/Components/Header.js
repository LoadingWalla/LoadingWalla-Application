import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import style from './style';

const Header = ({title, navigation}) => {
  return (
    <View style={style.headerView}>
      <View style={style.backIconView}>
        <Icon
          onPress={() => navigation()}
          name="arrow-back-sharp"
          size={30}
          color="#000"
        />
      </View>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};
export default Header;
