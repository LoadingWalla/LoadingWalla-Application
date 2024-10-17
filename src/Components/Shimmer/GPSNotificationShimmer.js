import React from 'react';
import {View} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style'

const GPSNotificationShimmer = () => {
  return (
    <View style={styles.gpsNoticontainer}>
      <View>
        {[...Array(12)].map((_, index) => (
          <View key={index} style={styles.gpsNoticard}>
            <SkeletonPlaceholder>
              <View style={styles.gpsNotiheaderContent}>
                <ShimmerPlaceholder style={styles.title} />
                <ShimmerPlaceholder style={styles.gpsNotistatus} />
              </View>
            </SkeletonPlaceholder>
          </View>
        ))}
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 8,
//     marginBottom: 20,
//     height: 20,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   title: {
//     width: 100,
//     height: 15,
//     borderRadius: 5,
//   },
//   status: {
//     width: 100,
//     height: 15,
//     borderRadius: 5,
//   },
// });

export default GPSNotificationShimmer;
