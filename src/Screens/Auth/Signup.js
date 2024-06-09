import React, {useEffect, useState} from 'react';
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
import PhoneInput from 'react-native-phone-number-input';
import CheckBox from '@react-native-community/checkbox';
// import {Picker} from '@react-native-picker/picker';
import {
  GradientColor2,
  GradientColor4,
  PrivacyPolicy,
  pageBackground,
} from '../../Color/color';
import Toast from 'react-native-simple-toast';
import {Dimensions} from 'react-native';
import Button from '../../Components/Button';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';
import {useTranslation} from 'react-i18next';

// const languages = [
//   {
//     id: 1,
//     languageName: 'English',
//     language: 'English',
//     code: 'en',
//     langId: 1,
//   },
//   {
//     id: 2,
//     languageName: 'Hindi',
//     language: 'हिन्दी',
//     code: 'hi',
//     langId: 2,
//   },
//   {
//     id: 3,
//     languageName: 'Punjabi',
//     language: 'ਪੰਜਾਬੀ',
//     code: 'pn',
//     langId: 3,
//   },
//   {
//     id: 4,
//     languageName: 'Gujrati',
//     language: 'ગુજરાતી',
//     code: 'gj',
//     langId: 4,
//   },
// ];

const Signup = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const [mobileNumber, setMobileNumber] = useState('+91');
  const [isChecked, setIsChecked] = useState(true);
  const screenHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  // const [selectedLanguage, setSelectedLanguage] = useState('en');

  const {data, loading, dashboardStatus} = useSelector(state => {
    // console.log('signup screen', state.data);
    return state.data;
  });
  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  // const selectLanguage = code => {
  //   i18n.changeLanguage(code);
  // };

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

  return (
    <KeyboardAvoidingView
      style={styles.Container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.signupBackground}>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                minWidth: 140,
                overflow: 'hidden',
              }}></TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Contactus')}>
              <Text
                style={{
                  color: GradientColor2,
                  textAlign: 'center',
                  fontFamily: 'PlusJakartaSans-SemiBold',
                }}>
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
          <View style={{zIndex: 5}}>
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
          </View>

          {screenHeight >= 650 && (
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
          )}
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
            <View style={styles.policyContainer}>
              <Text style={styles.policyTitle}>
                {t(Constants.TERMS_CONDITION_TITLE1)}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Legal Policies', {
                    headerTitle: t(Constants.TERMS_CONDITION_TITLE2),
                    uri: uriTermsCondition3,
                  });
                }}>
                <Text style={[styles.policyLinkTitle(true)]}>
                  {t(Constants.TERMS_CONDITION_TITLE2)}{' '}
                </Text>
              </TouchableOpacity>
              <Text style={styles.policyTitle}>
                {' '}
                {` ${t(Constants.AND)} `}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Legal Policies', {
                    headerTitle: t(Constants.TERMS_CONDITION_TITLE3),
                    uri: uriTermsCondition2,
                  });
                }}>
                <Text style={[styles.policyLinkTitle(true)]}>
                  {' '}
                  {t(Constants.TERMS_CONDITION_TITLE3)}
                  {'  '}
                </Text>
              </TouchableOpacity>
              <Text style={styles.policyTitle}> {t(Constants.DOT)}</Text>
            </View>
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
