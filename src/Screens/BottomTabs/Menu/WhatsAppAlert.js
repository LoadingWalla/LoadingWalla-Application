import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import Switch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import * as Constants from '../../../Constants/Constant';
import {GradientColor2, seperator} from '../../../Color/color';
import {useTranslation} from 'react-i18next';
import AlertBox from '../../../Components/AlertBox';

const WhatsAppAlert = ({navigation}) => {
  const {t} = useTranslation();
  const [switchOn, setSwitchOn] = useState(false);

  // Function to check AsyncStorage and get the saved value
  const getSwitchValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('whatsAppAlert');
      if (storedValue !== null) {
        setSwitchOn(JSON.parse(storedValue));
      }
    } catch (error) {
      console.error('Failed to fetch WhatsApp Alert state from storage', error);
    }
  };

  useEffect(() => {
    getSwitchValue();
  }, []);

  const toggleSwitch = async () => {
    const newSwitchState = !switchOn;
    setSwitchOn(newSwitchState);

    try {
      await AsyncStorage.setItem(
        'whatsAppAlert',
        JSON.stringify(newSwitchState),
      );
      AlertBox(`WhatsApp Notification : ${newSwitchState ? 'Yes' : 'No'}`);
    } catch (error) {
      console.error('Failed to save WhatsApp Alert state in storage', error);
    }
  };

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
