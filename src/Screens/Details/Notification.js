import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NetworkContext} from '../../Context/NetworkContext';
import NoInternetScreen from './NoInternetScreen';
import {pageBackground} from '../../Color/color';
import NotificationShimmer from '../../Components/Shimmer/NotificationShimmer';
import CommonItem from '../../Components/CommonItem';
import {initNotification} from '../../Store/Actions/Actions';

const Notification = ({navigation, NotificationLoading, route}) => {
  console.log('Notification', route.params);
  const {t} = useTranslation();
  const [notificationList, setNotificationList] = useState([]);
  const {isConnected} = useContext(NetworkContext);

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View style={{paddingHorizontal: 20, backgroundColor: pageBackground}}>
      {NotificationLoading ? (
        <NotificationShimmer />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 15}}
          data={notificationList}
          renderItem={({item, index}) => (
            <CommonItem title={item?.title} desc={item?.description} />
          )}
        />
      )}
    </View>
  );
};

export default Notification;
