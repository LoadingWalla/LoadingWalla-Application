import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {pageBackground} from '../../Color/color';
import NotificationShimmer from '../../Components/Shimmer/NotificationShimmer';
import CommonItem from '../../Components/CommonItem';
import {initNotification} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const Notification = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {NotificationData, NotificationLoading, NotificationStatus} =
    useSelector(state => {
      console.log('My Notification', state.data);
      return state.data;
    });

  useFocusEffect(
    useCallback(() => {
      dispatch(initNotification());
      // Optional: Return a function to run when the screen loses focus
      return () => {
        console.log('Screen is out of focus');
        // Any cleanup actions if necessary
      };
    }, []),
  );

  return (
    <View
      style={{
        paddingHorizontal: 5,
        backgroundColor: '#FDFDFD',
        flex: 1,
      }}>
      {NotificationLoading ? (
        <NotificationShimmer />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10}}
          data={NotificationData}
          renderItem={({item, index}) => <CommonItem item={item} />}
        />
      )}
    </View>
  );
};

export default Notification;
