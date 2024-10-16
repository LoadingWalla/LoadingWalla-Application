import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style';

const AddLorryShimmer = () => {
  return (
    <View style={styles.shimmerContainer}>
      <SkeletonPlaceholder>
        <View style={styles.addLorryshimmerDirection}>
          <View style={styles.addLorryshimmerNameView} />
          <View style={styles.addLorryshimmerLocationView} />
        </View>
        <View style={styles.addLorryshimmerDirection}>
          <View style={styles.addLorryshimmerNameView} />
          <View style={styles.shimmerTruckType}>
            <View style={styles.shimmerItemView} />
            <View style={styles.shimmerItemView} />
            <View style={styles.shimmerItemView} />
            <View style={styles.shimmerItemView} />
          </View>
        </View>
        <View style={styles.addLorryshimmerDirection}>
          <View style={styles.addLorryshimmerNameView} />
          <View style={styles.shimmerTruckType}>
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
          </View>
        </View>
        <View style={styles.addLorryshimmerDirection}>
          <View style={styles.addLorryshimmerNameView} />
          <View style={styles.shimmerTruckType}>
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
          </View>
        </View>
        <View style={styles.addLorryshimmerDirection}>
          <View style={styles.addLorryshimmerNameView} />
          <View style={styles.addLorryshimmerDirection}>
            <View style={styles.shimmerProfile} />
            <View style={styles.addLorryshimmerNameView} />
          </View>
          <View style={styles.addLorryshimmerDirection}>
            <View style={styles.shimmerProfile} />
            <View style={styles.addLorryshimmerNameView} />
          </View>
        </View>
        <View style={styles.addLorrybuttonView} />
      </SkeletonPlaceholder>
    </View>
  );
};

export default AddLorryShimmer;

// const styles = StyleSheet.create({
//   shimmerContainer: {
//     paddingHorizontal: 10,
//   },
//   shimmerDirection: {marginTop: 20, flexDirection: 'column'},
//   shimmerNameView: {
//     height: 15,
//     width: 200,
//     marginTop: 5,
//     marginLeft: 10,
//     borderRadius: 5,
//   },
//   shimmerInputView: {
//     height: 15,
//     width: 200,
//     marginTop: 5,
//     marginLeft: 10,
//     borderRadius: 5,
//   },
//   shimmerTruckType: {
//     flexDirection: 'row',
//   },
//   shimmerLocationView: {
//     borderRadius: 8,
//     height: 50,
//     elevation: 2,
//     marginTop: 18,
//     marginHorizontal: 10,
//   },
//   shimmerBodyType: {
//     borderRadius: 8,
//     height: 50,
//     width: 100,
//     elevation: 2,
//     marginTop: 18,
//     marginHorizontal: 10,
//   },
//   buttonView: {
//     marginTop: 50,
//     height: 60,
//     borderRadius: 5,
//     justifyContent: 'space-between',
//   },
// });
