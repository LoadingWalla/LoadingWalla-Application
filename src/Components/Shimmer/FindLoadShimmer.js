import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import style from './style';
import HeaderShimmer from './HeaderShimmer';

const FindLoadShimmer = ({title}) => {
  return (
    <View>
      <View style={style.shimmerCardView}>
        <HeaderShimmer />
        <View style={style.borderLineShimmer} />
        <SkeletonPlaceholder>
          <View style={style.commonMarginTop}>
            <View style={style.shimmerUpperTextView} />
            <View style={style.shimmerLowerTextView} />
          </View>
          <View style={style.commonMarginTop}>
            <View style={style.shimmerUpperTextView} />
            <View style={style.shimmerLowerTextView} />
          </View>
          <View style={style.shimmerDirection}>
            <View style={style.shimmerFlex}>
              <View style={style.shimmerUpperTextView} />
              <View style={style.shimmerLowerTextView} />
            </View>
            <View style={style.shimmerFlex}>
              <View style={style.shimmerUpperTextView} />
              <View style={style.shimmerLowerTextView} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};
export default FindLoadShimmer;
