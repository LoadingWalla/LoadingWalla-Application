import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './en.json';
import hi from './hi.json';

const loadResourcesAndInitI18n = async () => {
  const storedLang = await AsyncStorage.getItem('language');

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: storedLang,
    fallbackLng: 'en',
    resources: {
      en: {translation: en},
      hi: {translation: hi},
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
  return i18n;
};

export default loadResourcesAndInitI18n();
