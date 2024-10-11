import React, {useEffect, useState, useCallback, Suspense} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import {Rating} from 'react-native-ratings';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {
  clearStore,
  initLogout,
  initProfile,
} from '../../../Store/Actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  playStoreLink,
  uriTermsCondition2,
  uriTermsCondition3,
} from '../../../Utils/Url';
import * as Constants from '../../../Constants/Constant';
import {GradientColor1, GradientColor2, titleColor} from '../../../Color/color';
import {useTranslation} from 'react-i18next';
import {websocketDisconnect} from '../../../Store/Actions/WebSocketActions';

// SVGs
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
import RightArrow from '../../../../assets/SVG/svg/RightArrow';
import GpsTrackingIcon from '../../../../assets/SVG/svg/GpsTrackingIcon';

// Lazy loading components
const ProfileShimmer = React.lazy(() =>
  import('../../../Components/Shimmer/ProfileShimmer'),
);
const EditProfile = React.lazy(() => import('./EditProfile'));
const PercentageBar = React.lazy(() =>
  import('../../../Components/PercentageBar'),
);
const MenuItem = React.lazy(() => import('../../../Components/MenuItem'));

const hei = Dimensions.get('window').height;
const wid = Dimensions.get('window').width;

const Profile = ({navigation}) => {
  const [isEditProfile, setEditProfile] = useState(false);
  const [isBigImage, setBigImage] = useState(false);
  const version = DeviceInfo.getVersion();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {UserVerifyPercentage, profileLoading, Userdata} = useSelector(
    state => state.data,
  );
  const {wsConnected} = useSelector(state => state.wsData);

  // Disconnect websocket and get async storage keys when component mounts
  useEffect(() => {
    const fetchKeysAndDisconnect = async () => {
      const keys = await AsyncStorage.getAllKeys();
      console.log('Stored keys:', keys);
      if (wsConnected) {
        dispatch(websocketDisconnect());
      }
    };
    fetchKeysAndDisconnect();
  }, [wsConnected, dispatch]);

  // Fetch profile on focus
  useFocusEffect(
    useCallback(() => {
      dispatch(initProfile());
    }, [dispatch]),
  );
  const profileImg = (hei, wid) => ({
    height: hei / 2.5,
    width: wid,
  });

  const bigImage = useCallback(
    () => (
      <Modal animationType="slide" transparent={true} visible={isBigImage}>
        <View style={style.bigImageStyle}>
          <TouchableOpacity
            onPress={() => setBigImage(false)}
            style={style.closeIcon}>
            <CloseCircle size={30} color={'white'} />
          </TouchableOpacity>
          <View style={style.imageContainer}>
            <Image
              style={style.profileImg(hei, wid)}
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
    ),
    [isBigImage, Userdata],
  );

  const logout = useCallback(() => {
    Alert.alert(
      t(Constants.LOGOUT),
      t(Constants.LOGOUT_CONFIRM),
      [
        {text: t(Constants.CANCEL), style: 'cancel'},
        {
          text: t(Constants.LOGOUT),
          onPress: async () => {
            try {
              dispatch(initLogout());
              await AsyncStorage.multiRemove([
                'UserType',
                'auth-token',
                'whatsAppAlert',
                'deviceMoving',
                'geofence',
                'ignition',
                'overspeeding',
              ]);
              dispatch(clearStore());
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
  }, [dispatch, navigation, t]);

  const handleRateUs = useCallback(() => {
    if (Platform.OS === 'android') {
      const url = playStoreLink;
      Linking.canOpenURL(url)
        .then(supported =>
          supported
            ? Linking.openURL(url)
            : console.error(`Cannot open: ${url}`),
        )
        .catch(err => console.error('Error opening URL:', err));
    } else {
      console.log('This feature is only available on Android.');
    }
  }, []);

  return (
    <View style={style.profileContainer}>
      {profileLoading ? (
        <Suspense fallback={<Text>Loading...</Text>}>
          <ProfileShimmer />
        </Suspense>
      ) : (
        <View style={style.backgroundView}>
          {isBigImage && bigImage()}
          <Suspense fallback={<Text>Loading...</Text>}>
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
              editStatus={setEditProfile}
              navigation={navigation}
            />
          </Suspense>
          <View style={style.profileView}>
            <Pressable
              onPress={() =>
                Userdata?.profile_img
                  ? setBigImage(true)
                  : Toast.show('No Profile Image!', Toast.LONG)
              }
              style={style.pressable}>
              <Image
                style={[
                  style.profileImgStyle,
                  {marginRight: Userdata?.user_type === 3 ? 10 : 0},
                ]}
                source={
                  Userdata?.profile_img
                    ? {uri: Userdata?.profile_img}
                    : require('../../../../assets/placeholder.png')
                }
                resizeMode={'cover'}
              />
            </Pressable>
            <View style={style.verticalLine} />
            <View style={style.profileDetailsView}>
              <Text style={style.profileTitle}>{Userdata?.name}</Text>
              <Text style={style.subTitle}>{Userdata?.mobile}</Text>
              <Text style={style.subTitle}>
                {Userdata?.user_type === 1
                  ? t(Constants.LOAD_OWNER)
                  : Userdata?.user_type === 3
                  ? t(Constants.GPS_OWNER)
                  : t(Constants.TRUCK_OWNER)}
              </Text>
              {Userdata?.user_type !== 3 && (
                <View style={style.profileRateVerifyOutView}>
                  <View style={style.profileRateVerifyInView}>
                    <TouchableOpacity>
                      <Shield size={20} verified={Userdata?.verify} />
                    </TouchableOpacity>
                    <Text
                      style={style.dashboardHeaderVerifiedTitle(
                        Userdata?.verify,
                      )}>
                      {Userdata?.verify === 1
                        ? `${t(Constants.VERIFIED)}`
                        : t(Constants.NOT_VERIFIED)}
                    </Text>
                  </View>
                  <View style={style.verticalLine} />
                  <View>
                    <Rating
                      readonly
                      type="star"
                      ratingCount={5}
                      imageSize={15}
                      startingValue={Userdata?.rating || 0}
                    />
                  </View>
                </View>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setEditProfile(true)}>
              <AccountEditIcon size={30} color={GradientColor2} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={style.profileScrollView}
            showsVerticalScrollIndicator={false}>
            <Suspense fallback={<Text>Loading...</Text>}>
              <View style={style.percentageBarView}>
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
                  <Text style={style.buttonText}>{t(Constants.WALLET)}</Text>
                  <RightArrow size={20} color={GradientColor1} />
                </TouchableOpacity>
              </View>

              <View style={style.section}>
                <View style={style.sectionHeader}>
                  <UserDetailsIcon size={25} color={titleColor} />
                  <Text style={style.sectionHeaderText}>
                    {t(Constants.USER_DETAILS)}
                  </Text>
                </View>
                <View style={style.userDetails}>
                  {Userdata?.user_type === 3 ? (
                    <>
                      <MenuItem
                        title={t(Constants.ORDERS_PAYMENT)}
                        onPress={() => navigation.navigate('Orders & Payment')}
                        Icon={
                          <GpsTrackingIcon size={30} color={GradientColor1} />
                        }
                      />
                      <View style={style.horizontalLine} />
                    </>
                  ) : (
                    <>
                      <MenuItem
                        title={t(Constants.USER_SUMMARY)}
                        onPress={() =>
                          navigation.navigate('Inconvenience', {
                            headerTitle: t(Constants.USER_SUMMARY),
                          })
                        }
                        Icon={
                          <UserSummaryIcon size={30} color={GradientColor1} />
                        }
                      />
                      <View style={style.horizontalLine} />
                      <MenuItem
                        title={t(Constants.PREVIOUS_BOOKINGS)}
                        onPress={() =>
                          navigation.navigate('Previous Bookings', {
                            Owner: Userdata,
                          })
                        }
                        Icon={
                          <PreviousBookingIcon
                            size={30}
                            color={GradientColor1}
                          />
                        }
                      />
                      <View style={style.horizontalLine} />
                      {/* <MenuItem
                      title={'GPS Tracking'}
                      onPress={() => navigation.navigate('GpsPurchase')}
                      Icon={
                        <GpsTrackingIcon size={30} color={GradientColor1} />
                      }
                    />
                    <View style={style.horizontalLine} /> */}
                    </>
                  )}
                  <MenuItem
                    title={t(Constants.SAVED_ADDRESS)}
                    onPress={() =>
                      // navigation.navigate('Address')
                      navigation.navigate('Inconvenience')
                    }
                    Icon={<GpsIcon size={30} color={GradientColor1} />}
                  />
                </View>
              </View>

              <View style={style.section}>
                <View style={style.sectionHeader}>
                  <SupportIcon2 size={25} color={titleColor} />
                  <Text style={style.sectionHeaderText}>
                    {t(Constants.SUPPORT)}
                  </Text>
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
                        headerTitle: t(Constants.TERMS_AND_CONDITITIONS),
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
                        headerTitle: t(Constants.TERMS_CONDITION_TITLE3),
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
                    onPress={handleRateUs}
                    Icon={<RateIcon size={30} color={GradientColor1} />}
                  />
                </View>
              </View>

              <View style={style.section}>
                <View style={style.sectionHeader}>
                  <SettingIcon size={25} color={titleColor} />
                  <Text style={style.sectionHeaderText}>
                    {t(Constants.SETTINGS)}
                  </Text>
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

              <View style={style.appVersionView}>
                <Text style={style.appVersionText}>
                  {t(Constants.APP_VERSION)} {version}
                </Text>
              </View>
            </Suspense>
          </ScrollView>
        </View>
      )}
      <View style={style.appVersionView}>
        <Text style={style.appVersionText}>
          {t(Constants.APP_VERSION)} {version}
        </Text>
      </View>
    </View>
  );
};

export default Profile;
