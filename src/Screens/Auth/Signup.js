import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {initLogin, loginFailure} from '../../Store/Actions/Actions';
import {useTranslation} from 'react-i18next';
import PhoneInput from 'react-native-phone-number-input';
import CheckBox from '@react-native-community/checkbox';
import {
  GradientColor2,
  GradientColor4,
  PrivacyPolicy,
  pageBackground,
} from '../../Color/color';
import Toast from 'react-native-simple-toast';
import {Dimensions} from 'react-native';
import {NetworkContext} from '../../Context/NetworkContext';
import Button from '../../Components/Button';
import NoInternetScreen from '../Details/NoInternetScreen';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';

const Signup = ({navigation, route}) => {
  const [mobileNumber, setMobileNumber] = useState('+91');
  const [isChecked, setIsChecked] = useState(true);
  const {t} = useTranslation();
  const screenHeight = Dimensions.get('window').height;
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const {data, loading, dashboardStatus} = useSelector(state => {
    console.log('signup screen', state.data);
    return state.data;
  });
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (data?.data?.status === 201) {
      Toast.show(`${data?.data?.message}`, Toast.LONG);
      // AlertBox(data?.data?.message);
      dispatch(loginFailure());
      return;
    }

    if (dashboardStatus === 200) {
      // AlertBox(data.message);
      Toast.show(`${data?.message}`, Toast.LONG);
      navigation.replace('VerifyOtp', {
        userId: data?.user_id,
        mobileNumber: mobileNumber,
      });
      dispatch(loginFailure());
      return;
    }
  }, [
    dashboardStatus,
    data?.data?.message,
    data?.data?.status,
    data?.message,
    data?.user_id,
    dispatch,
    mobileNumber,
    navigation,
  ]);

  const sendOtp = () => {
    if (mobileNumber === '') {
      Toast.show('Enter mobile number', Toast.LONG);
      return;
    }
    const regex = /^(?:\+91)?[6-9]\d{9}$/;
    if (!regex.test(mobileNumber)) {
      Toast.show('Enter a valid mobile number', Toast.LONG);
      return;
    }
    dispatch(initLogin(mobileNumber));
  };

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View style={styles.signupBackground}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <View></View>
            <TouchableOpacity onPress={() => navigation.navigate('Contactus')}>
              <Text style={{color: GradientColor2, fontWeight: '500'}}>
                {t(Constants.NEED_HELP)}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.WelcomeTruckTitle}>
              <Text style={styles.LoadingWalla}>
                {t(Constants.LOADING_WALLA)}
              </Text>{' '}
              {t(Constants.WELCOME_TO_TRUCK)}
            </Text>
          </View>
          <Text style={styles.signupTopTitle}>
            {t(Constants.ENTER_MOBILE_NUMBER_TITLE)}
          </Text>
          <Text style={styles.label}>{t(Constants.MOBILE_NUMBER)}</Text>
          <PhoneInput
            defaultCode="IN"
            layout="first"
            textInputProps={{
              maxLength: 10,
              placeholderTextColor: PrivacyPolicy,
            }}
            withShadow
            placeholder={t(Constants.ENTER_MOBILE_NUMBER)}
            // autoFocus={true}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.textInput}
            onChangeFormattedText={text => {
              setMobileNumber(text);
            }}
          />

          <View
            style={{
              justifyContent: 'center',
              height: 0.45 * screenHeight,
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://loadingwalla.com/public/LoadingWalla2-03.png',
              }}
            />
          </View>
        </View>

        <View style={{backgroundColor: pageBackground}}>
          <View style={styles.centerItem}>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                value={isChecked}
                onValueChange={handleCheckBoxChange}
                tintColors={{true: GradientColor2, false: GradientColor4}}
                style={styles.checkBoxStyle}
              />
              <Text style={{color: PrivacyPolicy}}>
                {t(Constants.WHATSAPP_ALERT_CHECK)}
              </Text>
            </View>
            <Text style={styles.policyTitle}>
              {t(Constants.TERMS_CONDITION_TITLE1)}{' '}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Legal Policies', {
                    headerTitle: 'Terms and Conditions',
                    uri: uriTermsCondition3,
                  });
                }}>
                <Text style={[styles.policyLinkTitle(true)]}>
                  {t(Constants.TERMS_CONDITION_TITLE2)}{' '}
                </Text>
              </TouchableOpacity>
              <Text> {' and '} </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Legal Policies', {
                    headerTitle: 'Terms and Conditions',
                    uri: uriTermsCondition2,
                  });
                }}>
                <Text style={[styles.policyLinkTitle(true)]}>
                  {t(Constants.TERMS_CONDITION_TITLE3)}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>

          <Button
            loading={loading}
            onPress={() => sendOtp()}
            title={t(Constants.SEND_OTP)}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
