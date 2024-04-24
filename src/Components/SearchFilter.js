import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GradientColor2} from '../Color/color';
import style from './style';
import CloseCircle from '../../assets/SVG/svg/CloseCircle';
import LocationIcon from '../../assets/SVG/svg/LocationIcon';

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
      <TouchableOpacity
        onPress={() => closeIconClick()}
        style={{justifyContent: 'center', marginRight: 10}}>
        {defaultValue ? (
          <CloseCircle
            size={20}
            color={GradientColor2}
            style={style.locationIcon}
          />
        ) : (
          <LocationIcon size={20} color={GradientColor2} />
        )}
      </TouchableOpacity>
    </View>
  );
};
export default SearchFilter;
