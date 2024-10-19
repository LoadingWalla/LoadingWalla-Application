import React, {useRef, useEffect, useState} from 'react';
import {Animated, BackHandler, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import * as Constants from '../Constants/Constant';
import MyLorry from '../Screens/BottomTabs/Dashboard/MyLorry';
import Booking from '../Screens/BottomTabs/Bookings/Booking';
import Profile from '../Screens/BottomTabs/Menu/Profile';
import HomeActiveIcon from '../../assets/SVG/svg/HomeActiveIcon';
import HomeIcon from '../../assets/SVG/svg/HomeIcon';
import LoadIcon from '../../assets/SVG/svg/LoadIcon';
import LoadActiveIcon from '../../assets/SVG/svg/LoadActiveIcon';
import BookingActiveIcon from '../../assets/SVG/svg/BookingActiveIcon';
import BookingIcon from '../../assets/SVG/svg/BookingIcon';
import DashboardLoad from '../Screens/BottomTabs/Dashboard/DashboardLoad';
import style from './style';
import DashboardActiveIcon from '../../assets/SVG/svg/DashboardActiveIcon';
import DashboardIcon from '../../assets/SVG/svg/DashboardIcon';
import {useTranslation} from 'react-i18next';
import {
  backgroundColorNew,
  GradientColor2,
  tabIndicatorColor,
} from '../Color/color';
import MyGpsScreen from '../Screens/GPS/MyGpsScreen';
import GpsRoadIcon from '../../assets/SVG/svg/GpsRoadIcon';

const Tab = createBottomTabNavigator();

export default function MyLoadsBottomTabs() {
  const [currentTabIndex, setCurrentTabIndex] = useState(2);
  const totalWidth = Dimensions.get('window').width;
  const numberOfTabs = 5;

  // Calculate the width of each tab based on the screen dimensions
  const getWidth = () => totalWidth / numberOfTabs;

  const tabOffsetValue = useRef(
    new Animated.Value(getWidth() * currentTabIndex),
  ).current;
  const navigation = useNavigation();
  const {t} = useTranslation();

  // Back button handler
  function handleBackButton() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  }

  // Set up and clean up the back button handler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  // Function to handle tab press animation
  const handleTabPress = index => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * index,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      handleTabPress(currentTabIndex);
    }, [currentTabIndex]),
  );

  return (
    <Animated.View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Tab.Navigator
        initialRouteName={'Dashboard'}
        backBehavior="history"
        screenOptions={{
          tabBarActiveTintColor: GradientColor2,
          tabBarInactiveTintColor: tabIndicatorColor,
          tabBarStyle: {
            height: 65,
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
        }}>
        <Tab.Screen
          name="My Load"
          component={MyLorry}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <LoadActiveIcon size={20} /> : <LoadIcon size={20} />,
            headerShown: false,
            title: t(Constants.NAV_MY_LOAD),
          }}
          listeners={{
            tabPress: () => setCurrentTabIndex(0),
            focus: () => setCurrentTabIndex(0),
          }}
        />
        <Tab.Screen
          name="GPS"
          component={MyGpsScreen}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <GpsRoadIcon size={22} color={backgroundColorNew} />
              ) : (
                <GpsRoadIcon size={22} color={'#000000'} />
              ),
            headerShown: false,
            title: t(Constants.GPS),
          }}
          listeners={{
            tabPress: () => setCurrentTabIndex(1),
            focus: () => setCurrentTabIndex(1),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardLoad}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
            title: t(Constants.NAV_DASHBOARD),
          }}
          listeners={{
            tabPress: () => setCurrentTabIndex(2),
            focus: () => setCurrentTabIndex(2),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={Booking}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <BookingActiveIcon size={20} />
              ) : (
                <BookingIcon size={20} />
              ),
            headerShown: false,
            title: t(Constants.BOOKINGS),
          }}
          listeners={{
            tabPress: () => setCurrentTabIndex(3),
            focus: () => setCurrentTabIndex(3),
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
            title: t(Constants.MENU),
          }}
          listeners={{
            tabPress: () => setCurrentTabIndex(4),
            focus: () => setCurrentTabIndex(4),
          }}
        />
      </Tab.Navigator>

      {/* Animated indicator for active tab */}
      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </Animated.View>
  );
}
