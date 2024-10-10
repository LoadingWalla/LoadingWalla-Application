import React, {useRef, useEffect} from 'react';
import {Animated, BackHandler, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import * as Constants from '../Constants/Constant';
import MyLorry from '../Screens/BottomTabs/Dashboard/MyLorry';
import Dashboard from '../Screens/BottomTabs/Dashboard/Dashboard';
import Booking from '../Screens/BottomTabs/Bookings/Booking';
import Profile from '../Screens/BottomTabs/Menu/Profile';
import MyGpsScreen from '../Screens/GPS/MyGpsScreen';
import GpsRoadIcon from '../../assets/SVG/svg/GpsRoadIcon';
import HomeActiveIcon from '../../assets/SVG/svg/HomeActiveIcon';
import HomeIcon from '../../assets/SVG/svg/HomeIcon';
import BookingActiveIcon from '../../assets/SVG/svg/BookingActiveIcon';
import BookingIcon from '../../assets/SVG/svg/BookingIcon';
import TruckActiveIcon from '../../assets/SVG/svg/TruckActiveIcon';
import TruckIcon from '../../assets/SVG/svg/TruckIcon';
import DashboardActiveIcon from '../../assets/SVG/svg/DashboardActiveIcon';
import DashboardIcon from '../../assets/SVG/svg/DashboardIcon';
import style from './style';
import {
  backgroundColorNew,
  GradientColor2,
  tabIndicatorColor,
} from '../Color/color';

const Tab = createBottomTabNavigator();

export default function MyTruckBottomTabs() {
  const totalWidth = Dimensions.get('window').width;
  const tabOffsetValue = useRef(new Animated.Value(getWidth(2))).current; // Starts from the third tab
  const navigation = useNavigation();
  const {t} = useTranslation();

  // Function to get width of each tab based on total screen width and number of tabs
  function getWidth(multiplier = 1) {
    const numberOfTabs = 5;
    return (totalWidth / numberOfTabs) * multiplier;
  }

  // Handles hardware back press
  function handleBackButton() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  }

  // Effect to handle back button across the app
  useEffect(() => {
    console.log('MyTruckBottomTabs');
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove(); // Cleanup the listener on unmount
  }, []);

  // Function to handle tab press and animation
  const handleTabPress = index => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth(index),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Tab.Navigator
        initialRouteName={t(Constants.NAV_HOME)}
        screenOptions={{
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
            fontFamily: 'PlusJakartaSans-SemiBold',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <Tab.Screen
          name={t(Constants.NAV_MY_LORRY)}
          component={MyLorry}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <TruckActiveIcon size={25} /> : <TruckIcon size={25} />,
            headerShown: false,
          }}
          listeners={{
            tabPress: () => handleTabPress(0),
          }}
        />
        <Tab.Screen
          name="GPS"
          component={MyGpsScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <GpsRoadIcon
                size={22}
                color={focused ? backgroundColorNew : '#000000'}
              />
            ),
            headerShown: false,
          }}
          listeners={{
            tabPress: () => handleTabPress(1),
          }}
        />
        <Tab.Screen
          name={t(Constants.NAV_HOME)}
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
          }}
          listeners={{
            tabPress: () => handleTabPress(2),
          }}
        />
        <Tab.Screen
          name={t(Constants.BOOKINGS)}
          component={Booking}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <BookingActiveIcon size={23} />
              ) : (
                <BookingIcon size={20} />
              ),
            headerShown: false,
          }}
          listeners={{
            tabPress: () => handleTabPress(3),
          }}
        />
        <Tab.Screen
          name="Menu"
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
            title: t(Constants.MENU)
          }}
          listeners={{
            tabPress: () => handleTabPress(4),
          }}
        />
      </Tab.Navigator>

      {/* Animated sliding indicator */}
      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </Animated.View>
  );
}
