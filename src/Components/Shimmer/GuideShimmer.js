import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style'

const GuideShimmer = () => (
  <View style={styles.guideshimmerContainer}>
    <SkeletonPlaceholder>
      <View style={styles.shimmerHeading} />
      <View style={styles.shimmerOpen} />
      <View style={styles.shimmer} />
    </SkeletonPlaceholder>
  </View>
);

export default GuideShimmer;

// const styles = StyleSheet.create({
//   shimmerContainer: {
//     padding: 10,
//     backgroundColor: '#FFFFFF',
//   },
//   shimmerOpen: {
//     height: 100,
//     marginBottom: 10,
//     borderRadius: 4,
//   },
//   shimmer: {
//     height: 40,
//     marginBottom: 10,
//     borderRadius: 4,
//   },
//   shimmerHeading: {
//     height: 50,
//     marginBottom: 30,
//     borderRadius: 4,
//     marginRight: 30,
//   },
// });
