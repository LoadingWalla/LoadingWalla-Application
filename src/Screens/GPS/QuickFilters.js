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

const QuickFilters = ({navigation}) => {
  const filters = ['Yesterday', 'Today', 'Tomorrow', '7 Days', '1 Month'];
  const [activeFilter, setActiveFilter] = useState('Today');
  const [date, setDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handlePress = filter => {
    setActiveFilter(filter);
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate && selectedDate <= new Date()) {
      setStartDate(selectedDate.toISOString().split('T')[0]); // format to YYYY-MM-DD
    } else {
      alert('You cannot select a future date.');
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate && selectedDate <= new Date()) {
      setEndDate(selectedDate.toISOString().split('T')[0]); // format to YYYY-MM-DD
    } else {
      alert('You cannot select a future date.');
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
        <Text
          style={{
            fontSize: 16,
            color: titleColor,
            fontFamily: 'PlusJakartaSans-SemiBold',
            padding: 10,
          }}>
          Pickup Dates
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
              value={startDate}
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
              value={endDate}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        title={'Save'}
        onPress={() => {
          console.log('From:', startDate);
          console.log('To:', endDate);
          // navigation.navigate('LocationHistory', {startDate, endDate});
        }}
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
      {showEndDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onEndDateChange}
          maximumDate={new Date()}
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
