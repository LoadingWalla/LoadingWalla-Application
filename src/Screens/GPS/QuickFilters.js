import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput, // Importing Platform to determine the OS
} from 'react-native';
import React, {useState} from 'react';
import {backgroundColorNew, textColor, titleColor} from '../../Color/color';
import Button from '../../Components/Button';

const QuickFilters = ({navigation}) => {
  const filters = ['Yesterday', 'Today', 'Tomorrow', '7 Days', '1 Month'];
  const [activeFilter, setActiveFilter] = useState('Today');

  const handlePress = filter => {
    setActiveFilter(filter);
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
            // borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            placeholder="--/--/--"
            placeholderTextColor={backgroundColorNew}
          />
          <Text
            style={{
              fontSize: 14,
              color: backgroundColorNew,
              fontFamily: 'PlusJakartaSans-Bold',
              //   padding: 10,
            }}>
            --
          </Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeText}
            // value={text}
            placeholder="--/--/--"
            placeholderTextColor={backgroundColorNew}
          />
        </View>
      </View>
      <Button
        title={'Buy GPS'}
        onPress={() => navigation.navigate('LocationHistory')}
        // loading={statusChangeLoading}
        textStyle={styles.btnText}
        style={styles.btnStyle}
      />
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
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    elevation: 3,
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // shadowColor: '#000',
    // shadowOffset: {height: 2, width: 0},
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
    // borderWidth: 1,
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
