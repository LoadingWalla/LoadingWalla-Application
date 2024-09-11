import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {fetchGpsNotificationsRequest} from '../../Store/Actions/Actions';
import PhoneCall from '../../../assets/SVG/svg/PhoneCall';
import GpsSettingItem from '../../Components/GpsSettingItem';
import {PrivacyPolicy, backgroundColorNew} from '../../Color/color';

const NotificationItem = React.memo(({call, item}) => (
  <View style={styles.headerBox}>
    <View style={styles.textView}>
      <View style={styles.speedBox}>
        <Text style={styles.headerText}>{item?.type}</Text>
      </View>
    </View>
    {call && (
      <View style={styles.callBox}>
        <TouchableOpacity style={styles.iconBox}>
          <PhoneCall size={20} color={backgroundColorNew} />
        </TouchableOpacity>
        <Text style={styles.mediumTextStyle}>Call Owner</Text>
      </View>
    )}
  </View>
));

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

const GpsAlert = ({navigation, route}) => {
  const {deviceId} = route.params;
  console.log(77777777, route);

  const dispatch = useDispatch();

  const {gpsTokenData, gpsNotificationLoading, gpsNotificationData} =
    useSelector(state => state.data);

  useFocusEffect(
    React.useCallback(() => {
      if (gpsTokenData?.email && gpsTokenData?.password) {
        dispatch(
          fetchGpsNotificationsRequest(
            gpsTokenData?.email,
            gpsTokenData?.password,
          ),
        );
      }
    }, [dispatch, gpsTokenData?.email, gpsTokenData?.password]),
  );

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
            data={gpsNotificationData}
            renderItem={({item}) => <NotificationItem item={item} call />}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              gpsNotificationData?.length === 0 && (
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
    elevation: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  mediumTextStyle: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  speedBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    // borderWidth: 1,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
