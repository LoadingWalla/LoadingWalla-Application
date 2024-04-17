import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../Screens/Splash/Splash';
import Signup from '../Screens/Auth/Signup';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Animated, BackHandler, Dimensions, View} from 'react-native';
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
import Home from '../Screens/Details/Home';
import {GradientColor2, tabIndicatorColor} from '../Color/color';
import useHandleBackButton from './useHandleBackButton';
import Dashboard from '../Screens/BottomTabs/Dashboard';
import MyLorry from '../Screens/BottomTabs/MyLorry';
import Booking from '../Screens/BottomTabs/Bookings/Booking';
import Profile from '../Screens/BottomTabs/Menu/Profile';
import DashboardLoad from '../Screens/BottomTabs/DashboardLoad';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function getWidth() {
  const totalWidth = Dimensions.get('window').width;
  const numberOfTabs = 4;
  return totalWidth / numberOfTabs;
}

function BottomTabs() {
  const {t} = useTranslation();
  const handleBackButton = useHandleBackButton();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <View style={style.flex}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          tabBarStyle: {
            height: 55,
            padding: 2,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 10,
            fontFamily: 'PlusJakartaSans-Regular',
          },
        })}>
        <Tab.Screen
          name={t(Constants.NAV_HOME)}
          component={Dashboard}
          options={{
            tabBarIcon: ({focused, color, size}) =>
              focused ? <HomeActiveIcon /> : <HomeIcon />,
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
              const tabIndex = 0;
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
              focused ? <TruckActiveIcon /> : <TruckIcon />,
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
              focused ? <BookingActiveIcon /> : <BookingIcon />,
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
              focused ? <DashboardActiveIcon /> : <DashboardIcon />,
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFFDFD',
            },
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
  const handleBackButton = useHandleBackButton();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <View style={style.flex}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          tabBarStyle: {
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
              focused ? <HomeActiveIcon /> : <HomeIcon />,
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
              focused ? <HomeActiveIcon /> : <HomeIcon />,
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
              focused ? <HomeActiveIcon /> : <HomeIcon />,
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
              focused ? <DashboardActiveIcon /> : <DashboardIcon />,
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
  // const navigation = useNavigation();
  const handleBackButton = useHandleBackButton();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;

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
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
        listeners={() => ({
          // Onpress Update....
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
        })}
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
        name="VerifyOtp"
        component={VerifyOtp}
        // options={{ headerShown: false }}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          title: 'Verify Phone Number',
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
        name="Home"
        component={BottomTabs}
        // component={Home}
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
        name="LoadHome"
        component={MyLoadsBottomTabs}
        // component={LoadHome}
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
    </Stack.Navigator>
  );
};

export default Navigation;
