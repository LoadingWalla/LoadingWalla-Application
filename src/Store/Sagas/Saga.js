import {put} from 'redux-saga/effects';
import * as actions from '../Actions/Actions';
import API from '../../Utils/FetchClient';
import multiPartApi from '../../Utils/multiPartApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Saga Login or Signup
export function* authenticate({mobile}) {
  const body = {
    mobile: mobile,
  };
  try {
    const data = yield API.post('login', body);
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
  // console.log("Remove Image ID", profile_img);
  try {
    let param = new FormData();
    if (remove_profile) {
      param.append('remove_profile', userid);
    } else {
      param.append('name', name);
      param.append('city', city);
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
      // console.log("API response", data);
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
export function* location({location}) {
  try {
    const data = yield API.get(`locationlat?search=${location}`);
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
    // console.log("API response------LANGUAGE", data);
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
    // console.log("find-load response", data);
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
    // console.log("API RESPONSE=======Update booking", data);
    if (data?.data?.status === 200) {
      yield put(actions.acceptRejectSuccess(data));
    } else {
      yield put(actions.acceptRejectFailure(data.status));
      // console.log("else", data);
    }
  } catch (error) {
    yield put(actions.acceptRejectFailure());
    //yield put(actions.VerifyOtpFailure(error.message));
    // console.log("error", error);
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
  try {
    const data = yield API.post('add-load', body);
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

// Saga Logout
export function* logout() {
  try {
    const data = yield API.get('logout');
    if (data?.data?.status === 200) {
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
  // console.log("Saga req_id", typeof req_id);
  try {
    let data = yield API.post('cancel-booking', {req_id});
    // console.log("API response------MYLOAD", data);

    if (data?.data?.status === 200) {
      console.log(8998, data);
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
      document_type === 'adhaar_card' &&
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
  // console.log("documetn Test");
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

// Back Button Handler
// export function* watchBackButton() {
//   yield takeLatest('BACK_BUTTON_PRESS', handleBackButton);
// }
