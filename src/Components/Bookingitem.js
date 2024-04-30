import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import InnerButton from './InnerButton';
import * as Constants from '../Constants/Constant';
import {useNavigation} from '@react-navigation/native';
import {
  GradientColor2,
  GradientColor3,
  PrivacyPolicy,
  titleColor,
  white,
} from '../Color/color';
import CardHeader from './CardHeader';

const BookingItem = ({detail, onpressStatus, buttonStatus, userType}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  console.log(909080980, detail);

  return (
    <View style={styles.card}>
      <CardHeader from={detail?.from} to={detail?.to} icon={detail?.icon} />
      <View style={styles.horizontalLine} />
      <View style={styles.rowdirection}>
        <View style={styles.point} />
        <Text style={styles.smallImageHeaderTitle}>
          {userType === 2 ? detail?.vehicle_number : detail?.material_name}
        </Text>
      </View>
      <View style={styles.rowdirection}>
        <View style={styles.point} />
        <Text style={styles.smallImageHeaderTitle}>{detail?.name}</Text>
      </View>
      <View style={styles.horizontalLine} />
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.textStyle}>{`${detail?.qty} Ton`}</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.textStyle}>{`₹ ${detail?.price} / ${
          detail?.price_type === 1 ? t(Constants.FIXED) : t(Constants.PER_TON)
        }`}</Text>
      </View>
      <View style={styles.horizontalLine} />
      {buttonStatus === 'ongoing' ? (
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('viewDetail', {item: detail})}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'PlusJakartaSans-Bold',
              color: 'blue',
              textDecorationLine: 'underline',
            }}>
            View Details
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <InnerButton
            enabledStyle={styles.requestButtonContainer}
            textStyle={styles.gradientButtonText}
            title={'Declined'}
            onpressStatus={() => {
              navigation.navigate('Booking Status', {manualVerify: true});
              onpressStatus(detail?.id, false);
            }}
          />
          <InnerButton
            enabledStyle={styles.findButtonContainer}
            textStyle={styles.findButtonText}
            title={t(Constants.ACCEPT)}
            onpressStatus={() => {
              onpressStatus(detail?.id, false);
              navigation.navigate('Booking Status', {manualVerify: false});
            }}
          />
        </View>
      )}
    </View>
  );
};
export default BookingItem;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  headerView: {flexDirection: 'row'},
  image: {height: 60, width: 60, borderRadius: 5},
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'green',
  },
  square: {
    width: 7,
    height: 7,
    borderRadius: 1,
    backgroundColor: 'red',
  },
  routeInfo: {
    flex: 1,
    marginLeft: 20,
  },
  routeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeading: {
    minWidth: 45,
    marginLeft: 10,
    color: PrivacyPolicy,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  routeText: {
    flex: 1,
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 15,
    height: '100%',
  },

  smallImageHeaderTitle: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  point: {
    height: 8,
    width: 8,
    backgroundColor: PrivacyPolicy,
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  verifyTruck: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 20,
    marginRight: 10,
    elevation: 1,
    backgroundColor: white,
  },
  dashboardHeaderVerifiedTitle: {
    fontSize: 12,
    color: GradientColor2,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginLeft: 5,
  },
  rowdirection: {flexDirection: 'row', alignItems: 'center', flex: 1},
  buttonStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  requestButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor3,
  },
  gradientButtonText: {
    fontSize: 13,
    color: GradientColor3,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  findButtonText: {
    fontSize: 13,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  findButtonContainer: {
    marginLeft: 20,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
  },
  textStyle2: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
