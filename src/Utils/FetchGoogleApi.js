import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {GOOGLE_API_BASE_URL} from './Url';

const instanceFunctionGoogle = instanceObj => {
  // Request interceptor
  instanceObj.interceptors.request.use(
    async config => {
      console.log('Google API Request Interceptor:', config);
      return config;
    },
    error => {
      console.error('Google API Request Interceptor Error:', error);
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instanceObj.interceptors.response.use(
    response => {
      console.log('Google API Response Interceptor:', response);
      return response;
    },
    error => {
      console.error('Google API Response Interceptor Error:', error);

      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        Snackbar.show({
          text: 'Slow Internet Connection.',
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'PlusJakartaSans-SemiBold',
          textColor: '#000000',
          backgroundColor: '#FFD7CC',
        });
      } else if (error.response && error.response.status === 401) {
        Snackbar.show({
          text: 'Unauthorized Access.',
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'PlusJakartaSans-SemiBold',
          textColor: '#000000',
          backgroundColor: '#FFD7CC',
        });
      } else if (error.response && error.response.status === 500) {
        Snackbar.show({
          text: 'Internal Server Error.',
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'PlusJakartaSans-SemiBold',
          textColor: '#000000',
          backgroundColor: '#FFD7CC',
        });
      }

      return Promise.reject(error);
    },
  );

  return instanceObj;
};

const FetchGoogleApi = () => {
  const googleApiClient = {
    baseURL: GOOGLE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      key: 'AIzaSyC_QRJv6btTEpYsBdlsf075Ppdd6Vh-MJE',
    },
  };

  let instance = axios.create(googleApiClient);
  return instanceFunctionGoogle(instance);
};

export default FetchGoogleApi;
