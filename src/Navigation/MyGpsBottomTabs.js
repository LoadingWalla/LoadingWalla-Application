import React, {useRef, useEffect} from 'react';
import {Animated, BackHandler, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import * as Constants from '../Constants/Constant';
import MyGpsScreen from '../Screens/GPS/MyGpsScreen';
import Profile from '../Screens/BottomTabs/Menu/Profile';
import HomeActiveIcon from '../../assets/SVG/svg/HomeActiveIcon';
import HomeIcon from '../../assets/SVG/svg/HomeIcon';
import GpsRoadIcon from '../../assets/SVG/svg/GpsRoadIcon';
import style from './style';
import DashboardActiveIcon from '../../assets/SVG/svg/DashboardActiveIcon';
import DashboardIcon from '../../assets/SVG/svg/DashboardIcon';
import {useTranslation} from 'react-i18next';
import {
  backgroundColorNew,
  GradientColor2,
  tabIndicatorColor,
} from '../Color/color';
import GPSHomePage from '../Screens/GPS/GPSHomePage';

const Tab = createBottomTabNavigator();

export default function MyGpsBottomTabs() {
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

  useEffect(() => {
    console.log('MyGpsBottomTabs');
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

  const handleTabPress = index => {
    Animated.spring(tabOffsetValue, {
      toValue: getWidth() * index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Tab.Navigator
        initialRouteName={'MyGPS'}
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
            fontFamily: 'PlusJakartaSans-Regular',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <Tab.Screen
          name="GPS"
          component={GPSHomePage}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <HomeActiveIcon size={20} /> : <HomeIcon size={20} />,
            headerShown: false,
            title: t(Constants.GPS),
          }}
          listeners={{
            tabPress: () => handleTabPress(0),
          }}
        />
        <Tab.Screen
          name="MyGPS"
          component={MyGpsScreen}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <GpsRoadIcon size={22} color={backgroundColorNew} />
              ) : (
                <GpsRoadIcon size={22} color={'#000000'} />
              ),
            headerShown: false,
            title: t(Constants.MY_GPS),
          }}
          listeners={{
            tabPress: () => handleTabPress(1),
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
            tabPress: () => handleTabPress(2),
          }}
        />
      </Tab.Navigator>

      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </Animated.View>
  );
}
