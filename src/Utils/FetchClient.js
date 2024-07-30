// import axios from 'axios';
// import * as URL from './Url';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {navigate} from '../Navigation/NavigationService';
// import Snackbar from 'react-native-snackbar';

// const instanceFunction = instanceObj => {
//   console.log(44444);
//   instanceObj.interceptors.request.use(
//     async config => {
//       console.log('heeeeeee');
//       try {
//         const token = await AsyncStorage.getItem('auth-token');
//         console.log('token', token);
//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         console.log(77777, config);
//         return config;
//       } catch (error) {
//         console.error('Error in request interceptor:', error);
//         return config;
//       }
//     },
//     error => Promise.reject(error),
//   );

//   // Add a response interceptor
//   instanceObj.interceptors.response.use(
//     function (response) {
//       console.log('fetch client', response);
//       // Any status code that lie within the range of 2xx will come here
//       let respObj = {
//         data: response.data ? response.data : [],
//         status: response.status,
//       };
//       return respObj;
//     },
//     async function (error) {
//       // console.log('fetch Client', error);
//       if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
//         console.log('Network Request', error);
//         Snackbar.show({
//           text: 'Slow Internet Connection.',
//           duration: Snackbar.LENGTH_LONG,
//           fontFamily: 'PlusJakartaSans-SemiBold',
//           textColor: '#000000',
//           backgroundColor: '#FFD7CC',
//           // action: {
//           //   text: 'Retry',
//           //   textColor: '#FF0402',
//           //   onPress: () => {},
//           // },
//         });
//       } else if (error.response && error.response.status === 401) {
//         // }else if (error.response.status === 401 || error.response.status === 403){
//         await AsyncStorage.removeItem('UserType');
//         await AsyncStorage.removeItem('auth-token');
//         navigate('Signup');
//       } else if (error.response && error.response.status === 500) {
//         // Internal server error
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

// const fetchClient = () => {
//   const defaultOptions = {
//     baseURL: URL.URL,
//     timeout: 10000,
//     retry: 3, // Add retry count
//     retryDelay: 5000, // Add retry delay in ms
//     headers: {
//       'content-type': 'application/json',
//     },
//   };
//   // Create instance
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

// export const multipartAPI = () => {
//   const defaultOptions = {
//     baseURL: URL.URL,
//     timeout: 5000,
//     headers: {
//       'content-type': 'multipart/form-data',
//       // authToken: AsyncStorage.getItem('auth-token'),
//     },
//   };

//   // Create instance
//   let instance = axios.create(defaultOptions);

//   return instanceFunction(instance);
// };

// // THIS IS FOR SWITHCHING URL FOR EVERYAPI CALL
// import axios from 'axios';
// import * as URL from './Url';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {navigate} from '../Navigation/NavigationService';
// import Snackbar from 'react-native-snackbar';

// const instanceFunction = instanceObj => {
//   instanceObj.interceptors.request.use(
//     async config => {
//       try {
//         const token = await AsyncStorage.getItem('auth-token');
//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//       } catch (error) {
//         console.error('Error in request interceptor:', error);
//         return config;
//       }
//     },
//     error => Promise.reject(error),
//   );

//   instanceObj.interceptors.response.use(
//     function (response) {
//       let respObj = {
//         data: response.data ? response.data : [],
//         status: response.status,
//       };
//       return respObj;
//     },
//     async function (error) {
//       if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
//         Snackbar.show({
//           text: 'Slow Internet Connection.',
//           duration: Snackbar.LENGTH_LONG,
//           fontFamily: 'PlusJakartaSans-SemiBold',
//           textColor: '#000000',
//           backgroundColor: '#FFD7CC',
//         });
//       } else if (error.response && error.response.status === 401) {
//         await AsyncStorage.removeItem('UserType');
//         await AsyncStorage.removeItem('auth-token');
//         navigate('Signup');
//       } else if (error.response && error.response.status === 500) {
//         Snackbar.show({
//           text: 'Internal Server Error.',
//           duration: Snackbar.LENGTH_LONG,
//           fontFamily: 'PlusJakartaSans-SemiBold',
//           textColor: '#000000',
//           backgroundColor: '#FFD7CC',
//         });
//       }

//       const config = error.config;
//       // console.log(3333, config);
//       if (!config || !config.retry) {
//         return Promise.reject(error);
//       }

//       config.__retryCount = config.__retryCount || 0;

//       if (config.__retryCount >= config.retry) {
//         if (config.baseURL === URL.URL) {
//           config.baseURL = URL.NEWURL;
//           config.__retryCount = 0; // Reset retry count for the new URL
//           // console.log(444444, config.baseURL);
//         } else {
//           return Promise.reject(error);
//         }
//       }

//       config.__retryCount += 1;

//       await new Promise(res => setTimeout(res, config.retryDelay));
//       return instanceObj(config);
//     },
//   );

//   return instanceObj;
// };

// const fetchClient = () => {
//   const defaultOptions = {
//     baseURL: URL.URL,
//     timeout: 10000,
//     retry: 3,
//     retryDelay: 5000,
//     headers: {
//       'content-type': 'application/json',
//     },
//   };

//   let instance = axios.create(defaultOptions);
//   return instanceFunction(instance);
// };

// export default fetchClient();

// export const multipartAPI = () => {
//   const defaultOptions = {
//     baseURL: URL.URL,
//     timeout: 5000,
//     headers: {
//       'content-type': 'multipart/form-data',
//     },
//   };

//   let instance = axios.create(defaultOptions);
//   return instanceFunction(instance);
// };

////
import axios from 'axios';
import * as URL from './Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../Navigation/NavigationService';
import Snackbar from 'react-native-snackbar';

// Function to get the current base URL from AsyncStorage
const getCurrentBaseUrl = async () => {
  try {
    const storedUrl = await AsyncStorage.getItem('base-url');
    console.log('Current Base URL from AsyncStorage:', storedUrl);
    return storedUrl || URL.URL;
  } catch (error) {
    console.error('Error getting base URL from AsyncStorage:', error);
    return URL.URL;
  }
};

// Function to set the current base URL in AsyncStorage
const setCurrentBaseUrl = async url => {
  try {
    console.log('Setting Base URL to AsyncStorage:', url);
    await AsyncStorage.setItem('base-url', url);
  } catch (error) {
    console.error('Error setting base URL to AsyncStorage:', error);
  }
};

const instanceFunction = instanceObj => {
  instanceObj.interceptors.request.use(
    async config => {
      console.log('Request Interceptor:', config);
      try {
        const token = await AsyncStorage.getItem('auth-token');
        // console.log('Auth Token:', token);
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        console.error('Error in request interceptor:', error);
        return config;
      }
    },
    error => {
      console.error('Request Interceptor Error:', error);
      return Promise.reject(error);
    },
  );

  instanceObj.interceptors.response.use(
    function (response) {
      console.log('Response Interceptor:', response);
      let respObj = {
        data: response.data ? response.data : [],
        status: response.status,
      };
      return respObj;
    },
    async function (error) {
      console.error('Response Interceptor Error:', error);
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
        console.log('Network Request Error:', error);
        Snackbar.show({
          text: 'Slow Internet Connection.',
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'PlusJakartaSans-SemiBold',
          textColor: '#000000',
          backgroundColor: '#FFD7CC',
        });
      } else if (error.response && error.response.status === 401) {
        console.log('Unauthorized Error:', error.response);
        await AsyncStorage.removeItem('UserType');
        await AsyncStorage.removeItem('auth-token');
        navigate('Signup');
      } else if (error.response && error.response.status === 500) {
        console.log('Internal Server Error:', error.response);
        Snackbar.show({
          text: 'Internal Server Error.',
          duration: Snackbar.LENGTH_LONG,
          fontFamily: 'PlusJakartaSans-SemiBold',
          textColor: '#000000',
          backgroundColor: '#FFD7CC',
        });
      }

      const config = error.config;
      if (!config || !config.retry) {
        console.log('No Retry Config Found:', config);
        return Promise.reject(error);
      }

      config.__retryCount = config.__retryCount || 0;
      console.log('Retry Count:', config.__retryCount);

      if (config.__retryCount >= config.retry) {
        const currentUrl = await getCurrentBaseUrl();
        const newUrl = currentUrl === URL.URL ? URL.NEWURL : URL.URL;
        console.log('Switching Base URL:', newUrl);
        await setCurrentBaseUrl(newUrl);

        config.baseURL = newUrl;
        config.__retryCount = 0; // Reset retry count for the new URL

        return instanceObj(config);
      }

      config.__retryCount += 1;
      console.log('Retrying Request:', config.__retryCount);

      await new Promise(res => setTimeout(res, config.retryDelay));
      return instanceObj(config);
    },
  );

  return instanceObj;
};

const fetchClient = axios.create();

const initializeFetchClient = async () => {
  const baseURL = await getCurrentBaseUrl();
  console.log('Fetch Client Base URL:', baseURL);

  const defaultOptions = {
    baseURL: baseURL,
    timeout: 10000,
    retry: 3,
    retryDelay: 5000,
    headers: {
      'content-type': 'application/json',
    },
  };

  fetchClient.defaults.baseURL = defaultOptions.baseURL;
  fetchClient.defaults.timeout = defaultOptions.timeout;
  fetchClient.defaults.retry = defaultOptions.retry;
  fetchClient.defaults.retryDelay = defaultOptions.retryDelay;
  fetchClient.defaults.headers = defaultOptions.headers;

  instanceFunction(fetchClient);
  console.log('Axios instance created and configured:', fetchClient);
};

initializeFetchClient()
  .then(() => {
    console.log('Fetch Client Instance Initialized');
  })
  .catch(error => {
    console.error('Error Initializing Fetch Client Instance:', error);
  });

export default fetchClient;

export const multipartAPI = async () => {
  const baseURL = await getCurrentBaseUrl();
  console.log('Multipart API Base URL:', baseURL);

  const defaultOptions = {
    baseURL: baseURL,
    timeout: 5000,
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  let instance = axios.create(defaultOptions);
  return instanceFunction(instance);
};
