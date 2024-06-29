import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {PrivacyPolicy, backgroundColorNew, titleColor} from '../../Color/color';
import ShareIcon from '../../../assets/SVG/svg/ShareIcon';

const StopItem = () => {
  return (
    <View style={{margin: 10}}>
      <View
        style={{
          //   borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
          backgroundColor: backgroundColorNew,
          borderRadius: 5,
          marginBottom: 10,
        }}>
        <Text style={styles.headText}>Day 01: June 10, 2024 </Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headText}>400KM Covered</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headText}>45KMPH</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          elevation: 3,
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.headingText}>Ignition Off:</Text>
              <Text style={styles.headingText}>12:33 PM </Text>
            </View>
            <View style={styles.verticalLine2} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.headingText}>Hold time: </Text>
              <Text style={styles.headingText}>2Hrs </Text>
            </View>
          </View>
          <Text style={styles.headingValue}>
            Road number - C/33, Gali number 03, New Ashok Nagar, demo address ,
            Delhi - 110030
          </Text>
        </View>
        <View style={{justifyContent: 'flex-end', padding: 5}}>
          <TouchableOpacity
            style={{
              //   borderWidth: 1,
              padding: 5,
              width: 30,
              height: 30,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 3,
              backgroundColor: '#F7F7F7',
            }}>
            <ShareIcon size={20} color={'#000000'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          // borderWidth: 1,
          marginTop: 10,
          padding: 10,
          backgroundColor: '#f7f7f7',
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderRadius: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headingText}>Ignition Off:</Text>
          <Text style={styles.headingText}>12:33 PM </Text>
        </View>
        <View style={styles.verticalLine2} />
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headingText}>Hold time: </Text>
          <Text style={styles.headingText}>2Hrs </Text>
        </View>
      </View>
    </View>
  );
};

const StopsScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StopItem />
      <StopItem />
      <StopItem />
      <StopItem />
      <StopItem />
      <StopItem />
    </ScrollView>
  );
};

export default StopsScreen;

const styles = StyleSheet.create({
  verticalLine: {
    backgroundColor: '#FFFFFF',
    width: 2,
    marginHorizontal: 5,
    height: '100%',
  },
  verticalLine2: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 5,
    height: '100%',
  },
  headText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  headingText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  headingValue: {
    // flex: 1,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    // fontSize: 14,
    marginTop: 5,
  },
});
