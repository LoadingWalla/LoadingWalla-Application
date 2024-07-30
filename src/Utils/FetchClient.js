import axios from 'axios';
import * as URL from './Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../Navigation/NavigationService';
import Snackbar from 'react-native-snackbar';

const instanceFunction = instanceObj => {
  console.log(44444);
  instanceObj.interceptors.request.use(
    async config => {
      console.log('heeeeeee');
      try {
        const token = await AsyncStorage.getItem('auth-token');
        console.log('token', token);
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log(77777, config);
        return config;
      } catch (error) {
        console.error('Error in request interceptor:', error);
        return config;
      }
    },
    error => Promise.reject(error),
  );

  // Add a response interceptor
  instanceObj.interceptors.response.use(
    function (response) {
      console.log('fetch client', response);
      // Any status code that lie within the range of 2xx will come here
      let respObj = {
        data: response.data ? response.data : [],
        status: response.status,
      };
      return respObj;
    },
    async function (error) {
      // console.log('fetch Client', error);
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        console.log('Network Request', error);
        Snackbar.show({
          text: 'Slow Internet Connection.',
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'PlusJakartaSans-SemiBold',
          textColor: '#000000',
          backgroundColor: '#FFD7CC',
          // action: {
          //   text: 'Retry',
          //   textColor: '#FF0402',
          //   onPress: () => {},
          // },
        });
      } else if (error.response && error.response.status === 401) {
        // }else if (error.response.status === 401 || error.response.status === 403){
        await AsyncStorage.removeItem('UserType');
        await AsyncStorage.removeItem('auth-token');
        navigate('Signup');
      } else if (error.response && error.response.status === 500) {
        // Internal server error
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
    timeout: 10000,
    retry: 3, // Add retry count
    retryDelay: 5000, // Add retry delay in ms
    headers: {
      'content-type': 'application/json',
    },
  };
  // Create instance
  let instance = axios.create(defaultOptions);
  instance.interceptors.response.use(undefined, async err => {
    const config = err.config;
    if (!config || !config.retry) {
      return Promise.reject(err);
    }

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.__retryCount += 1;

    await new Promise(res => setTimeout(res, config.retryDelay));
    return instance(config);
  });
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

// import axios from 'axios';
// import * as URL from './Url';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {navigate} from '../Navigation/NavigationService';
// import Snackbar from 'react-native-snackbar';

// const getCurrentURL = async () => {
//   try {
//     const storedURL = await AsyncStorage.getItem('current-url');
//     console.log('Current URL from storage:', storedURL);
//     if (storedURL === null) {
//       console.log('Stored URL is null, using default URL:', URL.URL);
//       return URL.URL;
//     }
//     return storedURL || URL.URL;
//   } catch (error) {
//     console.error('Error getting current URL:', error);
//     return URL.URL;
//   }
// };

// const setCurrentURL = async url => {
//   try {
//     await AsyncStorage.setItem('current-url', url);
//     console.log('Set current URL to:', url);
//   } catch (error) {
//     console.error('Error setting current URL:', error);
//   }
// };

// const instanceFunction = instanceObj => {
//   console.log('Setting up interceptors');
//   instanceObj.interceptors.request.use(
//     async config => {
//       console.log('Inside request interceptor');
//       try {
//         const token = await AsyncStorage.getItem('auth-token');
//         console.log('Auth token:', token);
//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         console.log('Request config after adding token:', config);
//         return config;
//       } catch (error) {
//         console.error('Error in request interceptor:', error);
//         return config;
//       }
//     },
//     error => Promise.reject(error),
//   );

//   instanceObj.interceptors.response.use(
//     response => {
//       console.log('Response received:', response);
//       let respObj = {
//         data: response.data ? response.data : [],
//         status: response.status,
//       };
//       return respObj;
//     },
//     async error => {
//       console.error('Response error:', error);
//       if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
//         console.log('Network error:', error);
//         Snackbar.show({
//           text: 'Slow Internet Connection.',
//           duration: Snackbar.LENGTH_LONG,
//           fontFamily: 'PlusJakartaSans-SemiBold',
//           textColor: '#000000',
//           backgroundColor: '#FFD7CC',
//         });

//         const currentURL = await getCurrentURL();
//         if (currentURL === URL.URL) {
//           await setCurrentURL(URL.NEWURL);
//           console.log('Switched to NEWURL due to network error', currentURL);
//         }
//       } else if (error.response && error.response.status === 401) {
//         console.log('Unauthorized error, navigating to Signup');
//         await AsyncStorage.removeItem('UserType');
//         await AsyncStorage.removeItem('auth-token');
//         navigate('Signup');
//       } else if (error.response && error.response.status === 500) {
//         console.log('Internal server error');
//         Snackbar.show({
//           text: 'Internal Server Error.',
//           duration: Snackbar.LENGTH_LONG,
//           fontFamily: 'PlusJakartaSans-SemiBold',
//           textColor: '#000000',
//           backgroundColor: '#FFD7CC',
//         });
//       }
//       return Promise.reject(error);
//     },
//   );

//   return instanceObj;
// };

// const fetchClient = async () => {
//   const currentURL = await getCurrentURL();
//   console.log('Using URL:', currentURL);

//   const defaultOptions = {
//     baseURL: currentURL,
//     timeout: 10000,
//     retry: 3,
//     retryDelay: 5000,
//     headers: {
//       'content-type': 'application/json',
//     },
//   };

//   let instance = axios.create(defaultOptions);

//   instance.interceptors.response.use(undefined, async err => {
//     const config = err.config;
//     if (!config || !config.retry) {
//       return Promise.reject(err);
//     }

//     config.__retryCount = config.__retryCount || 0;

//     if (config.__retryCount >= config.retry) {
//       return Promise.reject(err);
//     }

//     config.__retryCount += 1;

//     await new Promise(res => setTimeout(res, config.retryDelay));
//     return instance(config);
//   });

//   return instanceFunction(instance);
// };

// export default fetchClient();

// export const multipartAPI = async () => {
//   const currentURL = await getCurrentURL();
//   console.log('Using URL for multipart API:', currentURL);

//   const defaultOptions = {
//     baseURL: currentURL,
//     timeout: 5000,
//     headers: {
//       'content-type': 'multipart/form-data',
//     },
//   };

//   let instance = axios.create(defaultOptions);

//   return instanceFunction(instance);
// };
