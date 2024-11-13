import {Buffer} from 'buffer';
global.Buffer = Buffer;
import axios from 'axios';
import {URL} from './Url';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance without the Authorization header
const traceApi = axios.create({
  baseURL: URL,
  maxBodyLength: Infinity,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Function to create Authorization header dynamically
traceApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('auth-token'); // Retrieve the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Helper functions for different HTTP methods
const notifSettingApi = {
  get: url => traceApi.get(url),
  post: (url, data) => {
    const formData = new FormData();

    // Convert each key-value pair in data to form-data format
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    console.log(
      '----------- form-data to be send in post request ---------->',
      formData,
    );

    return traceApi.post(url, formData);
  },
  put: (url, data) => traceApi.put(url, data),
  patch: (url, data) => traceApi.patch(url, data),
  delete: (url, data) => traceApi.delete(url, {data}),
};
export default notifSettingApi;
