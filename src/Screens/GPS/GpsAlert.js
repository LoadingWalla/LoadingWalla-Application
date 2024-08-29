import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PhoneCall from '../../../assets/SVG/svg/PhoneCall';
import {PrivacyPolicy, backgroundColorNew} from '../../Color/color';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {fetchGpsNotificationsRequest} from '../../Store/Actions/Actions';

const renderItem = ({call, item}) => (
  <View style={styles.headerbox}>
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
);

const GpsAlert = () => {
  const dispatch = useDispatch();
  const {
    gpsTokenData,
    gpsNotificationLoading,
    gpsNotificationError,
    gpsNotificationData,
  } = useSelector(state => state.data);

  useFocusEffect(
    React.useCallback(() => {
      if (gpsTokenData?.email && gpsTokenData?.password) {
        dispatch(
          fetchGpsNotificationsRequest(
            gpsTokenData.email,
            gpsTokenData.password,
          ),
        );
      }
    }, [dispatch, gpsTokenData?.email, gpsTokenData?.password]),
  );

  if (gpsNotificationLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={backgroundColorNew} />
      </View>
    );
  }

  if (
    !gpsNotificationLoading &&
    (!gpsNotificationData || gpsNotificationData.length === 0)
  ) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No Alerts</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={gpsNotificationData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default GpsAlert;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
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
  headerbox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 10,
    height: '80%',
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
  timeDateBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
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
});
