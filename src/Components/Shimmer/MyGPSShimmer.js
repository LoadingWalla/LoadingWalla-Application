/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MyGPSShimmer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <SkeletonPlaceholder>
            <View style={styles.mainTopBtn}>
                <ShimmerPlaceholder style={styles.topBtn(70)} />
                <ShimmerPlaceholder style={styles.topBtn(70)} />
                <ShimmerPlaceholder style={styles.topBtn(70)} />
                <ShimmerPlaceholder style={styles.topBtn(35)} />
                <ShimmerPlaceholder style={styles.topBtn2(35)} />
            </View>
        </SkeletonPlaceholder>
      </View>
      <View style={styles.mainCard}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.card}>
            <SkeletonPlaceholder>
              <View style={styles.header}>
                <ShimmerPlaceholder style={styles.icon} />
                <View style={styles.headerContent}>
                  <ShimmerPlaceholder style={styles.title} />
                  <ShimmerPlaceholder style={styles.status} />
                </View>
                <ShimmerPlaceholder style={styles.speed} />
              </View>
              <View style={styles.location}>
                <ShimmerPlaceholder style={styles.address} />
                <ShimmerPlaceholder style={styles.date} />
              </View>

              <View style={styles.footer}>
                <ShimmerPlaceholder style={styles.footerText} />
                <ShimmerPlaceholder style={styles.distance} />
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
  topbar: {
    height: 45,
    alignItems: 'center',
  },
  mainTopBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    height: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 55,
    height: 55,
    borderRadius: 6,
  },
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    width: 100,
    height: 15,
    borderRadius: 5,
  },
  status: {
    marginTop: 5,
    width: 50,
    height: 15,
    borderRadius: 5,
  },
  speed: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  topBtn: wid => ({
    width: wid,
    height: 30,
    borderRadius: 5,
    marginRight:5
  }),
  topBtn2: wid => ({
    width: wid,
    height: 30,
    borderRadius: 5,
  }),
  location: {
    marginTop: 10,
  },
  address: {
    width: '90%',
    height: 15,
    borderRadius: 5,
  },
  date: {
    marginTop: 5,
    width: '70%',
    height: 15,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  footerText: {
    width: '45%',
    height: 15,
    borderRadius: 5,
  },
  distance: {
    width: '45%',
    height: 15,
    borderRadius: 5,
  },
});

export default MyGPSShimmer;
