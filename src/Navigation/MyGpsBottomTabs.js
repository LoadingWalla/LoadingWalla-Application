import React, {useRef, useEffect, useState} from 'react';
import {Animated, BackHandler, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
  const [currentTabIndex, setCurrentTabIndex] = useState(1);
  const totalWidth = Dimensions.get('window').width;
  const numberOfTabs = 3;

  // Calculate the width of each tab based on the screen dimensions
  const getWidth = () => totalWidth / numberOfTabs;

  const tabOffsetValue = useRef(
    new Animated.Value(getWidth() * currentTabIndex),
  ).current;
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

  useFocusEffect(
    React.useCallback(() => {
      handleTabPress(currentTabIndex);
    }, [currentTabIndex]),
  );

  return (
    <Animated.View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Tab.Navigator
        initialRouteName={'MyGPS'}
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
            tabPress: () => setCurrentTabIndex(0),
            focus: () => setCurrentTabIndex(0),
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
            tabPress: () => setCurrentTabIndex(1),
            focus: () => setCurrentTabIndex(1),
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
            tabPress: () => setCurrentTabIndex(2),
            focus: () => setCurrentTabIndex(2),
          }}
        />
      </Tab.Navigator>

      <Animated.View
        style={style.animatedViewStyle(getWidth, tabOffsetValue)}
      />
    </Animated.View>
  );
}
