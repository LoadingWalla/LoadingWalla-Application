import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {backgroundColorNew} from '../Color/color';
import {Animated, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../locales/i18n';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as Constants from '../Constants/Constant';
// Screens and Components
import Splash from '../Screens/Splash/Splash';
import Signup from '../Screens/Auth/Signup';
import Language from '../Screens/Language/Language';
import AllTerms from '../Screens/Details/AllTerms';
import VerifyOtp from '../Screens/Auth/VerifyOtp';
import Landing from './Landing';
import CompanyDetails from '../Screens/Details/CompanyDetails';
import WhatsAppAlert from '../Screens/BottomTabs/Menu/WhatsAppAlert';
import PreviousBookings from '../Screens/BottomTabs/Bookings/PreviousBookings';
import ContactUs from '../Screens/BottomTabs/Menu/ContactUs';
import Notification from '../Screens/Details/Notification';
import Search from '../Screens/BottomTabs/Dashboard/Search';
import FindLoads from '../Screens/Home/FindLoads';
import FindLoadResult from '../Screens/BottomTabs/Dashboard/FindLoadResult';
import RCVerification from '../Screens/RC/RCVerification';
import StatusChangeModal from '../Screens/Modals/StatusChangeModal';
import Requests from '../Screens/Requests/Requests';
import ViewDetail from '../Screens/Details/ViewDetail';
import PostLoads from '../Screens/Home/PostLoads';
import AddLorry from '../Screens/Home/AddLorry';
import LoadPostSuccessfull from '../Screens/Home/LoadPostSuccessfull';
import Wallet from '../Screens/BottomTabs/Menu/Wallet';
import Guide from '../Screens/BottomTabs/Menu/Guide';
import Rating from '../Screens/BottomTabs/Menu/Rating';
import Verification from '../Screens/Verification/Verification';
import Confirmation from '../Screens/Verification/Confirmation';
import Status from '../Screens/RC/Status';
import Negotiation from '../Screens/Modals/Negotiation';
import QRscanner from '../Screens/RC/QRscanner';
import CardDetails from '../Screens/RC/CardDetails';
import BookingStatus from '../Screens/BottomTabs/Bookings/BookingStatus';
import Inconvenience from '../Screens/Details/Inconvenience';
import CompleteBooking from '../Screens/Verification/CompleteBooking';
import Address from '../Screens/BottomTabs/Menu/Address';
import AddAddress from '../Screens/Modals/AddAddress';
import HeaderHelpButton from '../Components/HeaderHelpButton';
import GpsAlert from '../Screens/GPS/GpsAlert';
import LocationHistory from '../Screens/GPS/LocationHistory';
import FuelPump from '../Screens/GPS/FuelPump';
import BuyGps from '../Screens/GPS/BuyGps';
import PlayJourney from '../Screens/GPS/PlayJourney';
import StopsScreen from '../Screens/GPS/StopsScreen';
import QuickFilters from '../Screens/GPS/QuickFilters';
import OwnedGPS from '../Screens/GPS/OwnedGPS';
import PaymentGPS from '../Screens/GPS/PaymentGPS';
import SelectGpsType from '../Screens/GPS/SelectGpsType';
import DeliveryDetails from '../Screens/GPS/DeliveryDetails';
import PurchasingStatus from '../Screens/GPS/PurchasingStatus';
import OrdersPayment from '../Screens/GPS/OrdersPayment';
import GpsRelay from '../Screens/GPS/GpsRelay';
import AddGeozone from '../Screens/GPS/AddGeozone';
import Geozones from '../Screens/GPS/Geozones';
import MyLoadsBottomTabs from './MyLoadsBottomTabs';
import MyGpsBottomTabs from './MyGpsBottomTabs';
import MyTruckBottomTabs from './MyTruckBottomTabs';
import TrackingTruck from '../Screens/GPS/TrackingTruck';

const Stack = createNativeStackNavigator();

const Navigation = ({language}) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    // console.log('routess');
    const setlanguage = async () => {
      const lan = await AsyncStorage.getItem('language');
      const languageId = await AsyncStorage.getItem('languageID');
      if (!lan || !languageId) {
        const defaultLanguage = {
          code: 'en',
          langId: '1',
        };
        await AsyncStorage.setItem('language', defaultLanguage?.code);
        await AsyncStorage.setItem('languageID', defaultLanguage?.langId);
        i18n.changeLanguage(defaultLanguage.code);
      }
    };
    setlanguage();
  }, []);

  function handleBackButton() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  }

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={({route}) => ({
          headerShown: route?.params?.fromMenu ? true : false,
          headerTitleAlign: 'center',
          title: t(Constants.SELECT_LANGUAGE),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        })}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
        listeners={() => ({
          focus: () => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
          },
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Legal Policies"
        component={AllTerms}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          title: route.params?.headerTitle || t(Constants.LEGAL_POLICIES),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        })}
        listeners={() => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        // options={{ headerShown: false }}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          title: t(Constants.VERIFY_NUMBER_TITLE),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={() => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="companyDetails"
        component={CompanyDetails}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Home"
        component={MyTruckBottomTabs}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="LoadHome"
        component={MyLoadsBottomTabs}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="GPSHome"
        component={MyGpsBottomTabs}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="WhatsApp"
        component={WhatsAppAlert}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="viewDetail"
        component={ViewDetail}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="AddLorry"
        component={AddLorry}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: 'Add Truck',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="FindLoads"
        component={FindLoads}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.RESULTS),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="PostLoads"
        component={PostLoads}
        options={{
          headerShown: true,
          title: 'Post Load +',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="PostSuccess"
        component={LoadPostSuccessfull}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="FindLoadResult"
        component={FindLoadResult}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          title: t(Constants.RESULTS),
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Contactus"
        component={ContactUs}
        options={{
          headerShown: true,
          title: t(Constants.CONTACT_US),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerBackground: () => (
            <LinearGradient
              // colors={[GradientColor1, GradientColor2, GradientColor3]}
              colors={[backgroundColorNew, backgroundColorNew]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{flex: 1}}
            />
          ),
          headerTintColor: '#FFFFFF',
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Guide"
        component={Guide}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.HELP_GUIDE),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.WALLET),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{headerShown: false}}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          title: 'Search Location',
          animation: 'slide_from_right',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Request"
        component={Requests}
        options={{
          title: t(Constants.MY_REQUEST),
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="KYC"
        component={Verification}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.KYC),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="RC Verification"
        component={RCVerification}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.RC_VERIFICATION),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () => {
            const onBackPress = () => {
              navigation.goBack();
              return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
          },
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Address"
        component={Address}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.SAVED_ADDRESS),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="addAddress"
        component={AddAddress}
        options={{
          headerShown: true,
          title: 'Add New Address',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Status"
        component={Status}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Negotiation"
        component={Negotiation}
        options={{
          headerShown: false,
          // presentation: "modal",
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      {/* This is StatusModal screen */}
      <Stack.Screen
        name="StatusModal"
        component={StatusChangeModal}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      {/* This is StatusModal screen */}
      <Stack.Screen
        name="QRScanner"
        component={QRscanner}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Card Details"
        component={CardDetails}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.DOCUMENT_DETAILS),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Booking Status"
        component={BookingStatus}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      {/* <Stack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          animation: 'ios',
          // presentation: 'transparentModal',
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      /> */}
      <Stack.Screen
        name="Previous Bookings"
        component={PreviousBookings}
        options={{
          headerShown: true,
          title: t(Constants.PREVIOUS_BOOKINGS),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="completeBooking"
        component={CompleteBooking}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          title: 'Complete Booking',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="Inconvenience"
        component={Inconvenience}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          title: route.params?.headerTitle || null,
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      {/* GPS */}
      <Stack.Screen
        name="trackingtruck"
        component={TrackingTruck}
        options={({navigation, route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: route.params.name || 'Tracking truck',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            // <HeaderMenuButton
            //   navigation={navigation}
            //   latitude={route?.params?.lat}
            //   longitude={route?.params?.long}
            //   deviceId={route?.params?.deviceId}
            //   name={route?.params?.name}
            // />
            <HeaderHelpButton
              shareIcon={true}
              navigation={navigation}
              latitude={route.params.lat}
              longitude={route.params.long}
            />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      {/* <Stack.Screen
        name="GpsSetting"
        component={GpsSetting}
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'GPS Setting',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      /> */}
      <Stack.Screen
        name="GpsAlert"
        component={GpsAlert}
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          title: t(Constants.ALERTS),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="LocationHistory"
        component={LocationHistory}
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          title: t(Constants.HISTORY),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="FuelPump"
        component={FuelPump}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: route.params?.headerTitle || null,
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="BuyGPS"
        component={BuyGps}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: t(Constants.PURCHASE_GPS),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="GpsType"
        component={SelectGpsType}
        options={({route}) => ({
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="paymentGPS"
        component={PaymentGPS}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'Purchase GPS',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: t(Constants.DELIVERY_DETAILS),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          // headerRight: () => (
          //   <HeaderHelpButton shareIcon={false} navigation={navigation} />
          // ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="PlayJourney"
        component={PlayJourney}
        // component={PlayJourneyNew}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: route?.params?.name || 'Play Journey',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="stops"
        component={StopsScreen}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'Stops',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="quickfilters"
        component={QuickFilters}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'Quick filters',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="ownedGPS"
        component={OwnedGPS}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'Owned GPS',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderHelpButton shareIcon={false} navigation={navigation} />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="purchasingStatus"
        component={PurchasingStatus}
        options={({route}) => ({
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="GpsRelay"
        component={GpsRelay}
        options={({route}) => ({
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'transparentModal',
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="Orders & Payment"
        component={OrdersPayment}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.ORDERS_PAYMENT),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />

      <Stack.Screen
        name="AddGeozone"
        component={AddGeozone}
        options={({navigation, route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: route?.params?.name || 'Add Geozone',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerRight: () => (
            <HeaderHelpButton
              shareIcon={false}
              navigation={navigation}
              // latitude={route.params.lat}
              // longitude={route.params.long}
            />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
      <Stack.Screen
        name="geozones"
        component={Geozones}
        options={({navigation, route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: route?.params?.name || t(Constants.ALL_GEO),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            fontSize: 16,
          },
          headerRight: () => (
            <HeaderHelpButton
              shareIcon={false}
              navigation={navigation}
              // latitude={route.params.lat}
              // longitude={route.params.long}
            />
          ),
        })}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          focus: () =>
            BackHandler.addEventListener('hardwareBackPress', handleBackButton),
          blur: () =>
            BackHandler.removeEventListener(
              'hardwareBackPress',
              handleBackButton,
            ),
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
