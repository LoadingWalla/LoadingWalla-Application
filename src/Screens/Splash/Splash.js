import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import LottieView from 'lottie-react-native';

const Splash = ({navigation: {replace}}) => {
  useTrackScreenTime('Splash');

  useEffect(() => {
    const getUserStatus = async () => {
      const newUser = await AsyncStorage.getItem('new_user');
      const userType = await AsyncStorage.getItem('UserType');
      const userId = await AsyncStorage.getItem('user_id');

      setTimeout(() => {
        if (newUser === '0') {
          if (userType === null || userType === undefined || userType === '') {
            return replace('Signup');
          }
          if (userType === '2') {
            replace('Home');
          } else if (userType === '3') {
            replace('GPSHome');
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
      }, 6900);
    };

    getUserStatus();
  }, [replace]);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.splashContainer}>
        <LottieView
          source={require('../../../assets/GIFs/LoadingWallaSplashScreen.json')}
          autoPlay
          loop={false}
          style={styles.splashImage}
        />
      </View>
    </>
  );
};

export default Splash;
