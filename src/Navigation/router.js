import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../Screens/Splash/Splash';
import Signup from '../Screens/Auth/Signup';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Animated, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Language from '../Screens/Language/Language';
import * as Constants from '../Constants/Constant';
import AllTerms from '../Screens/Details/AllTerms';
import VerifyOtp from '../Screens/Auth/VerifyOtp';

const Stack = createNativeStackNavigator();

const Navigation = ({language}) => {
  const {i18n} = useTranslation();
  const navigation = useNavigation();

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

  const tabOffsetValue = useRef(new Animated.Value(0)).current;

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
            }).start(),
              BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackButton,
              );
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
    </Stack.Navigator>
  );
};

export default Navigation;
