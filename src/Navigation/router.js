import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../Screens/Splash/Splash';
import Signup from '../Screens/Auth/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Animated, BackHandler, Dimensions, View} from 'react-native';
import Language from '../Screens/Language/Language';
import * as Constants from '../Constants/Constant';
import AllTerms from '../Screens/Details/AllTerms';
import VerifyOtp from '../Screens/Auth/VerifyOtp';
import Landing from './Landing';
import CompanyDetails from '../Screens/Details/CompanyDetails';
import style from './style';
import DashboardActiveIcon from '../../assets/SVG/svg/DashboardActiveIcon';
import DashboardIcon from '../../assets/SVG/svg/DashboardIcon';
import TruckActiveIcon from '../../assets/SVG/svg/TruckActiveIcon';
import TruckIcon from '../../assets/SVG/svg/TruckIcon';
import BookingActiveIcon from '../../assets/SVG/svg/BookingActiveIcon';
import BookingIcon from '../../assets/SVG/svg/BookingIcon';
import HomeActiveIcon from '../../assets/SVG/svg/HomeActiveIcon';
import HomeIcon from '../../assets/SVG/svg/HomeIcon';
import {
  backgroundColorNew,
  GradientColor1,
  GradientColor2,
  GradientColor3,
  tabIndicatorColor,
} from '../Color/color';
import Dashboard from '../Screens/BottomTabs/Dashboard/Dashboard';
import MyLorry from '../Screens/BottomTabs/Dashboard/MyLorry';
import Booking from '../Screens/BottomTabs/Bookings/Booking';
import Profile from '../Screens/BottomTabs/Menu/Profile';
import DashboardLoad from '../Screens/BottomTabs/Dashboard/DashboardLoad';
import WhatsAppAlert from '../Screens/BottomTabs/Menu/WhatsAppAlert';
import PreviousBookings from '../Screens/BottomTabs/Bookings/PreviousBookings';
import LinearGradient from 'react-native-linear-gradient';
import ContactUs from '../Screens/BottomTabs/Menu/ContactUs';
import Notification from '../Screens/Details/Notification';
import Search from '../Screens/BottomTabs/Dashboard/Search';
import FindLoads from '../Screens/Home/FindLoads';
import FindLoadResult from '../Screens/BottomTabs/Dashboard/FindLoadResult';
import RCVerification from '../Screens/RC/RCVerification';
import StatusChangeModal from '../Screens/Modals/StatusChangeModal';
import Requests from '../Screens/Requests/Requests';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import LoadIcon from '../../assets/SVG/svg/LoadIcon';
import LoadActiveIcon from '../../assets/SVG/svg/LoadActiveIcon';
import CompleteBooking from '../Screens/Verification/CompleteBooking';
import i18n from '../locales/i18n';
import {useTranslation} from 'react-i18next';
import Address from '../Screens/BottomTabs/Menu/Address';
import AddAddress from '../Screens/Modals/AddAddress';
import HeaderHelpButton from '../Components/HeaderHelpButton';
import GpsSetting from '../Screens/GPS/GpsSetting';
import GpsAlert from '../Screens/GPS/GpsAlert';
import LocationHistory from '../Screens/GPS/LocationHistory';
import TrackingTruck from '../Screens/GPS/TrackingTruck';
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
import TabBar from './BottomTabComponent/TabBar';
import GPSHomePage from '../Screens/GPS/GPSHomePage';
import MyGpsScreen from '../Screens/GPS/MyGpsScreen';
import OrdersPayment from '../Screens/GPS/OrdersPayment';
import GpsRoadIcon from '../../assets/SVG/svg/GpsRoadIcon';
import Geofencing from '../Screens/GPS/Geofencing';
import HeaderMenuButton from '../Components/HeaderMenuButton';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  function getWidth() {
    const totalWidth = Dimensions.get('window').width;
    const numberOfTabs = 5;
    return totalWidth / numberOfTabs;
  }
  const tabOffsetValue = useRef(new Animated.Value(getWidth() * 2)).current;
  const navigation = useNavigation();
  const {t} = useTranslation();

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
    <Animated.View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Tab.Navigator
        initialRouteName={t(Constants.NAV_HOME)}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          // tabBarActiveBackgroundColor: 'pink',
          // tabBarInactiveBackgroundColor: '#ccc',
          // tabBarItemStyle: {borderWidth: 1},
          // sceneContainerStyle: {},
          // backBehavior: {},
          // tabBarBadge: 5,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 10,
            fontFamily: 'PlusJakartaSans-SemiBold',
            alignItems: 'center',
            justifyContent: 'center',
            // borderWidth: 1,
          },
        })}>
        <Tab.Screen
          name={t(Constants.NAV_MY_LORRY)}
          component={MyLorry}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <TruckActiveIcon size={25} /> : <TruckIcon size={25} />,
            headerShown: false,
            // tabBarButton: CustomTabButton,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={'GPS'}
          component={MyGpsScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <GpsRoadIcon size={22} color={backgroundColorNew} />
              ) : (
                <GpsRoadIcon size={22} color={'#000000'} />
              ),
            headerShown: false,
            // tabBarButton: CustomTabButton,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.NAV_HOME)}
          component={Dashboard}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            blur: () => {
              BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name={t(Constants.BOOKINGS)}
          component={Booking}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <BookingActiveIcon size={23} />
              ) : (
                <BookingIcon size={20} />
              ),
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.MENU)}
          component={Profile}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <DashboardActiveIcon size={20} />
              ) : (
                <DashboardIcon size={20} />
              ),
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFFDFD',
            },
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </Animated.View>
  );
}

function MyLoadsBottomTabs() {
  const totalWidth = Dimensions.get('window').width;
  const numberOfTabs = 5;

  function getWidth() {
    return totalWidth / numberOfTabs;
  }

  const tabOffsetValue = useRef(new Animated.Value(getWidth() * 2)).current;
  const navigation = useNavigation();
  const {t} = useTranslation();

  function handleBackButton() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Animated.View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Tab.Navigator
        initialRouteName={t(Constants.NAV_DASHBOARD)}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 10,
            fontFamily: 'PlusJakartaSans-Medium',
          },
        })}>
        <Tab.Screen
          name={t(Constants.NAV_MY_LOAD)}
          component={MyLorry}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <LoadActiveIcon size={20} /> : <LoadIcon size={20} />,
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={'GPS'}
          component={MyGpsScreen}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <GpsRoadIcon size={22} color={backgroundColorNew} />
              ) : (
                <GpsRoadIcon size={22} color={'#000000'} />
              ),
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.NAV_DASHBOARD)}
          component={DashboardLoad}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            blur: () => {
              BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.BOOKINGS)}
          component={Booking}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <BookingActiveIcon size={20} />
              ) : (
                <BookingIcon size={20} />
              ),
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.MENU)}
          component={Profile}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <DashboardActiveIcon size={20} />
              ) : (
                <DashboardIcon size={20} />
              ),
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFFDFD',
            },
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </Animated.View>
  );
}

function MyGpsBottomTabs() {
  function getWidth() {
    const totalWidth = Dimensions.get('window').width;
    const numberOfTabs = 3;
    return totalWidth / numberOfTabs;
  }

  const tabOffsetValue = useRef(new Animated.Value(getWidth() * 1)).current;
  const navigation = useNavigation();
  const {t} = useTranslation();

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
    <Animated.View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Tab.Navigator
        initialRouteName={'GPS'}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          // tabBarActiveBackgroundColor: 'pink',
          // tabBarInactiveBackgroundColor: '#ccc',
          // tabBarItemStyle: {borderWidth: 1},
          // sceneContainerStyle: {},
          // backBehavior: {},
          // tabBarBadge: 5,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 10,
            fontFamily: 'PlusJakartaSans-Regular',
            alignItems: 'center',
            justifyContent: 'center',
          },
        })}>
        <Tab.Screen
          name={'MyGPS'}
          component={MyGpsScreen}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <GpsRoadIcon size={22} color={backgroundColorNew} />
              ) : (
                <GpsRoadIcon size={22} color={'#000000'} />
              ),
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={'GPS'}
          component={GPSHomePage}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.MENU)}
          component={Profile}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <DashboardActiveIcon size={20} />
              ) : (
                <DashboardIcon size={20} />
              ),
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFFDFD',
            },
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            tabPress: () => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      {/* <View style={style.animatedContainer}>
        <Animated.View
          style={[
            style.animatedBackground,
            {
              width: getWidth(),
              transform: [{translateX: tabOffsetValue}],
            },
          ]}
        />
      </View> */}
      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </Animated.View>
  );
}

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
        component={BottomTabs}
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
          title: 'Tracking truck',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
            // fontSize: 20,
          },
          headerShadowVisible: false,
          headerRight: () => (
            <HeaderMenuButton
              navigation={navigation}
              latitude={route.params.lat}
              longitude={route.params.long}
              deviceId={route.params.deviceId}
            />
          ),
          // <HeaderHelpButton
          //      shareIcon={false}
          //      navigation={navigation}
          //      // latitude={route.params.lat}
          //      // longitude={route.params.long}
          //    />
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
        name="GpsSetting"
        component={GpsSetting}
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'GPS Setting',
          animation: 'slide_from_bottom',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
        name="GpsAlert"
        component={GpsAlert}
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'Alerts',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
          title: 'History',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
          title: 'Purchase GPS',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
          title: 'Provide delivery details',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'Play Journey',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
        name="Orders & Payment"
        component={OrdersPayment}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: t(Constants.ORDERS_PAYMENT),
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
        name="geofencing"
        component={Geofencing}
        options={({navigation, route}) => ({
          headerShown: true,
          headerTitleAlign: 'left',
          title: 'Geofencing',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
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
