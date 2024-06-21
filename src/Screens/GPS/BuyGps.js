import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CheckOutline from '../../../assets/SVG/svg/CheckOutline';

const Plan = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 5,
      }}>
      <CheckOutline size={20} color={'green'} style={{marginHorizontal: 10}} />
      <Text style={{fontFamily: 'PlusJakartaSans-SemiBold'}}>
        1 Year warranty on hardware.
      </Text>
    </View>
  );
};

const BuyGps = () => {
  return (
    <ScrollView>
      <View
        style={{
          margin: 10,
          //   borderWidth: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          elevation: 2,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <View
          style={{
            // borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}>
          <View style={{borderWidth: 0, padding: 10}}>
            <Text>1 Year Plan</Text>
            <Text>20% discount on current plan</Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              backgroundColor: '#EFFFE6',
              borderRadius: 8,
              paddingHorizontal: 15,
            }}>
            <Text>₹ 2,000/year</Text>
            <Text>₹ 2,000/ year</Text>
          </View>
        </View>
        <View>
          <Plan />
          <Plan />
          <Plan />
          <Plan />
          <Plan />
        </View>
      </View>
    </ScrollView>
  );
};

export default BuyGps;

const styles = StyleSheet.create({});
