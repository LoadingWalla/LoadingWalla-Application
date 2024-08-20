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
  patch: (url, data, username, password) =>
    traceApi.patch(url, data, {
      headers: {
        Authorization: createAuthHeader(username, password),
      },
    }),
  delete: (url, data, username, password) =>
    traceApi.delete(url, {
      data,
      headers: {
        Authorization: createAuthHeader(username, password),
      },
    }),
};

export default gpsApi;

// Create an Axios instance
// const createTraceApi = baseURL => {
//   return axios.create({
//     baseURL: baseURL,
//     maxBodyLength: Infinity,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

// // Create instances for each base URL
// const traceApi1 = createTraceApi(traccarApi);
// const traceApi2 = createTraceApi(traccarApi2);

// // Function to create Authorization header dynamically
// const createAuthHeader = (username, password) => {
//   const authString = Buffer.from(`${username}:${password}`).toString('base64');
//   return `Basic ${authString}`;
// };

// // Function to handle requests with retry mechanism
// const requestWithRetry = async (method, url, data, username, password) => {
//   const authHeader = createAuthHeader(username, password);

//   // Define a helper function to make requests
//   const makeRequest = api => {
//     const options = {
//       method: method,
//       url: url,
//       headers: {
//         Authorization: authHeader,
//       },
//       ...(data && {data: data}), // Add data only if it's provided
//     };
//     return api(options);
//   };

//   try {
//     // Try the first API
//     return await makeRequest(traceApi1);
//   } catch (error) {
//     console.error(
//       'Failed to connect to primary API, retrying with secondary API:',
//       error,
//     );
//     try {
//       // Fallback to the second API if the first fails
//       return await makeRequest(traceApi2);
//     } catch (secondError) {
//       console.error('Failed to connect to secondary API:', secondError);
//       throw secondError; // Rethrow the error after both attempts fail
//     }
//   }
// };

// // Helper functions for different HTTP methods
// const gpsApi = {
//   get: (url, username, password) =>
//     requestWithRetry('get', url, null, username, password),
//   post: (url, data, username, password) =>
//     requestWithRetry('post', url, data, username, password),
//   put: (url, data, username, password) =>
//     requestWithRetry('put', url, data, username, password),
//   delete: (url, data, username, password) =>
//     requestWithRetry('delete', url, data, username, password),
// };

// export default gpsApi;
