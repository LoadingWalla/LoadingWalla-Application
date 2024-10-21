import React from 'react';
import {TextInput, Text, View, TouchableOpacity} from 'react-native';
import style from './style';
import {GradientColor2, PrivacyPolicy, titleColor} from '../Color/color';
import CloseCircle from '../../assets/SVG/svg/CloseCircle';

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
  maxLength
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
              color: titleColor,
            }}>
            {defaultValue}
          </Text>
        </TouchableOpacity>
      ) : (
        <TextInput
          autoCapitalize={capital ? 'characters' : 'none'}
          style={{
            flex: 6,
            fontFamily: 'PlusJakartaSans-Regular',
            fontSize: 15,
            // color: PrivacyPolicy,
            color: titleColor,
          }}
          value={value}
          defaultValue={defaultValue}
          maxLength={isPhone ? 10 : maxLength ? maxLength : null}
          keyboardType={isPhone ? 'numeric' : 'default'}
          textAlignVertical={isMultiLine ? 'top' : 'auto'}
          multiline={isMultiLine === true ? true : false}
          placeholder={hint}
          placeholderTextColor={PrivacyPolicy}
          onChangeText={e => onChangeText(e)}
        />
      )}

      {isCloseIcon && defaultValue ? (
        <TouchableOpacity
          onPress={() => closeIconClick()}
          style={style.locationIcon}>
          <CloseCircle
            size={20}
            color={GradientColor2}
            style={style.locationIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default TextInputField;
