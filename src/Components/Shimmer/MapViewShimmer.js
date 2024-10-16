import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style'

const MapViewShimmer = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <SkeletonPlaceholder>
      <View style={[styles.mapShimmer, {width, height: height * 0.4}]} />
    </SkeletonPlaceholder>
  );
};

export default MapViewShimmer;

// const styles = StyleSheet.create({
//   mapShimmer: {
//     borderRadius: 10,
//     marginHorizontal: 10,
//     marginTop: 10,
//     borderWidth: 1,
//     backgroundColor: 'red',
//   },
// });
