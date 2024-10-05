import React, {useState} from 'react';
import {View, SafeAreaView, Text, Alert} from 'react-native';
import Switch from 'toggle-switch-react-native';
import styles from './style';
import * as Constants from '../../../Constants/Constant';

import {
  GradientColor2,
  pageBackground,
  seperator,
  titleColor,
} from '../../../Color/color';
import {useTranslation} from 'react-i18next';

const WhatsAppAlert = ({navigation}) => {
  const {t} = useTranslation();
  const [switchOn, setSwitchOn] = useState(true);

  const toggleSwitch = () => {
    const newSwitchState = !switchOn;
    setSwitchOn(newSwitchState);
    Alert.alert(`WhatsApp Notification : ${newSwitchState ? 'Yes' : 'No'}`);
  };

  return (
    <SafeAreaView style={styles.whatsappContainer}>
      <View style={[styles.backgroundView, {backgroundColor: 'white'}]}>
        <View
          style={styles.whatsappView}>
          <Text
            style={styles.whatsappText}>
            {t(Constants.WHATSAPP_ALERT)}
          </Text>
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
