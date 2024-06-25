import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CheckOutline from '../../../assets/SVG/svg/CheckOutline';
import {titleColor} from '../../Color/color';
import PercentageIcon from '../../../assets/SVG/svg/PercentageIcon';

const Plan = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 8,
      }}>
      <CheckOutline size={15} color={'green'} style={{marginHorizontal: 10}} />
      <Text style={{fontFamily: 'PlusJakartaSans-Medium', fontSize: 14}}>
        1 Year warranty on hardware.
      </Text>
    </View>
  );
};

const Rates = ({navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('paymentGPS')}
      style={{
        margin: 10,
        // borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        elevation: 2,
        // paddingHorizontal: 20,
        paddingVertical: 15,
        padding: 5,
      }}>
      <View
        style={{
          // flex: 1,
          // borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}>
        <View style={{borderWidth: 0, padding: 8}}>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 14,
              color: titleColor,
            }}>
            1 Year Plan
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <PercentageIcon size={15} color={'#0F8B00'} />
            <Text
              style={{
                // flex: 1,
                fontFamily: 'PlusJakartaSans-Light',
                fontSize: 12,
                color: '#0F8B00',
                marginLeft: 5,
              }}>
              20% discount on current plan
            </Text>
          </View>
        </View>
        <View
          style={{
            // flex: 1,
            paddingVertical: 10,
            backgroundColor: '#EFFFE6',
            borderRadius: 6,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              // flex: 1,
              fontFamily: 'PlusJakartaSans-SemiBold',
              fontSize: 12,
              textDecorationLine: 'line-through',
            }}>
            ₹ 2,500/year
          </Text>
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 14,
              color: '#0F8B00',
            }}>
            ₹ 2,000/ year
          </Text>
        </View>
      </View>
      <View>
        <Plan />
        <Plan />
        <Plan />
        <Plan />
        <Plan />
      </View>
    </TouchableOpacity>
  );
};

const BuyGps = ({navigation}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Rates navigation={navigation} />
      <Rates navigation={navigation} />
    </ScrollView>
  );
};

export default BuyGps;

const styles = StyleSheet.create({});
