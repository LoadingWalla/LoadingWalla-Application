import React from 'react';
import {View, Text, TextInput, Pressable, TouchableOpacity} from 'react-native';
import {GradientColor2} from '../Color/color';
import Location from 'react-native-vector-icons/SimpleLineIcons';
import style from './style';

const SearchFilter = ({
  onSearchPress,
  leftTitle,
  placeholder,
  closeIconClick,
  defaultValue,
}) => {
  return (
    <View style={style.searchFilter}>
      <Text style={style.searchLeftText}>{leftTitle}</Text>
      <View style={style.searchDivider} />
      <TouchableOpacity
        onPress={() => onSearchPress()}
        style={style.searchInput}>
        <Text
          defaultValue={defaultValue}
          placeholder={placeholder}
          style={style.searchText}>
          {defaultValue ? defaultValue : placeholder}
        </Text>
      </TouchableOpacity>

      <Location
        style={style.locationIcon}
        onPress={() => closeIconClick()}
        name={defaultValue ? 'close' : 'location-pin'}
        size={20}
        color={GradientColor2}
      />
    </View>
  );
};
export default SearchFilter;
