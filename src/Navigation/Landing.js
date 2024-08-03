import React, {useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {CommonActions} from '@react-navigation/native';

const Landing = ({navigation}) => {
  // Used for remove screen from stack
  // const removeStack = () => {
  //   navigation.dispatch(state => {
  //     const routes = state.routes.slice(0, -1);
  //     return CommonActions.reset({
  //       ...state,
  //       index: routes.length - 1,
  //       routes,
  //     });
  //   });
  // };

  const localdata = async () => {
    const userType = await AsyncStorage.getItem('UserType');
    if (userType === '1') {
      navigation.replace('LoadHome');
    } else if (userType === '3') {
      navigation.replace('GPSHome');
    } else {
      navigation.replace('Home');
    }
  };

  useEffect(() => {
    localdata();
  });

  return <View />;
};
export default Landing;
