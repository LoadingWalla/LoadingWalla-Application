import React, {useCallback, useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from '../../../Constants/Constant';
import style from './style';
import {
  acceptRejectFailure,
  initAcceptReject,
  initBooking,
} from '../../../Store/Actions/Actions';

import BookingItem from '../../../Components/Bookingitem';
import DashboardHeader from '../../../Components/DashboardHeader';
import BookingShimmer from '../../../Components/Shimmer/BookingShimmer';
import NotFound from '../../../Components/NotFound';
import {useTranslation} from 'react-i18next';
import {websocketDisconnect} from '../../../Store/Actions/WebSocketActions';
import useTrackScreenTime from '../../../hooks/useTrackScreenTime';

const Booking = ({navigation}) => {
  useTrackScreenTime('Booking');
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [userType, setUserType] = useState();

  const {
    BookingData,
    BookingLoading,
    BookingDashUser,
    BookingStatus,
    accept_rejectStatus,
    DashboardUser,
    dashboardLoading,
  } = useSelector(state => {
    // console.log('My Bookings', state.data);
    return state.data;
  });

  const {wsConnected} = useSelector(state => state.wsData);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(initBooking(2));
    setRefreshing(false);
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (wsConnected) {
        dispatch(websocketDisconnect());
      }
      dispatch(initBooking(2));
    }, [dispatch, wsConnected]),
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

  return (
    <View style={style.Container}>
      <View style={style.DashboardHeaderView}>
        <DashboardHeader
          img={DashboardUser?.profile_img}
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          notification={() => navigation.navigate('Notification')}
          isDashboard={true}
          title={DashboardUser?.name}
          gotoProfile={() => navigation.navigate(Constants.MENU)}
          navigate={() => navigation?.navigate('Contactus')}
          loading={dashboardLoading}
          wallet={DashboardUser?.wallet}
          verify={DashboardUser?.verify}
          t={t}
        />
      </View>
      <View style={style.mainContainer}>
        {BookingLoading ? (
          <BookingShimmer />
        ) : BookingData?.length > 0 ? (
          <FlatList
            keyExtractor={item => item?.id.toString()}
            showsVerticalScrollIndicator={false}
            data={BookingData.slice().reverse()}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={style.bookingContentContainer}>
            <NotFound
              imageName="noBookings"
              height={150}
              width={300}
              title={t(Constants.NO_BOOKINGS_FOUND)}
            />

            <TouchableOpacity
              style={style.previousBooking}
              onPress={() =>
                navigation.navigate('Previous Bookings', {
                  Owner: BookingDashUser,
                })
              }>
              <Text
                style={style.goToPrevBookingTxt}>
                {t(Constants.GOTOPREVIOUSBOOKING)}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Booking;
