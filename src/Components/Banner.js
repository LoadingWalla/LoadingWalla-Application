import React from "react";
import { View, Image } from "react-native";
import style from "./style";
import { SvgUri } from "react-native-svg";

const Banner = ({ uri, bannerKey }) => {
  return (
    <View key={bannerKey} style={style.bannerContainer}>
      {uri?.split(".").pop() === "svg" ? (
        <SvgUri width="100%" height="100%" uri={uri} />
      ) : (
        <Image
          style={style.bannerImage}
          source={{ uri: uri }}
          resizeMode={"cover"}
        />
      )}
    </View>
  );
};
export default Banner;
