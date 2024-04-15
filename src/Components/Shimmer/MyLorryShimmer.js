import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import style from "./style";
import HeaderShimmer from "./HeaderShimmer";

const MyLorryShimmer = ({ title }) => {
  return (
    <View>
      <View style={style.lorryShimmerView}>
        <HeaderShimmer />
        <View style={style.borderLineShimmer} />
        <SkeletonPlaceholder>
          <View style={style.lorryShimmerItemView}>
            <View style={style.dotView} />
            <View style={style.lorryTextShimmer} />
          </View>
          <View style={style.lorryShimmerItemView}>
            <View style={style.dotView} />
            <View style={style.lorryTextShimmer} />
          </View>
          <View style={style.lorryShimmerItemView}>
            <View style={style.dotView} />
            <View style={style.lorryTextShimmer} />
          </View>
        </SkeletonPlaceholder>
        <View style={[style.borderLineShimmer, { marginTop: 10 }]} />
        <SkeletonPlaceholder>
          <View style={style.lorryShimmerItemView}>
            <View style={style.dotView} />
            <View style={style.lorryTextShimmer} />
          </View>
        </SkeletonPlaceholder>
        <View style={[style.borderLineShimmer, { marginVertical: 10 }]} />
        <SkeletonPlaceholder>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={style.buttonView} />
            <View style={style.buttonView} />
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};
export default MyLorryShimmer;
