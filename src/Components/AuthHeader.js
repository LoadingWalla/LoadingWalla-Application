import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import style from "./style";

const AuthHeader = ({ title, goBack }) => {
  return (
    <View>
      <View style={style.backIconView}>
        <Icon
          onPress={() => goBack()}
          name="arrow-back-sharp"
          size={30}
          color="black"
        />
      </View>
      <Text style={style.WelcomeTruckTitle}>{title}</Text>
    </View>
  );
};
export default AuthHeader;
