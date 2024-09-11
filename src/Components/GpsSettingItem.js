import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Switch from 'toggle-switch-react-native';
import {GradientColor2, PrivacyPolicy, seperator} from '../Color/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GpsSettingItem = ({detailInput, title, storageKey}) => {
  const [switchOn, setSwitchOn] = useState(false);

  // Load switch state from AsyncStorage
  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(storageKey);
        if (savedState !== null) {
          setSwitchOn(JSON.parse(savedState));
        }
      } catch (error) {
        console.error('Failed to load switch state', error);
      }
    };
    loadSwitchState();
  }, [storageKey]);

  // Toggle switch and save the state to AsyncStorage
  const toggleSwitch = async () => {
    const newSwitchState = !switchOn;
    setSwitchOn(newSwitchState);
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newSwitchState));
    } catch (error) {
      console.error('Failed to save switch state', error);
    }
  };
  return (
    <View style={styles.detailBox}>
      <View style={styles.switchBox}>
        <View style={{flexDirection: 'column', maxWidth: 100}}>
          <Text style={styles.textHeader}>{title}</Text>
          {detailInput ? (
            <View style={styles.inputBox}>
              <View style={styles.inputView}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.textInput}
                  value={'60'}
                />
                <Text style={styles.textInputCaption}>min</Text>
              </View>
            </View>
          ) : null}
        </View>
        <Switch
          isOn={switchOn}
          onColor={GradientColor2}
          offColor={seperator}
          size="small"
          onToggle={toggleSwitch}
          // disabled={true}
        />
      </View>
    </View>
  );
};

export default GpsSettingItem;

const styles = StyleSheet.create({
  detailBox: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    // elevation: 2,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#00000029',
    borderRadius: 8,
    width: '48%',
  },

  textHeader: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  switchBox: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  inputBox: {flexDirection: 'row', marginTop: 10, backgroundColor: '#f7f7f7'},
  inputView: {
    // borderWidth: 1,
    width: 100,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  textInput: {
    width: 50,
    // borderWidth: 1,
    textAlign: 'center',
    // backgroundColor: '#f7f7f7',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  textInputCaption: {
    textAlign: 'center',
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    backgroundColor: '#ffffff',
    // borderWidth: 1,
  },
});
