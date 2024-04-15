/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import style from './style';
import * as Constants from '../Constants/Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomMenu = ({navigation, menuClick}) => {
  const logout = async () => {
    await AsyncStorage.removeItem('UserType');
    navigation();
  };
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Icon name="dots-three-horizontal" size={20} color="black" />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{padding: 10, borderRadius: 8}}>
          <MenuOption onSelect={() => menuClick()} value={Constants.MENU}>
            <Text style={style.menuItem}>{Constants.MENU}</Text>
          </MenuOption>
          <MenuOption onSelect={() => logout()} value={Constants.LOG_OUT}>
            <Text style={style.logOut}>{Constants.LOG_OUT}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default CustomMenu;
