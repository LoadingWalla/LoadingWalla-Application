import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import style from './style';

const RequestShimmer = ({title}) => {
  return (
    <SkeletonPlaceholder>
      <View style={style.requestShimmer}>
        <View style={style.buttonActiveView} />
        <View style={style.buttonActiveView} />
      </View>
    </SkeletonPlaceholder>
  );
};
export default RequestShimmer;
