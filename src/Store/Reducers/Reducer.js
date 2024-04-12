import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  loading: false,
  products: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  const {payload, type} = action;
  console.log('Reducer', payload);

  switch (type) {
    case actionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload,
        error: '',
      };
    case actionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
