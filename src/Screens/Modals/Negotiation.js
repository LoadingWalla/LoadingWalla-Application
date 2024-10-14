import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Constants from '../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  RequestBookingFailure,
  initMyLorry,
  initRequestBooking,
} from '../../Store/Actions/Actions';
import CardHeader from '../../Components/CardHeader';
import InnerButton from '../../Components/InnerButton';
import {
  GradientColor2,
} from '../../Color/color';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import Button from '../../Components/Button';
import {useTranslation} from 'react-i18next';
import styles from './style'

const Negotiation = ({navigation, route}) => {
  // console.log('negotiation screen', route);
  const {item, owner, userType} = route?.params; // this should be on top
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [offered_price, setOffered_price] = useState(
    userType === '1' ? owner?.price : item?.price,
  );

  const {
    myLorryTruckData,
    myLoadTruckData,
    findLorryData,
    requestSendStatus,
    loading,
    requestLorrydata,
  } = useSelector(state => {
    console.log('confirmation987', state.data.requestSendStatus);
    return state.data;
  });

  useEffect(() => {
    dispatch(initMyLorry(1));
  }, [dispatch]);

  const saveChanges = () => {
    dispatch(
      initRequestBooking(
        userType === '2' ? item?.load_id : owner?.id,
        userType === '2' ? owner?.truck_id : item?.truck_id,
        offered_price,
        userType === '2' ? item?.price_type : owner?.price_type,
      ),
    );
  };

  useEffect(() => {
    if (requestSendStatus !== null) {
      navigation.navigate('Booking Status', {
        status: requestSendStatus,
        Owner: owner,
        userType: userType,
        messages: requestLorrydata?.message,
        renter: item,
      });
    }
    dispatch(RequestBookingFailure());
  }, [
    dispatch,
    item,
    navigation,
    owner,
    requestLorrydata?.message,
    requestSendStatus,
    userType,
  ]);

  return (
    <KeyboardAvoidingView
      style={styles.negoFullScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.screenModalView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Negotiation</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <CloseCircle size={30} color={GradientColor2} />
          </TouchableOpacity>
        </View>
        <View style={styles.negoCenteredView}>
          <View style={styles.container}>
            <View style={styles.locationCard}>
              <CardHeader
                from={item?.from}
                to={item?.to}
                icon={
                  item?.image || item.user_type === '1'
                    ? 'https://loadingwalla.com/public/loado.png'
                    : 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png'
                }
                t={t}
              />
              <View style={styles.horizontalLine} />
              <View style={styles.rowdirection}>
                <Text style={styles.textStyle}>
                  {userType === '1' ? item?.wheel : item?.loads}
                </Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>
                  {userType === '1'
                    ? item?.truck_capacity
                    : item?.material_name}
                </Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>
                  {userType === '1'
                    ? item?.truck_type
                    : `₹ ${item?.price} / ${
                        item?.price_type === '1'
                          ? Constants.FIXED
                          : Constants.PER_TON
                      }`}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.priceText}>{Constants.MY_NEGOTITATON}</Text>
              <View style={styles.priceInputContainer}>
                <View style={styles.priceInput}>
                  <Text style={styles.rupeeText}>{'Price (₹) |'}</Text>
                  <TextInput
                    defaultValue={offered_price}
                    placeholder={item?.price}
                    onChangeText={text => setOffered_price(text)}
                    style={styles.inputStyle}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.priceType}>
                  <Text style={styles.rupeeText}>
                    {item?.price_type === '1'
                      ? Constants.FIXED
                      : Constants.PER_TON}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.btnBoxStyle}>
              <InnerButton
                enabledStyle={styles.requestButtonContainer}
                textStyle={styles.gradientButtonText}
                title={'Cancel'}
                navigation={() => navigation.goBack()}
              />
              <Button //searchLoad()
                onPress={() => saveChanges()}
                title={'Send'}
                loading={loading}
                textStyle={styles.btnTextStyle}
                style={styles.buttonStyle}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Negotiation;

