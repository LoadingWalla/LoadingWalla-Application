import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PurchaseGpsHeader from '../../Components/PurchaseGpsHeader';
import TextInputField from '../../Components/TextInputField';
import {textColor, titleColor} from '../../Color/color';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  placeGpsOrderFailure,
  placeGpsOrderRequest,
} from '../../Store/Actions/Actions';

const DeliveryDetails = ({navigation, route}) => {
  const {gpsCount, pricePerDevice, plan_id} = route.params;
  // console.log(4444, route);

  // State variables to store input values
  const [fullName, setFullName] = useState('');
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState('');
  const [rcNumbers, setRcNumbers] = useState(Array(gpsCount).fill(''));
  // const [deliveryAddress, setDeliveryAddress] = useState('');
  const [address, setAddress] = useState({
    deliveryAddress: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const dispatch = useDispatch();

  const {gpsOrderStatus, gpsPlansData, gpsOrderData} = useSelector(
    state => state.data,
  );
  const filteredPlanData = gpsPlansData?.find(plan => plan.id === plan_id);
  // console.log(55555, filteredPlanData);

  // Handler for RC Number input changes
  const handleRcNumberChange = (text, index) => {
    const newRcNumbers = [...rcNumbers];
    newRcNumbers[index] = text;
    setRcNumbers(newRcNumbers);
  };

  const handleAddressChange = (key, value) => {
    setAddress(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleContinue = () => {
    // navigation.navigate('paymentGPS', {plan_id, gpsCount});
    // console.log(
    //   fullName,
    //   alternativePhoneNumber,
    //   plan_id,
    //   gpsCount,
    //   rcNumbers,
    //   // deliveryAddress,
    //   address.city,
    //   address.deliveryAddress,
    //   address.landmark,
    //   address.pinCode,
    //   address.state,
    // );
    if (
      !fullName ||
      !alternativePhoneNumber ||
      Object.values(address).some(field => !field) ||
      rcNumbers.includes('')
    ) {
      Toast.show('Please fill all the fields before continuing.', Toast.LONG);
      return;
    }
    dispatch(
      placeGpsOrderRequest(
        fullName,
        alternativePhoneNumber,
        plan_id,
        gpsCount,
        rcNumbers,
        // deliveryAddress,
        address.deliveryAddress,
        address.city,
        address.state,
        address.landmark,
        address.pinCode,
      ),
    );
  };

  useEffect(() => {
    if (gpsOrderStatus !== null) {
      if (gpsOrderStatus === 200) {
        navigation.navigate('paymentGPS', {
          plan_id,
          gpsCount,
          gpsOrderId: gpsOrderData.id,
          totalAmount: gpsCount * pricePerDevice,
        });
        dispatch(placeGpsOrderFailure());
      }
    }
    return () => {
      // setFullName('');
      // setAlternativePhoneNumber('');
      // setRcNumbers(Array(gpsCount).fill(''));
      // setDeliveryAddress('');
      // setAddress({
      //   deliveryAddress: '',
      //   landmark: '',
      //   city: '',
      //   state: '',
      //   pinCode: '',
      // });
    };
  }, [gpsOrderStatus]);

  return (
    <View style={{flex: 1}}>
      <PurchaseGpsHeader
        footertitle={`Total amount to be paid: ₹ ${gpsCount * pricePerDevice}`}
        icon={false}
        edit={true}
        planName={filteredPlanData?.plan_name}
        planValidity={filteredPlanData?.validity}
        onPress={() => navigation.navigate('BuyGPS')}
      />
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.label}>Enter Full Name*</Text>
          <TextInputField
            value={fullName}
            hint={'Enter Full Name'}
            onChangeText={setFullName}
          />
        </View>
        <View>
          <Text style={styles.label}>Phone Number*</Text>
          <TextInputField
            value={alternativePhoneNumber}
            hint={'Enter Alternative Phone Number'}
            onChangeText={setAlternativePhoneNumber}
            isPhone={true}
          />
        </View>

        <Text style={styles.label}>Enter RC Numbers*</Text>
        {Array.from({length: gpsCount}).map((_, index) => (
          <TextInputField
            key={index}
            value={rcNumbers[index]}
            hint={`Enter RC number for GPS ${index + 1}`}
            onChangeText={text => handleRcNumberChange(text, index)}
          />
        ))}
        <View>
          <Text style={styles.label}>Delivery address*</Text>
          <TextInputField
            // value={deliveryAddress}
            value={address.deliveryAddress}
            hint={'Enter Delivery Address'}
            // onChangeText={setDeliveryAddress}
            onChangeText={text => handleAddressChange('deliveryAddress', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Landmark*</Text>
          <TextInputField
            value={address.landmark}
            hint={'Enter Landmark'}
            onChangeText={text => handleAddressChange('landmark', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>City*</Text>
          <TextInputField
            value={address.city}
            hint={'Enter City'}
            onChangeText={text => handleAddressChange('city', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>State*</Text>
          <TextInputField
            value={address.state}
            hint={'Enter State'}
            onChangeText={text => handleAddressChange('state', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Pin Code*</Text>
          <TextInputField
            value={address.pinCode}
            hint={'Enter Pin Code'}
            isPhone={true}
            onChangeText={text => handleAddressChange('pinCode', text)}
          />
        </View>
        <Button
          title={'Continue'}
          onPress={handleContinue}
          textStyle={styles.btnText}
          style={styles.btnStyle}
        />
      </ScrollView>
    </View>
  );
};

export default DeliveryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 16,
  },
  listContainer: {
    flex: 1,
    borderWidth: 0,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  label: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  btnText: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
});
