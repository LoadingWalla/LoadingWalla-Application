import {call, cancel, cancelled, fork, put} from 'redux-saga/effects';
import * as actions from '../Actions/Actions';
import API from '../../Utils/FetchClient';
import multiPartApi from '../../Utils/multiPartApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import gpsApi from '../../Utils/gpsApi';
import googleApi from '../../Utils/FetchGoogleApi';
import FetchNominatimApi from '../../Utils/FetchNominatiApi';

// Saga Login or Signup
export function* authenticate({mobile}) {
  const body = {
    mobile: mobile,
  };
  try {
    const data = yield API.post('login', body);
    // console.log(88888, data);
    if (data?.data?.status === 200) {
      yield AsyncStorage.setItem('user_id', `${data?.data?.user_id}`);
      yield put(actions.loginSuccess(data));
    } else {
      yield put(actions.loginFailure(data));
    }
  } catch (error) {
    yield put(actions.loginFailure(error.message));
    // console.log("error", error);
  }
}

// Saga verify Otp
export function* verifyOtp({userid, otp, lang, deviceToken}) {
  const body = {
    user_id: userid,
    otp: otp,
    lang: lang,
    deviceToken: deviceToken,
  };

  try {
    const data = yield API.post('verifyotp', body);
    if (data?.data?.status === 200) {
      yield AsyncStorage.setItem('auth-token', `${data?.data?.data?.token}`);
      yield AsyncStorage.setItem(
        'UserType',
        `${data?.data?.data?.user[0]?.user_type}`,
      );
      yield AsyncStorage.setItem(
        'new_user',
        `${data?.data?.data?.user[0]?.new_user}`,
      );
      yield put(actions.VerifyOtpSuccess(data));
    } else {
      // console.log("Not Run");
      yield put(actions.VerifyOtpFailure(data));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Add lorry Saga
export function* addLorry({
  userid,
  vehiclenumber,
  vehicle,
  vehicleType,
  vehicleCapacity,
  permit,
  addLorry,
  selectedGPSOption,
}) {
  const body = {
    vehicle_number: vehiclenumber,
    variant_id: vehicle,
    truck_type: vehicleType,
    permit: permit,
    gps: selectedGPSOption,
  };

  try {
    const data = yield API.post('add-lorry', body);
    // console.log("API responseaddlorry", data);
    if (data?.data?.status === 200) {
      yield put(actions.addLorrySuccess(data));
    } else {
      yield put(actions.addLorryFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.addLorryFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Profile Setup
export function* profileSetup({
  userid,
  name,
  city,
  userType,
  profile_img,
  remove_profile,
}) {
  console.log(
    'Remove Image ID',
    userid,
    name,
    city,
    userType,
    profile_img,
    remove_profile,
  );
  try {
    let param = new FormData();
    if (remove_profile) {
      param.append('remove_profile', userid);
    } else {
      param.append('name', name);
      // param.append('city', city);
      param.append('user_type', userType);
      if (profile_img?.uri) {
        param.append('profile_img', {
          uri: profile_img.uri,
          type: 'image/jpeg',
          name: profile_img.fileName,
        });
      }
    }

    try {
      let data = yield multiPartApi.post('profile-setup', param);
      console.log('API response', data);
      if (data?.data?.status === 200) {
        yield put(actions.ProfileSetupSuccess(data));
      } else {
        yield put(actions.ProfileSetupFailure(data?.data?.status));
        // console.log("else", data);
      }
    } catch (error) {
      yield put(actions.ProfileSetupFailure(error.message));
      // console.log("error", error);
    }
  } catch (error) {
    yield put(actions.ProfileSetupFailure(error?.message));
    // console.log("error", error);
  }
}

// Saga Location
export function* location({location, id}) {
  console.log('searchsaga', location, id);
  try {
    const data = yield API.get(`locationlat?search=${location}&id=${id}`);
    // console.log("API response", data);
    if (data?.data?.status === 200) {
      yield put(actions.locationSuccess(data));
    } else {
      yield put(actions.locationFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.locationFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Dashboard
export function* dashboard() {
  try {
    const data = yield API.get('dashboard');
    // console.log(4444445555, data);
    if (data?.data?.status === 200) {
      yield put(actions.dashboardSuccess(data));
      yield AsyncStorage.setItem(
        'final_UserType',
        `${data?.data?.user?.user_type}`,
      );
      // console.log('Dashboard saga', data);
    } else {
      yield put(actions.dashboardFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.dashboardFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Profile
export function* profile() {
  // console.log("Profile Test");
  try {
    const data = yield API.get('profile');
    // console.log("API response", data);
    if (data?.data?.status === 200) {
      yield put(actions.profileSuccess(data));
    } else {
      yield put(actions.profileFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.profileFailure(error.message));
    // console.log("error", error);
  }
}

// update language
export function* updateLanguage({langCode, langId}) {
  try {
    const data = yield API.get(`lang?lang=${langId}`);
    // console.log('API response------LANGUAGE', data);
    if (data?.data?.status === 200) {
      yield put(actions.languageSuccess(langCode));
    } else {
      yield put(actions.languageFailure(langCode));
    }
  } catch (error) {
    yield put(actions.languageFailure(langCode));
    // console.log("error", error);
  }
}

// Saga Post Load
export function* findLoad({from, to, truck}) {
  const body = {
    from: from,
    to: to,
    variant_id: truck,
  };
  // console.log("find-load mein data jaa rha hai", body);
  try {
    const data = yield API.post('find-load', body);
    console.log('find-load response', data);
    if (data?.data?.status === 200) {
      yield put(actions.findLoadSuccess(data));
    } else {
      yield put(actions.findLoadFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    //yield put(actions.postLoadFailure());
    yield put(actions.findLoadFailure(error.message));
    // console.log("error", error);
  }
}

// Saga My Lorry
export function* myLorry({status}) {
  // console.log(888, status);
  try {
    const data = yield API.get(`my-lorry?status=${status}`);
    // console.log("API response------MYLOAD", data);
    if (data?.data?.status === 200) {
      yield put(actions.myLorrySuccess(data));
    } else {
      yield put(actions.myLorryFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.myLorryFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga My Lorry Using Id
export function* getSingleLorry({truck_id}) {
  // console.log(7897789789, truck_id);
  try {
    const data = yield API.get(`my-lorry/${truck_id}`);
    // console.log("API response------MYLOAD", data);
    if (data?.data?.status === 200) {
      yield put(actions.myLorryByIdSuccess(data));
    } else {
      yield put(actions.myLorryByIdFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.myLorryByIdFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga My Lorry Using Id
export function* getSingleLoad({load_id}) {
  try {
    const data = yield API.get(`my-load/${load_id}`);
    // console.log("API response------MYLOAD", data);
    if (data?.data?.status === 200) {
      yield put(actions.myLoadByIdSuccess(data));
    } else {
      yield put(actions.myLoadByIdFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.myLorryByIdFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Get Request Bookigs
export function* getRequestBooking({load_id, truck_id, request_type}) {
  // console.log("callleeed", load_id, truck_id, request_type);
  try {
    const data = yield API.get(
      `get-request-booking?load_id=${load_id}&truck_id=${
        truck_id || 0
      }&request_type=${request_type}`,
    );
    // console.log("API response------MYLOAD", data);
    if (data?.data?.status === 200) {
      if (request_type === 1) {
        yield put(actions.getRequestBookingSuccessReceived(data));
      } else if (request_type === 2) {
        yield put(actions.getRequestBookingSuccessSent(data));
      }
      yield put(actions.getRequestBookingSuccess(data));
    } else {
      yield put(actions.getRequestBookingFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.getRequestBookingFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga My Load
export function* myLoad({status}) {
  // console.log(9999, status);
  try {
    const data = yield API.get(`my-load?status=${status}`);
    // console.log("API response------MYLOAD", data);
    if (data?.data?.status === 200) {
      yield put(actions.MyLoadSuccess(data));
    } else {
      yield put(actions.MyLoadFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.MyLoadFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Contact Us
export function* contactus({name, email, phone, message}) {
  const body = {
    name: name,
    email: email,
    mobile: phone,
    message: message,
  };
  // console.log("pass data------Contact Us", name, email, phone, message);
  try {
    const data = yield API.post('contact', body);
    // console.log("API response------Contact Us", data);
    if (data?.data?.status === 200) {
      yield put(actions.contactusSuccess(data));
    } else {
      yield put(actions.contactusFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.contactusFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Guide
export function* guide() {
  try {
    const data = yield API.get('guide');
    // console.log("API response------GUIDE", data);
    if (data?.data?.status === 200) {
      yield put(actions.guideSuccess(data));
    } else {
      yield put(actions.guideFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.guideFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Booking
export function* booking({status}) {
  // console.log(status);
  try {
    const data = yield API.get(`booking?status=${status}`);
    // console.log("API response------BOOKING", data);
    if (data?.status === 200) {
      yield put(actions.bookingSuccess(data));
    } else {
      yield put(actions.bookingFailure(data));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.bookingFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

export function* requestBooking({
  loid,
  trid,
  offered_price,
  price_type,
  old_req_id,
}) {
  try {
    const body = {
      loid,
      trid,
      offered_price,
      price_type,
      old_req_id,
    };
    const data = yield API.post('request-booking', body);
    if (data?.status === 200) {
      // console.log("Request-Booking api called success 1259");
      yield put(actions.RequestBookingSuccess(data));
    } else {
      // console.log(data);
      yield put(actions.RequestBookingFailure(data));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.RequestBookingFailure());
  }
}

// Saga Accept Reject
export function* acceptReject({bookingId, status}) {
  // console.log(3333, bookingId, status);
  try {
    const data = yield API.get(
      `update-booking?booking_id=${bookingId}&status=${status}`,
    );
    // console.log('API RESPONSE=======Update booking', data);
    if (data?.data?.status === 200) {
      yield put(actions.acceptRejectSuccess(data));
    } else {
      yield put(actions.acceptRejectFailure(data.status));
      // console.log('else', data);
    }
  } catch (error) {
    yield put(actions.acceptRejectFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log('error', error);
  }
}

// Saga Notification
export function* notification() {
  try {
    const data = yield API.get('notification');
    if (data?.data?.status === 200) {
      yield put(actions.notificationSuccess(data));
    } else {
      yield put(actions.notificationFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.notificationFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga My Post Load
export function* myPostLoad({
  afrom,
  ato,
  qty,
  material_name,
  truck_type,
  price,
  price_type,
}) {
  const body = {
    afrom: afrom,
    ato: ato,
    qty: qty,
    material_name: material_name,
    variant_id: truck_type,
    price: price,
    price_type: price_type,
  };
  // console.log(66666, body);
  try {
    const data = yield API.post('add-load', body);
    // console.log('post load', data);
    if (data?.data?.status === 200) {
      yield put(actions.myPostLoadSuccess(data));
    } else {
      yield put(actions.myPostLoadFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.myPostLoadFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Wallet
export function* wallet({amount}) {
  const body = {
    amount: amount,
  };
  try {
    const data = yield API.post('add-money', body);
    if (data?.data?.status === 200) {
      yield put(actions.walletSuccess(data));
    } else {
      yield put(actions.walletFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.walletFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}
// Saga Wallet
export function* getWallet() {
  try {
    const data = yield API.get('wallet');
    if (data?.data?.status === 200) {
      yield put(actions.getWalletSuccess(data));
    } else {
      yield put(actions.getWalletFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.getWalletFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// cancel all api before logout
function* apiCall() {
  // const controller = new AbortController();
  // const signal = controller.signal;
  // try {
  //   const response = yield call(
  //     fetch,
  //     'https://loadingwalla.com/api/gps/devices?username=%2B919708278288%40loadingwalla.com&password=%2B919708278288%4076009',
  //     {
  //       method: 'GET',
  //       signal,
  //     },
  //   );
  //   const data = yield response.json();
  //   console.log('API call completed:', data);
  //   // Handle successful response if needed
  // } finally {
  //   if (yield cancelled()) {
  //     // Abort the API call if the saga is cancelled
  //     controller.abort();
  //     console.log('GPS devices API call was cancelled');
  //   }
  // }
  try {
    // Simulating some API call here
    // const data = yield call(API.get, 'some-api-endpoint');
    console.log('API call completed');
  } finally {
    if (yield cancelled()) {
      console.log('API call was cancelled');
    }
  }
}

// Saga Logout
export function* logout() {
  try {
    const apiTask = yield fork(apiCall);
    const data = yield API.get('logout');
    if (data?.data?.status === 200) {
      yield cancel(apiTask);
      yield put(actions.logoutSuccess(data));
    } else {
      yield put(actions.logoutFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.logoutFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Load Trucks
export function* loadTrucks() {
  try {
    const data = yield API.get('truck-type');
    if (data?.data?.status === 200) {
      yield put(actions.loadTrucksSuccess(data));
    } else {
      yield put(actions.loadTrucksFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.loadTrucksFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Rating
export function* rating() {
  const body = {
    uto: '',
    rating: '',
  };
  try {
    const data = yield API.post('add-rating', body);
    if (data?.data?.status === 200) {
      yield put(actions.ratingSuccess(data));
    } else {
      yield put(actions.ratingFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.ratingFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Get User Profile
export function* getUserProfile({id}) {
  try {
    const data = yield API.get(`get-profile/${id}`);
    if (data?.data?.status === 200) {
      yield put(actions.getUserProfileSuccess(data));
    } else {
      yield put(actions.getUserProfileFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.getUserProfileFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Status Change
export function* statusChange({trid, location1, location2, status, userType}) {
  try {
    let data;
    if (userType == '1') {
      const loadBody = {
        loid: trid,
        from_id: location1,
        to_id: location2,
        status: status,
      };
      data = yield API.post('active-load', loadBody);
    } else if (userType == '2') {
      const lorryBody = {
        trid: trid,
        from_id: location1,
        to_id: location2,
        status: status,
      };
      data = yield API.post('active-lorry', lorryBody);
    }

    if (data?.data?.status === 200) {
      yield put(actions.statusChangeSuccess(data));
    } else {
      yield put(actions.statusChangeFailure(data.status));
      // console.log('else', data);
    }
  } catch (error) {
    yield put(actions.statusChangeFailure());
    // console.log("error", error);
  }
}

// Saga FindLorry
export function* findLorry({loid}) {
  // console.log(3333, loid);
  try {
    const data = yield API.post(`find-lorry?loid=${loid}`);
    if (data?.data?.status === 200) {
      // console.log("888 success");
      yield put(actions.findLorrySuccess(data));
    } else {
      yield put(actions.findLorrySuccess(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.findLorryFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga CurrentLocation
export function* currentLocation({lat, long}) {
  // console.log("Saga lat lang", lat, long);
  const body = {
    lat,
    long,
  };

  try {
    const data = yield API.post('add-location', body);
    if (data?.data?.status === 200) {
      yield put(actions.currentLocationSuccess(data));
    } else {
      yield put(actions.currentLocationFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.currentLocationFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Lorry Require
export function* lorryRequire({lat, long}) {
  try {
    const data = yield API.get('add-lorry-require-details');
    if (data?.data?.status === 200) {
      yield put(actions.lorryRegireSuccess(data));
    } else {
      yield put(actions.lorryRequireFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.lorryRequireFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Modal Location From
export function* modalLocation({location}) {
  yield put(actions.locationChangeSuccess(location));
}
export function* searchfromid({location}) {
  yield put(actions.searchfromidSuccess(location));
}
export function* searchtoid({location}) {
  yield put(actions.searchtoidSuccess(location));
}
export function* modalLocationClose() {
  yield put(actions.modalCloseLocation());
}

// Modal Location To
export function* modalLocationTo({location}) {
  yield put(actions.locationChangeToSuccess(location));
}

// Saga Delete Lorry
export function* deleteLorryRequest({lorry_id, userType}) {
  // console.log("Saga lorry_id", lorry_id, userType);
  try {
    let data;
    if (userType == '1') {
      const loadBody = {
        load_id: lorry_id,
      };
      data = yield API.post('delete-load', loadBody);
    } else if (userType == '2') {
      const lorryBody = {
        lorry_id,
      };
      data = yield API.post('delete-lorry', lorryBody);
    }

    if (data?.data?.status === 200) {
      yield put(actions.deleteLorrySuccess(data));
    } else {
      yield put(actions.deleteLorryFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.deleteLorryFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Cancel Booking
export function* cancelBookingRequest({req_id}) {
  // console.log('Saga req_id', typeof req_id);
  try {
    let data = yield API.post('cancel-booking', {req_id});
    // console.log("API response------MYLOAD", data);

    if (data?.data?.status === 200) {
      // console.log(8998, data);
      yield put(actions.cancelBookingSuccess(data));
    } else {
      yield put(actions.cancelBookingFailure(data.status));
      console.log('else', data);
    }
  } catch (error) {
    yield put(actions.cancelBookingFailure(error.message));
    console.error('error', error);
  }
}

// Accept Request Bookigs
export function* acceptBooking({request_id}) {
  // console.log(88888, request_id);
  try {
    const data = yield API.post(`accept-booking?request_id=${request_id}`);
    // console.log("API response------MYLOAD", data);
    if (data?.data?.status === 200) {
      yield put(actions.AcceptBookingSuccess(data));
    } else {
      yield put(actions.AcceptBookingFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.AcceptBookingFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

// Saga Document Verification
export function* documentUploadRequest({
  document_number,
  document_type,
  document_file,
}) {
  try {
    let param = new FormData();
    param.append('document_number', document_number);
    param.append('document_type', document_type);

    if (
      document_type === 'aadhar' &&
      document_file &&
      document_file.length > 0
    ) {
      for (let i = 0; i < document_file.length; i++) {
        const file = document_file[i];
        // console.log(44444, file);
        param.append('document_file[]', {
          uri: file.uri,
          type: 'image/jpeg',
          name: file.fileName,
        });
      }
    } else if (document_file && document_file.length > 0) {
      const file = document_file[0];
      // console.log(33333, file);
      param.append('document_file[]', {
        uri: file.uri,
        type: 'image/jpeg',
        name: file.fileName,
      });
    }
    let data = yield multiPartApi.post('document-verification', param);

    if (data?.data?.status === 200) {
      yield put(actions.documentVerifySuccess(data));
    } else {
      yield put(actions.documentVerifyFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.documentVerifyFailure());
    // console.log("error", error);
  }
}

// Saga rc-upload Verification
export function* rcUploadRequest({truck_id, rc_document}) {
  try {
    let param = new FormData();
    param.append('truck_id', truck_id);
    if (rc_document && rc_document.length > 0) {
      for (let i = 0; i < rc_document.length; i++) {
        const file = rc_document[i];
        param.append('rc_document', {
          uri: file.uri,
          type: 'image/jpeg',
          name: file.fileName,
        });
      }
    }
    let data = yield multiPartApi.post('rc-upload', param);
    if (data?.data?.status === 200) {
      yield put(actions.rcVerifySuccess(data));
    } else {
      yield put(actions.rcVerifyFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.rcVerifyFailure());
    // console.log("error", error);
  }
}

// Saga qr code data uploading
export function* qrCodeScanner({truck_id, value}) {
  try {
    const body = {truck_id, value};
    // console.log(8888888, body);
    const data = yield API.post('qr-rc', body);
    // console.log("API response------MYLOAD", data);
    if (data?.data?.status === 200) {
      yield put(actions.qrScanningSuccess(data));
    } else {
      yield put(actions.qrScanningFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.qrScanningFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
  }
}

export function* getDocumentVerification() {
  // console.log('documetn Test');
  try {
    const data = yield API.get('get-document-verification');
    // console.log("API response", data);
    if (data?.data?.status === 200) {
      // console.log("success", data);
      yield put(actions.documentVerificationSuccess(data));
    } else {
      // console.log("else", data);
      yield put(actions.documentVerificationFailure(data.status));
    }
  } catch (error) {
    yield put(actions.documentVerificationFailure(error.message));
    // console.log("error", error);
  }
}

// Maps
export function* fetchMapDataSaga({from_id, to_id}) {
  // console.log("documetn Test", from_id, to_id);
  try {
    const data = yield API.get(`maps?from=${from_id}&to=${to_id}`);
    // console.log("API response", data);
    if (data?.data?.status === 200) {
      // console.log("success", data);
      yield put(actions.fetchMapDataSuccess(data));
    } else {
      // console.log("else", data);
      yield put(actions.fetchMapDataFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchMapDataFailure(error.message));
    // console.log("error", error);
  }
}

// Create Order
export function* createOrder({amount, userId, order_type}) {
  try {
    const body = {amount, userId, order_type};
    // console.log('createordersaga', body);
    const data = yield API.post('payment/order', body);
    // console.log('API response------createOrder', data);
    if (data?.status === 200) {
      // console.log(666666, 'success');
      yield put(actions.createOrderSuccess(data));
    } else {
      yield put(actions.createOrderFailure(data.status));
      // console.log('else', data);
    }
  } catch (error) {
    yield put(actions.createOrderFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log('error', error);
  }
}

// Verify Payment
export function* verifyPayment({paymentId, orderId}) {
  try {
    const body = {razorpay_payment_id: paymentId, razorpay_order_id: orderId};
    // console.log(8888888, body);
    const data = yield API.post('payment/verify', body);
    console.log('API response------PaymentVerify', data);
    if (data?.status === 200) {
      yield put(actions.verifyPaymentSuccess(data));
    } else {
      yield put(actions.verifyPaymentFailure(data.status));
      // console.log('else', data);
    }
  } catch (error) {
    yield put(actions.verifyPaymentFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log('error', error);
  }
}

// complete Booking Document
export function* completeBookingDocument({
  booking_id,
  documentType,
  documentImage,
}) {
  // console.log(77777777, booking_id, documentType, documentImage);
  try {
    let body = new FormData();
    body.append('booking_id', booking_id);
    body.append('document_name', documentType);
    if (documentImage?.uri) {
      body.append('document_file', {
        uri: documentImage.uri,
        type: 'image/jpeg',
        name: documentImage.fileName,
      });
    }
    // console.log(9999999, body);
    let data = yield multiPartApi.post('complete-booking-document', body);
    // console.log(22222, data);
    if (data?.data?.status === 200) {
      yield put(actions.completeBookingDocumentSuccess(data));
    } else {
      yield put(actions.completeBookingDocumentFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.completeBookingDocumentFailure());
    // console.log("error", error);
  }
}

// Transcations
export function* fetchTranscations() {
  try {
    const data = yield API.get('transaction');
    // console.log('API response', data);
    if (data?.data?.status === 200) {
      // console.log("success", data);
      yield put(actions.transcationDetailsSuccess(data));
    } else {
      // console.log("else", data);
      yield put(actions.transcationDetailsFailure(data.status));
    }
  } catch (error) {
    yield put(actions.transcationDetailsFailure(error.message));
    // console.log("error", error);
  }
}

// gps token generate
export function* fetchTokenSaga() {
  try {
    const data = yield API.get('gps/get-token');
    // console.log('Gps Token------------------------', data);
    if (data?.data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchTokenSuccess(data?.data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchTokenFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchTokenFailure(error.message));
    // console.log('error', error);
  }
}

// gps devices
export function* fetchGpsDevices({username, password}) {
  try {
    // console.log(33333, username, password);
    const data = yield API.get(
      `gps/devices?username=${username}&password=${password}`,
    );
    // const data = yield gpsApi.get('devices', username, password);
    // console.log('--------Gps Devices', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchGpsDevicesSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchGpsDevicesFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchGpsDevicesFailure(error.message));
    // console.log('error4444', error);
  }
}

// single gps device
export function* fetchSingleGpsDevice({username, password, deviceId}) {
  try {
    const data = yield gpsApi.get(`devices?id=${deviceId}`, username, password);
    // console.log(77777, data);
    if (data?.status === 200) {
      yield put(actions.fetchSingleGpsDeviceSuccess(data.data));
    } else {
      yield put(actions.fetchSingleGpsDeviceFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchSingleGpsDeviceFailure(error.message));
  }
}

// gps token generate
export function* fetchGpsAddress({username, password, latitude, longitude}) {
  try {
    // console.log(33333, username, password, latitude, longitude);
    const data = yield gpsApi.get(
      `/server/geocode?latitude=${latitude}&longitude=${longitude}`,
      username,
      password,
    );
    console.log('Gps Devices Address', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchGpsAddressSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchGpsAddressFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchGpsAddressFailure(error.message));
    // console.log('error4444', error);
  }
}

// gps summary
export function* fetchGpsSummary({
  username,
  password,
  deviceId,
  from,
  to,
  daily,
}) {
  try {
    // console.log(
    //   33333,
    //   'Gps Summary',
    //   username,
    //   password,
    //   deviceId,
    //   from,
    //   to,
    //   daily,
    // );
    const data = yield gpsApi.get(
      `reports/summary?from=${from}&to=${to}&daily=${daily}&deviceId=${deviceId}`,
      username,
      password,
    );
    // console.log('Gps Summary', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchSummaryReportSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchSummaryReportFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchSummaryReportFailure(error.message));
    // console.log('error4444', error);
  }
}

// gps summary
export function* fetchGpsNotifications({username, password}) {
  try {
    // console.log(888888999999, username, password);
    const data = yield gpsApi.get('notifications', username, password);
    // console.log('Gps Notification', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchGpsNotificationsSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchGpsNotificationsFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchGpsNotificationsFailure(error.message));
    // console.log('error4444', error);
  }
}

// gps replay
export function* fetchGpsReplay({username, password, deviceId, from, to}) {
  try {
    // console.log(999999, 'replaydata', username, password, deviceId, from, to);
    const data = yield gpsApi.get(
      `positions?deviceId=${deviceId}&from=${from}&to=${to}`,
      username,
      password,
    );
    // console.log('Gps Replay', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchPositionsSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchPositionsFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchPositionsFailure(error.message));
    // console.log('error4444', error);
  }
}

// gps route
export function* fetchGpsRoute({username, password, deviceId, from, to}) {
  try {
    // console.log(999999, username, password, deviceId, from, to);
    const data = yield gpsApi.get(
      `reports/route?from=${from}&to=${to}&deviceId=${deviceId}`,
      username,
      password,
    );
    // console.log('Gps Route -------->', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchRouteSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchRouteFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchRouteFailure(error));
    // console.log('error4444', error);
  }
}

// gps stops
export function* fetchGpsStops({username, password, deviceId, from, to}) {
  try {
    // console.log(999999, 'stops data', username, password, deviceId, from, to);
    const data = yield gpsApi.get(
      `reports/stops?deviceId=${deviceId}&from=${from}&to=${to}`,
      username,
      password,
    );
    console.log('Gps stops', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchGpsStopsSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchGpsStopsFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchGpsStopsFailure(error.message));
    // console.log('error4444', error);
  }
}
// gps trips
export function* fetchGpsTrips({username, password, deviceId, from, to}) {
  try {
    // console.log(99888999, username, password, deviceId, from, to);
    const data = yield gpsApi.get(
      `reports/trips?deviceId=${deviceId}&from=${from}&to=${to}`,
      username,
      password,
    );
    console.log('Gps Trips --------------->', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchGpsTripsSuccess(data?.data));
    } else {
      yield put(actions.fetchGpsTripsFailure(data));
      console.log('else', data);
    }
  } catch (error) {
    yield put(actions.fetchGpsTripsFailure(error.message));
    console.log('error4444', error);
  }
}

// GPS Combined Data
export function* fetchGpsCombinedData({
  username,
  password,
  deviceId,
  from,
  to,
}) {
  try {
    const data = yield gpsApi.get(
      `reports/combined?deviceId=${deviceId}&from=${from}&to=${to}`,
      username,
      password,
    );
    // console.log(1111, 'GPS Combined Data -------->', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchCombinedGpsDataSuccess(data?.data));
    } else {
      yield put(actions.fetchCombinedGpsDataFailure(data));
      // console.log('else', data);
    }
  } catch (error) {
    yield put(actions.fetchCombinedGpsDataFailure(error.message));
    // console.log('error4444', error);
  }
}

// gps plans
export function* fetchGpsPlans() {
  try {
    const data = yield API.get('gps-plans');
    // console.log('Gps Plan', data);
    if (data?.data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchGpsPlansSuccess(data?.data?.gps_plans));
    } else {
      // console.log('else', data);
      yield put(actions.fetchGpsPlansFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchGpsPlansFailure(error.message));
    // console.log('error', error);
  }
}

// gps delivery details
export function* placeGpsOrderSaga({
  name,
  mobile,
  plan_id,
  qty,
  rc_numbers,
  address,
  city,
  landmark,
  pinCode,
  state,
}) {
  console.log(
    2223333,
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
  );
  try {
    const body = new FormData();
    body.append('name', name);
    body.append('mobile', mobile);
    body.append('plan_id', plan_id);
    body.append('qty', qty.toString());
    rc_numbers.forEach(rc_number => {
      body.append('rc_numbers[]', rc_number);
    });
    body.append('address', address);
    body.append('city', city);
    body.append('state', state);
    body.append('landmark', landmark);
    body.append('pincode', pinCode);
    // console.log(9999999, body);
    const data = yield multiPartApi.post('gps-order', body);
    console.log('API response------PaymentVerify', data);
    if (data?.status === 200) {
      yield put(actions.placeGpsOrderSuccess(data));
    } else {
      yield put(actions.placeGpsOrderFailure(data.status));
      // console.log('else', data);
    }
  } catch (error) {
    yield put(actions.placeGpsOrderFailure());
    // console.log('error', error);
  }
}

// gps gps order details
export function* fetchGpsOrderDetail({id}) {
  try {
    const data = yield API.get(`gps-order-get/${id}`);
    // console.log('Gps Plan', data);
    if (data?.data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchGpsOrderDetailSuccess(data?.data));
    } else {
      // console.log('else', data);
      yield put(actions.fetchGpsOrderDetailFailure(data.status));
    }
  } catch (error) {
    yield put(actions.fetchGpsOrderDetailFailure(error.message));
    // console.log('error', error);
  }
}

// gps replay details
export function* setGpsRelayData({deviceId, types}) {
  try {
    // console.log(4444, deviceId, types);
    // Make the API call
    const data = yield API.get(`gps/relay?device_id=${deviceId}&type=${types}`);
    // console.log('set Gps relay', data);
    // Handle the response based on the status code
    if (data?.data?.status === 200) {
      yield put(actions.setGpsRelaySuccess(data?.data));
    } else {
      yield put(actions.setGpsRelayFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.setGpsRelayFailure(error.message));
    // console.log('error', error);
  }
}

export function* fetchGpsRelayData({deviceId}) {
  try {
    // console.log(4444, deviceId);
    // Make the API call
    const data = yield API.get(`gps/relay?device_id=${deviceId}`);
    console.log('Gps Plan', data);

    // Handle the response based on the status code
    if (data?.data?.status === 200) {
      yield put(actions.gpsRelaySuccess(data?.data));
    } else {
      yield put(actions.gpsRelayFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.gpsRelayFailure(error.message));
    // console.log('error', error);
  }
}

// full address
export function* fetchFullAddress({lat, lan, customId}) {
  try {
    // console.log(999999, lat, lan, customId);
    const data = yield googleApi().get(
      `geocode/json?latlng=${lat},${lan}&customParam=${customId}`,
    );
    // const data = yield googleApi().get('geocode/json', {
    //   params: {
    //     latlng: `${lat},${lan}`,
    //     customParam: customId,
    //   },
    // });
    // console.log(888888, 'Gps Address--------------', data);
    if (data?.status === 200) {
      // console.log('success', data);
      yield put(actions.fetchAddressSuccess({...data?.data, customId}));
    } else {
      // console.log('else', data);
      yield put(actions.fetchAddressFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.fetchAddressFailure(error?.message));
    // console.log('error', error);
  }
}
// export function* fetchFullAddress({lat, lan}) {
//   try {
//     const data = yield FetchNominatimApi().get(
//       `reverse?format=json&lat=${lat}&lon=${lan}`,
//     );
//     // console.log('Gps Address--------------', data);
//     if (data?.status === 200) {
//       // console.log('success', data);
//       yield put(actions.fetchAddressSuccess(data?.data));
//     } else {
//       // console.log('else', data);
//       yield put(actions.fetchAddressFailure(data?.status));
//     }
//   } catch (error) {
//     yield put(actions.fetchAddressFailure(error?.message));
//     // console.log('error', error);
//   }
// }

// Add Parking
export function* addGpsParking({name, area, deviceId}) {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('area', area);
    formData.append('device_id', deviceId);
    const data = yield multiPartApi.post('gps/add-parking', formData);
    // console.log(1111, 'Add Parking ----->', data);
    if (data?.data?.status === 200) {
      yield put(actions.addParkingSuccess(data));
    } else {
      yield put(actions.addParkingFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.addParkingFailure(error.message));
    console.log('error', error);
  }
}

// Remove Parking
export function* removeGpsParking({deviceId}) {
  try {
    const formData = new FormData();
    formData.append('device_id', deviceId);
    const data = yield multiPartApi.post('gps/remove-parking', formData);
    // console.log(1111, 'Remove Parking ----->', data);
    if (data?.status === 200) {
      yield put(actions.removeParkingSuccess(data));
    } else {
      yield put(actions.removeParkingFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.removeParkingFailure(error.message));
    console.log('error', error);
  }
}

// Add Geofence
export function* addGpsGeozone({name, area, deviceId}) {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('area', area);
    formData.append('device_id', deviceId);
    const data = yield multiPartApi.post('gps/add-geofence', formData);
    console.log(1111, 'Add GeoZone ----->', data);
    if (data?.data?.status === 200) {
      yield put(actions.addGeofenceSuccess(data?.data));
    } else {
      yield put(actions.addGeofenceFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.addGeofenceFailure(error.message));
    console.log('error', error);
  }
}

// Get Geofence
export function* fetchGeofence({deviceId}) {
  try {
    const data = yield API.get(`gps/get-geofence/${deviceId}`);
    // console.log(1111, 'Get Geofence ----->', data);
    if (data?.status === 200) {
      yield put(actions.getGeofenceSuccess(data));
    } else {
      yield put(actions.getGeofenceFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.getGeofenceFailure(error.message));
    console.log('error', error);
  }
}

// Remove Geofence
export function* deleteGpsGeozone({deviceId}) {
  try {
    const formData = new FormData();
    formData.append('id', deviceId);
    const data = yield multiPartApi.post('gps/add-geofence', formData);
    console.log(1111, 'Delete GeoZone ----->', data);
    if (data?.data?.status === 200) {
      yield put(actions.addGeofenceSuccess(data?.data));
    } else {
      yield put(actions.addGeofenceFailure(data?.status));
    }
  } catch (error) {
    yield put(actions.addGeofenceFailure(error.message));
    console.log('error', error);
  }
}

// Back Button Handler
// export function* watchBackButton() {
//   yield takeLatest('BACK_BUTTON_PRESS', handleBackButton);
// }
