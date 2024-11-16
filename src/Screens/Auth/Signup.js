import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {initLogin, loginFailure} from '../../Store/Actions/Actions';
import CheckBox from '@react-native-community/checkbox';
import {PrivacyPolicy, backgroundColorNew, textRed} from '../../Color/color';
import Toast from 'react-native-simple-toast';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import {printAllAsyncStorageData} from '../../Utils/asyncStorageUtils';
import ArrowIcon from '../../../assets/SVG/svg/ArrowIcon';
import GradientStatusBar from '../../Components/GradientStatusBar';
import HeaderWithLogo from '../../Components/HeaderWithLogo';
import HeaderTitleComponent from '../../Components/HeaderTitleComponent';

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
    dispatch(initLogin(mobileNumber));
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
      <View style={styles.loadingWallaImg}>
        <HeaderWithLogo
          path={require('../../../assets/newAssets/Header.json')}
        />
      </View>
      <View style={{flex: 2, paddingHorizontal: 20}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1.5}}>
            <HeaderTitleComponent
              text1={t(Constants.WELCOME_TXT)}
              text2={'Enter phone number to get started.'}
            />
            <View
              style={{
                // width: '100%',
                minHeight: 65,
                flexDirection: 'row',
                // borderWidth: 1,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '83%',
                  height: 65,
                  borderWidth: 0.5,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingLeft: 15,
                  elevation: 1,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#636363',
                    fontFamily: 'PlusJakartaSans-Bold',
                    // borderWidth: 1,
                  }}>
                  +91
                </Text>
                <View
                  style={{
                    height: '70%',
                    borderLeftWidth: 0.5,
                    marginHorizontal: 10,
                    borderColor: '#595959',
                  }}
                />
                <TextInput
                  style={{
                    // borderWidth: 1,
                    flex: 1,
                    fontSize: 20,
                    color: '#636363',
                    fontFamily: 'PlusJakartaSans-Bold',
                  }}
                  autoFocus={true}
                  placeholder={t(Constants.PHONE_PLACEHOLDER)}
                  keyboardType="numeric"
                  placeholderTextColor={'#636363'}
                  maxLength={10}
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
            <View style={styles.phoneNumberWarningCtn}>
              {isCorrect === false ? (
                <Text style={styles.phoneNumberWarningTxt}>
                  Enter correct phone number !
                </Text>
              ) : null}
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
                <Text style={styles.policyTitle}>
                  {' '}
                  {` ${t(Constants.AND)} `}{' '}
                </Text>
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
          <View style={{flex: 1}}></View>
        </View>
      </View>
    </View>
  );
};

export default Signup;
