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

const PaymentGPS = () => {
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 10}}>
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#00000029',
                paddingBottom: 30,
                padding: 10,
              }}>
              <Text
                style={{
                  color: titleColor,
                  fontFamily: 'PlusJakartaSans-Bold',
                  fontSize: 16,
                }}>
                1 Year GPS plan
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 20,
                  // borderWidth: 1,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F7F7F7',
                }}>
                <EditIcon size={13} color={backgroundColorNew} />
                <Text
                  style={{
                    marginLeft: 10,
                    color: backgroundColorNew,
                    fontFamily: 'PlusJakartaSans-SemiBold',
                    fontSize: 14,
                  }}>
                  Edit
                </Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'PlusJakartaSans-SemiBold',
                fontSize: 14,
              }}>
              The plan will be valid till JUNE 20, 2025
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            //   borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            paddingTop: 20,
            paddingBottom: 10,
            marginTop: -10,
            backgroundColor: '#EFFFE6',
          }}>
          <PercentageIcon size={20} color={'#3BA700'} />
          <Text style={{marginLeft: 5, color: '#3BA700'}}>
            YAY! You saved ₹ 200 on this purchase
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={styles.scrollContainer}>
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
                  //   flexDirection: 'row',
                  //   justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: '#00000029',
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'PlusJakartaSans-SemiBold',
                  fontSize: 14,
                  color: PrivacyPolicy,
                }}>
                Use Loading Walla coins?
              </Text>
              <CheckBox
                value={isChecked}
                onValueChange={handleCheckBoxChange}
                tintColors={{true: GradientColor2, false: GradientColor4}}
                style={styles.checkBoxStyle}
              />
            </View>
            <Text
              style={{
                // borderWidth: 1,
                paddingHorizontal: 5,
                fontFamily: 'PlusJakartaSans-Bold',
                fontSize: 16,
                paddingBottom: 10,
              }}>
              ₹ 2,000 Available
            </Text>
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
          //   onPress={() => navigation.navigate('trackingtruck', {item: truck})}
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
