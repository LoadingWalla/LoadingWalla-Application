
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import style from './style';

const NotificationShimmer = ({title}) => {
  return (
    <View style={style.lorryShimmerView}>
      <SkeletonPlaceholder>
        <View style={[style.dashboardHeaderContainer, {marginBottom: 0}]}>
          <View style={style.dashboardHeaderImage} />
          <View style={style.dashboardHeaderTextView}>
            <View style={style.dashboardHeaderTextShimmer} />
            <View style={[style.dashboardHeaderTextShimmer, {marginTop: 8}]} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
export default NotificationShimmer;
