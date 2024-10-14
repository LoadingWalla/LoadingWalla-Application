import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import {initLogin, loginFailure} from '../../Store/Actions/Actions';
import PhoneInput from 'react-native-phone-number-input';
import CheckBox from '@react-native-community/checkbox';
import {PrivacyPolicy, backgroundColorNew} from '../../Color/color';
import Toast from 'react-native-simple-toast';
import Button from '../../Components/Button';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({navigation}) => {
  const {t} = useTranslation();
  const [mobileNumber, setMobileNumber] = useState('+91');
  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useDispatch();
  const {data, loading, dashboardStatus} = useSelector(state => state.data);

  const handleCheckBoxChange = useCallback(async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    await AsyncStorage.setItem(
      'whatsAppAlert',
      JSON.stringify(newCheckedState),
    );
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
      Toast.show(t('Enter a valid mobile number'), Toast.LONG);
      return;
    }
    dispatch(initLogin(mobileNumber));
  };

  return (
    <View style={styles.Container}>
      <View style={styles.flexs}>
        <View style={styles.topRow}>
          <TouchableOpacity style={styles.hiddenButton} />
          <TouchableOpacity onPress={() => navigation.navigate('Contactus')}>
            <Text style={styles.helpText}>{t(Constants.NEED_HELP)}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.WelcomeTruckTitle}>
            <Text style={styles.LoadingWalla}>
              {t(Constants.LOADING_WALLA)}{' '}
            </Text>
            {t(Constants.WELCOME_TO_TRUCK)}
          </Text>
        </View>
        <View style={styles.phoneInputContainer}>
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
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.textInput}
            onChangeFormattedText={text => setMobileNumber(text)}
          />
        </View>
      </View>
      <View>
        <View style={styles.centerItem}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={handleCheckBoxChange}
              tintColors={{true: backgroundColorNew, false: backgroundColorNew}}
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
        <Button
          loading={loading}
          onPress={sendOtp}
          title={t(Constants.SEND_OTP)}
          textStyle={styles.buttonTitile}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Signup;

