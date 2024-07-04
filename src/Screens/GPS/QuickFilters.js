import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {backgroundColorNew, textColor, titleColor} from '../../Color/color';
import Button from '../../Components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const QuickFilters = ({navigation, route}) => {
  const {deviceId, name} = route.params;
  // console.log(33333333333333, deviceId);
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
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');

  const handlePress = filter => {
    setActiveFilter(filter);
    if (filter !== 'Custom') {
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');

      let start, end;

      switch (filter) {
        case 'Today':
          start = moment().utc().startOf('day').toISOString();
          end = moment().utc().endOf('day').toISOString();
          break;
        case 'Yesterday':
          start = moment()
            .utc()
            .subtract(1, 'days')
            .startOf('day')
            .toISOString();
          end = moment().utc().subtract(1, 'days').endOf('day').toISOString();
          break;
        case 'This Week':
          start = moment().utc().startOf('week').toISOString();
          end = moment().utc().endOf('week').toISOString();
          break;
        case 'Previous Week':
          start = moment()
            .utc()
            .subtract(1, 'weeks')
            .startOf('week')
            .toISOString();
          end = moment().utc().subtract(1, 'weeks').endOf('week').toISOString();
          break;
        case 'This Month':
          start = moment().utc().startOf('month').toISOString();
          end = moment().utc().endOf('month').toISOString();
          break;
        case 'Previous Month':
          start = moment()
            .utc()
            .subtract(1, 'months')
            .startOf('month')
            .toISOString();
          end = moment()
            .utc()
            .subtract(1, 'months')
            .endOf('month')
            .toISOString();
          break;
        default:
          return;
      }

      // console.log(`From: ${start}`);
      // console.log(`To: ${end}`);
    }
  };

  const handleSave = () => {
    let from, to;

    if (activeFilter === 'Custom') {
      from = `${startDate}`;
      to = `${endDate}`;
    } else {
      switch (activeFilter) {
        case 'Today':
          from = moment().utc().startOf('day').toISOString();
          to = moment().utc().endOf('day').toISOString();
          break;
        case 'Yesterday':
          from = moment()
            .utc()
            .subtract(1, 'days')
            .startOf('day')
            .toISOString();
          to = moment().utc().subtract(1, 'days').endOf('day').toISOString();
          break;
        case 'This Week':
          from = moment().utc().startOf('week').toISOString();
          to = moment().utc().endOf('week').toISOString();
          break;
        case 'Previous Week':
          from = moment()
            .utc()
            .subtract(1, 'weeks')
            .startOf('week')
            .toISOString();
          to = moment().utc().subtract(1, 'weeks').endOf('week').toISOString();
          break;
        case 'This Month':
          from = moment().utc().startOf('month').toISOString();
          to = moment().utc().endOf('month').toISOString();
          break;
        case 'Previous Month':
          from = moment()
            .utc()
            .subtract(1, 'months')
            .startOf('month')
            .toISOString();
          to = moment()
            .utc()
            .subtract(1, 'months')
            .endOf('month')
            .toISOString();
          break;
        default:
          return;
      }
    }
    // console.log(`From: ${from}`);
    // console.log(`To: ${to}`);
    navigation.navigate('LocationHistory', {from, to, deviceId, name});
  };

  const formatDate = date => {
    return date.toISOString().split('.')[0] + 'Z';
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate && selectedDate <= new Date()) {
      setStartDate(formatDate(selectedDate));
      setShowStartTimePicker(true);
    } else {
      alert('You cannot select a future date.');
    }
  };

  const onStartTimeChange = (event, selectedDate) => {
    setShowStartTimePicker(false);
    if (selectedDate) {
      setStartTime(formatDate(selectedDate));
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate && selectedDate <= new Date()) {
      setEndDate(formatDate(selectedDate));
      setShowEndTimePicker(true);
    } else {
      alert('You cannot select a future date.');
    }
  };

  const onEndTimeChange = (event, selectedDate) => {
    setShowEndTimePicker(false);
    if (selectedDate) {
      setEndTime(formatDate(selectedDate));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#FDFDFD'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
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
      <View style={{flex: 0.75}}>
        {activeFilter === 'Custom' && (
          <>
            <Text
              style={{
                fontSize: 16,
                color: titleColor,
                fontFamily: 'PlusJakartaSans-SemiBold',
                padding: 10,
              }}>
              Pickup Dates and Times
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="--/--/--"
                  placeholderTextColor={backgroundColorNew}
                  value={startDate.split('T')[0]} // Display only date part
                  editable={false}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  color: backgroundColorNew,
                  fontFamily: 'PlusJakartaSans-Bold',
                }}>
                --
              </Text>
              <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="--/--/--"
                  placeholderTextColor={backgroundColorNew}
                  value={endDate.split('T')[0]} // Display only date part
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="--:--"
                  placeholderTextColor={backgroundColorNew}
                  value={startDate.split('T')[1]?.split('Z')[0]} // Display only time part
                  editable={false}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  color: backgroundColorNew,
                  fontFamily: 'PlusJakartaSans-Bold',
                }}>
                --
              </Text>
              <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                <TextInput
                  style={styles.input}
                  placeholder="--:--"
                  placeholderTextColor={backgroundColorNew}
                  value={endDate.split('T')[1]?.split('Z')[0]} // Display only time part
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
        style={styles.btnStyle}
      />
      {showStartDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onStartDateChange}
          maximumDate={new Date()}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onStartTimeChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onEndDateChange}
          maximumDate={new Date()}
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onEndTimeChange}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default QuickFilters;

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: '#ff6347',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#000',
  },
  input: {
    elevation: 3,
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
    color: backgroundColorNew,
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
