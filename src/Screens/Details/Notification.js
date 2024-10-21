import React, {useCallback} from 'react';
import {View, FlatList} from 'react-native';
import NotificationShimmer from '../../Components/Shimmer/NotificationShimmer';
import CommonItem from '../../Components/CommonItem';
import {initNotification} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const Notification = ({navigation, route}) => {
  useTrackScreenTime('Notification');
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
      style={styles.notifContainer}>
      {NotificationLoading ? (
        <NotificationShimmer />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.notifFlatList}
          data={NotificationData}
          renderItem={({item, index}) => <CommonItem item={item} />}
        />
      )}
    </View>
  );
};

export default Notification;
