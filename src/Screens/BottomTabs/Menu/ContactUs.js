import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../../Constants/Constant';
import Toast from 'react-native-simple-toast';

import Background from '../../../Components/BackgroundGradient';
import TextInputField from '../../../Components/TextInputField';
import Button from '../../../Components/Button';
import {
  GradientColor1,
  GradientColor2,
  GradientColor3,
  backgroundColorNew,
  textColor,
} from '../../../Color/color';
import {contactusFailure, initContactus} from '../../../Store/Actions/Actions';
import PhoneCall from '../../../../assets/SVG/svg/PhoneCall';
import EmailIcon from '../../../../assets/SVG/svg/EmailIcon';
import WhatsAppIcon from '../../../../assets/SVG/svg/WhatsAppIcon';
import AlertBox from '../../../Components/AlertBox';
import LinearGradient from 'react-native-linear-gradient';

const ContactUs = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const {contactusData, contactusLoading, contactusStatus} = useSelector(
    state => {
      // console.log("My Lorry/Load", state.data);
      return state.data;
    },
  );

  useEffect(() => {
    if (contactusStatus === 200) {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      Toast.show(`${contactusData}`, Toast.LONG);
      // AlertBox(contactusData);
      dispatch(contactusFailure());
    }
  }, [contactusData, contactusStatus, dispatch]);

  const onChangeName = text => {
    setName(text);
  };
  const onChangeEmail = text => {
    setEmail(text);
  };
  const onChangePhone = text => {
    setPhone(text);
  };
  const onChangeMessage = text => {
    setMessage(text);
  };

  const isValidEmail = email => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const sendMessage = () => {
    if (name.trim() === '') {
      Toast.show('Enter name', Toast.LONG);
      return;
    }
    if (email.trim() === '') {
      Toast.show('Enter email', Toast.LONG);
      return;
    } else if (!isValidEmail(email)) {
      Toast.show('Invalid email format', Toast.LONG);
      return;
    }
    if (phone.trim() === '') {
      Toast.show('Enter phone number', Toast.LONG);
      return;
    }
    if (message.trim() === '') {
      Toast.show('Enter message', Toast.LONG);
      return;
    }
    dispatch(initContactus(name, email, phone, message));
  };

  const linking = val => {
    if (val === 'call') {
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:+919354761565`;
      } else {
        //phoneNumber = `telprompt:${phone}`;
      }
      Linking.openURL(phoneNumber);
      return;
    }

    if (val === 'mail') {
      let email = '';
      if (Platform.OS === 'android') {
        email = `mailto:test@gmail.com`;
      } else {
        //phoneNumber = `telprompt:${phone}`;
      }
      Linking.openURL(email);
      return;
    }

    if (val === 'whatsapp') {
      let whatsappNumber = '';
      if (Platform.OS === 'android') {
        whatsappNumber = `whatsapp://send?phone=${+918800899875}`;
      } else {
        //phoneNumber = `telprompt:${phone}`;
      }
      Linking.openURL(whatsappNumber)
        .then(res => console.log('opened whatsapp', res))
        .catch(err => {
          Toast.show("WhatsApp doesn't exist or Not insatlled", Toast.LONG);
        });

      return;
    }
  };

  return (
    <Background style={{flex: 1}}>
      {/* <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundColorNew}
      /> */}
      <GradientStatusBar />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginVertical: 20,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => linking('call')}>
          <PhoneCall size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => linking('mail')}>
          <EmailIcon size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linking('whatsapp')}
          activeOpacity={0.5}>
          <WhatsAppIcon size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 20,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{paddingHorizontal: 20}}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {Constants.NAME}
          </Text>
          <TextInputField
            value={name}
            hint={'Enter name'}
            onChangeText={e => onChangeName(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {Constants.E_MAIL}
          </Text>
          <TextInputField
            value={email}
            hint={'Enter E-mail'}
            onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {Constants.PHONE_NUMBER}
          </Text>
          <TextInputField
            value={phone}
            isPhone={true}
            hint={'Enter phone number'}
            onChangeText={e => onChangePhone(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {Constants.MESSAGE}
          </Text>
          <TextInputField
            value={message}
            isMultiLine={true}
            hint={'Enter message'}
            onChangeText={e => onChangeMessage(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
          {/* <Button
            onPress={() => sendMessage()}
            title={'Send message'}
            loading={contactusLoading}
            textStyle={{
              fontWeight: 'bold',
              color: textColor,
              fontSize: 16,
              fontFamily: 'PlusJakartaSans-Medium',
            }}
            style={{
              flexDirection: 'row',
              borderRadius: 8,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}
          /> */}
          <Button
            onPress={() => sendMessage()}
            title={'Send message'}
            loading={contactusLoading}
            textStyle={{
              fontWeight: 'bold',
              color: textColor,
              fontSize: 16,
              fontFamily: 'PlusJakartaSans-Medium',
            }}
            style={{
              flexDirection: 'row',
              borderRadius: 8,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 20,
            }}
          />
        </ScrollView>
      </View>
    </Background>
  );
};

export default ContactUs;

const GradientStatusBar = () => {
  return (
    <View style={stylesStatusbar.statusBar}>
      <LinearGradient
        colors={[GradientColor1, GradientColor2, GradientColor3]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={stylesStatusbar.gradient}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </View>
  );
};

const stylesStatusbar = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
    width: '100%',
  },
  gradient: {
    flex: 1,
  },
});
