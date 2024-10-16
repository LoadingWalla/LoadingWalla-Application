import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style'

const ProfileShimmer = ({title}) => {
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <SkeletonPlaceholder>
        <View style={styles.notibannerContainer} />
        <View style={{marginBottom: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.shimmerButtonView} />
            <View style={styles.shimmerButtonView} />
          </View>
          <View style={{marginTop: 20}}>
            <View style={styles.notishimmerTextView} />
            <View style={styles.notishimmerCardView} />
            <View style={styles.notishimmerCardView} />
          </View>
          <View style={{marginTop: 20}}>
            <View style={styles.notishimmerTextView} />
            <View style={styles.notishimmerCardView} />
            <View style={styles.notishimmerCardView} />
            <View style={styles.notishimmerCardView} />
            <View style={styles.notishimmerCardView} />
            <View style={styles.notishimmerCardView} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
export default ProfileShimmer;

// const styles = StyleSheet.create({
//   shimmerItemView: {
//     width: 110,
//     height: 110,
//     marginHorizontal: 10,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   shimmerLocationView: {
//     borderRadius: 8,
//     height: 20,
//     elevation: 2,
//     marginLeft: 10,
//     marginTop: 20,
//     width: 110,
//   },
//   shimmerButtonView: {
//     borderRadius: 8,
//     height: 60,
//     elevation: 2,
//     marginHorizontal: 10,
//     marginTop: 15,
//     width: 180,
//   },
//   shimmerCardView: {
//     borderRadius: 8,
//     height: 60,
//     elevation: 2,
//     marginHorizontal: 10,
//     marginTop: 15,
//   },
//   shimmerTextView: {
//     borderRadius: 8,
//     height: 20,
//     elevation: 2,
//     marginHorizontal: 10,
//     marginTop: 15,
//     width: 200,
//   },
//   bannerContainer: {
//     height: 150,
//     borderRadius: 10,
//     marginHorizontal: 10,
//     marginVertical: 10,
//     padding: 10,
//     flexDirection: 'row',
//   },
// });
