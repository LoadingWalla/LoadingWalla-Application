import axios from 'axios';
import {URL} from './Url';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(URL);
    console.log('fetch client', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
