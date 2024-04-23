import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import Button from '../../Components/Button';
import {GradientColor3, textColor, titleColor} from '../../Color/color';

const OtpVerification = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const otpValid = 1;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.otpSection}>
        <Text style={styles.otpLabel}>Enter OTP sent on Load Owner</Text>
        <TextInput
          style={styles.otpInput}
          placeholder="e.g. 051828"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
        <View style={styles.resendBtn}>
          <TouchableOpacity>
            {otpValid === 1 ? (
              <Text style={styles.resendText}>Resend OTP</Text>
            ) : (
              <Text style={styles.resendText}>Invalid OTP</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.resendContainer}>
            Resend in: <Text style={styles.counter}> 00:26</Text>
          </Text>
        </View>
      </View>

      <Button
        title="Continue"
        textStyle={styles.buttonTextStyle}
        style={styles.buttonstyle}
        // onPress={}
      />
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  otpSection: {
    flex: 1,
    marginBottom: 30,
  },
  otpLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  resendBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manualVerification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e1eedf',
    borderRadius: 5,
  },
  manualText: {
    fontSize: 16,
    flex: 1,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
  },
  manualBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#119500',
    backgroundColor: '#119500',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  resendContainer: {
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  resendText: {
    textDecorationLine: 'underline',
    color: GradientColor3,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  counter: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  buttonTextStyle: {
    color: textColor,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  buttonstyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '60%',
    marginBottom: 20,
  },
});
