import {ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import PurchaseGpsHeader from '../../Components/PurchaseGpsHeader';
import TextInputField from '../../Components/TextInputField';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  placeGpsOrderFailure,
  placeGpsOrderRequest,
} from '../../Store/Actions/Actions';
import {useTranslation} from 'react-i18next';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import AlertBox from '../../Components/AlertBox';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const DeliveryDetails = ({navigation, route}) => {
  useTrackScreenTime('DeliveryDetails');
  const {t} = useTranslation();
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

  const {gpsOrderStatus, gpsPlansData, gpsOrderData, gpsOrderErrorStatus} =
    useSelector(state => state.data);
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
    // if (
    //   !fullName ||
    //   !alternativePhoneNumber ||
    //   Object.values(address).some(field => !field) ||
    //   rcNumbers.includes('')
    // ) {
    //   Toast.show(
    //     t(Constants.PLEASE_FILL_ALL_FIELDS_BEFORE_CONTINUING),
    //     Toast.LONG,
    //   );
    //   return;
    // }

    const phoneRegex = /^[0-9]{10}$/;
    const pinCodeRegex = /^[0-9]{6}$/;

    if (!fullName.trim()) {
      Toast.show(t(Constants.PLS_FULL_NAME), Toast.LONG);
      return;
    }

    if (!alternativePhoneNumber || !phoneRegex.test(alternativePhoneNumber)) {
      Toast.show(t(Constants.PLS_PHONE_NO), Toast.LONG);
      return;
    }

    if (rcNumbers.some(rcNumber => rcNumber.trim() === '')) {
      Toast.show(t(Constants.PLS_RC_NO), Toast.LONG);
      return;
    }

    if (!address.deliveryAddress.trim()) {
      Toast.show(t(Constants.PLS_ADDR), Toast.LONG);
      return;
    }

    if (!address.landmark.trim()) {
      Toast.show(t(Constants.PLS_LAND), Toast.LONG);
      return;
    }

    if (!address.city.trim()) {
      Toast.show(t(Constants.PLS_CITY), Toast.LONG);
      return;
    }

    if (!address.state.trim()) {
      Toast.show(t(Constants.PLS_STATE), Toast.LONG);
      return;
    }

    if (!address.pinCode || !pinCodeRegex.test(address.pinCode)) {
      Toast.show(t(Constants.PLS_PINCODE), Toast.LONG);
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
      } else if (gpsOrderErrorStatus !== null) {
        AlertBox('Internal Server Error.');
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
    <View style={styles.container}>
      <PurchaseGpsHeader
        footertitle={`${t(Constants.TOTAL_AMOUNT_PAID)}: ₹ ${
          gpsCount * pricePerDevice
        }`}
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
          <Text style={styles.label}>{t(Constants.ENTER_FULL_NAME)}*</Text>
          <TextInputField
            value={fullName}
            hint={t(Constants.ENTER_FULL_NAME)}
            onChangeText={setFullName}
          />
        </View>
        <View>
          <Text style={styles.label}>
            {t(Constants.ENTER_ALT_PHONE_NUMBER)}*
          </Text>
          <TextInputField
            value={alternativePhoneNumber}
            hint={t(Constants.ENTER_ALT_PHONE_NUMBER)}
            onChangeText={setAlternativePhoneNumber}
            isPhone={true}
          />
        </View>

        <Text style={styles.label}>{t(Constants.ENTER_RC_NUMBER)}*</Text>
        {Array.from({length: gpsCount}).map((_, index) => (
          <TextInputField
            key={index}
            value={rcNumbers[index]}
            hint={`${t(Constants.RC_NUMBER_GPS)} ${index + 1}`}
            onChangeText={text => handleRcNumberChange(text, index)}
          />
        ))}
        <View>
          <Text style={styles.label}>{t(Constants.DELIVERY_ADDRESS)}*</Text>
          <TextInputField
            // value={deliveryAddress}
            value={address.deliveryAddress}
            hint={t(Constants.ENTER_DELIVERY_ADDRESS)}
            // onChangeText={setDeliveryAddress}
            onChangeText={text => handleAddressChange('deliveryAddress', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>{t(Constants.ENTER_YOUR_LANDMARK)}*</Text>
          <TextInputField
            value={address.landmark}
            hint={t(Constants.ENTER_YOUR_LANDMARK)}
            onChangeText={text => handleAddressChange('landmark', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>{t(Constants.ENTER_CITY_NAME)}*</Text>
          <TextInputField
            value={address.city}
            hint={t(Constants.CITY_NAME)}
            onChangeText={text => handleAddressChange('city', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>{t(Constants.STATE)}*</Text>
          <TextInputField
            value={address.state}
            hint={t(Constants.ENTER_STATE)}
            onChangeText={text => handleAddressChange('state', text)}
          />
        </View>
        <View>
          <Text style={styles.label}>{t(Constants.PIN_CODE)}*</Text>
          <TextInputField
            value={address.pinCode}
            hint={t(Constants.ENTER_PIN_CODE)}
            isPhone={true}
            onChangeText={text => handleAddressChange('pinCode', text)}
          />
        </View>
        <Button
          title={t(Constants.CONTINUE)}
          onPress={handleContinue}
          textStyle={styles.deliveryDetailsBtnText}
          style={styles.deliveryDetailsBtnStyle}
        />
      </ScrollView>
    </View>
  );
};

export default DeliveryDetails;