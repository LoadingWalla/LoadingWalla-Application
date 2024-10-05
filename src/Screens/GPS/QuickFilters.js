import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
} from 'react-native';
import {backgroundColorNew, textColor, titleColor} from '../../Color/color';
import Button from '../../Components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import AlertBox from '../../Components/AlertBox';
import styles from './style'

const QuickFilters = ({navigation, route}) => {
  const {deviceId, name, navigationPath} = route.params;

  const filters = [
    'Yesterday',
    'Today',
    'This Week',
    'Previous Week',
    'This Month',
    'Previous Month',
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
      'This Week': {
        start: moment().utcOffset(330).startOf('week').toISOString(),
        end: moment().utcOffset(330).endOf('week').toISOString(),
      },
      'Previous Week': {
        start: moment()
          .utcOffset(330)
          .subtract(1, 'weeks')
          .startOf('week')
          .toISOString(),
        end: moment()
          .utcOffset(330)
          .subtract(1, 'weeks')
          .endOf('week')
          .toISOString(),
      },
      'This Month': {
        start: moment().utcOffset(330).startOf('month').toISOString(),
        end: moment().utcOffset(330).endOf('month').toISOString(),
      },
      'Previous Month': {
        start: moment()
          .utcOffset(330)
          .subtract(1, 'months')
          .startOf('month')
          .toISOString(),
        end: moment()
          .utcOffset(330)
          .subtract(1, 'months')
          .endOf('month')
          .toISOString(),
      },
    };

    return rangeMap[filter] || {start: '', end: ''};
  };

  const handleSave = () => {
    let from, to;

    if (activeFilter === 'Custom') {
      const startDateTime = `${dateRange.startDate}T${dateRange.startTime}`;
      const endDateTime = `${dateRange.endDate}T${dateRange.endTime}`;
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
      // Use moment to ensure date and time are in the correct UTC format
      const formattedDate = moment(selectedDate)
        .utcOffset(330)
        .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

      if (type.includes('Date')) {
        setDateRange(prev => ({
          ...prev,
          [type]: formattedDate.split('T')[0], // Store only the date part
        }));
        setShowDatePicker(prev => ({
          ...prev,
          [type.replace('Date', 'Time')]: true, // Show time picker after date selection
        }));
      } else {
        setDateRange(prev => ({
          ...prev,
          [type]: formattedDate.split('T')[1]?.split('Z')[0], // Store only the time part
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
            <Text style={styles.customFilterText}>Pickup Dates and Times</Text>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePicker(prev => ({...prev, startDate: true}))
                }>
                <TextInput
                  style={styles.input}
                  placeholder="--/--/--"
                  placeholderTextColor={backgroundColorNew}
                  value={dateRange.startDate}
                  editable={false}
                />
              </TouchableOpacity>
              <Text style={styles.separatorText}>--</Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePicker(prev => ({...prev, endDate: true}))
                }>
                <TextInput
                  style={styles.input}
                  placeholder="--/--/--"
                  placeholderTextColor={backgroundColorNew}
                  value={dateRange.endDate}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePicker(prev => ({...prev, startTime: true}))
                }>
                <TextInput
                  style={styles.input}
                  placeholder="--:--"
                  placeholderTextColor={backgroundColorNew}
                  value={dateRange.startTime}
                  editable={false}
                />
              </TouchableOpacity>
              <Text style={styles.separatorText}>--</Text>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePicker(prev => ({...prev, endTime: true}))
                }>
                <TextInput
                  style={styles.input}
                  placeholder="--:--"
                  placeholderTextColor={backgroundColorNew}
                  value={dateRange.endTime}
                  editable={false}
                />
              </TouchableOpacity>
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
      {showDatePicker.startTime && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(e, selectedDate) =>
            handleDateChange('startTime', e, selectedDate)
          }
        />
      )}
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
      {showDatePicker.endTime && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(e, selectedDate) =>
            handleDateChange('endTime', e, selectedDate)
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default QuickFilters;

// const styles = StyleSheet.create({
//   keyboardView: {
//     flex: 1,
//     backgroundColor: '#FDFDFD',
//   },
//   container: {
//     flex: 0.4,
//     flexDirection: 'row',
//     padding: 10,
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     margin: 5,
//     elevation: 3,
//   },
//   activeButton: {
//     backgroundColor: '#ff6347',
//   },
//   inactiveButton: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   buttonText: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   activeText: {
//     color: '#fff',
//   },
//   inactiveText: {
//     color: '#000',
//   },
//   customFilterContainer: {
//     flex: 0.7,
//     paddingHorizontal: 10,
//   },
//   customFilterText: {
//     fontSize: 16,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     padding: 10,
//   },
//   dateTimeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   separatorText: {
//     fontSize: 14,
//     color: backgroundColorNew,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   input: {
//     elevation: 3,
//     width: 150,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 30,
//     textAlign: 'center',
//     fontSize: 16,
//     paddingHorizontal: 20,
//     color: backgroundColorNew,
//   },
//   btnStyle: {
//     flexDirection: 'row',
//     borderRadius: 8,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: 5,
//   },
//   btnText: {
//     color: textColor,
//     fontSize: 16,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
// });
