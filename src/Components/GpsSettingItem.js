import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Switch from 'toggle-switch-react-native';
import {GradientColor2, PrivacyPolicy, seperator} from '../Color/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import * as actions from '../Store/Actions/Actions';
import * as Constants from '../Constants/Constant';

const GpsSettingItem = ({
  detailInput,
  title,
  storageKey,
  isEnabled,
  value = 0,
  dispatch,
  gps_id,
}) => {
  console.log(
    '--------- data received in GpsSettingItem --------->',
    detailInput,
    title,
    storageKey,
    isEnabled,
    value,
    dispatch,
    gps_id,
  );
  const [switchOn, setSwitchOn] = useState(isEnabled === true ? true : false);
  console.log('------------inputValue---------------->', value);
  const [inputValue, setInputValue] = useState(`${value}`);
  console.log('------------inputValue---------------->', inputValue);

  useEffect(() => {
    if (isEnabled !== undefined) {
      setSwitchOn(isEnabled);
    }
  }, [isEnabled]);

  const toggleSwitch = async () => {
    const newSwitchState = !switchOn;
    setSwitchOn(newSwitchState);

    try {
      // Save the new switch state to AsyncStorage
      await AsyncStorage.setItem(storageKey, JSON.stringify(newSwitchState));

      // Retrieve the latest stored values for each setting
      const storedIgnition =
        (await AsyncStorage.getItem('ignition')) || 'false';
      const storedOverspeed =
        (await AsyncStorage.getItem('overspeeding')) || 'false';
      const storedGeofencing =
        (await AsyncStorage.getItem('geofence')) || 'false';
      const storedDeviceMoving =
        (await AsyncStorage.getItem('deviceMoving')) || 'false';

      // Ensure the correct action based on title
      let dispatchArgs = [
        gps_id,
        JSON.parse(storedIgnition),
        JSON.parse(storedOverspeed),
        0, // Assuming a default or static value
        JSON.parse(storedGeofencing),
        JSON.parse(storedDeviceMoving),
      ];

      if (title === Constants.IG_ON_OFF) {
        dispatchArgs[1] = newSwitchState;
      } else if (title === Constants.OVERSPEED_ALERT) {
        dispatchArgs[2] = newSwitchState;
        dispatchArgs[3] = inputValue;
      } else if (title === Constants.DEV_MOV) {
        dispatchArgs[5] = newSwitchState;
      } else if (title === Constants.GEOF) {
        dispatchArgs[4] = newSwitchState;
      }

      // Dispatch the updated notification settings
      dispatch(actions.initNotifSetting(...dispatchArgs));

      // Fetch updated settings after dispatch completes
      dispatch(actions.getInitNotifSetting(gps_id));
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
                <View>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.textInput}
                    value={inputValue}
                    onChangeText={setInputValue}
                    editable={!switchOn}
                  />
                </View>
                <View
                  style={{
                    height: 40,
                    width: 50,
                    elevation: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.textInputCaption}>
                    {title === Constants.VEH_STOP_ALRT ? 'mins' : 'kmph'}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
        <View>
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
    </View>
  );
};

export default GpsSettingItem;
