import React, {useState} from 'react';
import {View, StyleSheet, Platform, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useEffect} from 'react';
import styles from './style';
import {PrivacyPolicy, inputColor} from '../Color/color';

const DateTimePickerButton = ({initialDate, onDateChange}) => {
  const [date, setDate] = useState(initialDate ? new Date(initialDate) : null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate));
    } else {
      setDate(null);
    }
  }, [initialDate]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    if (selectedDate) {
      onDateChange(currentDate);
    }
  };

  const getFormattedDate = date => {
    if (date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${day}/${month}/${year}`;
    }
    return 'DD/MM/YYYY';
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.inputField}>
        <Text style={styles.dateTimePickertextStyle}>{getFormattedDate(date)}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DateTimePickerButton;

// const styles = StyleSheet.create({
//   inputField: {
//     backgroundColor: inputColor,
//     marginTop: 12,
//     marginBottom: 20,
//     borderRadius: 8,
//     paddingLeft: 10,
//     paddingRight: 10,
//     flexDirection: 'row',
//     height: 50,
//     alignItems: 'center',
//   },
//   textStyle: {
//     fontFamily: 'PlusJakartaSans-Regular',
//     fontSize: 15,
//     color: PrivacyPolicy,
//   },
// });
