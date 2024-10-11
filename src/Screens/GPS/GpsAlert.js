import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import PhoneCall from '../../../assets/SVG/svg/PhoneCall';
import GpsSettingItem from '../../Components/GpsSettingItem';
import {backgroundColorNew} from '../../Color/color';
import moment from 'moment';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import styles from './style';

// Memoized NotificationItem component
const NotificationItem = React.memo(({call, item}) => {
  const {type, attributes, eventTime} = item;
  const message = type === 'alarm' ? attributes?.alarm : type;
  const timeAgo = moment(eventTime).utcOffset('+05:30').fromNow();

  return (
    <View style={styles.headerBox}>
      {/* <View style={styles.textView}> */}
      <View style={styles.speedBox}>
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
const SettingsSection = React.memo(({t}) => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={styles.settingsContainer}>
    <View style={styles.settingsRow}>
      <GpsSettingItem
        detailInput={false}
        title={t(Constants.IG_ON_OFF)}
        storageKey="ignition"
      />
      <GpsSettingItem
        detailInput={false}
        title={t(Constants.GEOF)}
        storageKey="geofence"
      />
    </View>
    <View style={styles.settingsRow}>
      <GpsSettingItem
        detailInput={false}
        title={t(Constants.OVERSPEED_ALERT)}
        storageKey="overspeeding"
      />
      <GpsSettingItem
        detailInput={false}
        title={t(Constants.DEV_MOV)}
        storageKey="deviceMoving"
      />
    </View>
  </ScrollView>
));

const GpsAlert = ({route}) => {
  const {eventData} = route.params;
  const {t} = useTranslation();
  const {gpsNotificationLoading} = useSelector(state => state.data);

  // Memoized renderItem function for FlatList
  const renderItem = useCallback(
    ({item}) => <NotificationItem item={item} call={false} />,
    [],
  );

  // Reverse the eventData array to show from last to first
  const reversedData = [...eventData].reverse();

  return (
    <View style={styles.container}>
      <SettingsSection t={t} />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationHeader}>{t(Constants.GPS_NOTIFI)}</Text>
        {gpsNotificationLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={backgroundColorNew} />
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
