import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Background from "./BackgroundGradient";
import style from "./style";

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
}) => {
  return (
    <>
      {!isGrey ? (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => (navigation ? navigation() : onpressStatus())}
          disabled={disabled}
          style={[enabledStyle, disabled && disabledStyle]}
        >
          <View style={style.gradientButtonStyle}>
            {!disabled && count > 0 ? (
              <Text style={style.countMsg}>{`${count}`}</Text>
            ) : null}
            <Text style={[textStyle, disabled && disableTextStyle]}>
              {title}
            </Text>
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
