import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from '../../../Constants/Constant';
import style from './style';
import {NetworkContext} from '../../../Context/NetworkContext';
import {
  acceptRejectFailure,
  initAcceptReject,
  initBooking,
} from '../../../Store/Actions/Actions';
import BookingItem from '../../../Components/Bookingitem';
import NoInternetScreen from '../../Details/NoInternetScreen';
import DashboardHeader from '../../../Components/DashboardHeader';
import BookingShimmer from '../../../Components/Shimmer/BookingShimmer';
import {PrivacyPolicy} from '../../../Color/color';
// import Lottie from 'lottie-react-native';

const Booking = ({navigation}) => {
  const {t} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [userType, setUserType] = useState();

  const {
    BookingData,
    BookingLoading,
    BookingDashUser,
    BookingStatus,
    accept_rejectStatus,
  } = useSelector(state => state.data);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(initBooking(2));
    setRefreshing(false);
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(initBooking(2));
    }, [dispatch]),
  );

  const bookingStatus = (bookingId, status, isCancel) => {
    dispatch(acceptRejectFailure());
    const actionType = isCancel
      ? 'cancel'
      : status === 'pending'
      ? 'ongoing'
      : 'complete';
    dispatch(initAcceptReject(actionType, bookingId));
  };

  useEffect(() => {
    const getUserType = async () => {
      const user = await AsyncStorage.getItem('UserType');
      setUserType(user);
    };

    getUserType();
  }, []);

  const renderItem = ({item}) => (
    <BookingItem
      onpressStatus={(bookingId, isCancel) =>
        bookingStatus(bookingId, item?.status, isCancel)
      }
      buttonStatus={item?.status}
      detail={item}
      userType={userType}
      Owner={BookingDashUser}
    />
  );

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }

  return (
    <View style={style.Container}>
      <View style={style.DashboardHeaderView}>
        <DashboardHeader
          img={BookingDashUser?.profile_img}
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          notification={() => navigation.navigate('Notification')}
          title={BookingDashUser?.name}
          isDashboard={true}
          gotoProfile={() => navigation.navigate(Constants.PROFILE)}
          navigate={() => navigation?.navigate('Contactus')}
          wallet={BookingDashUser?.wallet}
          verify={BookingDashUser?.verify}
          loading={BookingLoading}
        />
      </View>
      <View style={style.mainContainer}>
        {BookingLoading ? (
          <BookingShimmer />
        ) : BookingData?.length > 0 ? (
          <FlatList
            keyExtractor={item => item?.id.toString()}
            data={BookingData}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: PrivacyPolicy,
                fontFamily: 'PlusJakartaSans-Medium',
              }}>
              {t(Constants.NOT_FOUND)}
            </Text>
            {/* <Lottie
              source={require('../../../assets/notfound.json')}
              autoPlay
              loop
              style={{height: 250, width: 250}}
            /> */}
            <TouchableOpacity
              style={{
                borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 8,
                fontSize: 18,
                color: PrivacyPolicy,
                borderColor: PrivacyPolicy,
                fontFamily: 'PlusJakartaSans-Medium',
              }}
              onPress={() =>
                navigation.navigate('Previous Bookings', {
                  Owner: BookingDashUser,
                })
              }>
              <Text>Go to Previous Booking</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Booking;
