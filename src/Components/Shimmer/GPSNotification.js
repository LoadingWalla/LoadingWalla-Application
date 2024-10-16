import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const GPSNotification = () => {
  return (
    <View style={styles.container}>
      <View>
        {[...Array(12)].map((_, index) => (
          <View key={index} style={styles.card}>
            <SkeletonPlaceholder>
              <View style={styles.headerContent}>
                <ShimmerPlaceholder style={styles.title} />
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
    marginBottom: 20,
    height: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: 100,
    height: 15,
    borderRadius: 5,
  },
  status: {
    width: 100,
    height: 15,
    borderRadius: 5,
  },
});

export default GPSNotification;
