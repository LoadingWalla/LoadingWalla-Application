import * as actionTypes from './ActionTypes';

// Login or Signup Actions
export const initLogin = mobile => ({
  type: actionTypes.INIT_LOGIN,
  mobile,
});

export const loginSuccess = payload => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload,
  };
};

export const loginFailure = payload => ({
  type: actionTypes.LOGIN_FAILURE,
  payload,
});

// Verify Otp Actions
export const initVerifyOtp = (userid, otp, lang, deviceToken) => ({
  type: actionTypes.INIT_VERIFY_OTP,
  userid,
  otp,
  lang,
  deviceToken,
});

export const VerifyOtpSuccess = payload => {
  return {
    type: actionTypes.VERIFY_OTP_SUCCESS,
    payload,
  };
};

export const VerifyOtpFailure = payload => ({
  type: actionTypes.VERIFY_OTP_FAILURE,
  payload,
});

// Profile Setup Actions
export const initProfileSetup = (
  userid,
  name,
  city,
  userType,
  profile_img,
  remove_profile,
) => ({
  type: actionTypes.INIT_PROFILE_SETUP,
  userid,
  name,
  city,
  userType,
  profile_img,
  remove_profile,
});

export const ProfileSetupSuccess = payload => {
  return {
    type: actionTypes.PROFILE_SETUP_SUCCESS,
    payload,
  };
};

export const ProfileSetupFailure = payload => ({
  type: actionTypes.PROFILE_SETUP_FAILURE,
  payload,
});

// Add Lorry Actions
export const initAddLorry = (
  vehiclenumber,
  vehicle,
  vehicleType,
  vehicleCapacity,
  permit,
  // selectedGPSOption
) => ({
  type: actionTypes.INIT_ADDLORRY,

  vehiclenumber,
  vehicle,
  vehicleType,
  vehicleCapacity,
  permit,
  // selectedGPSOption,
});

export const addLorrySuccess = payload => {
  return {
    type: actionTypes.ADDLORRY_SUCCESS,
    payload,
  };
};

export const addLorryFailure = payload => ({
  type: actionTypes.ADDLORRY_FAILURE,
  payload,
});

// LOCATION
export const initLocation = (location, id) => ({
  type: actionTypes.INIT_LOCATION,
  location,
  id,
});

export const locationSuccess = payload => {
  return {
    type: actionTypes.LOCATION_SUCCESS,
    payload,
  };
};

export const locationFailure = payload => ({
  type: actionTypes.LOCATION_FAILURE,
  payload,
});

// DASHBOARD
export const initDashboard = () => ({
  type: actionTypes.INIT_DASHBOARD,
});

export const dashboardSuccess = payload => {
  return {
    type: actionTypes.DASHBOARD_SUCCESS,
    payload,
  };
};

export const dashboardFailure = payload => ({
  type: actionTypes.DASHBOARD_FAILURE,
  payload,
});

// PROFILE
export const initProfile = () => ({
  type: actionTypes.INIT_PROFILE,
});

export const profileSuccess = payload => {
  // console.log(99999, payload);
  return {
    type: actionTypes.PROFILE_SUCCESS,
    payload,
  };
};

export const profileFailure = payload => ({
  type: actionTypes.PROFILE_FAILURE,
  payload,
});

// Language aupdate
export const initLanguage = (langCode, langId) => ({
  type: actionTypes.INIT_LANGUAGE,
  langCode,
  langId,
});

export const languageSuccess = payload => {
  // console.log('language12Actions', payload);
  return {
    type: actionTypes.LANGUAGE_SUCCESS,
    payload,
  };
};

export const languageFailure = payload => ({
  type: actionTypes.LANGUAGE_FAILURE,
  payload,
});

// Post load
export const initFindLoad = (from, to, truck) => ({
  type: actionTypes.INIT_FIND_LOAD,
  from,
  to,
  truck,
});

export const findLoadSuccess = payload => {
  return {
    type: actionTypes.FIND_LOAD_SUCCESS,
    payload,
  };
};
export const findLoadFailure = payload => {
  return {
    type: actionTypes.FIND_LOAD_FAILURE,
    payload,
  };
};

// My Lorry
export const initMyLorry = status => ({
  type: actionTypes.INIT_MYLORRY,
  status,
});

export const myLorrySuccess = payload => {
  return {
    type: actionTypes.MYLORRY_SUCCESS,
    payload,
  };
};

export const myLorryFailure = payload => ({
  type: actionTypes.MYLORRY_FAILURE,
  payload,
});

// My Lorry Using Id
export const initMyLorryById = truck_id => ({
  type: actionTypes.INIT_MYLORRY_BY_ID,
  truck_id,
});
export const myLorryByIdSuccess = payload => {
  return {
    type: actionTypes.MYLORRY_ID_SUCCESS,
    payload,
  };
};
export const myLorryByIdFailure = payload => ({
  type: actionTypes.MYLORRY_ID_FAILURE,
  payload,
});

// My Load Using Id
export const initMyLoadById = load_id => ({
  type: actionTypes.INIT_MYLOAD_BY_ID,
  load_id,
});
export const myLoadByIdSuccess = payload => {
  // console.log(3333, payload);
  return {
    type: actionTypes.MYLOAD_ID_SUCCESS,
    payload,
  };
};
export const myLoadByIdFailure = payload => ({
  type: actionTypes.MYLOAD_ID_FAILURE,
  payload,
});

// Get Request Booking
export const initGetRequestBooking = (load_id, truck_id, request_type) => ({
  type: actionTypes.INIT_GET_REQUEST_BOOKING,
  load_id,
  truck_id,
  request_type,
});

export const getRequestBookingSuccess = payload => {
  return {
    type: actionTypes.INIT_GET_REQUEST_BOOKING_SUCCESS,
    payload,
  };
};
export const getRequestBookingSuccessReceived = payload => {
  // console.log(22222, payload);
  return {
    type: actionTypes.INIT_GET_REQUEST_BOOKING_SUCCESS_RECEIVED,
    payload,
  };
};
export const getRequestBookingSuccessSent = payload => {
  return {
    type: actionTypes.INIT_GET_REQUEST_BOOKING_SUCCESS_SENT,
    payload,
  };
};

export const getRequestBookingFailure = payload => ({
  type: actionTypes.INIT_GET_REQUEST_BOOKING_FAILURE,
  payload,
});

// My Load
export const initMyLoad = status => ({
  type: actionTypes.INIT_MYLOAD,
  status,
});

export const MyLoadSuccess = payload => {
  return {
    type: actionTypes.MYLOAD_SUCCESS,
    payload,
  };
};

export const MyLoadFailure = payload => ({
  type: actionTypes.MYLOAD_FAILURE,
  payload,
});

// Contact us
export const initContactus = (name, email, phone, message) => ({
  type: actionTypes.INIT_CONTACTUS,
  name,
  email,
  phone,
  message,
});

export const contactusSuccess = payload => {
  return {
    type: actionTypes.CONTACTUS_SUCCESS,
    payload,
  };
};

export const contactusFailure = payload => ({
  type: actionTypes.CONTACTUS_FAILURE,
  payload,
});

// Guide
export const initGuide = () => ({
  type: actionTypes.INIT_GUIDE,
});

export const guideSuccess = payload => {
  return {
    type: actionTypes.GUIDE_SUCCESS,
    payload,
  };
};

export const guideFailure = payload => ({
  type: actionTypes.GUIDE_FAILURE,
  payload,
});

// BOOKING
export const initBooking = status => ({
  type: actionTypes.INIT_BOOKING,
  status,
});

export const bookingSuccess = payload => {
  return {
    type: actionTypes.BOOKING_SUCCESS,
    payload,
  };
};

// export const pendingBookingSuccess = (payload) => {
//   return {
//     type: actionTypes.PENDING_BOOKING_SUCCESS,
//     payload,
//   };
// };

// export const ongoingBookingSuccess = (payload) => {
//   return {
//     type: actionTypes.ONGOING_BOOKING_SUCCESS,
//     payload,
//   };
// };

// export const completeBookingSuccess = (payload) => {
//   return {
//     type: actionTypes.COMPLETE_BOOKING_SUCCESS,
//     payload,
//   };
// };

export const bookingFailure = payload => ({
  type: actionTypes.BOOKING_FAILURE,
  payload,
});

export const initRequestBooking = (
  loid,
  trid,
  offered_price,
  price_type,
  old_req_id,
) => ({
  type: actionTypes.INIT_REQUEST_BOOKING,
  loid,
  trid,
  offered_price,
  price_type,
  old_req_id,
});

export const RequestBookingSuccess = payload => {
  return {
    type: actionTypes.REQUEST_BOOKING_SUCCESS,
    payload,
  };
};

export const RequestBookingFailure = payload => ({
  type: actionTypes.REQUEST_BOOKING_FAILURE,
  payload,
});

// ACCEPT BOOKING
export const initAcceptBooking = request_id => ({
  type: actionTypes.INIT_ACCEPT_BOOKING,
  request_id,
});

export const AcceptBookingSuccess = payload => {
  return {
    type: actionTypes.ACCEPT_BOOKING_SUCCESS,
    payload,
  };
};

export const AcceptBookingFailure = payload => ({
  type: actionTypes.ACCEPT_BOOKING_FAILURE,
  payload,
});

// ACCEPT REJECT
export const initAcceptReject = (status, bookingId) => ({
  type: actionTypes.INIT_ACCEPT_REJECT,
  status,
  bookingId,
});

export const acceptRejectSuccess = payload => {
  return {
    type: actionTypes.ACCEPT_REJECT_SUCCESS,
    payload,
  };
};

export const acceptRejectFailure = payload => ({
  type: actionTypes.ACCEPT_REJECT_FAILURE,
  payload,
});

// NOTIFICATION
export const initNotification = (status, bookingId) => ({
  type: actionTypes.INIT_NOTIFICATION,
  bookingId,
  status,
});

export const notificationSuccess = payload => {
  return {
    type: actionTypes.NOTIFICATION_SUCCESS,
    payload,
  };
};

export const notificationFailure = payload => ({
  type: actionTypes.NOTIFICATION_FAILURE,
  payload,
});

// MY POST LOAD
export const initMyPostLoad = (
  afrom,
  ato,
  qty,
  material_name,
  truck_type,
  price,
  price_type,
) => ({
  type: actionTypes.INIT_MYPOST_LOAD,
  afrom,
  ato,
  qty,
  material_name,
  truck_type,
  price,
  price_type,
});

export const myPostLoadSuccess = payload => {
  return {
    type: actionTypes.MYPOST_LOAD_SUCCESS,
    payload,
  };
};

export const myPostLoadFailure = payload => ({
  type: actionTypes.MYPOST_LOAD_FAILURE,
  payload,
});

// Wallet
export const initWallet = amount => ({
  type: actionTypes.INIT_WALLET,
  amount,
});

export const walletSuccess = payload => {
  return {
    type: actionTypes.WALLET_SUCCESS,
    payload,
  };
};

export const walletFailure = payload => ({
  type: actionTypes.WALLET_FAILURE,
  payload,
});

// Get Wallet
export const initGetWallet = amount => ({
  type: actionTypes.INIT_GET_WALLET,
});

export const getWalletSuccess = payload => {
  return {
    type: actionTypes.GET_WALLET_SUCCESS,
    payload,
  };
};

export const getWalletFailure = payload => ({
  type: actionTypes.GET_WALLET_FAILURE,
  payload,
});

// Logout
export const initLogout = amount => ({
  type: actionTypes.INIT_LOGOUT,
});

export const logoutSuccess = payload => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload,
  };
};

export const logoutFailure = payload => ({
  type: actionTypes.LOGOUT_FAILURE,
  payload,
});

// Load Trucks
export const initLoadTrucks = amount => ({
  type: actionTypes.INIT_LOAD_TRUCK,
});

export const loadTrucksSuccess = payload => {
  return {
    type: actionTypes.LOAD_TRUCK_SUCCESS,
    payload,
  };
};

export const loadTrucksFailure = payload => ({
  type: actionTypes.LOAD_TRUCK_FAILURE,
  payload,
});

// Rating
export const initRating = amount => ({
  type: actionTypes.INIT_RATING,
});

export const ratingSuccess = payload => {
  return {
    type: actionTypes.RATING_SUCCESS,
    payload,
  };
};

export const ratingFailure = payload => ({
  type: actionTypes.RATING_FAILURE,
  payload,
});

// Get User Profile
export const initGetUserProfile = id => ({
  type: actionTypes.INIT_USER_PROFILE,
  id,
});

export const getUserProfileSuccess = payload => {
  return {
    type: actionTypes.USER_PROFILE_SUCCESS,
    payload,
  };
};

export const getUserProfileFailure = payload => ({
  type: actionTypes.USER_PROFILE_FAILURE,
  payload,
});

// STATUS CHANGE
export const initStatusChange = (
  trid,
  location1,
  location2,
  status,
  userType,
) => ({
  type: actionTypes.INIT_STATUS_CHANGE,
  trid,
  location1,
  location2,
  status,
  userType,
});

export const statusChangeSuccess = payload => {
  return {
    type: actionTypes.STATUS_CHANGE_SUCCESS,
    payload,
  };
};

export const statusChangeFailure = payload => ({
  type: actionTypes.STATUS_CHANGE_FAILURE,
  payload,
});

// Find Lorry
export const initFindLorry = loid => ({
  type: actionTypes.INIT_FIND_LORRY,
  loid,
});

export const findLorrySuccess = payload => {
  return {
    type: actionTypes.FIND_LORRY_SUCCESS,
    payload,
  };
};

export const findLorryFailure = payload => ({
  type: actionTypes.FIND_LORRY_FAILURE,
  payload,
});

// Modal Location From
export const initlocationChange = location => ({
  type: actionTypes.INIT_MODAL_LOCATION,
  location,
});

export const initsearchFromId = location => ({
  type: actionTypes.INIT_SEARCH_FROM_ID,
  location,
});

export const initsearchToId = location => ({
  type: actionTypes.INIT_SEARCH_TO_ID,
  location,
});

export const locationChangeSuccess = payload => {
  return {
    type: actionTypes.MODAL_LOCATION_SUCCESS,
    payload,
  };
};
export const searchfromidSuccess = payload => {
  return {
    type: actionTypes.SEARCH_FROM_ID_SUCCESS,
    payload,
  };
};
export const searchtoidSuccess = payload => {
  return {
    type: actionTypes.SEARCH_TO_ID_SUCCESS,
    payload,
  };
};
export const modalCloseLocation = () => {
  return {
    type: actionTypes.MODAL_CLOSE_LOCATION,
  };
};
export const locationChangeFromClear = payload => {
  return {
    type: actionTypes.MODAL_LOCATION_CLEAR,
    payload,
  };
};

// Modal Location To
export const initlocationToChange = location => ({
  type: actionTypes.INIT_MODAL_LOCATION_TO,
  location,
});

export const locationChangeToSuccess = payload => {
  return {
    type: actionTypes.MODAL_LOCATION_TO_SUCCESS,
    payload,
  };
};
export const locationChangeToClear = payload => {
  return {
    type: actionTypes.MODAL_LOCATION_TO_CLEAR,
    payload,
  };
};

// Modal Location From
export const initCurrentLocation = (lat, long) => ({
  type: actionTypes.INIT_CURRENT_LOCATION,
  lat,
  long,
});

export const currentLocationSuccess = payload => {
  return {
    type: actionTypes.CURRENT_LOCATION_SUCCESS,
    payload,
  };
};
export const currentLocationFailure = payload => {
  return {
    type: actionTypes.CURRENT_LOCATION_FAILURE,
    payload,
  };
};

// Add Lorry Require Details
export const initLorryRequire = (lat, long) => ({
  type: actionTypes.INIT_LORRY_REQUIRE,
});

export const lorryRegireSuccess = payload => {
  return {
    type: actionTypes.LORRY_REQUIRE_SUCCESS,
    payload,
  };
};
export const lorryRequireFailure = payload => {
  return {
    type: actionTypes.LORRY_REQUIRE_FAILURE,
    payload,
  };
};

// Delete Lorry
export const initDeleteLorry = (lorry_id, userType) => ({
  type: actionTypes.INIT_DELETE_LORRY,
  lorry_id,
  userType,
});

export const deleteLorrySuccess = payload => {
  return {
    type: actionTypes.DELETE_LORRY_SUCCESS,
    payload,
  };
};
export const deleteLorryFailure = payload => {
  return {
    type: actionTypes.DELETE_LORRY_FAILURE,
    payload,
  };
};

// Cancel Booking
export const initCancelBooking = req_id => {
  // console.log(99999, req_id);
  return {
    type: actionTypes.INIT_CANCEL_BOOKING,
    req_id,
  };
};
export const cancelBookingSuccess = payload => {
  // console.log('success', payload);
  return {
    type: actionTypes.CANCEL_BOOKING_SUCCESS,
    payload,
  };
};
export const cancelBookingFailure = payload => {
  // console.log('falil', payload);
  return {
    type: actionTypes.CANCEL_BOOKING_FAILURE,
    payload,
  };
};

// Uploading Aadhar
export const initDocumentVerify = (
  document_number,
  document_type,
  document_file,
) => {
  console.log(22222222222, document_number, document_type, document_file);
  return {
    type: actionTypes.INIT_DOCUMENT_VERIFY,
    document_number,
    document_type,
    document_file,
  };
};
export const documentVerifySuccess = payload => {
  // console.log("success", payload);
  return {
    type: actionTypes.DOCUMENT_UPLOAD_SUCCESS,
    payload,
  };
};
export const documentVerifyFailure = payload => {
  // console.log("failure", payload);
  return {
    type: actionTypes.DOCUMENT_UPLOAD_FAILURE,
    payload,
  };
};

// Uploading rc
export const initRcVerify = (truck_id, rc_document) => {
  // console.log(22222222222, truck_id, rc_document);
  return {
    type: actionTypes.INIT_RC_VERIFICATION,
    truck_id,
    rc_document,
  };
};
export const rcVerifySuccess = payload => {
  // console.log("success", payload);
  return {
    type: actionTypes.RC_VERIFICATION_SUCCESS,
    payload,
  };
};
export const rcVerifyFailure = payload => {
  // console.log("failure", payload);
  return {
    type: actionTypes.RC_VERIFICATION_FAILURE,
    payload,
  };
};

// Uploading qr-code
export const initQrCodeVerify = (truck_id, value) => {
  // console.log(22222222222, truck_id, value);
  return {
    type: actionTypes.INIT_QR_SCANNER,
    value,
    truck_id,
  };
};
export const qrScanningSuccess = payload => {
  // console.log("success", payload);
  return {
    type: actionTypes.QR_SCANNER_SUCCESS,
    payload,
  };
};
export const qrScanningFailure = payload => {
  // console.log("failure", payload);
  return {
    type: actionTypes.QR_SCANNER_FAILURE,
    payload,
  };
};

// get document-verification
export const initDocumentVerification = () => ({
  type: actionTypes.INIT_DOCUMENT_VERIFICATION,
});
export const documentVerificationSuccess = payload => ({
  type: actionTypes.DOCUMENT_VERIFICATION_SUCCESS,
  payload,
});
export const documentVerificationFailure = payload => ({
  type: actionTypes.DOCUMENT_VERIFICATION_FAILURE,
  payload,
});

// Maps
export const fetchMapDataStart = (from_id, to_id) => ({
  type: actionTypes.FETCH_MAP_DATA_START,
  from_id,
  to_id,
});

export const fetchMapDataSuccess = data => ({
  type: actionTypes.FETCH_MAP_DATA_SUCCESS,
  payload: data,
});

export const fetchMapDataFailure = error => ({
  type: actionTypes.FETCH_MAP_DATA_FAILURE,
  payload: error,
});

// create order
export const initCreateOrder = (amount, userId, order_type) => {
  // console.log('createorder', amount, userId, order_type);
  return {
    type: actionTypes.CREATE_ORDER_REQUEST,
    amount,
    userId,
    order_type,
  };
};

export const createOrderSuccess = data => ({
  type: actionTypes.CREATE_ORDER_SUCCESS,
  payload: data,
});

export const createOrderFailure = error => ({
  type: actionTypes.CREATE_ORDER_FAILURE,
  payload: error,
});

// verify payment
export const initVerifyPaymentRequest = (paymentId, orderId) => {
  console.log(222222, paymentId, orderId);
  return {
    type: actionTypes.VERIFY_PAYMENT_REQUEST,
    paymentId,
    orderId,
  };
};

export const verifyPaymentSuccess = data => ({
  type: actionTypes.VERIFY_PAYMENT_SUCCESS,
  payload: data,
});

export const verifyPaymentFailure = error => ({
  type: actionTypes.VERIFY_PAYMENT_FAILURE,
  payload: error,
});

// Complete Booking Document for Lorry Owner
export const initCompleteBookingDocumentRequest = (
  booking_id,
  documentType,
  documentImage,
) => {
  // console.log(333333333, booking_id, documentType, documentImage);
  return {
    type: actionTypes.COMPLETE_BOOKING_DOCUMENT_REQUEST,
    booking_id,
    documentType,
    documentImage,
  };
};

export const completeBookingDocumentSuccess = data => ({
  type: actionTypes.COMPLETE_BOOKING_DOCUMENT_SUCCESS,
  payload: data,
});

export const completeBookingDocumentFailure = error => ({
  type: actionTypes.COMPLETE_BOOKING_DOCUMENT_FAILURE,
  payload: error,
});

// get transcation details
export const initTranscationDetails = () => ({
  type: actionTypes.FETCH_TRANSACTIONS_REQUEST,
});
export const transcationDetailsSuccess = payload => ({
  type: actionTypes.FETCH_TRANSACTIONS_SUCCESS,
  payload,
});
export const transcationDetailsFailure = payload => ({
  type: actionTypes.FETCH_TRANSACTIONS_FAILURE,
  payload,
});

// GPS TOKEN REQUEST
export const fetchTokenRequest = () => ({
  type: actionTypes.FETCH_GPS_TOKEN_REQUEST,
});

export const fetchTokenSuccess = payload => ({
  type: actionTypes.FETCH_GPS_TOKEN_SUCCESS,
  payload,
});

export const fetchTokenFailure = payload => ({
  type: actionTypes.FETCH_GPS_TOKEN_FAILURE,
  payload,
});

// gps devices
export const fetchGpsDevicesRequest = (username, password) => {
  // console.log('44444', username, password);
  return {
    type: actionTypes.FETCH_GPS_DEVICES_REQUEST,
    username,
    password,
  };
};

export const fetchGpsDevicesSuccess = payload => ({
  type: actionTypes.FETCH_GPS_DEVICES_SUCCESS,
  payload,
});

export const fetchGpsDevicesFailure = payload => ({
  type: actionTypes.FETCH_GPS_DEVICES_FAILURE,
  payload,
});

// single gps devices
export const fetchSingleGpsDeviceRequest = (username, password, deviceId) => {
  console.log(999999, username, password, deviceId);
  return {
    type: actionTypes.FETCH_SINGLE_GPS_DEVICE_REQUEST,
    username,
    password,
    deviceId,
  };
};

export const fetchSingleGpsDeviceSuccess = payload => ({
  type: actionTypes.FETCH_SINGLE_GPS_DEVICE_SUCCESS,
  payload,
});

export const fetchSingleGpsDeviceFailure = payload => ({
  type: actionTypes.FETCH_SINGLE_GPS_DEVICE_FAILURE,
  payload,
});

// // Gps Websocket Connect
// export const websocketConnect = cookie => ({
//   type: actionTypes.WEBSOCKET_CONNECT,
//   payload: {cookie},
// });

export const websocketDisconnect = () => ({
  type: actionTypes.WEBSOCKET_DISCONNECT,
});

export const websocketMessage = message => ({
  type: actionTypes.WEBSOCKET_MESSAGE,
  payload: message,
});

export const websocketError = error => ({
  type: actionTypes.WEBSOCKET_ERROR,
  payload: error,
});

export const websocketClosed = () => ({
  type: actionTypes.WEBSOCKET_CLOSED,
});

export const websocketRetry = () => ({
  type: actionTypes.WEBSOCKET_RETRY,
});

export const updateDevices = devices => ({
  type: actionTypes.UPDATE_DEVICES,
  payload: devices,
});

export const updatePositions = positions => ({
  type: actionTypes.UPDATE_POSITIONS,
  payload: positions,
});

export const updateEvents = events => ({
  type: actionTypes.UPDATE_EVENTS,
  payload: events,
});

// GPS Address
export const fetchGpsAddressRequest = (
  username,
  password,
  latitude,
  longitude,
) => {
  // console.log('actions3333', username, password, latitude, longitude);
  return {
    type: actionTypes.FETCH_GPS_ADDRESS_REQUEST,
    username,
    password,
    latitude,
    longitude,
  };
};

export const fetchGpsAddressSuccess = payload => ({
  type: actionTypes.FETCH_GPS_ADDRESS_SUCCESS,
  payload,
});

export const fetchGpsAddressFailure = payload => ({
  type: actionTypes.FETCH_GPS_ADDRESS_FAILURE,
  payload,
});

// GPS summary report
export const fetchSummaryReportRequest = (
  username,
  password,
  deviceId,
  from,
  to,
  daily,
) => ({
  type: actionTypes.FETCH_SUMMARY_REPORT_REQUEST,
  username,
  password,
  deviceId,
  from,
  to,
  daily,
});

export const fetchSummaryReportSuccess = data => ({
  type: actionTypes.FETCH_SUMMARY_REPORT_SUCCESS,
  payload: data,
});

export const fetchSummaryReportFailure = error => ({
  type: actionTypes.FETCH_SUMMARY_REPORT_FAILURE,
  payload: error,
});

// GPS Notifications
export const fetchGpsNotificationsRequest = (username, password) => ({
  type: actionTypes.FETCH_GPS_NOTIFICATIONS_REQUEST,
  username,
  password,
});

export const fetchGpsNotificationsSuccess = payload => ({
  type: actionTypes.FETCH_GPS_NOTIFICATIONS_SUCCESS,
  payload,
});

export const fetchGpsNotificationsFailure = error => ({
  type: actionTypes.FETCH_GPS_NOTIFICATIONS_FAILURE,
  payload: error,
});

// GPS Replay
export const fetchPositionsRequest = (
  username,
  password,
  deviceId,
  from,
  to,
) => ({
  type: actionTypes.FETCH_POSITIONS_REQUEST,
  username,
  password,
  deviceId,
  from,
  to,
});

export const fetchPositionsSuccess = data => ({
  type: actionTypes.FETCH_POSITIONS_SUCCESS,
  payload: data,
});

export const fetchPositionsFailure = error => ({
  type: actionTypes.FETCH_POSITIONS_FAILURE,
  payload: error,
});

// GPS Stops
export const fetchGpsStopsRequest = (
  username,
  password,
  deviceId,
  from,
  to,
) => ({
  type: actionTypes.FETCH_GPS_STOPS_REQUEST,
  username,
  password,
  deviceId,
  from,
  to,
});

export const fetchGpsStopsSuccess = data => ({
  type: actionTypes.FETCH_GPS_STOPS_SUCCESS,
  payload: data,
});

export const fetchGpsStopsFailure = error => ({
  type: actionTypes.FETCH_GPS_STOPS_FAILURE,
  payload: error,
});

// GPS Trips
export const fetchGpsTripsRequest = (
  username,
  password,
  deviceId,
  from,
  to,
) => ({
  type: actionTypes.FETCH_GPS_TRIPS_REQUEST,
  username,
  password,
  deviceId,
  from,
  to,
});

export const fetchGpsTripsSuccess = data => ({
  type: actionTypes.FETCH_GPS_TRIPS_SUCCESS,
  payload: data,
});

export const fetchGpsTripsFailure = error => ({
  type: actionTypes.FETCH_GPS_TRIPS_FAILURE,
  payload: error,
});

// GPS Tripa
export const fetchGpsPlansRequest = () => ({
  type: actionTypes.FETCH_GPS_PLANS_REQUEST,
});

export const fetchGpsPlansSuccess = data => ({
  type: actionTypes.FETCH_GPS_PLANS_SUCCESS,
  payload: data,
});

export const fetchGpsPlansFailure = error => ({
  type: actionTypes.FETCH_GPS_PLANS_FAILURE,
  payload: error,
});

// GPS delivery details
export const placeGpsOrderRequest = (
  name,
  mobile,
  plan_id,
  qty,
  rc_numbers,
  address,
  city,
  state,
  landmark,
  pinCode,
) => {
  // console.log(
  //   222222,
  //   name,
  //   mobile,
  //   plan_id,
  //   qty,
  //   rc_numbers,
  //   address,
  //   city,
  //   landmark,
  //   pinCode,
  //   state,
  // );
  return {
    type: actionTypes.PLACE_GPS_ORDER_REQUEST,
    name,
    mobile,
    plan_id,
    qty,
    rc_numbers,
    address,
    city,
    state,
    landmark,
    pinCode,
  };
};

export const placeGpsOrderSuccess = payload => ({
  type: actionTypes.PLACE_GPS_ORDER_SUCCESS,
  payload,
});

export const placeGpsOrderFailure = error => ({
  type: actionTypes.PLACE_GPS_ORDER_FAILURE,
  payload: error,
});

// gps order details
export const fetchGpsOrderDetailRequest = id => ({
  type: actionTypes.FETCH_GPS_ORDER_DETAIL_REQUEST,
  id,
});

export const fetchGpsOrderDetailSuccess = payload => ({
  type: actionTypes.FETCH_GPS_ORDER_DETAIL_SUCCESS,
  payload,
});

export const fetchGpsOrderDetailFailure = error => ({
  type: actionTypes.FETCH_GPS_ORDER_DETAIL_FAILURE,
  payload: error,
});

// Get full address
export const fetchAddressRequest = (lat, lan) => {
  // console.log(8888888888888, lat, lan);
  return {
    type: actionTypes.FETCH_FULLADDRESS_REQUEST,
    lat,
    lan,
  };
};

export const fetchAddressSuccess = payload => ({
  type: actionTypes.FETCH_FULLADDRESS_SUCCESS,
  payload,
});

export const fetchAddressFailure = payload => ({
  type: actionTypes.FETCH_FULLADDRESS_FAILURE,
  payload,
});

// Clear store on logout
export const clearStore = () => ({
  type: actionTypes.CLEAR_STORE,
});
