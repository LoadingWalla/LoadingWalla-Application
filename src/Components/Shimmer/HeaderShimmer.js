/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import style from '../style';

const HeaderShimmer = ({title}) => {
  return (
    <SkeletonPlaceholder>
      <View style={style.dashboardHeaderContainer(false)}>
        <View style={style.dashboardHeaderImage} />
        <View style={style.dashboardHeaderTextView}>
          <View style={style.dashboardHeaderTextShimmer} />
          <View style={[style.dashboardHeaderTextShimmer, {marginTop: 8}]} />
        </View>
        <View style={style.headerCallView}>
          <View style={style.dashboardRoundImage} />
          <View style={[style.dashboardRoundImage, {marginLeft: 10}]} />
          <View style={[style.dashboardRoundImage, {marginLeft: 10}]} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
export default HeaderShimmer;
