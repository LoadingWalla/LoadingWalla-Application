import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {backgroundColorNew, titleColor} from '../../Color/color';
import ShareIcon from '../../../assets/SVG/svg/ShareIcon';
import {useDispatch, useSelector} from 'react-redux';

const renderItem = ({item}) => {
  // console.log(444, item);
  const formattedDate = new Date(item.startTime).toLocaleDateString();
  const formattedEndTime = new Date(item.endTime).toLocaleTimeString();
  const distanceCovered = (item.endOdometer - item.startOdometer) / 1000;
  const averageSpeed = item.averageSpeed.toFixed(2);
  const maxSpeed = item.maxSpeed.toFixed(2);
  const durationInHours = (item.duration / (1000 * 60 * 60)).toFixed(2);

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
        <Text
          style={
            styles.headText
          }>{`${formattedDate} - ${formattedEndTime}`}</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headText}>{`${Math.ceil(
          distanceCovered,
        )} KM`}</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headText}>{`${averageSpeed} KMPH`}</Text>
      </View>
      <View style={styles.whiteBox}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.headingText}>Max Speed: </Text>
              <Text style={styles.headingText}>{`${maxSpeed} KMPH`}</Text>
            </View>
            <View style={styles.verticalLine2} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.headingText}>Hold time: </Text>
              <Text style={styles.headingText}>{`${Math.ceil(
                durationInHours,
              )} Hrs`}</Text>
            </View>
          </View>
          <Text style={styles.headingValue}>{item?.address}</Text>
        </View>
        {/* <View style={{justifyContent: 'flex-end', padding: 5}}>
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
        </View> */}
      </View>
      {/* <View
        style={{
          // borderWidth: 1,
          marginTop: 10,
          padding: 10,
          // backgroundColor: '#f7f7f7',
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
      </View> */}
    </View>
  );
};

const StopsScreen = () => {
  const dispatch = useDispatch();
  const {gpsStopsLoading, gpsStopsError, gpsStopsData} = useSelector(
    state => state.data,
  );

  return (
    <FlatList
      data={gpsStopsData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
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
  whiteBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
