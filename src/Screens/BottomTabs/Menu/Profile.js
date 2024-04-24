import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import {Rating} from 'react-native-ratings';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {initLogout, initProfile} from '../../../Store/Actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {uriTermsCondition2, uriTermsCondition3} from '../../../Utils/Url';
import * as Constants from '../../../Constants/Constant';
import {NetworkContext} from '../../../Context/NetworkContext';
import NoInternetScreen from '../../Details/NoInternetScreen';
import ProfileShimmer from '../../../Components/Shimmer/ProfileShimmer';
import EditProfile from './EditProfile';
import {GradientColor1, GradientColor2, titleColor} from '../../../Color/color';
import PercentageBar from '../../../Components/PercentageBar';
import MenuItem from '../../../Components/MenuItem';
import Shield from '../../../../assets/SVG/svg/Shield';
import CloseCircle from '../../../../assets/SVG/svg/CloseCircle';
import AccountEditIcon from '../../../../assets/SVG/svg/AccountEditIcon';
import WalletIcon from '../../../../assets/SVG/svg/WalletIcon';
import UserDetailsIcon from '../../../../assets/SVG/svg/UserDetailsIcon';
import PreviousBookingIcon from '../../../../assets/SVG/svg/PreviousBookingIcon';
import SupportIcon2 from '../../../../assets/SVG/svg/SupportIcon2';
import SettingIcon from '../../../../assets/SVG/svg/SettingIcon';
import UserSummaryIcon from '../../../../assets/SVG/svg/UserSummaryIcon';
import ContactUsIcon from '../../../../assets/SVG/svg/ContactUsIcon';
import LanguageIcon from '../../../../assets/SVG/svg/LanguageIcon';
import WhatsAppIcon2 from '../../../../assets/SVG/svg/WhatsAppIcon2';
import LogoutIcon from '../../../../assets/SVG/svg/LogoutIcon';
import RateIcon from '../../../../assets/SVG/svg/RateIcon';
import GpsIcon from '../../../../assets/SVG/svg/GpsIcon';
import HelpIcon from '../../../../assets/SVG/svg/HelpIcon';
import PolicyIcon from '../../../../assets/SVG/svg/PolicyIcon';
import TermsIcon from '../../../../assets/SVG/svg/TermsIcon';

const hei = Dimensions.get('window').height;
const wid = Dimensions.get('window').width;

const Profile = ({navigation, route}) => {
  const {t} = useTranslation();
  const [isEditProfile, setEditProfile] = useState(false);
  const [isBigImage, setBigImage] = useState(false);
  const version = DeviceInfo.getVersion();
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const {Userdata, UserVerifyPercentage, profileLoading} = useSelector(
    state => {
      // console.log("profile Data", state.data);
      return state.data;
    },
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(initProfile());
    }, [dispatch]),
  );

  const bigImage = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={isBigImage}>
        <View style={style.bigImageStyle}>
          <TouchableOpacity
            onPress={() => setBigImage(!isBigImage)}
            style={style.closeIcon}>
            <CloseCircle size={30} color={'white'} />
          </TouchableOpacity>
          <View style={style.imageContainer}>
            <Image
              style={{height: hei / 2.5, width: wid}}
              source={
                Userdata?.profile_img
                  ? {uri: Userdata?.profile_img}
                  : require('../../../../assets/placeholder.png')
              }
              resizeMode={'contain'}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const logout = () => {
    Alert.alert(
      t(Constants.LOGOUT),
      t(Constants.LOGOUT_CONFIRM),
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'LOG OUT',
          onPress: async () => {
            try {
              dispatch(initLogout());
              await AsyncStorage.removeItem('UserType');
              await AsyncStorage.removeItem('auth-token');

              navigation.reset({
                index: 0,
                routes: [{name: 'Signup', params: {fromLogout: true}}],
              });
            } catch (error) {
              console.error('Logout failed', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <KeyboardAvoidingView>
      {profileLoading ? (
        <View>
          <ProfileShimmer />
        </View>
      ) : (
        <View style={style.backgroundView}>
          {isBigImage && bigImage()}
          {
            <EditProfile
              defaultValue={{
                id: Userdata?.id,
                name: Userdata?.name,
                city: Userdata?.city,
                mobile: Userdata?.mobile,
                profileImg: Userdata?.profile_img,
              }}
              dismissModal={() => setEditProfile(false)}
              isEdit={isEditProfile}
              editStatus={event => setEditProfile(event)}
              navigation={navigation}
            />
          }
          <View style={style.profileView}>
            <Pressable
              onPress={() =>
                Userdata?.profile_img
                  ? setBigImage(!isBigImage)
                  : Toast.show('No Profile Image!', Toast.LONG)
              }
              style={style.pressable}>
              <Image
                style={{
                  height: 85,
                  width: 85,
                  borderRadius: 50,
                }}
                source={
                  Userdata?.profile_img
                    ? {uri: Userdata?.profile_img}
                    : require('../../../../assets/placeholder.png')
                }
                resizeMode={'cover'}
              />
            </Pressable>
            <View style={style.verticalLine} />
            <View style={{flex: 1, marginLeft: 17, justifyContent: 'center'}}>
              <Text style={style.profileTitle}>{Userdata?.name}</Text>
              <Text style={style.subTitle}>
                {Userdata?.user_type === 1
                  ? 'Load Owner'
                  : Userdata?.user_type === 2
                  ? 'Truck Owner'
                  : 'Transpoter'}
              </Text>
              <Text style={style.subTitle}>{Userdata?.city}</Text>
              <Text style={style.subTitle}>{Userdata?.mobile}</Text>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <Shield
                      size={16}
                      color={Userdata?.verify ? 'green' : GradientColor2}
                      verified={Userdata?.verify}
                    />
                  </TouchableOpacity>
                  <Text
                    style={style.dashboardHeaderVerifiedTitle(
                      Userdata?.verify,
                    )}>
                    {Userdata?.verify === 1
                      ? `${t(Constants.VERIFY)}`
                      : t(Constants.NOT_VERIFIED)}
                  </Text>
                </View>
                <View style={style.verticalLine} />
                <View>
                  <Rating
                    readonly={true}
                    type="star"
                    ratingCount={5}
                    imageSize={15}
                    startingValue={Userdata?.rating || 0}
                  />
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setEditProfile(true)}>
                <AccountEditIcon size={30} color={GradientColor2} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <PercentageBar
                navigation={navigation}
                percentage={UserVerifyPercentage || 0}
                verify={Userdata?.verify}
                style={style}
              />
              <TouchableOpacity
                style={style.buttonContainer}
                onPress={() => navigation.navigate('Wallet')}>
                <WalletIcon size={25} color={'#F0C200'} />
                <Text style={style.buttonText}>My wallet</Text>
              </TouchableOpacity>
            </View>

            <View style={style.section}>
              <View style={style.sectionHeader}>
                <UserDetailsIcon size={25} color={titleColor} />
                <Text style={style.sectionHeaderText}>User Details</Text>
              </View>
              <View style={style.userDetails}>
                <MenuItem
                  title={'User Summary'}
                  onPress={() => navigation.navigate('Inconvenience')}
                  Icon={<UserSummaryIcon size={30} color={GradientColor1} />}
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={'Previous Bookings'}
                  onPress={() =>
                    navigation.navigate('Previous Bookings', {
                      Owner: Userdata,
                    })
                  }
                  Icon={
                    <PreviousBookingIcon size={30} color={GradientColor1} />
                  }
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={'Truck GPS Settings'}
                  onPress={() => navigation.navigate('Inconvenience')}
                  Icon={<GpsIcon size={30} color={GradientColor1} />}
                />
              </View>
            </View>

            <View style={style.section}>
              <View style={style.sectionHeader}>
                <SupportIcon2 size={25} color={titleColor} />
                <Text style={style.sectionHeaderText}>Support</Text>
              </View>
              <View style={style.userDetails}>
                <MenuItem
                  title={t(Constants.CONTACT_US)}
                  onPress={() => navigation.navigate('Contactus')}
                  Icon={<ContactUsIcon size={30} color={GradientColor1} />}
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={t(Constants.TERMS_CONDITION_TITLE2)}
                  onPress={() => {
                    navigation.navigate('Legal Policies', {
                      headerTitle: 'Terms and Conditions',
                      uri: uriTermsCondition3,
                    });
                  }}
                  Icon={<TermsIcon size={30} color={GradientColor1} />}
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={t(Constants.TERMS_CONDITION_TITLE3)}
                  onPress={() => {
                    navigation.navigate('Legal Policies', {
                      headerTitle: 'Privacy Policy',
                      uri: uriTermsCondition2,
                    });
                  }}
                  Icon={<PolicyIcon size={30} color={GradientColor1} />}
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={t(Constants.HELP_GUIDE)}
                  onPress={() => navigation.navigate('Guide')}
                  Icon={<HelpIcon size={30} color={GradientColor1} />}
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={t(Constants.RATE_US_ON_PLAY_STORE)}
                  onPress={() => {
                    alert(
                      'Sorry for inconvenience! We are in Developing version',
                    );
                  }}
                  Icon={<RateIcon size={30} color={GradientColor1} />}
                />
              </View>
            </View>

            <View style={style.section}>
              <View style={style.sectionHeader}>
                <SettingIcon size={25} color={titleColor} />
                <Text style={style.sectionHeaderText}>Settings</Text>
              </View>
              <View style={style.userDetails}>
                <MenuItem
                  title={t(Constants.LANGUAGE)}
                  onPress={() =>
                    navigation.navigate('Language', {fromMenu: true})
                  }
                  Icon={<LanguageIcon size={30} color={GradientColor1} />}
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={t(Constants.WHATSAPP_ALERT)}
                  onPress={() =>
                    navigation.navigate('WhatsApp', {fromMenu: true})
                  }
                  Icon={<WhatsAppIcon2 size={30} color={GradientColor1} />}
                />
                <View style={style.horizontalLine} />
                <MenuItem
                  title={t(Constants.LOGOUT)}
                  onPress={() => logout()}
                  Icon={<LogoutIcon size={30} color={GradientColor1} />}
                />
              </View>
            </View>

            <View
              style={{
                // paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '500',
                  color: titleColor,
                  fontSize: 14,
                  fontFamily: 'PlusJakartaSans-Medium',
                }}>
                App Version: {version}
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Profile;
