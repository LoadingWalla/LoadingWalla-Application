import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileShimmer = ({title}) => {
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <SkeletonPlaceholder>
        <View style={stylesss.bannerContainer} />
        <View style={{marginBottom: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={stylesss.shimmerButtonView} />
            <View style={stylesss.shimmerButtonView} />
          </View>
          <View style={{marginTop: 20}}>
            <View style={stylesss.shimmerTextView} />
            <View style={stylesss.shimmerCardView} />
            <View style={stylesss.shimmerCardView} />
          </View>
          <View style={{marginTop: 20}}>
            <View style={stylesss.shimmerTextView} />
            <View style={stylesss.shimmerCardView} />
            <View style={stylesss.shimmerCardView} />
            <View style={stylesss.shimmerCardView} />
            <View style={stylesss.shimmerCardView} />
            <View style={stylesss.shimmerCardView} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
export default ProfileShimmer;

const stylesss = StyleSheet.create({
  shimmerItemView: {
    width: 110,
    height: 110,
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmerLocationView: {
    borderRadius: 8,
    height: 20,
    elevation: 2,
    marginLeft: 10,
    marginTop: 20,
    width: 110,
  },
  shimmerButtonView: {
    borderRadius: 8,
    height: 60,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 15,
    width: 180,
  },
  shimmerCardView: {
    borderRadius: 8,
    height: 60,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 15,
  },
  shimmerTextView: {
    borderRadius: 8,
    height: 20,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 15,
    width: 200,
  },
  bannerContainer: {
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
  },
});
