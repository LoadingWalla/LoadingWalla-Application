import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import style from "./style";
import EditIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { GradientColor1 } from "../Color/color";

const MenuItem = ({ title, onPress, Icon }) => {
  return (
    <View>
      <TouchableOpacity style={style.detailItem} onPress={() => onPress()}>
        <View style={style.flexDirection}>
          <EditIcon name={Icon} size={20} color={GradientColor1} />
          <Text style={style.detailText}>{title}</Text>
        </View>
        <EditIcon name="chevron-right" size={20} color={GradientColor1} />
      </TouchableOpacity>
    </View>
  );
};
export default MenuItem;
