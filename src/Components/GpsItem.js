import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {PrivacyPolicy, backgroundColorNew, titleColor} from '../Color/color';
import SettingIcon from '../../assets/SVG/svg/SettingIcon';
import FuelIcon from '../../assets/SVG/svg/FuelIcon';
import BatteryIcon from '../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../assets/SVG/svg/NetworkIcon';
import GeoFencingIcon from '../../assets/SVG/svg/GeoFencingIcon';
import DamageIcon from '../../assets/SVG/svg/DamageIcon';
import AlertBox from './AlertBox';
import KeyIcon from '../../assets/SVG/svg/KeyIcon';

// const GpsItem = ({navigation, item, icon, isDisable}) => {
//   console.log(66666, item);
//   const rechageValidity = 'Active';

//   const ignition =
//     item?.position?.[0]?.attributes?.ignition ||
//     item?.position?.[0]?.attributes?.motion;
//   const totalDistance = (
//     item?.position?.[0]?.attributes?.totalDistance / 1000
//   ).toFixed(2);
//   const batteryLevel = item?.position?.[0]?.attributes?.batteryLevel;
//   const damage = item?.position?.[0]?.attributes?.damage;
//   const isNavigationDisabled = item?.disabled || item?.positionId === 0;

//   const showAlert = () => {
//     AlertBox('Service unavailable! Your Plan has been Expired.');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.itemContainer}>
//         <View style={styles.imgContainer}>
//           <View style={styles.imgBox}>
//             <Image
//               source={{
//                 uri: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View />
//         </View>
//         <TouchableOpacity
//           disabled={isDisable}
//           onPress={() => {
//             if (isNavigationDisabled) {
//               showAlert();
//             } else {
//               navigation.navigate('trackingtruck', {deviceId: item?.id});
//             }
//           }}
//           style={styles.textContainer}>
//           <Text style={styles.highlightText}>{item?.name}</Text>
//           <View style={styles.ignBox}>
//             <Text style={{color: item?.status === 'online' ? 'green' : 'red'}}>
//               {item?.status}
//             </Text>
//           </View>
//           <View style={styles.iconBox}>
//             <KeyIcon size={20} color={ignition ? 'green' : 'red'} />
//             <FuelIcon size={20} color={'#727272'} />
//             <BatteryIcon
//               size={20}
//               color={
//                 batteryLevel ? (batteryLevel > 60 ? 'green' : 'red') : '#727272'
//               }
//             />
//             <NetworkIcon size={20} />
//             <GeoFencingIcon size={20} />
//             <DamageIcon size={20} color={damage ? 'red' : '#727272'} />
//           </View>
//         </TouchableOpacity>
//         <View>
//           <View style={styles.distanceBox}>
//             <Text style={styles.highlightText}>
//               {totalDistance ? `${totalDistance} KM` : '0 KM'}
//             </Text>
//             <Text style={styles.distanceText}>Total Distance</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.expiryDate}>
//         <Text
//           style={
//             rechageValidity === 'Expired'
//               ? styles.expiredText
//               : styles.activeText
//           }>
//           Expire on Feb 20, 2025
//         </Text>
//         <TouchableOpacity
//           disabled={isDisable}
//           onPress={() => {
//             if (isNavigationDisabled) {
//               showAlert();
//             } else {
//               navigation.navigate('GpsSetting');
//             }
//           }}>
//           <SettingIcon
//             size={20}
//             color={
//               rechageValidity === 'Expired' ? backgroundColorNew : PrivacyPolicy
//             }
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

const GpsItem = ({navigation, item, icon, isDisable}) => {
  // console.log(66666, item);
  const rechageValidity = 'Active';

  const attributes = item?.position?.[0]?.attributes || {};
  // console.log(4444, attributes);
  const ignition = attributes?.ignition || attributes?.motion;
  const totalDistance = attributes?.totalDistance
    ? (attributes.totalDistance / 1000).toFixed(2)
    : '0.00';
  const batteryLevel = attributes?.batteryLevel;
  const damage = attributes?.damage;
  const isNavigationDisabled = item?.disabled || item?.positionId === 0;

  const showAlert = () => {
    AlertBox('Service unavailable! Your Plan has been Expired.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.imgContainer}>
          <View style={styles.imgBox}>
            <Image
              source={{
                uri: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
              }}
              style={styles.image}
            />
          </View>
          <View />
        </View>
        <TouchableOpacity
          disabled={isDisable}
          onPress={() => {
            if (isNavigationDisabled) {
              showAlert();
            } else {
              navigation.navigate('trackingtruck', {deviceId: item?.id});
            }
          }}
          style={styles.textContainer}>
          <Text style={styles.highlightText}>{item?.name}</Text>
          <View style={styles.ignBox}>
            <Text style={{color: item?.status === 'online' ? 'green' : 'red'}}>
              {item?.status}
            </Text>
          </View>
          <View style={styles.iconBox}>
            <KeyIcon size={20} color={ignition ? 'green' : 'red'} />
            <BatteryIcon
              size={20}
              color={batteryLevel > 60 ? 'green' : 'red'}
            />
            {attributes.network !== null && (
              <NetworkIcon
                color={attributes.network ? 'green' : 'red'}
                size={20}
              />
            )}
            {attributes.fuel && <FuelIcon size={20} color={'#727272'} />}
            {attributes.ger && <GeoFencingIcon size={20} />}
            {attributes.alarm && (
              <DamageIcon size={20} color={damage ? 'red' : '#727272'} />
            )}
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.distanceBox}>
            <Text style={styles.highlightText}>{`${totalDistance} KM`}</Text>
            <Text style={styles.distanceText}>Total Distance</Text>
          </View>
        </View>
      </View>
      <View style={styles.expiryDate}>
        <Text
          style={
            rechageValidity === 'Expired'
              ? styles.expiredText
              : styles.activeText
          }>
          Expire on Feb 20, 2025
        </Text>
        <TouchableOpacity
          disabled={isDisable}
          onPress={() => {
            if (isNavigationDisabled) {
              showAlert();
            } else {
              navigation.navigate('GpsSetting');
            }
          }}>
          <SettingIcon
            size={20}
            color={
              rechageValidity === 'Expired' ? backgroundColorNew : PrivacyPolicy
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GpsItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  modelText: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  expiredText: {
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
  activeText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
  expiryDate: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    textAlign: 'left',
  },
  distanceBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#f7f7f7',
  },
  distanceText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textAlign: 'right',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 10,
    height: '80%',
  },
  ignBox: {flexDirection: 'row', alignItems: 'center'},
  imgContainer: {
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imgBox: {
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
    width: 60,
    height: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignitionStatus: {flexDirection: 'row', borderWidth: 0},
  ignitionText: {fontFamily: 'PlusJakartaSans-SemiBold'},
});
