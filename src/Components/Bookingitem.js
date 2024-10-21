import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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
import styles from './style'
import {useTranslation} from 'react-i18next';

const BookingItem = ({detail, onpressStatus, buttonStatus, userType}) => {
  const navigation = useNavigation();
  // console.log(909080980, detail);
  const {t} = useTranslation();

  return (
    <View style={styles.bookingItemcard}>
      <CardHeader
        from={detail?.from}
        to={detail?.to}
        icon={
          userType == '1'
            ? 'https://loadingwalla.com/public/truck_tyre/6%20Tyre.png'
            : 'https://loadingwalla.com/public/loado.png'
        }
        t={t}
      />
      <View style={styles.horizontalLine} />
      <View style={styles.bookingItemrowdirection}>
        <View style={styles.point} />
        <Text style={styles.smallImageHeaderTitle}>
          {userType === 2 ? detail?.vehicle_number : detail?.material_name}
        </Text>
      </View>
      <View style={styles.bookingItemrowdirection}>
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
        <Text style={styles.bookingItemtextStyle}>{`${detail?.qty} Ton`}</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.bookingItemtextStyle}>{`₹ ${detail?.price} / ${
          detail?.price_type === 1 ? t(Constants.FIXED) : t(Constants.PER_TON)
        }`}</Text>
      </View>
      <View style={styles.horizontalLine} />
      {buttonStatus === 'ongoing' ? (
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() =>
            navigation.navigate('viewDetail', {item: detail, userType})
          }>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'PlusJakartaSans-Bold',
              color: 'blue',
              textDecorationLine: 'underline',
            }}>
            {t(Constants.VIEW_DETAILS)}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <InnerButton
            enabledStyle={styles.requestButtonContainer}
            textStyle={styles.gradientButtonText}
            title={t(Constants.DECLINED)}
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

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 8,
//     elevation: 2,
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     marginBottom: 10,
//     marginTop: 10,
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   routeText: {
//     flex: 1,
//     color: titleColor,
//     fontSize: 12,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
//   verticalLine: {
//     backgroundColor: '#AFAFAF',
//     width: 2,
//     marginHorizontal: 15,
//     height: '100%',
//   },

//   smallImageHeaderTitle: {
//     fontSize: 15,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   point: {
//     height: 8,
//     width: 8,
//     backgroundColor: PrivacyPolicy,
//     borderRadius: 4,
//     marginRight: 20,
//     marginLeft: 10,
//   },
//   rowdirection: {flexDirection: 'row', alignItems: 'center', flex: 1},
//   textStyle: {
//     color: PrivacyPolicy,
//     fontSize: 13,
//     fontFamily: 'PlusJakartaSans-Bold',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   requestButtonContainer: {
//     borderWidth: 2,
//     borderRadius: 8,
//     borderColor: GradientColor3,
//   },
//   gradientButtonText: {
//     fontSize: 13,
//     color: GradientColor3,
//     fontFamily: 'PlusJakartaSans-Bold',
//     textAlign: 'center',
//   },
//   findButtonText: {
//     fontSize: 13,
//     color: white,
//     fontFamily: 'PlusJakartaSans-Bold',
//     textAlign: 'center',
//   },
//   findButtonContainer: {
//     marginLeft: 20,
//     borderWidth: 2,
//     borderRadius: 8,
//     backgroundColor: GradientColor3,
//     borderColor: GradientColor3,
//   },
// });
