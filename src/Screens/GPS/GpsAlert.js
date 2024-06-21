import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PhoneCall from '../../../assets/SVG/svg/PhoneCall';
import {PrivacyPolicy, backgroundColorNew} from '../../Color/color';

const GpsAlertItems = ({call}) => {
  return (
    <View style={styles.headerbox}>
      <View style={styles.textView}>
        <View style={styles.speedBox}>
          <Text style={styles.headerText}>Truck over speeding: </Text>
          <Text style={styles.headerTextValue}>70KMPH</Text>
        </View>
        <View style={styles.timeDateBox}>
          <Text style={styles.mediumTextStyle}>June 10, 2024</Text>
          <View style={styles.verticalLine} />
          <Text style={styles.mediumTextStyle}>12:30 PM - 01:00 PM</Text>
        </View>
      </View>
      {call ? (
        <View style={styles.callBox}>
          <TouchableOpacity style={styles.iconBox}>
            <PhoneCall size={20} color={backgroundColorNew} />
          </TouchableOpacity>
          <Text style={styles.mediumTextStyle}>Call Owner</Text>
        </View>
      ) : null}
    </View>
  );
};

const GpsAlert = () => {
  return (
    <View style={styles.container}>
      <GpsAlertItems call={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <GpsAlertItems call={false} />
        <GpsAlertItems call={false} />
        <GpsAlertItems call={false} />
      </ScrollView>
    </View>
  );
};

export default GpsAlert;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
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
    // paddingVertical: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  headerTextValue: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: backgroundColorNew,
  },
  textView: {
    // borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  speedBox: {
    //   borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeDateBox: {
    //   borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  callBox: {
    // borderWidth: 1,
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
