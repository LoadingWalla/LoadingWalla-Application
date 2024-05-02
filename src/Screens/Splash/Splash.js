import React, {useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {backgroundColorNew} from '../../Color/color';

const Splash = ({navigation: {replace}}) => {
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
  }, [replace]);

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundColorNew}
      />
      <View style={styles.splashContainer}>
        <Image
          resizeMode="contain"
          style={styles.splashImage}
          source={require('../../../assets/Logo.png')}
        />
      </View>
    </>
  );
};

export default Splash;

// import React, {useEffect} from 'react';
// import {View, Image, StatusBar} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from './style';
// import {backgroundColorNew} from '../../Color/color';

// const Splash = ({navigation: {replace}}) => {
//   useEffect(() => {
//     const getUserStatus = async () => {
//       const newUser = await AsyncStorage.getItem('new_user');
//       const userType = await AsyncStorage.getItem('UserType');
//       const userId = await AsyncStorage.getItem('user_id');

//       if (newUser === '0') {
//         if (userType === null || userType === undefined || userType === '') {
//           return replace('Signup');
//         }
//         if (userType === '2') {
//           replace('Home');
//         } else {
//           replace('LoadHome');
//         }
//         return;
//       }
//       if (newUser === '1') {
//         replace('companyDetails', {userId});
//       } else {
//         replace('Language');
//       }
//     };

//     getUserStatus();
//   }, [replace]);

//   return (
//     <>
//       <StatusBar
//         barStyle={'dark-content'}
//         backgroundColor={backgroundColorNew}
//       />
//       <View style={styles.splashContainer}>
//         <Image
//           resizeMode="contain"
//           style={styles.splashImage}
//           source={require('../../../assets/Logo.png')}
//         />
//       </View>
//     </>
//   );
// };

// export default Splash;
