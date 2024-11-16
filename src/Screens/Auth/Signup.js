import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {initLogin, loginFailure} from '../../Store/Actions/Actions';
import Toast from 'react-native-simple-toast';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import {printAllAsyncStorageData} from '../../Utils/asyncStorageUtils';
import ArrowIcon from '../../../assets/SVG/svg/ArrowIcon';
import HeaderWithLogo from '../../Components/HeaderWithLogo';
import HeaderTitleComponent from '../../Components/HeaderTitleComponent';
import CheckboxWithText from '../../Components/CheckboxWithText';
import PolicyLinkText from '../../Components/PolicyLinkText';

const Signup = ({navigation}) => {
  useTrackScreenTime('Signup');
  const {t} = useTranslation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();
  const {data, loading, dashboardStatus} = useSelector(state => {
    // console.log(11111, 'SignIn Screen here store is empty ---->', state);
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
      const fullMobileNumber = `+91${mobileNumber}`;
      Toast.show(data?.message, Toast.LONG);
      navigation.replace('VerifyOtp', {
        userId: data?.user_id,
        mobileNumber: fullMobileNumber,
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
      return;
    }
    if (!isChecked) {
      Toast.show(
        t('Please check the box to receive WhatsApp alerts! 📬'),
        Toast.LONG,
      );
      return;
    }
    const fullMobileNumber = `+91${mobileNumber}`;
    dispatch(initLogin(fullMobileNumber));
  };

  useEffect(() => {
    const regex = /^(?:\+91)?[6-9]\d{9}$/;
    if (mobileNumber.length > 0 && !regex.test(mobileNumber)) {
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
    }
  }, [mobileNumber]);

  return (
    <KeyboardAvoidingView style={styles.Container}>
      <View style={styles.loadingWallaImg}>
        <HeaderWithLogo
          path={require('../../../assets/newAssets/Header.json')}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.innerContentContainer}>
          <View style={{flex: 1.5}}>
            <HeaderTitleComponent
              text1={t(Constants.WELCOME_TXT)}
              text2={'Enter phone number to get started.'}
            />
            <View style={styles.phoneNumberContainer}>
              <View style={styles.phoneInput}>
                <Text style={styles.countryCode}>+91</Text>
                <View style={styles.separator} />
                <TextInput
                  style={styles.phoneInputField}
                  autoFocus={true}
                  placeholder={t(Constants.PHONE_PLACEHOLDER)}
                  keyboardType="numeric"
                  placeholderTextColor={'#636363'}
                  maxLength={10}
                  value={mobileNumber}
                  onChangeText={text => {
                    setMobileNumber(text);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={sendOtp}
                style={styles.sendOtpButton(
                  mobileNumber.length !== 0 && isChecked && isCorrect,
                )}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <ArrowIcon />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.phoneNumberWarningCtn}>
              {isCorrect === false ? (
                <Text style={styles.phoneNumberWarningTxt}>
                  Enter correct phone number !
                </Text>
              ) : null}
            </View>
            <View style={styles.centerItem}>
              <CheckboxWithText
                isChecked={isChecked}
                onValueChange={handleCheckBoxChange}
                text={t(Constants.WHATSAPP_ALERT_CHECK)}
              />
              <View style={styles.policyContainer}>
                <Text style={styles.policyTitle}>
                  {t(Constants.TERMS_CONDITION_TITLE1)}{' '}
                </Text>
                <PolicyLinkText
                  text={t(Constants.TERMS_CONDITION_TITLE2)}
                  onPress={() =>
                    navigation.navigate('Legal Policies', {
                      headerTitle: t(Constants.TERMS_CONDITION_TITLE2),
                      uri: uriTermsCondition3,
                    })
                  }
                />
                <Text style={styles.policyTitle}>
                  {' '}
                  {` ${t(Constants.AND)} `}{' '}
                </Text>
                <PolicyLinkText
                  text={t(Constants.TERMS_CONDITION_TITLE3)}
                  onPress={() =>
                    navigation.navigate('Legal Policies', {
                      headerTitle: t(Constants.TERMS_CONDITION_TITLE3),
                      uri: uriTermsCondition2,
                    })
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.flexs} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Signup;
