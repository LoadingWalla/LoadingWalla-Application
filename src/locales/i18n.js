import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import hi from './hi.json';

i18n
  .use(initReactI18next) // Passes i18next instance to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      hi: {
        translation: hi,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

// Define a function to set the language dynamically
const loadResources = async () => {
  const storedLang = await AsyncStorage.getItem('language');
  if (storedLang) {
    i18n.changeLanguage(storedLang); // Change language if it's stored
  }
};
loadResources();

export default i18n;
