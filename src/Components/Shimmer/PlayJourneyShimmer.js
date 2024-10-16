import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const PlayJourneyShimmer = () => {
  return (
    <View style={styles.container}>
      <View>
        {[...Array(1)].map((_, index) => (
          <View key={index} style={styles.card}>
            <SkeletonPlaceholder>
              <View style={styles.header}>
                <ShimmerPlaceholder style={styles.texts(75)} />
                <ShimmerPlaceholder style={styles.texts(10)} />
                <ShimmerPlaceholder style={styles.texts(10)} />
              </View>
              <View style={styles.footer}>
                <ShimmerPlaceholder style={styles.status} />
                <ShimmerPlaceholder style={styles.status} />
                <ShimmerPlaceholder style={styles.status} />
              </View>
            </SkeletonPlaceholder>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 8,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    width: '30%',
    height: 30,
    borderRadius: 5,
  },
  texts: wid => ({
    width: `${wid}%`,
    height: 30,
    borderRadius: 5,
  }),
});

export default PlayJourneyShimmer;
