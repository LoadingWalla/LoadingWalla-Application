import React from 'react';
import {View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import {GradientColor2} from '../Color/color';
import * as Constants from '../Constants/Constant';
import style from './style';
import HeaderShimmer from './Shimmer/HeaderShimmer';
import SupportIcon from '../../assets/SVG/svg/SupportIcon';
import BellIcon from '../../assets/SVG/svg/BellIcon';
import Shield from '../../assets/SVG/svg/Shield';

const DashboardHeader = ({
  title,
  navigate,
  notification,
  img,
  isSmallImage,
  gotoProfile,
  loading,
  verify,
  t,
}) => {
  return (
    <>
      {loading === true ? (
        <HeaderShimmer />
      ) : (
        <View style={style.dashboardHeaderContainer(isSmallImage)}>
          <Pressable onPress={() => gotoProfile()}>
            <Image
              style={style.dashboardHeaderImage}
              source={
                img ? {uri: img} : require('../../assets/placeholder.png')
              }
              resizeMode={'cover'}
            />
          </Pressable>
          <Pressable
            onPress={() => gotoProfile()}
            activeOpacity={0.5}
            style={style.dashboardHeaderTextView}>
            <Text style={style.dashboardHeaderTitle}>{title}</Text>
            <TouchableOpacity
              style={style.rowDirection}
              onPress={() => gotoProfile()}>
              <Shield
                color={verify === 1 ? 'green' : GradientColor2}
                size={13}
                verified={verify}
              />
              <Text style={style.dashboardHeaderVerifiedTitle(verify)}>
                {verify === 1
                  ? `${t(Constants.VERIFIED)}`
                  : `${t(Constants.NOT_VERIFIED)}`}
              </Text>
            </TouchableOpacity>
          </Pressable>
          <View style={style.iconView}>
            <TouchableOpacity
              style={style.commonMargin}
              activeOpacity={0.5}
              onPress={() => navigate()}>
              <SupportIcon size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.commonMargin}
              activeOpacity={0.5}
              onPress={notification}>
              <BellIcon size={30} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DashboardHeader;
