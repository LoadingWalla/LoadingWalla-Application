import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  clearGpsTripsData,
  clearSummaryReportData,
  fetchAddressRequest,
  fetchGpsTripsRequest,
  fetchSummaryReportRequest,
  fetchTokenRequest,
} from '../../Store/Actions/Actions';
import moment from 'moment';
import DownloadIcon from '../../../assets/SVG/svg/DownloadIcon';
import CalendarIcon from '../../../assets/SVG/CalendarIcon';
import RightArrow from '../../../assets/SVG/svg/RightArrow';
import {backgroundColorNew, titleColor} from '../../Color/color';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import {convertToCSV} from '../../Utils/CSVutils';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const convertMillisToTime = millis => {
  const hours = Math.floor(millis / (1000 * 60 * 60));
  const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const TripItem = React.memo(({item, onShowAddress}) => {
  console.log(8888888888, item);
  return (
    <View style={styles.tripItemContainer}>
      <View style={styles.statusIndicatorContainer}>
        <View style={styles.greenIndicator} />
        <View style={styles.line} />
        <View style={styles.redIndicator} />
      </View>
      <View style={styles.tripDetailsContainer}>
        <TripDetail
          address={item?.startAddress}
          time={item?.startTime}
          lat={item?.startLat}
          lng={item?.startLon}
          itemId={item.startPositionId}
          onShowAddress={onShowAddress}
        />
        <TripStats
          distance={item?.distance}
          averageSpeed={item?.averageSpeed}
          duration={item?.duration}
        />
        <TripDetail
          address={item?.endAddress}
          time={item?.endTime}
          lat={item?.endLat}
          lng={item?.endLon}
          itemId={item.endPositionId}
          onShowAddress={onShowAddress}
        />
      </View>
    </View>
  );
});

const TripDetail = ({address, time, lat, lng, itemId, onShowAddress}) => {
  const {fullAddressData, fullAddressCustomId} = useSelector(
    state => state.data,
  );

  return (
    <View style={styles.detailContainer}>
      {address || (fullAddressCustomId === itemId && fullAddressData) ? (
        <Text style={styles.addressText}>{address || fullAddressData}</Text>
      ) : (
        <ShowFullAddress
          lat={lat}
          lng={lng}
          itemId={itemId}
          onShowAddress={onShowAddress}
        />
      )}
      <Text style={styles.timeText}>
        {moment(time).utcOffset('+05:30').format('DD/MM/YYYY hh:mm A')}
      </Text>
    </View>
  );
};

const ShowFullAddress = ({lat, lng, itemId, onShowAddress}) => {
  return (
    <TouchableOpacity
      style={styles.showAddressContainer}
      onPress={() => onShowAddress(itemId, lat, lng)}>
      <Text style={styles.showAddressText}>Show full address</Text>
      <RightArrow size={15} color={'#EF4D23'} />
    </TouchableOpacity>
  );
};

const TripStats = ({distance, averageSpeed, duration}) => (
  <View style={styles.tripStatsContainer}>
    <StatBox
      value={`${(distance / 1000).toFixed(2)} KM`}
      label="Total Distance"
    />
    <VerticalLine />
    <StatBox
      value={`${(averageSpeed * 1.852).toFixed(2)} km/h`}
      label="Avg. Speed"
    />
    {/* <VerticalLine />
    <StatBox
      value={`${(averageSpeed * 1.852).toFixed(2)} km/h`}
      label="Max Speed"
    /> */}
    <VerticalLine />
    <StatBox value={convertMillisToTime(duration)} label="Duration" />
  </View>
);

const StatBox = ({value, label}) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const StopBox = ({label, value}) => (
  <View style={styles.stopBox}>
    <Text style={styles.stopText}>{label}</Text>
    <Text style={styles.stopCount}>{value}</Text>
  </View>
);

const VerticalLine = () => <View style={styles.verticalLine} />;

const LocationHistory = ({navigation, route}) => {
  const {deviceId, name, from, to} = route?.params;
  // console.log(777777, route);
  const dispatch = useDispatch();
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    gpsTripsLoading,
    gpsTripsData,
    gpsTokenData,
    gpsSummaryData,
    gpsTripsError,
    gpsSummaryError,
  } = useSelector(state => state.data);

  const {wsConnected} = useSelector(state => state.wsData);

  const handleDownload = async () => {
    if (gpsTripsData && gpsTripsData.length > 0) {
      const csvData = convertToCSV(gpsTripsData);

      const path = `${RNFS.DocumentDirectoryPath}/gps_replay_data.csv`;

      // Write the file to the device
      await RNFS.writeFile(path, csvData, 'utf8')
        .then(() => {
          // Share the file
          Share.open({
            url: `file://${path}`,
            type: 'text/csv',
            filename: 'gps_replay_data',
            showAppsToView: true,
          })
            .then(res => console.log('File shared:', res))
            .catch(err => console.error('Error sharing file:', err));
        })
        .catch(err => {
          console.error('Error writing file:', err);
        });
    } else {
      // alert('No data available to download.');
    }
  };

  useEffect(() => {
    if (gpsTokenData) {
      setTimeout(() => setInitialLoading(false), 1000);
    }
  }, [gpsTokenData]);

  useEffect(() => {
    if (wsConnected) {
      dispatch(websocketDisconnect());
    }
  }, [wsConnected, dispatch]);

  useEffect(() => {
    if (!gpsTokenData) {
      dispatch(fetchTokenRequest());
    }
  }, [gpsTokenData, dispatch]);

  const handleShowAddress = (itemId, lat, lng) => {
    dispatch(fetchAddressRequest(lat, lng, itemId));
  };

  useFocusEffect(
    useCallback(() => {
      if (gpsTokenData) {
        dispatch(
          fetchSummaryReportRequest(
            gpsTokenData.email,
            gpsTokenData.password,
            deviceId,
            encodeURIComponent(from),
            encodeURIComponent(to),
            false,
          ),
        );
        dispatch(
          fetchGpsTripsRequest(
            gpsTokenData.email,
            gpsTokenData.password,
            deviceId,
            from,
            to,
          ),
        );
      }

      return () => {
        dispatch(clearGpsTripsData());
        dispatch(clearSummaryReportData());
      };
    }, [dispatch, deviceId, from, to, gpsTokenData]),
  );

  const handleRetry = () => {
    if (gpsTokenData) {
      dispatch(
        fetchSummaryReportRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          deviceId,
          from,
          to,
          false,
        ),
      );
      dispatch(
        fetchGpsTripsRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          deviceId,
          from,
          to,
        ),
      );
    }
  };

  const renderItem = useCallback(
    ({item}) => <TripItem item={item} onShowAddress={handleShowAddress} />,
    [],
  );

  const calculateAverageSpeed = () => {
    if (gpsTripsData && gpsTripsData.length > 0) {
      const totalSpeed = gpsTripsData.reduce(
        (acc, trip) => acc + (trip.averageSpeed || 0),
        0,
      );
      return (totalSpeed / gpsTripsData.length).toFixed(2);
    }
    return '0.00';
  };

  const shouldCalculateAverageSpeed =
    gpsSummaryData &&
    gpsSummaryData.length > 0 &&
    (gpsSummaryData[0]?.averageSpeed === 0 ||
      gpsSummaryData[0]?.averageSpeed === 'NaN');

  const averageSpeed = !shouldCalculateAverageSpeed
    ? (gpsSummaryData[0]?.averageSpeed * 1.852).toFixed(2)
    : calculateAverageSpeed();

  if (initialLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={backgroundColorNew} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.timeText}>Trip summary</Text>
          <Text style={styles.timeText}>
            Vehicle number: <Text style={styles.vehicleNumberText}>{name}</Text>
          </Text>
        </View>
        <View style={styles.summaryContainer}>
          <StopBox
            label="Total distance"
            value={
              gpsSummaryData && gpsSummaryData.length > 0
                ? `${(gpsSummaryData[0]?.distance / 1000).toFixed(2)} KM`
                : '0.00 KM'
            }
          />
          <StopBox label="Avg. Speed" value={`${averageSpeed} KM/H`} />
          <View style={styles.iconButtonsContainer}>
            <TouchableOpacity
              style={styles.downloadIconBox}
              onPress={handleDownload}>
              <DownloadIcon size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.calendarIconBox}
              onPress={() =>
                navigation.navigate('quickfilters', {
                  deviceId,
                  name,
                  navigationPath: 'LocationHistory',
                })
              }>
              <CalendarIcon size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          // borderWidth: 1,
          // backgroundColor: '#FFE9E3',
          borderRadius: 8,
          marginHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          elevation: 2,
          backgroundColor: '#FFFFFF',
        }}>
        <View style={{flex: 0.5, paddingVertical: 5}}>
          <Text style={{textAlign: 'center'}}>History</Text>
        </View>
        <View style={{flex: 0.5, paddingVertical: 5}}>
          <Text style={{textAlign: 'center'}}>Stops</Text>
        </View>
      </View>
      {gpsTripsError || gpsSummaryError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Failed to fetch data. Please try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : gpsTripsLoading ? (
        <ActivityIndicator
          size="large"
          color={backgroundColorNew}
          style={styles.loader}
        />
      ) : (
        <FlatList
          data={gpsTripsData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={styles.noDataView}>
              <Text style={styles.noDataText}>No Trips</Text>
            </View>
          }
          style={styles.tableContainer}
        />
      )}
    </View>
  );
};

export default LocationHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBox: {
    backgroundColor: '#FFE9E3',
    borderRadius: 8,
    margin: 10,
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timeText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: '#454545',
  },
  vehicleNumberText: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: titleColor,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    zIndex: 10,
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
  },
  stopCount: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginTop: -2,
  },
  iconButtonsContainer: {
    flexDirection: 'row',
  },
  downloadIconBox: {
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    marginRight: 10,
  },
  calendarIconBox: {
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    elevation: 2,
  },
  tripItemContainer: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  statusIndicatorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 17,
    marginTop: 10,
  },
  greenIndicator: {
    width: 10,
    height: 10,
    backgroundColor: '#3BA700',
  },
  redIndicator: {
    width: 10,
    height: 10,
    backgroundColor: '#FF0000',
    borderRadius: 5,
  },
  line: {
    flex: 1,
    width: 1.5,
    backgroundColor: '#AFAFAF',
    marginHorizontal: 5,
  },
  tripDetailsContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  detailContainer: {
    padding: 5,
  },
  addressText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: titleColor,
  },
  showAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  showAddressText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: '#EF4D23',
    textDecorationLine: 'underline',
  },
  tripStatsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: titleColor,
  },
  statLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 10,
    color: titleColor,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 1,
    marginHorizontal: 5,
    height: '100%',
  },
  tableContainer: {
    flex: 1,
    paddingVertical: 10,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: titleColor,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: backgroundColorNew,
  },
  retryButtonText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
