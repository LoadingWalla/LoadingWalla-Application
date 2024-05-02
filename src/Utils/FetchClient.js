import axios from 'axios';
import * as URL from './Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../Navigation/NavigationService';
import Snackbar from 'react-native-snackbar';

const instanceFunction = instanceObj => {
  // Set the AUTH token for any request
  instanceObj.interceptors.request.use(
    async function (config) {
      await AsyncStorage.getItem('auth-token').then(token => {
        config.headers['Authorization'] = token ? 'Bearer ' + token : null;
      });
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instanceObj.interceptors.response.use(
    function (response) {
      console.log('fetch client', response.status);
      // Any status code that lie within the range of 2xx will come here
      let respObj = {
        data: response.data ? response.data : [],
        status: response.status,
      };
      return respObj;
    },
    // function (error) {
    //   if (error.response && error.response.status) {
    //     console.log("FETCH CLIENT ERROR", error.response.status);
    //     return error.response;
    //   }
    async function (error) {
      console.log('5454545', error);
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        // console.log('Connection is slow.');
        Snackbar.show({
          text: 'Slow Internet Connection.',
          duration: Snackbar.LENGTH_INDEFINITE,
          fontFamily: 'PlusJakartaSans-SemiBold',
          textColor: '#000000',
          // marginBottom: 10,
          backgroundColor: '#FFD7CC',
          action: {
            text: 'Retry',
            textColor: '#FF0402',
            onPress: () => {
              /* Do something. */
            },
          },
        });
      } else if (error.response && error.response.status === 401) {
        // }else if (error.response.status === 401 || error.response.status === 403){
        // Existing 401 handling code
        await AsyncStorage.removeItem('UserType');
        await AsyncStorage.removeItem('auth-token');
        navigate('Signup');
      } else if (error.response && error.response.status === 500) {
        // Internal server error
        // Handle 500 error here
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

const fetchClient = () => {
  const defaultOptions = {
    baseURL: URL.URL,
  };
  // Create instance
  let instance = axios.create(defaultOptions);
  return instanceFunction(instance);
};

export default fetchClient();

export const multipartAPI = () => {
  const defaultOptions = {
    baseURL: URL.URL,
    timeout: 5000,
    headers: {
      'content-type': 'multipart/form-data',
      // authToken: AsyncStorage.getItem('auth-token'),
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instanceFunction(instance);
};
