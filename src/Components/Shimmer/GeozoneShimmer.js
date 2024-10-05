import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const GeozoneShimmer = ({count = 7}) => {
  return (
    <SkeletonPlaceholder>
      <View>
        {Array.from({length: count}).map((_, index) => (
          <View key={index} style={styles.shimmerCardView} />
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default GeozoneShimmer;

const styles = StyleSheet.create({
  shimmerCardView: {
    borderRadius: 8,
    height: 50,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
