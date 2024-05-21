import React, {useEffect, useRef} from 'react';
import {View, StatusBar, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {backgroundColorNew} from '../../Color/color';

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
          // replace('Language');
          replace('Signup');
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
      </View>
    </>
  );
};

export default Splash;

// import React from 'react';
// import {View, Text, Button} from 'react-native';
// import {useTranslation} from 'react-i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Constants from '../../Constants/Constant';

// const Splash = ({navigation}) => {
//   const {t, i18n} = useTranslation();

//   const changeLanguage = async language => {
//     try {
//       await AsyncStorage.setItem('language', language);
//       i18n.changeLanguage(language);
//     } catch (error) {
//       console.error('Error changing language:', error);
//     }
//   };

//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text
//         style={{
//           color: '#000000',
//           fontSize: 20,
//           fontFamily: 'PlusJakartaSans-SemiBold',
//         }}>
//         {t(Constants.LOADING_WALLA)}
//       </Text>
//       <Button title="Hindi" onPress={() => changeLanguage('hi')} />
//       <Button title="English" onPress={() => changeLanguage('en')} />
//     </View>
//   );
// };

// export default Splash;
