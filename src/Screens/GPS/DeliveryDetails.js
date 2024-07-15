import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PurchaseGpsHeader from '../../Components/PurchaseGpsHeader';
import TextInputField from '../../Components/TextInputField';
import {textColor, titleColor} from '../../Color/color';
import Button from '../../Components/Button';

const DeliveryDetails = ({navigation, route}) => {
  const {gpsCount} = route.params;
  //   console.log(4444, route);

  // State variables to store input values
  const [fullName, setFullName] = useState('');
  const [alternativePhoneNumber, setAlternativePhoneNumber] = useState('');
  const [rcNumbers, setRcNumbers] = useState(Array(gpsCount).fill(''));
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Handler for RC Number input changes
  const handleRcNumberChange = (text, index) => {
    const newRcNumbers = [...rcNumbers];
    newRcNumbers[index] = text;
    setRcNumbers(newRcNumbers);
  };

  // Handler for Continue button press
  const handleContinue = () => {
    console.log({
      fullName,
      alternativePhoneNumber,
      rcNumbers,
      deliveryAddress,
    });

    // Navigate to paymentGPS
    navigation.navigate('paymentGPS');
  };

  return (
    <View style={{flex: 1}}>
      <PurchaseGpsHeader
        footertitle={`Total amount to be paid: ₹ ${gpsCount * 2000}*`}
        icon={false}
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
          <Text style={styles.label}>Alternative Phone Number*</Text>
          <TextInputField
            value={alternativePhoneNumber}
            hint={'Enter Alternative Phone Number'}
            onChangeText={setAlternativePhoneNumber}
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
            value={deliveryAddress}
            isMultiLine={true}
            hint={'Enter Delivery Address'}
            onChangeText={setDeliveryAddress}
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
