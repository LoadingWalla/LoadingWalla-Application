import {takeLatest} from 'redux-saga/effects';
import * as actions from './../Actions/ActionTypes';
import * as saga from './Saga';

function* rootSaga() {
  yield takeLatest(actions.INIT_LOGIN, saga.authenticate);
  yield takeLatest(actions.INIT_VERIFY_OTP, saga.verifyOtp);
  yield takeLatest(actions.INIT_PROFILE_SETUP, saga.profileSetup);
  yield takeLatest(actions.INIT_ADDLORRY, saga.addLorry);
  yield takeLatest(actions.INIT_LOCATION, saga.location);
  yield takeLatest(actions.INIT_DASHBOARD, saga.dashboard);
  yield takeLatest(actions.INIT_PROFILE, saga.profile);
  yield takeLatest(actions.INIT_LANGUAGE, saga.updateLanguage);
  yield takeLatest(actions.INIT_FIND_LOAD, saga.findLoad);
  yield takeLatest(actions.INIT_MYLOAD, saga.myLoad);
  yield takeLatest(actions.INIT_MYLORRY, saga.myLorry);
  yield takeLatest(actions.INIT_MYLORRY_BY_ID, saga.getSingleLorry);
  yield takeLatest(actions.INIT_MYLOAD_BY_ID, saga.getSingleLoad);
  yield takeLatest(actions.INIT_CONTACTUS, saga.contactus);
  yield takeLatest(actions.INIT_GUIDE, saga.guide);
  yield takeLatest(actions.INIT_BOOKING, saga.booking);
  yield takeLatest(actions.INIT_ACCEPT_REJECT, saga.acceptReject);
  yield takeLatest(actions.INIT_NOTIFICATION, saga.notification);
  yield takeLatest(actions.INIT_MYPOST_LOAD, saga.myPostLoad);
  yield takeLatest(actions.INIT_WALLET, saga.wallet);
  yield takeLatest(actions.INIT_GET_WALLET, saga.getWallet);
  yield takeLatest(actions.INIT_LOGOUT, saga.logout);
  yield takeLatest(actions.INIT_LOAD_TRUCK, saga.loadTrucks);
  yield takeLatest(actions.INIT_USER_PROFILE, saga.getUserProfile);
  yield takeLatest(actions.INIT_STATUS_CHANGE, saga.statusChange);
  yield takeLatest(actions.INIT_FIND_LORRY, saga.findLorry);
  yield takeLatest(actions.INIT_MODAL_LOCATION, saga.modalLocation);
  yield takeLatest(actions.INIT_MODAL_LOCATION_TO, saga.modalLocationTo);
  yield takeLatest(actions.INIT_SEARCH_FROM_ID, saga.searchfromid);
  yield takeLatest(actions.INIT_SEARCH_TO_ID, saga.searchtoid);
  yield takeLatest(actions.INIT_CURRENT_LOCATION, saga.currentLocation);
  yield takeLatest(actions.INIT_LORRY_REQUIRE, saga.lorryRequire);
  yield takeLatest(actions.INIT_DELETE_LORRY, saga.deleteLorryRequest);
  yield takeLatest(actions.INIT_REQUEST_BOOKING, saga.requestBooking);
  yield takeLatest(actions.INIT_ACCEPT_BOOKING, saga.acceptBooking);
  yield takeLatest(actions.INIT_GET_REQUEST_BOOKING, saga.getRequestBooking);
  yield takeLatest(actions.INIT_CANCEL_BOOKING, saga.cancelBookingRequest);
  yield takeLatest(actions.INIT_DOCUMENT_VERIFY, saga.documentUploadRequest);
  yield takeLatest(actions.INIT_RC_VERIFICATION, saga.rcUploadRequest);
  yield takeLatest(actions.INIT_QR_SCANNER, saga.qrCodeScanner);
  yield takeLatest(
    actions.INIT_DOCUMENT_VERIFICATION,
    saga.getDocumentVerification,
  );
  yield takeLatest(actions.FETCH_MAP_DATA_START, saga.fetchMapDataSaga);
  yield takeLatest(actions.CREATE_ORDER_REQUEST, saga.createOrder);
  yield takeLatest(actions.VERIFY_PAYMENT_REQUEST, saga.verifyPayment);
}

export default rootSaga;
