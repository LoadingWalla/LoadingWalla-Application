import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {titleColor} from '../../Color/color';
import CalendarIcon from '../../../assets/SVG/CalendarIcon';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {fetchSummaryReportRequest} from '../../Store/Actions/Actions';
import {formatDate} from '../../Utils/dateUtils';
import useAddress from '../../hooks/useAddress';

const LocationHistory = ({navigation, route}) => {
  const {deviceId, name} = route.params;
  const dispatch = useDispatch();
  console.log(999, route);

  const {
    gpsSummaryLoading,
    gpsSummaryError,
    gpsSummaryData,
    gpsTokenData,
    wsPositions,
  } = useSelector(state => {
    console.log('HistoryLocation', state.data);
    return state.data;
  });

  useEffect(() => {
    // console.log(
    //   4444444,
    //   gpsTokenData.email,
    //   gpsTokenData.password,
    //   deviceId,
    //   '2024-06-29T18%3A30%3A00.000Z',
    //   '2024-07-06T18%3A29%3A59.999Z',
    //   true,
    // );
    dispatch(
      fetchSummaryReportRequest(
        gpsTokenData.email,
        gpsTokenData.password,
        deviceId,
        '2024-07-02T18%3A30%3A00.000Z',
        '2024-07-03T18%3A29%3A59.999Z',
        true,
      ),
    );
  }, []);

  const {address, fetchAddress} = useAddress(wsPositions);

  const renderItem = ({item}) => {
    // console.log(3333333, item);
    return (
      <View style={styles.tableRow}>
        <Text style={styles.rowText}>{formatDate(item?.startTime)}</Text>
        <Text style={styles.rowText}>{`${Math.ceil(
          item?.distance / 1000,
        )} KM`}</Text>
        <Text style={styles.rowText}>{`${Math.ceil(
          item?.averageSpeed * 3.6,
        )} km/h`}</Text>
        <Text style={styles.rowText}>{`${Math.ceil(
          item?.maxSpeed * 3.6,
        )} km/h`}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerBox}>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Total distance</Text>
          <Text style={styles.stopCount}>
            {`${Math.ceil(
              wsPositions[0]?.attributes?.totalDistance / 1000,
            )} KM`}
          </Text>
        </View>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Total Fuel consumption</Text>
          <Text style={styles.stopCount}>433 Liters</Text>
        </View>
        <View style={{paddingBottom: 10}}>
          <TouchableOpacity
            style={styles.calendarIconBox}
            onPress={() => navigation.navigate('quickfilters')}>
            {/* onPress={() => navigation.navigate('quickfilters')}> */}
            <CalendarIcon size={40} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          // borderWidth: 1,
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
          {/* motion true toh running otherwise location */}
        </View>
      </View>
      <FlatList
        data={gpsSummaryData}
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
    </View>
  );
};

export default LocationHistory;

const styles = StyleSheet.create({
  headerBox: {
    // borderWidth: 1,
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
    // borderWidth: 1,
  },
  stopCount: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    textAlign: 'left',
    marginTop: -5,
    // borderWidth: 1,
  },
  calendarIconBox: {
    // borderWidth: 1,
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
    // padding: 10,
    // paddingRight: 0,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    // marginVertical: 10,
    // borderWidth: 1,
    paddingVertical: 10,
  },
  tableHeader: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    // paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerText: {
    fontSize: 14,
    color: titleColor,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-ExtraBold',
    // borderWidth: 1,
    minWidth: 90,
    // flex: 1,
  },
  rowText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: titleColor,
    textAlign: 'center',
    // borderWidth: 1,
    minWidth: 90,
    // flex: 1,
  },
});
