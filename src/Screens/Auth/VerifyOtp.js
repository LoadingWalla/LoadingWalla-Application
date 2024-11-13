import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import Button from '../../Components/Button';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {
  initVerifyOtp,
  VerifyOtpFailure,
  initLogin,
} from '../../Store/Actions/Actions';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestUserPermission} from '../../Utils/Notification_helper';
import BackgroundTimer from 'react-native-background-timer';
import {OtpInput} from 'react-native-otp-entry';
import {backgroundColorNew, pageBackground} from '../../Color/color';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import Edit from '../../../assets/SVG/svg/Edit';
import Wrong from '../../../assets/SVG/svg/Wrong';
import Correct from '../../../assets/SVG/svg/Correct';
import GradientStatusBar from '../../Components/GradientStatusBar';

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
      <View style={styles.signupBackground}>
        <View style={styles.loadingWallaImg}>
          <Image
            source={require('../../../assets/LoadingWallaBG.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View style={styles.otpResendView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.verifyOtpNumber}>{`${mobileNumber} `}</Text>
            {isCodeCorrect === false || isCodeCorrect === null ? (
              <TouchableOpacity
                onPress={() => navigation.replace('Signup')}
                style={{marginLeft: 10}}>
                <Edit />
              </TouchableOpacity>
            ) : null}
          </View>
          <View>
            <Text style={styles.enterOtp}>Enter OTP</Text>
          </View>
        </View>
        <View style={styles.otpContainer}>
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
        <View style={styles.otpResendView}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignContent: 'space-around',
              // borderWidth: 2,
            }}>
            <View style={{width: '50%', alignItems: 'flex-start'}}>
              {isCodeCorrect === false ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Wrong />
                  <Text
                    style={{
                      color: '#FF270E',
                      fontFamily: 'PlusJakartaSans-SemiBold',
                      fontSize: 12,
                      marginLeft: 4,
                    }}>
                    Wrong OTP, Try again!
                  </Text>
                </View>
              ) : isCodeCorrect === true ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Correct />
                  <Text
                    style={{
                      color: '#32BA7C',
                      fontFamily: 'PlusJakartaSans-SemiBold',
                      fontSize: 12,
                      marginLeft: 4,
                    }}>
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

        {/* <View style={styles.buttonBox}>
          <Button
            loading={otpLoading}
            onPress={() => verify()}
            title={t(Constants.VERIFY)}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;
