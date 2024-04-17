/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import style from './style';
import Location from 'react-native-vector-icons/SimpleLineIcons';
import {GradientColor2} from '../Color/color';

const TextInputField = ({
  onChangeText,
  hint,
  isMultiLine,
  isPhone,
  value,
  defaultValue,
  closeIconClick,
  isCloseIcon,
  isText,
  onSearchPress,
  capital,
}) => {
  return (
    <View style={[style.inputLabel, {height: isMultiLine ? 150 : null}]}>
      {isText ? (
        <TouchableOpacity
          style={[style.inputLabel, {height: 18, flex: 6}]}
          onPress={() => onSearchPress()}>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: 15,
              flex: 1,
              height: 25,
              color: 'black',
            }}>
            {defaultValue}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          autoCapitalize={capital ? 'characters' : 'none'}
          style={{flex: 6, fontFamily: 'PlusJakartaSans-Regular', fontSize: 15}}
          value={value}
          defaultValue={defaultValue}
          maxLength={isPhone ? 10 : null}
          keyboardType={isPhone ? 'numeric' : 'default'}
          textAlignVertical={isMultiLine ? 'top' : 'auto'}
          multiline={isMultiLine === true ? true : false}
          placeholder={hint}
          onChangeText={e => onChangeText(e)}
        />
      )}

      {isCloseIcon && (
        <Location
          style={style.locationIcon}
          onPress={() => closeIconClick()}
          name={defaultValue ? 'close' : ''}
          size={20}
          color={GradientColor2}
        />
      )}
    </View>
  );
};
export default TextInputField;
