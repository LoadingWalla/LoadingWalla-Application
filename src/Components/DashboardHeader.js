import React from 'react';
import {View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GradientColor2} from '../Color/color';
import * as Constants from '../Constants/Constant';
import style from './style';
import {useTranslation} from 'react-i18next';
import HeaderShimmer from './Shimmer/HeaderShimmer';

const DashboardHeader = ({
  title,
  navigate,
  notification,
  navigatiopnWallet,
  img,
  isSmallImage,
  gotoProfile,
  loading,
  verify,
}) => {
  const {t} = useTranslation();

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
              <Icon
                name={
                  verify === 1 ? 'shield-check-outline' : 'shield-alert-outline'
                }
                size={16}
                color={verify === 1 ? 'green' : GradientColor2}
              />
              <Text style={style.dashboardHeaderVerifiedTitle(verify)}>
                {verify === 1
                  ? `${t(Constants.VERIFY)}`
                  : t(Constants.NOT_VERIFIED)}
              </Text>
            </TouchableOpacity>
          </Pressable>
          <View style={style.iconView}>
            <TouchableOpacity
              style={style.commonMargin}
              activeOpacity={0.5}
              onPress={notification}>
              <Icon name="bell" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.commonMargin}
              onPress={() => navigate()}>
              <Icon name="headphones-box" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigatiopnWallet()}
              activeOpacity={0.5}
              style={style.wallet}>
              <Icon name="wallet" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DashboardHeader;
