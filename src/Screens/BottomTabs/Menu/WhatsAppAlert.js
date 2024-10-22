import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import Switch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import * as Constants from '../../../Constants/Constant';
import {GradientColor2, seperator} from '../../../Color/color';
import {useTranslation} from 'react-i18next';
import AlertBox from '../../../Components/AlertBox';
import useTrackScreenTime from '../../../hooks/useTrackScreenTime';

const STORAGE_KEY = 'whatsAppAlert';

const WhatsAppAlert = () => {
  useTrackScreenTime('WhatsAppAlert');
  const {t} = useTranslation();
  const [switchOn, setSwitchOn] = useState(false);

  const fetchSwitchValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedValue !== null) {
        setSwitchOn(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error('Error fetching WhatsApp Alert value:', error);
    }
  };

  const saveSwitchValue = async newValue => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newValue));
      AlertBox(`WhatsApp Notification: ${newValue ? 'Yes' : 'No'}`);
    } catch (error) {
      console.error('Error saving WhatsApp Alert value:', error);
    }
  };

  const toggleSwitch = () => {
    const newSwitchState = !switchOn;
    setSwitchOn(newSwitchState);
    saveSwitchValue(newSwitchState);
  };

  useEffect(() => {
    fetchSwitchValue();
  }, []);

  return (
    <SafeAreaView style={styles.whatsappContainer}>
      <View style={[styles.backgroundView, {backgroundColor: 'white'}]}>
        <View style={styles.whatsappView}>
          <Text style={styles.whatsappText}>{t(Constants.WHATSAPP_ALERT)}</Text>
          <Switch
            isOn={switchOn}
            onColor={GradientColor2}
            offColor={seperator}
            size="medium"
            onToggle={toggleSwitch}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WhatsAppAlert;
