import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {backgroundColorNew, titleColor} from '../../Color/color';
import CalendarIcon from '../../../assets/SVG/CalendarIcon';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  fetchGpsTripsRequest,
  fetchSummaryReportRequest,
  websocketDisconnect,
} from '../../Store/Actions/Actions';
import {formatDate} from '../../Utils/dateUtils';
import useAddress from '../../hooks/useAddress';
import moment from 'moment';
import {TabView, SceneMap} from 'react-native-tab-view';
import RenderTabBar from '../Requests/RenderTabBar';

const SummaryList = ({data, renderItem, loading}) =>
  loading ? (
    <ActivityIndicator
      size="large"
      color={backgroundColorNew}
      style={styles.loader}
    />
  ) : (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Start Date</Text>
          <Text style={styles.headerText}>Distance</Text>
          <Text style={styles.headerText}>Avg. Speed</Text>
          <Text style={styles.headerText}>Max. Speed</Text>
        </View>
      }
      style={styles.tableContainer}
    />
  );

const LocationHistory = ({navigation, route}) => {
  const {deviceId, name, from, to} = route.params;
  const dispatch = useDispatch();

  const {
    gpsSummaryLoading,
    gpsSummaryError,
    gpsSummaryData,
    gpsTokenData,
    wsPositions,
    gpsTripsLoading,
    gpsTripsError,
    gpsTripsData,
  } = useSelector(state => state.data);

  useFocusEffect(
    React.useCallback(() => {
      const defaultFrom = from || moment().utc().startOf('day').toISOString();
      const defaultTo = to || moment().utc().endOf('day').toISOString();

      // Disconnect WebSocket first
      dispatch(websocketDisconnect());

      // Fetch summary report
      dispatch(
        fetchSummaryReportRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
          true,
        ),
      );

      // Fetch GPS trips
      dispatch(
        fetchGpsTripsRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
          true,
        ),
      );

      // Optional cleanup function
      return () => {
        // Any cleanup actions
      };
    }, [gpsTokenData, deviceId, from, to, dispatch]),
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const defaultFrom = from || moment().utc().startOf('day').toISOString();
  //     const defaultTo = to || moment().utc().endOf('day').toISOString();
  //     dispatch(
  //       fetchSummaryReportRequest(
  //         gpsTokenData.email,
  //         gpsTokenData.password,
  //         deviceId,
  //         defaultFrom,
  //         defaultTo,
  //         true,
  //       ),
  //     );
  //     dispatch(
  //       fetchGpsTripsRequest(
  //         gpsTokenData.email,
  //         gpsTokenData.password,
  //         deviceId,
  //         defaultFrom,
  //         defaultTo,
  //         true,
  //       ),
  //     );
  //     return () => {
  //       // Any cleanup actions
  //     };
  //   }, [gpsTokenData, deviceId, from, to, dispatch]),
  // );

  // const {address, fetchAddress} = useAddress(wsPositions);

  const renderItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.rowText}>{formatDate(item?.startTime)}</Text>
      <Text style={styles.rowText}>{`${(item?.distance / 1000).toFixed(
        2,
      )} KM`}</Text>
      <Text style={styles.rowText}>{`${(item?.averageSpeed * 1.852).toFixed(
        2,
      )} km/h`}</Text>
      <Text style={styles.rowText}>{`${(item?.maxSpeed * 1.852).toFixed(
        2,
      )} km/h`}</Text>
    </View>
  );

  const FirstRoute = () => (
    <SummaryList
      data={gpsTripsData}
      renderItem={renderItem}
      loading={gpsTripsLoading}
    />
  );

  const SecondRoute = () => (
    <SummaryList
      data={gpsSummaryData}
      renderItem={renderItem}
      loading={gpsSummaryLoading}
    />
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Trips'},
    {key: 'second', title: 'Summary'},
  ]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerBox}>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Total distance</Text>
          <Text style={styles.stopCount}>
            {wsPositions[0]?.attributes?.totalDistance
              ? `${(wsPositions[0]?.attributes?.totalDistance / 1000).toFixed(
                  2,
                )} KM`
              : '0 KM'}
          </Text>
        </View>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Vechile Name/Number</Text>
          <Text style={styles.stopCount}>{name}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.calendarIconBox}
            onPress={() =>
              navigation.navigate('quickfilters', {
                deviceId,
                name,
                navigationPath: 'LocationHistory',
              })
            }>
            <CalendarIcon size={35} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View
        style={{
          paddingTop: 20,
          padding: 10,
          borderRadius: 3,
          backgroundColor: '#FFF1ED',
          marginTop: -20,
          margin: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={styles.stopText}>{name}</Text>
          <View style={styles.verticalLine2} />
          <TouchableOpacity onPress={fetchAddress}>
            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
              {address}
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          // third: ThirdRoute,
        })}
        onIndexChange={setIndex}
        renderTabBar={RenderTabBar}
        style={{marginTop: -10}}
      />
    </View>
  );
};

export default LocationHistory;

const styles = StyleSheet.create({
  headerBox: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    zIndex: 10,
    margin: 10,
  },
  stopBox: {
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stopText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
  stopCount: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    textAlign: 'left',
    marginTop: -5,
  },
  calendarIconBox: {
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    elevation: 2,
  },
  verticalLine2: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 10,
    height: '100%',
  },
  tableContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    // borderWidth: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    fontSize: 14,
    color: titleColor,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    minWidth: 90,
  },
  rowText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: titleColor,
    textAlign: 'center',
    minWidth: 90,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
