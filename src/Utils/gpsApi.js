import {Buffer} from 'buffer';
global.Buffer = Buffer;
import axios from 'axios';
import {traccarApi} from './Url';

// Create an Axios instance without the Authorization header
const traceApi = axios.create({
  baseURL: traccarApi,
  maxBodyLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  },
  //   params: {all: true},
});

// Function to create Authorization header dynamically
const createAuthHeader = (username, password) => {
  //   console.log(444, username);
  const authString = Buffer.from(`${username}:${password}`).toString('base64');
  //   console.log(33333, authString);
  return `Basic ${authString}`;
};

// Helper functions for different HTTP methods
const gpsApi = {
  get: (url, username, password) =>
    traceApi.get(url, {
      headers: {
        Authorization: createAuthHeader(username, password),
      },
    }),
  post: (url, data, username, password) =>
    traceApi.post(url, data, {
      headers: {
        Authorization: createAuthHeader(username, password),
      },
    }),
  put: (url, data, username, password) =>
    traceApi.put(url, data, {
      headers: {
        Authorization: createAuthHeader(username, password),
      },
    }),
  //   patch: (url, data, username, password) =>
  //     traceApi.patch(url, data, {
  //       headers: {
  //         Authorization: createAuthHeader(username, password),
  //       },
  //     }),
  delete: (url, data, username, password) =>
    traceApi.delete(url, {
      data,
      headers: {
        Authorization: createAuthHeader(username, password),
      },
    }),
};

export default gpsApi;
