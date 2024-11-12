/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {initLogin, loginFailure} from '../../Store/Actions/Actions';
import CheckBox from '@react-native-community/checkbox';
import {PrivacyPolicy, backgroundColorNew, textRed} from '../../Color/color';
import Toast from 'react-native-simple-toast';
import Button from '../../Components/Button';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import {printAllAsyncStorageData} from '../../Utils/asyncStorageUtils';
import ArrowIcon from '../../../assets/SVG/svg/ArrowIcon';
import GradientStatusBar from '../../Components/GradientStatusBar';

const Signup = ({navigation}) => {
  useTrackScreenTime('Signup');
  const {t} = useTranslation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();
  const {data, loading, dashboardStatus} = useSelector(state => {
    console.log(11111, 'SignIn Screen here store is empty ---->', state);
    return state.data;
  });

  useEffect(() => {
    printAllAsyncStorageData();
  }, []);

  const handleCheckBoxChange = useCallback(async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (newCheckedState) {
      await AsyncStorage.setItem(
        'whatsAppAlert',
        JSON.stringify(newCheckedState),
      );
    }
  }, [isChecked]);

  useEffect(() => {
    if (data?.data?.status === 201) {
      Toast.show(data?.data?.message, Toast.LONG);
      dispatch(loginFailure());
      return;
    }

    if (dashboardStatus === 200) {
      Toast.show(data?.message, Toast.LONG);
      navigation.replace('VerifyOtp', {
        userId: data?.user_id,
        mobileNumber,
      });
      dispatch(loginFailure());
    }
  }, [dashboardStatus, data, dispatch, mobileNumber, navigation]);

  const sendOtp = () => {
    if (!mobileNumber) {
      Toast.show(t('Enter mobile number'), Toast.LONG);
      return;
    }
    const regex = /^(?:\+91)?[6-9]\d{9}$/;
    if (!regex.test(mobileNumber)) {
      setIsCorrect(false);
      // Toast.show(t('Enter a valid mobile number'), Toast.LONG);
      return;
    }
    if (!isChecked) {
      Toast.show(
        t('Please check the box to receive WhatsApp alerts! 📬'),
        Toast.LONG,
      );
      return;
    }
    console.log(mobileNumber);
    // dispatch(initLogin(mobileNumber));
  };

  useEffect(() => {
    const regex = /^(?:\+91)?[6-9]\d{9}$/;

    if (mobileNumber.length > 0 && !regex.test(mobileNumber)) {
      console.log('wrong number');
      setIsCorrect(false);
    } else {
      console.log('correct number');
      setIsCorrect(true);
    }
  }, [mobileNumber]);

  return (
    <View style={styles.Container}>
      <GradientStatusBar
        colors={[
          '#F7F7F7',
          '#F5F5F5',
          '#F4F4F4',
          '#F5F5F5',
          '#F3F3F3',
          '#F4F4F4',
          '#F5F5F5',
          '#F3F3F3',
          '#F4F4F4',
          '#F6F6F6',
          '#F7F7F7',
          '#FAFAFA',
          '#FBFBFB',
          '#FEFEFE',
        ]}
      />
      <View style={styles.flexs}>
        <View style={styles.loadingWallaImg}>
          <Image
            source={require('../../../assets/LoadingWallaBG.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={styles.phoneInputContainer}>
          <View style={styles.signupTextContainer}>
            <Text style={styles.signupWelcomeTitle}>
              {t(Constants.WELCOME_TXT)}
            </Text>
            <Text style={styles.signupTopTitle}>
              {t(Constants.ENTER_MOBILE_NUMBER_TITLE)}
            </Text>
          </View>
          <View
            style={{
              width: '95%',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}>
            <View style={styles.phoneNumberInput}>
              <View style={styles.mbContainer}>
                <Text style={styles.mbcountryCode}>+91</Text>
                <View style={styles.mbdivider} />

                <TextInput
                  style={styles.mbphoneInput}
                  autoFocus={true}
                  keyboardType="phone-pad"
                  placeholder="00000 00000"
                  maxLength={10}
                  value={mobileNumber}
                  onChangeText={text => {
                    setMobileNumber(text);
                  }}
                />
              </View>
              <View
                style={[
                  styles.mbArrowContainer,
                  {
                    opacity:
                      mobileNumber.length !== 0 &&
                      isChecked &&
                      isCorrect === true
                        ? 1
                        : 0.5,
                  },
                ]}>
                <TouchableOpacity onPress={sendOtp} style={styles.mbbutton}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <ArrowIcon />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {isCorrect === false ? (
              <View style={styles.phoneNumberWarningCtn}>
                <Text style={styles.phoneNumberWarningTxt}>
                  Enter correct phone number !
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.centerItem}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={handleCheckBoxChange}
              tintColors={{
                true: backgroundColorNew,
                false: backgroundColorNew,
              }}
              style={styles.checkBoxStyle}
            />
            <Text style={styles.setPrivacyStyle}>
              {t(Constants.WHATSAPP_ALERT_CHECK)}
            </Text>
          </View>
          <View style={styles.policyContainer}>
            <Text style={styles.policyTitle}>
              {t(Constants.TERMS_CONDITION_TITLE1)}{' '}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Legal Policies', {
                  headerTitle: t(Constants.TERMS_CONDITION_TITLE2),
                  uri: uriTermsCondition3,
                })
              }>
              <Text style={styles.policyLinkTitle(true)}>
                {t(Constants.TERMS_CONDITION_TITLE2)}{' '}
              </Text>
            </TouchableOpacity>
            <Text style={styles.policyTitle}> {` ${t(Constants.AND)} `} </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Legal Policies', {
                  headerTitle: t(Constants.TERMS_CONDITION_TITLE3),
                  uri: uriTermsCondition2,
                })
              }>
              <Text style={styles.policyLinkTitle(true)}>
                {' '}
                {t(Constants.TERMS_CONDITION_TITLE3)}
                {'  '}
              </Text>
            </TouchableOpacity>
            <Text style={styles.policyTitle}> {t(Constants.DOT)}</Text>
          </View>
        </View>
      </View>
      <View>
        {/* <Button
          loading={loading}
          onPress={sendOtp}
          title={t(Constants.SEND_OTP)}
          textStyle={styles.buttonTitile}
          style={styles.button}
          touchStyle={isChecked ? {opacity: 1} : {opacity: 0.5}}
        /> */}
      </View>
    </View>
  );
};

export default Signup;
