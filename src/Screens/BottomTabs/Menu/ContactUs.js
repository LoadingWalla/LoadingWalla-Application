import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../../Constants/Constant';
import Toast from 'react-native-simple-toast';
import styles from './style'
import Background from '../../../Components/BackgroundGradient';
import TextInputField from '../../../Components/TextInputField';
import Button from '../../../Components/Button';
import {
  backgroundColorNew,
} from '../../../Color/color';
import {contactusFailure, initContactus} from '../../../Store/Actions/Actions';
import PhoneCall from '../../../../assets/SVG/svg/PhoneCall';
import EmailIcon from '../../../../assets/SVG/svg/EmailIcon';
import WhatsAppIcon from '../../../../assets/SVG/svg/WhatsAppIcon';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

const ContactUs = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const {t} = useTranslation();

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

  const isValidEmail = mail => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(mail);
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
        phoneNumber = 'tel:+919910824740';
      } else {
        //phoneNumber = `telprompt:${phone}`;
      }
      Linking.openURL(phoneNumber);
      return;
    }

    if (val === 'mail') {
      let Lemail = '';
      if (Platform.OS === 'android') {
        Lemail = 'mailto:support@loadingwalla.com';
      } else {
        //phoneNumber = `telprompt:${phone}`;
      }
      Linking.openURL(Lemail);
      return;
    }

    if (val === 'whatsapp') {
      let whatsappNumber = '';
      if (Platform.OS === 'android') {
        whatsappNumber = `whatsapp://send?phone=${+919910824740}`;
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
    <Background style={styles.setFlex}>
      <GradientStatusBar />
      <View style={styles.iconContainer}>
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
      <View style={styles.formContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.contactUsScrollView}>
          <Text style={styles.label}>{t(Constants.NAME)}</Text>
          <TextInputField
            value={name}
            hint={t(Constants.ENTER_NAME)}
            onChangeText={e => onChangeName(e)}
          />
          <Text style={styles.label}>{t(Constants.E_MAIL)}</Text>
          <TextInputField
            value={email}
            hint={t(Constants.E_MAIL)}
            onChangeText={e => onChangeEmail(e)}
          />
          <Text style={styles.label}>{t(Constants.PHONE_NUMBER)}</Text>
          <TextInputField
            value={phone}
            isPhone={true}
            hint={t(Constants.ENTER_MOBILE_NUMBER)}
            onChangeText={e => onChangePhone(e)}
          />
          <Text style={styles.label}>{t(Constants.MESSAGE)}</Text>
          <TextInputField
            value={message}
            isMultiLine={true}
            hint={t(Constants.ENTER_MESSAGE)}
            onChangeText={e => onChangeMessage(e)}
          />
          <Button
            onPress={() => sendMessage()}
            title={t(Constants.SEND_MESSAGE)}
            loading={contactusLoading}
            textStyle={styles.textStyle}
            style={styles.contactUsButtonStyle}
          />
        </ScrollView>
      </View>
    </Background>
  );
};

export default ContactUs;

const GradientStatusBar = () => {
  return (
    <View style={styles.statusBar}>
      <LinearGradient
        // colors={[GradientColor1, GradientColor2, GradientColor3]}
        colors={[backgroundColorNew, backgroundColorNew]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </View>
  );
};
