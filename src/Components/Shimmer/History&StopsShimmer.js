import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HistoryStopsShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainCard}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.card}>
            <SkeletonPlaceholder>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <ShimmerPlaceholder style={styles.status} />
                  <ShimmerPlaceholder style={styles.title} />
                  <ShimmerPlaceholder style={styles.status} />
                </View>
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
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    padding: 8,
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    height: 150,
  },
  header: {
    height: '100%',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    width: '90%',
    height: 45,
    borderRadius: 5,
  },
  status: {
    width: '70%',
    height: 25,
    borderRadius: 5,
  },
});

export default HistoryStopsShimmer;
