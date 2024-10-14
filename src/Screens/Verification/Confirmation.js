import React, {useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {initMyLoadById, initMyLorryById} from '../../Store/Actions/Actions';
import Button from '../../Components/Button';
import Shield from '../../../assets/SVG/svg/Shield';
import NotFound from '../../Components/NotFound';
import styles from './style'

const Confirmation = ({navigation, route}) => {
  // console.log(888, route);
  const {
    status,
    userType,
    messages,
    fromRequest,
    Owner,
    deleteLogistic,
    fromViewDetail,
  } = route?.params;
  // console.log(999, Owner, userType);
  const dispatch = useDispatch();

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
  const {message, image} = getStatusContent();

  const {mySingleTruckData, mySingleLoadData} = useSelector(state => {
    // console.log("confirmation987", state.data);
    return state.data;
  });

  const selectedData = userType === '1' ? mySingleLoadData : mySingleTruckData;
  // console.log("selected Data", selectedData);

  useFocusEffect(
    useCallback(() => {
      const fetchData = () => {
        if (userType === '1') {
          dispatch(initMyLoadById(Owner?.id));
        } else {
          dispatch(initMyLorryById(Owner?.truck_id));
        }
      };
      fetchData();
    }, [userType, dispatch, Owner?.id, Owner?.truck_id]),
  );

  return (
    <View style={styles.fullScreen}>
      <View style={styles.confContainer}>
        <View style={styles.gifView}>
          <Text style={styles.congratsText}>{message}</Text>
          <NotFound imageName={image} height={80} width={80} title={''} />
        </View>

        {deleteLogistic || fromViewDetail ? (
          <></>
        ) : (
          <>
            {selectedData && (
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Image
                    source={{
                      uri: selectedData.image,
                    }}
                    style={styles.truckImage}
                  />
                  <View style={styles.truckDetails}>
                    <View style={styles.confHeader}>
                      <Text style={styles.truckType}>
                        {selectedData.vehicle_number ||
                          selectedData.material_name}
                      </Text>
                      {userType === '1' ? null : (
                        <Shield size={20} verified={selectedData.verified} />
                      )}
                    </View>
                    <Text style={styles.confTextStyle}>
                      {selectedData.wheel ||
                        `₹ ${selectedData.price} / ${
                          selectedData.price_type === 2 ? 'Fixed' : 'Per Truck'
                        }`}
                    </Text>
                  </View>
                </View>
                <View style={styles.confHorizontalLine} />
                <View style={[styles.rowdirection, {justifyContent: 'center'}]}>
                  <Text style={styles.confTextStyle}>
                    {/* {`${selectedData.truck_type} Body` ||
                      `${selectedData.qty} Ton`} */}
                    {userType === '1'
                      ? `${selectedData.qty} Ton`
                      : `${selectedData.truck_type} Body`}
                  </Text>
                  <View style={styles.verticalLine} />
                  <Text style={styles.confTextStyle}>
                    {selectedData.truck_capacity ||
                      `${Math.ceil(selectedData.distance)} KM`}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}

        <Button
          onPress={() => {
            if (fromRequest) {
              navigation.navigate('Bookings', {
                userType: userType,
                Owner: Owner,
              });
            } else if (deleteLogistic) {
              userType === '1'
                ? navigation.navigate('My Load')
                : navigation.navigate('My Truck');
            } else if (fromViewDetail) {
              navigation.navigate('Dashboard');
            } else {
              navigation.navigate('FindLoads', {
                Owner: selectedData,
                userType: userType,
              });
            }
          }}
          title={
            fromViewDetail
              ? 'Dashboard'
              : fromRequest
              ? 'My Bookings'
              : deleteLogistic
              ? userType === '1'
                ? 'My Load'
                : 'My Truck'
              : userType === '1'
              ? 'Find More Truck'
              : 'Find More Loads'
          }
          touchStyle={styles.touchStyle}
          textStyle={styles.confButtonTextStyle}
          style={styles.confButtonstyle}
        />
      </View>
    </View>
  );
};

export default Confirmation;