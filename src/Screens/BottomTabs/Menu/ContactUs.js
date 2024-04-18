import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import {NetworkContext} from '../../../Context/NetworkContext';
import NoInternetScreen from '../../Details/NoInternetScreen';
import Background from '../../../Components/BackgroundGradient';
import TextInputField from '../../../Components/TextInputField';
import Button from '../../../Components/Button';
import {PrivacyPolicy, textColor} from '../../../Color/color';
import {contactusFailure, initContactus} from '../../../Store/Actions/Actions';

const ContactUs = ({navigation}) => {
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const {isConnected} = useContext(NetworkContext);
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
        .then(res => alert(JSON.stringify(res)))
        .catch(err => {
          Toast.show("WhatsApp doesn't exist", Toast.LONG);
        });

      return;
    }
  };

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <Background style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginVertical: 20,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => linking('call')}>
          <Icon name="ios-call" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => linking('mail')}>
          <Icon name="ios-mail" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => linking('whatsapp')}
          activeOpacity={0.5}>
          <Icon name="ios-logo-whatsapp" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            width: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {t(Constants.NAME)}
          </Text>
          <TextInputField
            value={name}
            hint={'Enter name'}
            onChangeText={e => onChangeName(e)}
            placeholderTextColor={PrivacyPolicy}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {t(Constants.E_MAIL)}
          </Text>
          <TextInputField
            value={email}
            hint={'Enter E-mail'}
            onChangeText={e => onChangeEmail(e)}
            placeholderTextColor={PrivacyPolicy}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {t(Constants.PHONE_NUMBER)}
          </Text>
          <TextInputField
            value={phone}
            isPhone={true}
            hint={'Enter phone number'}
            onChangeText={e => onChangePhone(e)}
            placeholderTextColor={PrivacyPolicy}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              color: 'black',
              marginTop: 20,
              fontFamily: 'PlusJakartaSans-Medium',
            }}>
            {t(Constants.MESSAGE)}
          </Text>
          <TextInputField
            value={message}
            isMultiLine={true}
            hint={'Enter message'}
            onChangeText={e => onChangeMessage(e)}
            placeholderTextColor={PrivacyPolicy}
          />
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
              borderRadius: 28,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 20,
            }}
          />
        </View>
      </ScrollView>
    </Background>
  );
};

export default ContactUs;
