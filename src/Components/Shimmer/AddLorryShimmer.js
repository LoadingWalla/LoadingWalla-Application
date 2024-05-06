import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import style from './style';

const AddLorryShimmer = () => {
  return (
    <View style={styles.shimmerContainer}>
      <SkeletonPlaceholder>
        <View style={styles.shimmerDirection}>
          <View style={styles.shimmerNameView} />
          <View style={styles.shimmerLocationView} />
        </View>
        <View style={styles.shimmerDirection}>
          <View style={styles.shimmerNameView} />
          <View style={styles.shimmerTruckType}>
            <View style={style.shimmerItemView} />
            <View style={style.shimmerItemView} />
            <View style={style.shimmerItemView} />
            <View style={style.shimmerItemView} />
          </View>
        </View>
        <View style={styles.shimmerDirection}>
          <View style={styles.shimmerNameView} />
          <View style={styles.shimmerTruckType}>
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
          </View>
        </View>
        <View style={styles.shimmerDirection}>
          <View style={styles.shimmerNameView} />
          <View style={styles.shimmerTruckType}>
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
            <View style={styles.shimmerBodyType} />
          </View>
        </View>
        <View style={styles.shimmerDirection}>
          <View style={styles.shimmerNameView} />
          <View style={style.shimmerDirection}>
            <View style={style.shimmerProfile} />
            <View style={style.shimmerNameView} />
          </View>
          <View style={style.shimmerDirection}>
            <View style={style.shimmerProfile} />
            <View style={style.shimmerNameView} />
          </View>
        </View>
        <View style={styles.buttonView} />
      </SkeletonPlaceholder>
    </View>
  );
};

export default AddLorryShimmer;

const styles = StyleSheet.create({
  shimmerContainer: {
    paddingHorizontal: 10,
  },
  shimmerDirection: {marginTop: 20, flexDirection: 'column'},
  shimmerNameView: {
    height: 15,
    width: 200,
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
  shimmerInputView: {
    height: 15,
    width: 200,
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
  shimmerTruckType: {
    flexDirection: 'row',
  },
  shimmerLocationView: {
    borderRadius: 8,
    height: 50,
    elevation: 2,
    marginTop: 18,
    marginHorizontal: 10,
  },
  shimmerBodyType: {
    borderRadius: 8,
    height: 50,
    width: 100,
    elevation: 2,
    marginTop: 18,
    marginHorizontal: 10,
  },
  buttonView: {
    marginTop: 50,
    height: 60,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
});
