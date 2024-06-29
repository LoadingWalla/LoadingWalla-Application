import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {titleColor} from '../../Color/color';
import CalendarIcon from '../../../assets/SVG/CalendarIcon';

const LocationHistory = ({navigation}) => {
  const data = [
    {
      id: 1,
      date: 'Aug 12, 2024',
      distance: '1,334 KM',
      fuel: '126 Lit',
      mileage: '3.2 KMPL',
    },
    {
      id: 2,
      date: 'Aug 12, 2024',
      distance: '1,334 KM',
      fuel: '126 Lit',
      mileage: '3.2 KMPL',
    },
    {
      id: 3,
      date: 'Aug 12, 2024',
      distance: '1,334 KM',
      fuel: '126 Lit',
      mileage: '3.2 KMPL',
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.rowText}>{item.date}</Text>
      <Text style={styles.rowText}>{item.distance}</Text>
      <Text style={styles.rowText}>{item.fuel}</Text>
      <Text style={styles.rowText}>{item.mileage}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerBox}>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Total distance</Text>
          <Text style={styles.stopCount}>1,300KM</Text>
        </View>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Total Fuel consumption</Text>
          <Text style={styles.stopCount}>433 Liters</Text>
        </View>
        <View style={{paddingBottom: 10}}>
          <TouchableOpacity
            style={styles.calendarIconBox}
            onPress={() => navigation.navigate('quickfilters')}>
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
          <Text style={styles.stopText}>DEL 0212 DP1</Text>
          <View style={styles.verticalLine2} />
          <Text style={styles.stopText}>
            Current Location: Jamshedpur, Jharkhand
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Date</Text>
            <Text style={styles.headerText}>Distance</Text>
            <Text style={styles.headerText}>Fuel</Text>
            <Text style={styles.headerText}>Mileage</Text>
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
