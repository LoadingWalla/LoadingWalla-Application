import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import style from './style';
import HeaderShimmer from './HeaderShimmer';

const BookingShimmer = ({title}) => {
  return (
    <View style={style.mainViewShimmer}>
      <HeaderShimmer />
      <View style={style.borderLineShimmer} />
      <SkeletonPlaceholder>
        <View style={style.shimmerDirection}>
          <View style={style.shimmerProfile} />
          <View style={style.shimmerNameView} />
        </View>
        <View style={style.shimmerDirection}>
          <View style={style.shimmerFlex}>
            <View style={style.shimmerIconView} />
            <View style={style.shimmerIconView} />
          </View>
          <View style={style.shimmerFlex}>
            <View style={style.shimmerIconView} />
            <View style={style.shimmerBorderIconView} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
export default BookingShimmer;
