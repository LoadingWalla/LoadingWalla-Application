import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  initVerifyOtp,
  VerifyOtpFailure,
  initLogin,
} from '../../Store/Actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestUserPermission} from '../../Utils/Notification_helper';
import BackgroundTimer from 'react-native-background-timer';
import {OtpInput} from 'react-native-otp-entry';
import {backgroundColorNew} from '../../Color/color';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import Edit from '../../../assets/SVG/svg/Edit';
import Wrong from '../../../assets/SVG/svg/Wrong';
import Correct from '../../../assets/SVG/svg/Correct';
import HeaderWithLogo from '../../Components/HeaderWithLogo';
import HeaderTitleComponent from '../../Components/HeaderTitleComponent';

const VerifyOtp = ({navigation, route}) => {
  useTrackScreenTime('VerifyOtp');
  const {t} = useTranslation();
  const {userId, mobileNumber} = route?.params;
  const [otpValue, setOtpValue] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(null);
  const [isCodeFill, setCodeFill] = useState(false);
  const [devicetoken, setDeviceToken] = useState(false);
  const [delay, setDelay] = useState('');
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  const dispatch = useDispatch();

  const {otpdata, otpLoading, status, dashboardStatus} = useSelector(state => {
    // console.log('Verify Otp', state.data);
    return state.data;
  });

  // useEffect(() => {
  //   // Hide the status bar when this screen is focused
  //   StatusBar.setHidden(true);

  //   // Clean up to reset status bar visibility when leaving the screen
  //   return () => StatusBar.setHidden(false);
  // }, []);

  useEffect(() => {
    setDelay('599');
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
      setTimeout(() => {
        if (otpdata?.data?.data?.user[0]?.new_user === 0) {
          navigation.replace('Landing');
        } else {
          navigation.replace('companyDetails', {userId});
        }
      }, 1000);
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
      setDelay('599');
      Toast.show(`OTP send to your number ${mobileNumber}`, Toast.LONG);
    }
  }, [dashboardStatus, mobileNumber]);

  const verifyOtp = async otp => {
    let langId = await AsyncStorage.getItem('languageID');
    // console.log(888888);
    dispatch(initVerifyOtp(userId, otp, langId, devicetoken));
    // console.log(777777);
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
    verifyOtp(otpValue);
  };

  const handleOtpChange = code => {
    setIsCodeCorrect(null);
    setOtpValue(code);
    if (code.length === 4) {
      // Call verifyOtp function to check if OTP is correct
      verifyOtp(code);
    }
  };

  // useEffect to watch for changes in `status`
  useEffect(() => {
    console.log('----------- isCodeFill ----------->', isCodeFill);
    if (isCodeFill === true) {
      console.log('----------- otp status ----------->', status);
      if (status === 200) {
        setIsCodeCorrect(true); // Correct OTP, set color to green
      } else if (status === 201) {
        setIsCodeCorrect(false); // Incorrect OTP, set color to red
      }
    }
    console.log('----------- isOTPCorrect ----------->', isCodeCorrect);
  }, [status, isCodeFill]); // Run effect whenever `status` changes

  const resendCode = () => {
    dispatch(initLogin(mobileNumber));
    setDelay('599');
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
              text1={`${mobileNumber} `}
              text2={'Enter OTP'}
              onPress={() => navigation.replace('Signup')}
              isButton={isCodeCorrect === false || isCodeCorrect === null}
            />
            <View style={styles.phoneNumberContainer}>
              <OtpInput
                numberOfDigits={4}
                focusColor={backgroundColorNew}
                focusStickBlinkingDuration={500}
                onTextChange={handleOtpChange}
                onFilled={code => {
                  setCodeFill(true);
                }}
                theme={{
                  containerStyle: styles.otpView,
                  inputsContainerStyle: styles.inputsContainer,
                  pinCodeContainerStyle: [
                    styles.pinCodeContainer,
                    {
                      backgroundColor:
                        isCodeCorrect === true
                          ? 'rgba(50, 186, 124, 0.1)'
                          : isCodeCorrect === false
                          ? 'rgba(255,  0,   0, 0.1)'
                          : '#FFFFFF',
                      borderColor:
                        isCodeCorrect === true
                          ? '#32BA7C'
                          : isCodeCorrect === false
                          ? '#FF270E'
                          : '#000000',
                      elevation:
                        isCodeCorrect === true
                          ? 0
                          : isCodeCorrect === false
                          ? 0
                          : 2,
                    },
                  ],
                  pinCodeTextStyle: [
                    styles.pinCodeText,
                    {
                      color:
                        isCodeCorrect === true
                          ? '#32BA7C'
                          : isCodeCorrect === false
                          ? '#FF270E'
                          : '#595959',
                    },
                  ],
                  focusStickStyle: styles.focusStick,
                  focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                }}
              />
            </View>
            <View style={styles.phoneNumberWarningCtn}>
              <View style={styles.otpResendView}>
                <View style={styles.otpResendChild}>
                  {isCodeCorrect === false ? (
                    <View style={styles.otpResponseView}>
                      <Wrong />
                      <Text style={styles.otpResponseText(isCodeCorrect)}>
                        Wrong OTP, Try again!
                      </Text>
                    </View>
                  ) : isCodeCorrect === true ? (
                    <View style={styles.otpResponseView}>
                      <Correct />
                      <Text style={styles.otpResponseText(isCodeCorrect)}>
                        OTP Success, Please wait!
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      disabled={minutes < 4 ? false : true}
                      onPress={() => (minutes < 4 ? resendCode() : {})}>
                      <Text
                        style={[
                          styles.policyLinkTitle(minutes < 4 ? true : false),
                          {textDecorationLine: 'none'},
                        ]}>
                        {t(Constants.RESEND_CODE)}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {isCodeCorrect === null || isCodeCorrect === undefined ? (
                  <View style={{width: '50%', alignItems: 'flex-end'}}>
                    <Text style={styles.timer}>
                      {minutes.toLocaleString(undefined, {
                        minimumIntegerDigits: 2,
                      }) +
                        ':' +
                        seconds.toLocaleString(undefined, {
                          minimumIntegerDigits: 2,
                        })}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
          <View style={{flex: 1}} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;
