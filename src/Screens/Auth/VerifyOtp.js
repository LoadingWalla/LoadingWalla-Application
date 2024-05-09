import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import Button from '../../Components/Button';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import '../../locales/index';
import {
  initVerifyOtp,
  VerifyOtpFailure,
  initLogin,
} from '../../Store/Actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestUserPermission} from '../../Utils/Notification_helper';
import BackgroundTimer from 'react-native-background-timer';
import NoInternetScreen from '../Details/NoInternetScreen';
import {NetworkContext} from '../../Context/NetworkContext';
import {OtpInput} from 'react-native-otp-entry';
import {backgroundColorNew} from '../../Color/color';
import RNOtpVerify from 'react-native-otp-verify';

const VerifyOtp = ({navigation, route}) => {
  const {userId, mobileNumber} = route?.params;
  const [otpValue, setOtpvalue] = useState('');
  const [isCodeFill, setCodeFill] = useState(false);
  const [devicetoken, setDeviceToken] = useState(false);
  const [delay, setDelay] = useState('');
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const {otpdata, otpLoading, status, dashboardStatus} = useSelector(state => {
    console.log('Verify Otp', state.data);
    return state.data;
  });

  useEffect(() => {
    setDelay('299');
    const getToken = async () => {
      const deviceToken = await requestUserPermission();
      setDeviceToken(deviceToken);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (status === 201) {
      Toast.show(`${otpdata?.data?.message}`, Toast.LONG);
      dispatch(VerifyOtpFailure());
      return;
    }

    if (status === 200) {
      if (otpdata?.data?.data?.user[0]?.new_user === 0) {
        navigation.replace('Landing');
      } else {
        navigation.replace('companyDetails', {userId});
      }
      dispatch(VerifyOtpFailure());
    } else {
      dispatch(VerifyOtpFailure());
    }
  }, [
    dispatch,
    navigation,
    otpdata?.data?.data?.user,
    otpdata?.data?.message,
    userId,
    status,
  ]);

  useEffect(() => {
    if (dashboardStatus === 200) {
      setDelay('299');
      Toast.show(`OTP send to your number ${mobileNumber}`, Toast.LONG);
    }
  }, [dashboardStatus, mobileNumber]);

  const verifyOtp = async otp => {
    let langId = await AsyncStorage.getItem('languageID');
    dispatch(initVerifyOtp(userId, otp, langId, devicetoken));
  };

  const verify = async () => {
    if (otpValue === '') {
      Toast.show('Enter OTP', Toast.LONG);
      return;
    }

    if (isCodeFill === false) {
      Toast.show('Fill 4 digit OTP', Toast.LONG);
      return;
    }

    // let langId = await AsyncStorage.getItem('languageID');
    // dispatch(initVerifyOtp(userId, otpValue, langId, devicetoken));
    verifyOtp(otpValue);
  };

  const resendCode = () => {
    dispatch(initLogin(mobileNumber));
    setDelay('299');
  };

  useLayoutEffect(() => {
    const timer = BackgroundTimer.setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      BackgroundTimer.clearInterval(timer);
    }

    return () => {
      BackgroundTimer.clearInterval(timer);
    };
  }, [delay]);

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <KeyboardAvoidingView style={styles.Container}>
      <View style={[styles.signupBackground, {marginTop: 0}]}>
        <View style={styles.otpResendView}>
          <Text style={styles.signupTopTitle}>
            {`${Constants.ENTER_OTP_TITLE} ${mobileNumber} `}
            <Text
              onPress={() => navigation.replace('Signup')}
              style={styles.policyLinkTitle(true)}>
              Edit
            </Text>
          </Text>
        </View>
        <View style={styles.otpContainer}>
          <OtpInput
            numberOfDigits={4}
            focusColor={backgroundColorNew}
            focusStickBlinkingDuration={500}
            onTextChange={code => setOtpvalue(code)}
            onFilled={code => {
              setCodeFill(true);
            }}
            theme={{
              containerStyle: styles.otpView,
              inputsContainerStyle: styles.inputsContainer,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
          <Text style={styles.signupTopTitle}>
            Expires in{' '}
            {
              <Text style={styles.timer}>
                {minutes.toLocaleString(undefined, {
                  minimumIntegerDigits: 2,
                }) +
                  ':' +
                  seconds.toLocaleString(undefined, {
                    minimumIntegerDigits: 2,
                  })}
              </Text>
            }
          </Text>
        </View>
        <View style={styles.otpResendView}>
          <Text style={styles.policyTitle}>
            {Constants.DID_NOT_RECIEVE_OTP}{' '}
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={minutes < 4 ? false : true}
            onPress={() => (minutes < 4 ? resendCode() : {})}>
            <Text style={styles.policyLinkTitle(minutes < 4 ? true : false)}>
              {Constants.RESEND_CODE}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonBox}>
          <Button
            loading={otpLoading}
            onPress={() => verify()}
            title={Constants.VERIFY}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;
