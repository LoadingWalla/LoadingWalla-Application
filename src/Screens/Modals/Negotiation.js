import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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
  GradientColor3,
  PrivacyPolicy,
  pageBackground,
  textColor,
  titleColor,
} from '../../Color/color';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import Button from '../../Components/Button';
import {useTranslation} from 'react-i18next';

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
      style={styles.fullScreenContainer}
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
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <View style={styles.locationCard}>
              <CardHeader
                from={item?.from}
                to={item?.to}
                icon={item?.image}
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

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  screenModalView: {
    marginTop: '30%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: 'center',
    marginTop: '15%',
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 15,
    height: '100%',
  },
  rowdirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  container: {
    // marginTop: 10,
    // borderWidth: 1,
  },
  locationCard: {
    borderWidth: 1,
    borderColor: '#DBD7D7',
    padding: 10,
    borderRadius: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: titleColor,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DBD7D7',
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: '70%',
  },
  rupeeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: titleColor,
    marginEnd: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  inputStyle: {
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
    color: '#000',
    width: '75%',
  },
  priceType: {
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  btnBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  requestButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor3,
  },
  gradientButtonText: {
    fontSize: 13,
    color: GradientColor3,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  buttonStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    paddingHorizontal: 30,
    paddingVertical: 9,
    backgroundColor: GradientColor3,
  },
  findButtonText: {
    fontSize: 13,
    color: 'white',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
    color: titleColor,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: titleColor,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  btnTextStyle: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
