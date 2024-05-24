import React, {useEffect, useRef} from 'react';
import {View, StatusBar, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {backgroundColorNew} from '../../Color/color';
import LottieView from 'lottie-react-native';

const Splash = ({navigation: {replace}}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getUserStatus = async () => {
      const newUser = await AsyncStorage.getItem('new_user');
      const userType = await AsyncStorage.getItem('UserType');
      const userId = await AsyncStorage.getItem('user_id');

      // Delayed navigation logic
      setTimeout(() => {
        if (newUser === '0') {
          if (userType === null || userType === undefined || userType === '') {
            return replace('Signup');
          }
          if (userType === '2') {
            replace('Home');
          } else {
            replace('LoadHome');
          }
          return;
        }
        if (newUser === '1') {
          replace('companyDetails', {userId});
        } else {
          replace('Language');
        }
      }, 3000);
    };

    getUserStatus();

    // Start the fade-in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [replace, opacity]);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundColorNew}
      />
      <View style={styles.splashContainer}>
        <Animated.Image
          resizeMode="contain"
          style={[styles.splashImage, {opacity}]}
          source={require('../../../assets/Logo.png')}
        />
        {/* <LottieView
          source={require('../../../assets/GIFs/Animation.json')}
          autoPlay
          loop
          resizeMode="contain"
          style={styles.splashImage}
        /> */}
      </View>
    </>
  );
};

export default Splash;
