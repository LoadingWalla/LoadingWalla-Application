import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import pn from './pn.json';
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    hi: hi,
    pn: pn,
  },
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
export default i18n;
