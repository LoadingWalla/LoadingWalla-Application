import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {initMyLorryById} from '../../Store/Actions/Actions';
import Shield from '../../../assets/SVG/svg/Shield';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import LottieView from 'lottie-react-native';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const Status = ({navigation, route}) => {
  useTrackScreenTime('Status');
  const {truck_id} = route.params;
  const dispatch = useDispatch();

  const {mySingleLoding, mySingleStatus, mySingleTruckData, mySingleUserData} =
    useSelector(state => {
      // console.log('My Lorry/Load', state.data.mySingleTruckData);
      return state.data;
    });

  const userType = mySingleUserData?.user_type;

  useEffect(() => {
    dispatch(initMyLorryById(truck_id));
  }, [dispatch, truck_id]);

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          // onPress={() => navigation.goBack()}>
          onPress={() => navigation.navigate('My Truck')}>
          <CloseCircle size={25} />
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          {/* <Image
            source={require('../../../assets/GIFs/success.gif')}
            resizeMode="contain"
            style={{
              height: 200,
              width: 200,
            }}
          /> */}
          <LottieView
            source={require('../../../assets/GIFs/Done.json')}
            autoPlayð
            loop
            resizeMode="contain"
            style={styles.lottieViewStyle}
          />
          <Text
            style={[
              styles.congratsText,
              {color: mySingleTruckData?.verified ? '#119500' : '#e5b900'},
            ]}>
            {mySingleTruckData?.verified ? 'Congratulations!' : 'Pending!'}
          </Text>
          <Text style={styles.verifyText}>
            {mySingleTruckData?.verified
              ? 'Apka yea truck verified ho gaya hai'
              : 'Verification Pending'}
          </Text>

          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.childCard}>
                <View>
                  <Image
                    // source={{uri: mySingleTruckData?.image}}
                    source={{
                      uri: 'https://loadingwalla.com/public/truck_tyre/6%20Tyre.png',
                    }}
                    style={styles.statusImage}
                  />
                </View>
                <View style={styles.details}>
                  <View style={styles.statusHeader}>
                    <Text style={styles.truckNumber}>
                      {mySingleTruckData?.vehicle_number}
                    </Text>
                    <Shield size={20} verified={mySingleTruckData?.verified} />
                  </View>
                </View>
              </View>
              <View style={styles.specs}>
                <Text style={styles.specsText}>
                  {mySingleTruckData?.truck_capacity}
                </Text>
                <View style={styles.verticalLine} />
                <Text style={styles.specsText}>{mySingleTruckData?.wheel}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.specsText}>
                  {`${mySingleTruckData?.truck_type} Body`}
                </Text>
              </View>
              {mySingleTruckData?.verified ? (
                <Text style={styles.text}>
                  Abb <Text style={styles.boldText}>load</Text> search Kare,
                  apke <Text style={styles.boldText}>truck</Text> ke according.
                </Text>
              ) : (
                <Text style={styles.text}>
                  You can still search
                  <Text style={styles.boldText}> load </Text>
                  while We are verifying your
                  <Text style={styles.boldText}> truck </Text>.
                </Text>
              )}
              <TouchableOpacity
                style={styles.statusButtonstyle(mySingleTruckData?.status)}
                disabled={mySingleTruckData?.status === 0}
                onPress={() => {
                  navigation.navigate('FindLoads', {
                    Owner: mySingleTruckData,
                    userType: userType,
                  });
                }}>
                <Text style={styles.statusButtonTextStyle}>Search Load</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.statusButtonContainer}
            onPress={() => {
              navigation.navigate('AddLorry');
            }}>
            <Text style={styles.statusButtonText}>Add Truck</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Status;
