import React from 'react';
import {View, Text, Image} from 'react-native';
import Button from '../../../Components/Button';
import Shield from '../../../../assets/SVG/svg/Shield';
import CheckCircle from '../../../../assets/SVG/svg/CheckCircle';
import Information from '../../../../assets/SVG/svg/Information';
import {useTranslation} from 'react-i18next';
import * as Constants from '../../../Constants/Constant';
import NotFound from '../../../Components/NotFound';
import styles from './style'

const BookingStatus = ({navigation, route}) => {
  // console.log('booking---status', route);
  const {status, Owner, userType, messages, renter} = route.params;
  const {t} = useTranslation();

  const getStatusContent = () => {
    if (status >= 500) {
      return {
        message: messages,
        image: 'errorImage',
      };
    } else {
      switch (status) {
        case 200:
          return {
            message: messages,
            image: 'successImage',
          };
        default:
          return {
            message: messages,
            image: 'errorImage',
          };
      }
    }
  };
  const {message, image, color} = getStatusContent();

  return (
    <View style={styles.bookingStatusContainer}>
      <View style={styles.gifView}>
        <Text style={[styles.congratsText, {color: color}]}>{message}</Text>
        <NotFound imageName={image} height={80} width={80} title={''} />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.childCard}>
            <View>
              <Image source={{uri: Owner?.image}} style={styles.image} />
            </View>
            <View style={styles.details}>
              <View style={styles.header}>
                <Text style={styles.truckNumber}>
                  {userType === '1'
                    ? Owner?.material_name
                    : Owner?.vehicle_number}
                </Text>
                {userType === '2' && (
                  <Shield size={20} verified={Owner?.verified} />
                )}
              </View>
              <Text style={styles.truckType}>
                {userType === '2'
                  ? `${Owner?.truck_type} Body`
                  : `₹ ${Owner?.price} / ${
                      Owner?.price_type === '2' ? 'Fixed' : 'Per Truck'
                    }`}
              </Text>
            </View>
          </View>
          <View style={styles.specs}>
            <Text style={styles.specsText}>
              {userType === '2'
                ? `Capacity: ${Owner?.truck_capacity}`
                : `Capacity: ${Owner?.qty}`}
            </Text>
            <View style={styles.verticalLine} />
            <Text style={styles.specsText}>
              {userType === '2'
                ? `Tyre: ${Owner?.wheel}`
                : `${Math.ceil(Owner?.distance)} KM`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.verticalDashedLine} />
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.childCard}>
            <View>
              <Image source={{uri: renter?.image}} style={styles.image} />
            </View>
            <View style={styles.details}>
              <View style={styles.header}>
                <Text style={styles.truckNumber}>
                  {userType === '2'
                    ? renter?.material_name
                    : renter?.vehicle_number}
                </Text>
                {userType === '1' && renter?.verified ? (
                  <CheckCircle size={20} color={'#119500'} />
                ) : (
                  <Information size={20} color={'#e5b900'} />
                )}
              </View>
              <Text style={styles.truckType}>
                {userType === '1'
                  ? `${renter?.truck_type} Body`
                  : `₹ ${renter?.price} / ${
                      renter?.price_type === '2' ? 'Fixed' : 'Per Truck'
                    }`}
              </Text>
            </View>
          </View>
          <View style={styles.specs}>
            <Text style={styles.specsText}>
              {userType === '1'
                ? `Capacity: ${renter?.truck_capacity}`
                : `Capacity: ${renter?.loads} Ton`}
            </Text>
            <View style={styles.verticalLine} />
            <Text style={styles.specsText}>
              {userType === '1'
                ? `Tyre: ${renter?.wheel}`
                : `${renter?.distance}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.btnView}>
        <Button
          onPress={() =>
            navigation.navigate('FindLoads', {
              Owner: Owner,
              userType: userType,
            })
          }
          title={t(Constants.FIND_MORE_LOADS)}
          style={styles.buttonstyle}
          textStyle={styles.buttonTextStyle}
          touchStyle={styles.touchStyle}
        />
      </View>
    </View>
  );
};

export default BookingStatus;
