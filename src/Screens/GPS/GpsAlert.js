import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PhoneCall from '../../../assets/SVG/svg/PhoneCall';
import GpsSettingItem from '../../Components/GpsSettingItem';
import {backgroundColorNew} from '../../Color/color';
import moment from 'moment';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import GPSNotificationShimmer from '../../Components/Shimmer/GPSNotificationShimmer';
import * as actions from '../../Store/Actions/Actions';
import {useFocusEffect} from '@react-navigation/native';

// Memoized NotificationItem component
const NotificationItem = React.memo(({call, item}) => {
  const {type, attributes, eventTime} = item;
  const message = type === 'alarm' ? attributes?.alarm : type;
  const timeAgo = moment(eventTime).utcOffset('+05:30').fromNow();

  return (
    <View style={styles.headerBox}>
      {/* <View style={styles.textView}> */}
      <View style={styles.speedBoxA}>
        <Text style={styles.gpsAlertHeaderText}>{message}</Text>
        <Text style={styles.timeText}>{timeAgo}</Text>
      </View>
      {/* </View> */}
      {call && (
        <View style={styles.callBox}>
          <TouchableOpacity style={styles.iconBox}>
            <PhoneCall size={20} color={backgroundColorNew} />
          </TouchableOpacity>
          <Text style={styles.mediumTextStyle}>Call Owner</Text>
        </View>
      )}
    </View>
  );
});

// Memoized SettingsSection component
const SettingsSection = React.memo(
  ({t, notifSettingData, dispatch, gps_id}) => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.settingsContainer}>
      <View style={styles.settingsRow}>
        {/* <GpsSettingItem
          detailInput={true}
          title={t(Constants.VEH_STOP_ALRT)}
          storageKey="vehiclestop"
        /> */}
        <GpsSettingItem
          detailInput={true}
          title={t(Constants.OVERSPEED_ALERT)}
          storageKey="overspeeding"
          isEnabled={notifSettingData?.overspeed}
          value={notifSettingData?.overspeed_limit}
          dispatch={dispatch}
          gps_id={gps_id}
        />
      </View>
      <View style={styles.settingsRow}>
        <GpsSettingItem
          detailInput={false}
          title={t(Constants.IG_ON_OFF)}
          storageKey="ignition"
          isEnabled={notifSettingData?.ignition}
          dispatch={dispatch}
          gps_id={gps_id}
        />
        {/* <GpsSettingItem
          detailInput={false}
          title={t(Constants.GPS_REMOVE)}
          storageKey="gpsremove"
          isEnabled={notifSettingData?.ignition}
        /> */}
      </View>
      <View style={styles.settingsRow}>
        <GpsSettingItem
          detailInput={false}
          title={t(Constants.GEOF)}
          storageKey="geofence"
          isEnabled={notifSettingData?.geofencing}
          dispatch={dispatch}
          gps_id={gps_id}
        />
        <GpsSettingItem
          detailInput={false}
          title={t(Constants.DEV_MOV)}
          storageKey="deviceMoving"
          isEnabled={notifSettingData?.device_moving}
          dispatch={dispatch}
          gps_id={gps_id}
        />
      </View>
    </ScrollView>
  ),
);

const GpsAlert = ({route}) => {
  useTrackScreenTime('GpsAlert');
  const dispatch = useDispatch();
  const {eventData} = route.params;
  const {t} = useTranslation();
  const {notifSettingData, notifSettingLoading} = useSelector(state => {
    console.log('id---------->', eventData[0]?.deviceId);
    console.log(
      'Gps Notification Setting Data in GpsAlert -------------->',
      state.data.notifSettingData,
    );
    return state.data;
  });

  useEffect(() => {
    const id = eventData[0]?.deviceId;
    dispatch(actions.getInitNotifSetting(id));
  }, []);

  // useEffect(() => {
  //   const id = eventData[0]?.deviceId;
  //   dispatch(actions.getInitNotifSetting(id));
  // }, [dispatch, notifSettingData]);

  // Memoized renderItem function for FlatList
  const renderItem = useCallback(
    ({item}) => <NotificationItem item={item} call={false} />,
    [],
  );

  // Reverse the eventData array to show from last to first
  const reversedData = [...eventData].reverse();

  return (
    <View style={styles.container}>
      {/* Conditionally render SettingsSection or loading indicator */}
      {notifSettingLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={backgroundColorNew} />
          <Text style={styles.loadingText}>Loading Settings...</Text>
        </View>
      ) : (
        <SettingsSection
          t={t}
          notifSettingData={notifSettingData?.data}
          dispatch={dispatch}
          gps_id={eventData[0]?.deviceId}
        />
      )}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationHeader}>{t(Constants.GPS_NOTIFI)}</Text>
        {notifSettingLoading ? (
          <View>
            <GPSNotificationShimmer />
          </View>
        ) : (
          <FlatList
            data={reversedData} // Reversed data for displaying last to first
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()} // Use item.id for a unique key
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !eventData?.length && (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No Alerts</Text>
                </View>
              )
            }
          />
        )}
      </View>
    </View>
  );
};

export default GpsAlert;
