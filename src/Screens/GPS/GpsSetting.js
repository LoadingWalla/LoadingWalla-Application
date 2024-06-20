import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import BatteryIcon from '../../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../../assets/SVG/svg/NetworkIcon';
import {GradientColor2, seperator} from '../../Color/color';
import Switch from 'toggle-switch-react-native';

const GpsSetting = () => {
  const [switchOn, setSwitchOn] = useState(true);

  const toggleSwitch = () => {
    const newSwitchState = !switchOn;
    setSwitchOn(newSwitchState);
    Alert.alert(`WhatsApp Notification : ${newSwitchState ? 'Yes' : 'No'}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.textStyle}>DEL 0212 DP1</Text>
        <View style={styles.iconBox}>
          <BatteryIcon size={30} color={'green'} />
          <NetworkIcon size={30} color={'green'} />
        </View>
      </View>
      <View style={styles.detailBox}>
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.textHeader}>Vehicle stop alerts</Text>
          <Switch
            isOn={switchOn}
            onColor={GradientColor2}
            offColor={seperator}
            size="medium"
            onToggle={toggleSwitch}
          />
        </View>
        <View style={{borderWidth: 1, flexDirection: 'row'}}>
          <Text style={{flex: 1}}>
            You’ll get notified when vehicle stops for longer duration.
          </Text>
          <View
            style={{
            //   borderWidth: 1,
              width: 100,
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              elevation: 2,
            }}>
            <TextInput
              keyboardType="numeric"
              style={{alignItems: 'center', width: 50}}
              value={'60'}
            />
            <Text style={{textAlign: 'left'}}>min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GpsSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // borderWidth: 1,
  },
  headerBox: {
    // borderWidth: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 5,
  },
  iconBox: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  detailBox: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    elevation: 2,
    marginVertical: 5,
  },
  textHeader: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
