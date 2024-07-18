import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EditIcon from '../../../assets/SVG/svg/EditIcon';
import {
  GradientColor2,
  GradientColor4,
  PrivacyPolicy,
  backgroundColorNew,
  textColor,
  titleColor,
} from '../../Color/color';
import PercentageIcon from '../../../assets/SVG/svg/PercentageIcon';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Components/Button';
import PurchaseGpsHeader from '../../Components/PurchaseGpsHeader';
import {useSelector} from 'react-redux';

const ReusableItem = ({title, value}) => {
  return (
    <View
      style={{
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 15,
      }}>
      <Text>{title}</Text>
      <Text>{value}</Text>
    </View>
  );
};

const PaymentGPS = ({navigation, route}) => {
  const {plan_id, gpsCount} = route.params;
  // console.log(3333, route);
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const {gpsPlansData} = useSelector(state => state.data);
  const filteredPlanData = gpsPlansData.find(plan => plan.id === plan_id);
  // console.log(55555, filteredPlanData);

  return (
    <View style={styles.container}>
      <PurchaseGpsHeader
        icon={true}
        edit={false}
        planName={filteredPlanData?.plan_name}
        planValidity={filteredPlanData?.validity}
        footertitle={`YAY! You saved ₹ ${
          filteredPlanData.discount * gpsCount
        } on this purchase`}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {/* <View style={styles.scrollContainer}>
          <View
            style={{
              //   borderWidth: 1,
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 8,
              zIndex: 10,
              elevation: 2,
            }}>
            <View>
              <View
                style={{
                  paddingBottom: 10,
                  padding: 10,
                }}>
                <Text
                  style={{
                    color: titleColor,
                    fontFamily: 'PlusJakartaSans-Bold',
                    fontSize: 14,
                  }}>
                  Discount & coupons
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#EF4D23',
                      fontFamily: 'PlusJakartaSans-SemiBold',
                      fontSize: 12,
                      textAlign: 'right',
                    }}>
                    Have coupon?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View> */}
        <View style={styles.scrollContainer}>
          <View
            style={{borderRadius: 8, backgroundColor: '#FFFFFF', elevation: 2}}>
            <Text style={styles.paymentDetailText}>Payment Details</Text>
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderColor: '#00000029',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text>Total Amount</Text>
                <Text>(Inc. of taxes)</Text>
              </View>
              <Text>₹ 99</Text>
            </View>
            <ReusableItem title={'Plan Amount'} value={'₹ 99'} />
            <ReusableItem title={'Coupon discount'} value={'₹ 0'} />
            <ReusableItem title={'Loading Walla Coins used'} value={'₹ 99'} />
            <ReusableItem
              title={'Available Loading Walla coins'}
              value={'₹ 1,899'}
            />
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <View
            style={{borderRadius: 8, backgroundColor: '#FFFFFF', elevation: 2}}>
            <Text style={styles.paymentDetailText}>Payment Details</Text>
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                paddingBottom: 15,
                borderBottomWidth: 1,
                borderColor: '#00000029',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text>Total Amount</Text>
                <Text>(Inc. of taxes)</Text>
              </View>
              <Text>₹ 99</Text>
            </View>
            <ReusableItem title={'Plan Amount'} value={'₹ 99'} />
            <ReusableItem title={'Coupon discount'} value={'₹ 0'} />
            <ReusableItem title={'Loading Walla Coins used'} value={'₹ 99'} />
            <ReusableItem
              title={'Available Loading Walla coins'}
              value={'₹ 1,899'}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          //   borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          margin: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          elevation: 2,
        }}>
        <View style={{paddingLeft: 10}}>
          <Text style={{fontFamily: 'PlusJakartaSans-SemiBold', fontSize: 12}}>
            Amount to be paid
          </Text>
          <Text style={{fontFamily: 'PlusJakartaSans-Bold', fontSize: 18}}>
            ₹ 99
          </Text>
        </View>
        <Button
          title={'Pay Now'}
          // onPress={() => navigation.navigate('')}
          // loading={statusChangeLoading}
          textStyle={styles.btnText}
          style={styles.btnStyle}
        />
      </View>
    </View>
  );
};

export default PaymentGPS;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    flex: 1,
    // borderWidth: 1,
  },
  scrollContainer: {paddingHorizontal: 10, marginBottom: 10},
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  paymentDetailText: {
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    // borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFF3F0',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});
