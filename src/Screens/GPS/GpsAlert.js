import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import PhoneCall from '../../../assets/SVG/svg/PhoneCall';
import GpsSettingItem from '../../Components/GpsSettingItem';
import {PrivacyPolicy, backgroundColorNew} from '../../Color/color';
import moment from 'moment';

// Memoized NotificationItem component
const NotificationItem = React.memo(({call, item}) => {
  const {type, attributes, eventTime} = item;
  const message = type === 'alarm' ? attributes?.alarm : type;
  const timeAgo = moment(eventTime).utcOffset('+05:30').fromNow();

  return (
    <View style={styles.headerBox}>
      {/* <View style={styles.textView}> */}
      <View style={styles.speedBox}>
        <Text style={styles.headerText}>{message}</Text>
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
const SettingsSection = React.memo(() => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={styles.settingsContainer}>
    <View style={styles.settingsRow}>
      <GpsSettingItem
        detailInput={false}
        title={'Ignition (ON /OFF)'}
        storageKey="ignition"
      />
      <GpsSettingItem
        detailInput={false}
        title={'Geofence'}
        storageKey="geofence"
      />
    </View>
    <View style={styles.settingsRow}>
      <GpsSettingItem
        detailInput={false}
        title={'Overspeeding Alerts'}
        storageKey="overspeeding"
      />
      <GpsSettingItem
        detailInput={false}
        title={'Device moving'}
        storageKey="deviceMoving"
      />
    </View>
  </ScrollView>
));

const GpsAlert = ({route}) => {
  const {eventData} = route.params;

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
      <SettingsSection />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationHeader}>GPS notification</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  notificationContainer: {
    flex: 4,
    backgroundColor: '#ffffff',
    padding: 20,
    elevation: 2,
  },
  notificationHeader: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
  },
  headerBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    // elevation: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#00000029',
  },
  mediumTextStyle: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  timeText: {
    fontSize: 8,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    // borderEndWidth: 1,
  },
  speedBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  callBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    marginVertical: 5,
  },
  settingsContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    elevation: 2,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
