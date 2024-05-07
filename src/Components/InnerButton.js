import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import style from './style';
import {GradientColor2} from '../Color/color';

const InnerButton = ({
  navigation,
  title,
  isGrey,
  onpressStatus,
  count,
  disabled,
  enabledStyle,
  disabledStyle,
  textStyle,
  disableTextStyle,
  loading,
}) => {
  return (
    <>
      {!isGrey ? (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => (navigation ? navigation() : onpressStatus())}
          disabled={disabled}
          style={[enabledStyle, disabled && disabledStyle]}>
          <View style={style.gradientButtonStyle}>
            {loading ? (
              <ActivityIndicator
                style={style.indicatorStyle}
                size="small"
                color={GradientColor2}
              />
            ) : (
              <>
                {!disabled && count > 0 && (
                  <Text style={style.countMsg}>{count}</Text>
                )}
                <Text style={[textStyle, disabled && disableTextStyle]}>
                  {title}
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onpressStatus()} activeOpacity={0.5}>
          <View style={style.innerbuttonStyle}>
            <Text style={style.innerButtonText(isGrey)}>{title}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
export default InnerButton;
