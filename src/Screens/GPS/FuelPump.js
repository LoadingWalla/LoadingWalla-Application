import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GoToIcon from '../../../assets/SVG/svg/GoToIcon';
import {PrivacyPolicy} from '../../Color/color';

const FuelPumpItem = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Hindustan petroleum fuel pump</Text>
        <Text style={styles.headerTextValue}>2 KM away</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={{transform: [{rotate: '-45deg'}]}}>
          <GoToIcon size={25} />
        </View>
      </View>
    </View>
  );
};

const FuelPump = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
      <FuelPumpItem />
    </ScrollView>
  );
};

export default FuelPump;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    // borderWidth: 1,
    padding: 3,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    transform: [{rotate: '45deg'}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    // paddingVertical: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  headerTextValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: PrivacyPolicy,
  },
});
