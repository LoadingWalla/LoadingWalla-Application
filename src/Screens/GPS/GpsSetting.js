import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BatteryIcon from '../../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../../assets/SVG/svg/NetworkIcon';
import {textColor} from '../../Color/color';
import GpsSettingItem from '../../Components/GpsSettingItem';
import Button from '../../Components/Button';

const GpsSetting = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.textStyle}>DEL 0212 DP1</Text>
        <View style={styles.iconBox}>
          <BatteryIcon size={30} color={'green'} />
          <NetworkIcon size={30} color={'green'} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <GpsSettingItem detailInput={true} />
        <GpsSettingItem detailInput={true} />
        <GpsSettingItem detailInput={false} />
        <GpsSettingItem detailInput={false} />
        <GpsSettingItem detailInput={true} />
        <GpsSettingItem detailInput={true} />
        <GpsSettingItem detailInput={false} />
        <GpsSettingItem detailInput={false} />
      </ScrollView>
      <View>
        <Button
          title={'Save'}
          // onPress={() => saveChanges()}
          // loading={statusChangeLoading}
          textStyle={styles.btnText}
          style={styles.btnStyle}
        />
        <TouchableOpacity
          style={styles.gpsInfo}
          onPress={() => navigation.navigate('')}>
          <Text style={styles.gpsInfoText}>GPS Info!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GpsSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // borderWidth: 1,
  },
  headerBox: {
    // borderWidth: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 5,
  },
  iconBox: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  detailBox: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    elevation: 2,
    marginVertical: 5,
  },
  textHeader: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  gpsInfo: {alignItems: 'center', marginVertical: 5},
  gpsInfoText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
    color: 'blue',
  },
});
