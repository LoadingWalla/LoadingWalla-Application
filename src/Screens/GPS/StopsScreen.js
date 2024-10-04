import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {backgroundColorNew, titleColor} from '../../Color/color';
import ShareIcon from '../../../assets/SVG/svg/ShareIcon';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGpsStopsRequest} from '../../Store/Actions/Actions';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import styles from './style'

const RenderItem = React.memo(({item, index}) => {
  // console.log(4444, item, index);
  const formattedDate = new Date(item.startTime).toLocaleDateString();
  const formattedEndTime = new Date(item.endTime).toLocaleTimeString();
  const distanceCovered = (item.endOdometer - item.startOdometer) / 1000;
  const averageSpeed = item.averageSpeed.toFixed(2);
  const maxSpeed = item.maxSpeed.toFixed(2);
  const durationInHours = (item.duration / (1000 * 60 * 60)).toFixed(2);

  return (
    <View style={styles.itemContainer} key={index}>
      <View style={styles.summaryBox}>
        <Text
          style={
            styles.headText
          }>{`${formattedDate} - ${formattedEndTime}`}</Text>
        <View style={styles.stopScreenVerticalLine} />
        <Text style={styles.headText}>{`${Math.ceil(
          distanceCovered,
        )} KM`}</Text>
        <View style={styles.stopScreenVerticalLine} />
        <Text style={styles.headText}>{`${averageSpeed} KMPH`}</Text>
      </View>
      <View style={styles.whiteBox}>
        <View style={{flex: 1}}>
          <View style={styles.stopScreenRow}>
            <View style={styles.stopScreenRow}>
              <Text style={styles.headingText}>Max Speed: </Text>
              <Text style={styles.headingText}>{`${maxSpeed} KMPH`}</Text>
            </View>
            <View style={styles.verticalLine2} />
            <View style={styles.stopScreenRow}>
              <Text style={styles.headingText}>Hold time: </Text>
              <Text style={styles.headingText}>{`${Math.ceil(
                durationInHours,
              )} Hrs`}</Text>
            </View>
          </View>
          <Text style={styles.headingValue}>{item?.address}</Text>
        </View>
      </View>
    </View>
  );
});

const StopsScreen = ({navigation, route}) => {
  // const {deviceId, from, to} = route.params;

  const {gpsStopsData, gpsTokenData} = useSelector(state => state.data);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={gpsStopsData}
      renderItem={({item, index}) => <RenderItem item={item} index={index} />}
      // keyExtractor={item => item.id}
      keyExtractor={item => `${item.startTime}-${item.endTime}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default StopsScreen;

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   itemContainer: {
//     marginBottom: 15,
//   },
//   summaryBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//     backgroundColor: backgroundColorNew,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   verticalLine: {
//     backgroundColor: '#FFFFFF',
//     width: 2,
//     marginHorizontal: 5,
//     height: '100%',
//   },
//   verticalLine2: {
//     backgroundColor: '#AFAFAF',
//     width: 2,
//     marginHorizontal: 5,
//     height: '100%',
//   },
//   headText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   headingText: {
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   headingValue: {
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Medium',
//     fontSize: 12,
//     marginTop: 5,
//   },
//   whiteBox: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     elevation: 3,
//     borderRadius: 5,
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });
