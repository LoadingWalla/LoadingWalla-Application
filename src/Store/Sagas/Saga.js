import {call, put} from 'redux-saga/effects';
import * as actions from '../Actions/Actions';
import {fetchProducts} from '../../Utils/FetchClient';

export function* fetchProductsSaga() {
  try {
    const products = yield call(fetchProducts);
    console.log('saga', products);
    yield put(actions.fetchProductsSuccess(products));
  } catch (e) {
    yield put(actions.fetchProductsFailure(e.message));
  }
}
