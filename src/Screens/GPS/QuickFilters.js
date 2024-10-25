import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
} from 'react-native';
import {
  backgroundColorNew,
  black,
  darkGrayBg,
  grayBg,
  pageBackground,
} from '../../Color/color';
import Button from '../../Components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AlertBox from '../../Components/AlertBox';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import Calender from '../../../assets/SVG/svg/Calender';
// import Search from '../../../assets/SVG/svg/search';

const QuickFilters = ({navigation, route}) => {
  useTrackScreenTime('QuickFilters');
  const {deviceId, name, navigationPath} = route.params;

  const filters = [
    'Yesterday',
    'Today',
    'Last 3 Days',
    'Last 7 Days',
    'Last 1 Month',
    'Custom',
  ];

  const [activeFilter, setActiveFilter] = useState('Today');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState({
    startDate: false,
    startTime: false,
    endDate: false,
    endTime: false,
  });
  const [dateRange, setDateRange] = useState({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  const handlePress = filter => {
    setActiveFilter(filter);
    if (filter !== 'Custom') {
      setDateRange({
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
      });
      // const {start, end} = getDateRange(filter);
      // console.log(`From: ${start}`);
      // console.log(`To: ${end}`);
    }
  };

  const getDateRange = filter => {
    const rangeMap = {
      Today: {
        start: moment().utcOffset(330).startOf('day').toISOString(),
        end: moment().utcOffset(330).endOf('day').toISOString(),
      },
      Yesterday: {
        start: moment()
          .utcOffset(330)
          .subtract(1, 'days')
          .startOf('day')
          .toISOString(),
        end: moment()
          .utcOffset(330)
          .subtract(1, 'days')
          .endOf('day')
          .toISOString(),
      },
      'Last 3 Days': {
        start: moment()
          .utcOffset(330)
          .subtract(3, 'days')
          .startOf('day')
          .toISOString(),
        end: moment().utcOffset(330).endOf('day').toISOString(),
      },
      'Last 7 Days': {
        start: moment()
          .utcOffset(330)
          .subtract(7, 'days')
          .startOf('day')
          .toISOString(),
        end: moment().utcOffset(330).endOf('day').toISOString(),
      },
      'Last 1 Month': {
        start: moment()
          .utcOffset(330)
          .subtract(1, 'months')
          .startOf('day')
          .toISOString(),
        end: moment().utcOffset(330).endOf('day').toISOString(),
      },
    };

    return rangeMap[filter] || {start: '', end: ''};
  };

  const handleSave = () => {
    let from, to;

    if (activeFilter === 'Custom') {
      // Hardcoding startTime to 12 AM and endTime to 12 PM
      const startDateTime = `${dateRange.startDate}T00:00:00`;
      const endDateTime = `${dateRange.endDate}T12:00:00`;
      from = moment(startDateTime)
        .utcOffset(330)
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      to = moment(endDateTime)
        .utcOffset(330)
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    } else {
      const {start, end} = getDateRange(activeFilter);
      from = start;
      to = end;
    }

    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
    navigation.navigate(navigationPath, {from, to, deviceId, name});
  };

  const handleDateChange = (type, event, selectedDate) => {
    setShowDatePicker(prev => ({...prev, [type]: false}));

    if (selectedDate && selectedDate <= new Date()) {
      const formattedDate = moment(selectedDate)
        .utcOffset(330)
        .format('DD-MM-YYYY'); // Only take the date, no time component

      if (type === 'startDate') {
        setDateRange(prev => ({
          ...prev,
          startDate: formattedDate, // Store only the date part
        }));
      } else if (type === 'endDate') {
        setDateRange(prev => ({
          ...prev,
          endDate: formattedDate, // Store only the date part
        }));
      }
    } else if (selectedDate > new Date()) {
      AlertBox('Invalid Date', 'You cannot select a future date.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View>
        <Text
          style={{
            padding: 8,
            fontFamily: 'PlusJakartaSans-SemiBold',
            fontSize: 12,
          }}>
          Show previous data by:
        </Text>
      </View>
      <View style={styles.quickFilterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              activeFilter === filter
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handlePress(filter)}>
            <Text
              style={[
                styles.buttonText,
                activeFilter === filter
                  ? styles.activeText
                  : styles.inactiveText,
              ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.customFilterContainer}>
        {activeFilter === 'Custom' && (
          <>
            <View
              style={{
                paddingVertical: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 6,
                alignItems: 'center',
                backgroundColor: grayBg,
                borderWidth: 1,
                borderRadius: 30,
                borderColor: darkGrayBg,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                  // borderWidth: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    // borderWidth:1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <View style={{paddingRight: 10}}>
                    <Calender />
                  </View>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={() =>
                        setShowDatePicker(prev => ({...prev, startDate: true}))
                      }>
                      <TextInput
                        style={{
                          fontSize: 14,
                          color: black,
                          fontStyle: 'normal',
                          fontWeight: '600',
                          fontFamily: 'PlusJakartaSans-SemiBold',
                        }}
                        placeholder="Start date"
                        placeholderTextColor={black}
                        value={dateRange.startDate}
                        editable={false}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingRight: 10}}>
                    <Calender />
                  </View>
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      onPress={() =>
                        setShowDatePicker(prev => ({...prev, endDate: true}))
                      }>
                      <TextInput
                        style={{
                          fontSize: 14,
                          color: black,
                          fontStyle: 'normal',
                          fontWeight: '600',
                          fontFamily: 'PlusJakartaSans-SemiBold',
                        }}
                        placeholder="End date"
                        placeholderTextColor={black}
                        value={dateRange.endDate}
                        editable={false}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
      <Button
        title={'Save'}
        onPress={handleSave}
        textStyle={styles.btnText}
        style={styles.quickFilterBtnStyle}
      />
      {showDatePicker.startDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, selectedDate) =>
            handleDateChange('startDate', e, selectedDate)
          }
          maximumDate={new Date()}
          minimumDate={new Date(2024, 7, 14)} // Minimum date set to 14/08/2024
        />
      )}
      {/* {showDatePicker.startTime && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(e, selectedDate) =>
            handleDateChange('startTime', e, selectedDate)
          }
        />
      )} */}
      {showDatePicker.endDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, selectedDate) =>
            handleDateChange('endDate', e, selectedDate)
          }
          maximumDate={new Date()}
          minimumDate={new Date(2024, 7, 14)}
        />
      )}
      {/* {showDatePicker.endTime && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(e, selectedDate) =>
            handleDateChange('endTime', e, selectedDate)
          }
        />
      )} */}
    </KeyboardAvoidingView>
  );
};

export default QuickFilters;
