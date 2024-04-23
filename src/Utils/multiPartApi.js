import axios from 'axios';
import * as URL from './Url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instanceFunction = instanceObj => {
  // Set the AUTH token for any request
  instanceObj.interceptors.request.use(
    async function (config) {
      await AsyncStorage.getItem('auth-token').then(token => {
        // console.log('token', token);
        config.headers['Authorization'] = token ? 'Bearer ' + token : null;
        config.headers['Content-Type'] = 'multipart/form-data';
      });
      // config.headers['Content-Type'] = 'multipart/form-data';
      console.log('header is ', config);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instanceObj.interceptors.response.use(
    function (response) {
      console.log('response', response.data);
      // Any status code that lie within the range of 2xx will come here
      let respObj = {
        data: response.data ? response.data : [],
        status: response.status,
      };
      console.log('responseObject', respObj);
      return respObj;
    },
    function (error) {
      if (error.response && error.response.status) {
        return error.response;
      }
      return Promise.reject(error);
    },
  );

  return instanceObj;
};

const multipartAPI = () => {
  const defaultOptions = {
    baseURL: URL.URL,
    // transformRequest: async (data, headers) => {
    //     if (data !== undefined) {
    //         headers['Content-Type'] = 'multipart/form-data';
    //         await AsyncStorage.getItem('auth-token').then(token => {
    //             headers['authToken'] = token ? token : null;
    //         });

    //         return JSON.stringify(data)
    //     } else {
    //         return data;
    //     }
    // }
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instanceFunction(instance);
};

export default multipartAPI();
