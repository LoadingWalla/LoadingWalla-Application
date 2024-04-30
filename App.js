import './src/locales/index';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/Navigation/router';
import {Provider} from 'react-redux';
import store from './src/Store';
import {NetworkProvider} from './src/Context/NetworkContext';
import {StatusBar} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18n from './src/locales/index';

const App = () => {
  // useEffect(() => {
  //   const setInitialLanguage = async () => {
  //     try {
  //       const language = await AsyncStorage.getItem('language');
  //       if (language) {
  //         // console.log(97987979, language);
  //         i18n.changeLanguage(language);
  //       }
  //     } catch (error) {
  //       console.error('Error setting initial language:', error);
  //     }
  //   };
  //   setInitialLanguage();
  // }, []);
  return (
    <Provider store={store}>
      <NetworkProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </NetworkProvider>
    </Provider>
  );
};

export default App;
