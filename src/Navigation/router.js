import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../Screens/Splash/Splash';
import Signup from '../Screens/Auth/Signup';
import {useTranslation} from 'react-i18next';
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
import {useNavigation} from '@react-navigation/native';
import ViewDetail from '../Screens/Details/ViewDetail';
import PostLoads from '../Screens/Home/PostLoads';
import AddLorry from '../Screens/Home/AddLorry';
import LoadPostSuccessfull from '../Screens/Home/LoadPostSuccessfull';
import Wallet from '../Screens/BottomTabs/Menu/Wallet';
import Guide from '../Screens/BottomTabs/Menu/Guide';
import Rating from '../Screens/BottomTabs/Menu/Rating';
import Verification from '../Screens/Verification/Verification';
import Confirmation from '../Screens/Verification/Confirmation';
import OtpVerification from '../Screens/Verification/OtpVerification';
import Status from '../Screens/RC/Status';
import Negotiation from '../Screens/Modals/Negotiation';
import QRscanner from '../Screens/RC/QRscanner';
import CardDetails from '../Screens/RC/CardDetails';
import BookingStatus from '../Screens/BottomTabs/Bookings/BookingStatus';
import Inconvenience from '../Screens/Details/Inconvenience';
import LoadIcon from '../../assets/SVG/svg/LoadIcon';
import LoadActiveIcon from '../../assets/SVG/svg/LoadActiveIcon';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function getWidth() {
  const totalWidth = Dimensions.get('window').width;
  const numberOfTabs = 4;
  return totalWidth / numberOfTabs;
}

function BottomTabs() {
  const {t} = useTranslation();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  function handleBackButton() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    }
  }

  return (
    <View style={style.flex}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          tabBarStyle: {
            // height: 65,
            height: 55,
            // borderWidth: 1,
            // borderColor: 'red',
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
          name={t(Constants.NAV_HOME)}
          component={Dashboard}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            focus: () =>
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              ),
            blur: () =>
              BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton,
              ),
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
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
            // Onpress Update....
            blur: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.BOOKINGS)}
          component={Booking}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <BookingActiveIcon size={20} />
              ) : (
                <BookingIcon size={20} />
              ),
            headerShown: false,
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            blur: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
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
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </View>
  );
}

function MyLoadsBottomTabs() {
  const {t} = useTranslation();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  function handleBackButton() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    }
  }

  return (
    <View style={style.flex}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          tabBarStyle: {
            // height: 65,
            height: 55,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 10,
            fontFamily: 'PlusJakartaSans-Medium',
          },
        })}>
        <Tab.Screen
          name={t(Constants.NAV_DASHBOARD)}
          component={DashboardLoad}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
            //tabBarButton: CustomTabButton,
          }}
          listeners={({navigation, route}) => ({
            focus: () =>
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              ),
            blur: () =>
              BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton,
              ),
            tabPress: e => {
              const tabIndex = 0;
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * tabIndex,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name={t(Constants.NAV_MY_LOAD)}
          component={MyLorry}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <LoadActiveIcon size={20} /> : <LoadIcon size={20} />,
            headerShown: false,
            // tabBarButton: CustomTabButton,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
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
          })}
        />
        <Tab.Screen
          name={t(Constants.BOOKINGS)}
          component={Booking}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? (
                <BookingActiveIcon size={20} />
              ) : (
                <BookingIcon size={20} />
              ),
            headerShown: false,
            //tabBarButton: CustomTabButton,
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            blur: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
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
            //tabBarButton: CustomTabButton,
          }}
          listeners={({navigation, route}) => ({
            blur: () => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </View>
  );
}

const Navigation = ({language}) => {
  const {i18n} = useTranslation();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  function handleBackButton() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
        {
          text: 'NO',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    }
  }

  useEffect(() => {
    const setlanguage = async () => {
      const lan = await AsyncStorage.getItem('language');
      i18n
        .changeLanguage(
          language === null ? lan : language === lan ? lan : language,
        )
        .then(() => {})
        .catch(err => console.error(err));
    };
    setlanguage();
  }, [i18n, language]);

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
          title: Constants.SELECT_LANGUAGE,
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
          title: route.params?.headerTitle || 'Legal Policies',
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
          title: 'Verify Phone Number',
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
          title: 'Results',
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
          title: 'Results',
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
          title: 'Contact Us',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PlusJakartaSans-Bold',
          },
          headerBackground: () => (
            <LinearGradient
              colors={[GradientColor1, GradientColor2, GradientColor3]}
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
          title: 'Help Guide',
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
          title: 'My Requests',
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
        name="Card Details"
        component={CardDetails}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          title: 'Document Details',
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
      <Stack.Screen
        name="Previous Bookings"
        component={PreviousBookings}
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
        name="verifyLoadOtp"
        component={OtpVerification}
        options={({route}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          title: 'Verify OTP',
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
    </Stack.Navigator>
  );
};

export default Navigation;
