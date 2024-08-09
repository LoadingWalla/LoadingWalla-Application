import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Switch from 'toggle-switch-react-native';
import {GradientColor2, PrivacyPolicy, seperator} from '../Color/color';

const GpsSettingItem = ({detailInput, title}) => {
  const [switchOn, setSwitchOn] = useState(true);

  const toggleSwitch = () => {
    const newSwitchState = !switchOn;
    setSwitchOn(newSwitchState);
  };
  return (
    <View style={styles.detailBox}>
      <View style={styles.switchBox}>
        <Text style={styles.textHeader}>{title}</Text>
        <Switch
          isOn={switchOn}
          onColor={GradientColor2}
          offColor={seperator}
          size="medium"
          onToggle={toggleSwitch}
          // disabled={true}
        />
      </View>
      {detailInput ? (
        <View style={styles.inputBox}>
          <Text style={styles.detailText}>
            You’ll get notified when vehicle stops for longer duration.
          </Text>
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
  );
};

export default GpsSettingItem;

const styles = StyleSheet.create({
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
  switchBox: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputBox: {flexDirection: 'row', marginTop: 10},
  detailText: {flex: 1, fontSize: 12, color: PrivacyPolicy},
  inputView: {
    // borderWidth: 1,
    width: 100,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    elevation: 2,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  textInput: {
    width: 50,
    // borderWidth: 1,
    textAlign: 'center',
    backgroundColor: '#f7f7f7',
  },
  textInputCaption: {textAlign: 'center', marginLeft: 5},
});
