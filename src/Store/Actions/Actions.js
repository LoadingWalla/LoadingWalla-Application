import * as actionTypes from './ActionTypes';

export const fetchProductsRequest = () => {
  console.log('actions');
  return {
    type: actionTypes.FETCH_PRODUCTS_REQUEST,
  };
};

export const fetchProductsSuccess = products => {
  console.log('actions', products);
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const fetchProductsFailure = error => {
  console.log('actions', error);
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};
