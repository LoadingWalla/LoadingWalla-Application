/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const BuyGPSShimmer = () => {
  return (
    <View style={styles.container}>
      <View>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.card}>
            <SkeletonPlaceholder>
              <View style={styles.header}>
                {/* <ShimmerPlaceholder style={styles.icon} /> */}
                <View style={styles.headerContent}>
                  <ShimmerPlaceholder style={styles.title} />
                  <ShimmerPlaceholder style={styles.status} />
                </View>
                <ShimmerPlaceholder style={styles.speed} />
              </View>
              <View style={styles.location}>
                <ShimmerPlaceholder style={styles.date} />
                <ShimmerPlaceholder style={styles.date2} />
                <ShimmerPlaceholder style={styles.date} />
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
    padding: 8,
    // margin:8
  },
  card: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    height: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 2,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    width: 100,
    height: 15,
    borderRadius: 5,
  },
  status: {
    marginTop: 5,
    width: 150,
    height: 15,
    borderRadius: 5,
  },
  speed: {
    width: 100,
    height: 75,
    borderRadius: 5,
  },
  date: {
    marginTop: 5,
    width: '50%',
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  date2: {
    marginTop: 5,
    width: '30%',
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default BuyGPSShimmer;
