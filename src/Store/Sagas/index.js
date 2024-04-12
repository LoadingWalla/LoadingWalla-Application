import {takeLatest} from 'redux-saga/effects';
import * as actions from './../Actions/ActionTypes';
import * as saga from './Saga';

function* rootSaga() {
  yield takeLatest(actions.FETCH_PRODUCTS_REQUEST, saga.fetchProductsSaga);
}

export default rootSaga;
