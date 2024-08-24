import updateState from '../../Utils/UpdateState';
import * as actionTypes from '../Actions/ActionTypes';

const initialState = {
  loading: false,
  dashboardLoading: false,
  status: null,
  token: '',
  data: null,
  otpdata: null,
  otpLoading: false,
  profileSetupData: null,
  DashboardData: null,
  DashboardSuggestData: [],
  DashboardBanner: [],
  addLorrydata: null,
  locationData: [],
  DashboardUser: null,
  Userdata: null,
  dashboardStatus: null,
  UserVerifyPercentage: null,
  language: null,
  profileSetupLoading: false,
  profileSetupStatus: null,
  profileLoading: false,
  findLoadData: [],
  findLoadStatus: null,
  findLoadLoading: false,
  myLoadTruckData: [],
  myLoadUserData: null,
  myLoadStatus: null,
  myLoadLoding: false,
  mySingleTruckData: null,
  mySingleTruckStatus: null,
  mySingleTruckLoding: false,
  mySingleLoadData: null,
  mySingleLoadStatus: null,
  mySingleLoadLoding: false,
  mySingleUserData: null,
  myLorryTruckData: [],
  myLorryUserData: null,
  myLorryStatus: null,
  getRequestBookingStatus: null,
  myLorryLoding: false,
  getRequestBookingLoding: false,
  getRequestBookingLodingReceived: false,
  getRequestBookingLodingSent: false,
  contactusData: null,
  contactusLoading: false,
  contactusStatus: null,
  guideData: null,
  guideLoading: false,
  guideStatus: null,
  BookingData: [],
  BookingStatus: null,
  BookingLoading: false,
  BookingDashUser: null,
  NotificationData: [],
  NotificationStatus: null,
  NotificationLoading: null,
  accept_rejectData: null,
  accept_rejectLoading: false,
  accept_rejectStatus: null,
  myPostLoadData: null,
  myPostLoadStatus: null,
  myfindLoadLoading: false,
  wallletData: null,
  walletStatus: null,
  walletLoading: false,
  getWallletData: null,
  getWalletStatus: null,
  geWwalletLoading: false,
  logoutData: null,
  logoutStatus: null,
  logoutLoading: false,
  loadTruckData: [],
  loadTruckStatus: null,
  loadTruckLoading: false,
  ratingData: null,
  ratingStatus: null,
  ratingLoading: false,
  requestLorrydata: null,
  requestSendStatus: null,
  getUserData: null,
  getUserStatus: null,
  getUserLoading: false,
  getRequestBookingdata: [],
  getRequestBookingdataReceived: [],
  getRequestBookingdataSent: [],
  statusChangeData: null,
  statusChange_Status: null,
  statusChangeLoading: false,
  findLorryData: [],
  findLorryStatus: null,
  findLorryLoading: false,
  modalLocation: null,
  modalLocationTo: null,
  searchFromId: null,
  searchToId: null,
  currentLocationData: null,
  currentLocationStatus: null,
  truckTypeData: [],
  permitData: [],
  wheeldata: [],
  lorryRequireLoading: false,
  deleteLorryStatus: null,
  deleteLorryMessage: null,
  deletelorryLoading: false,
  cancelBookingStatus: null,
  cancelBookingMessage: null,
  cancelBookingLoading: false,
  addLorryStatus: null,
  requireLorryLoading: false,
  bookingLorrydata: null,
  acceptBookingStatus: null,
  bookingPending: [],
  bookingOngoing: [],
  bookingCompleted: [],
  documentUploadStatus: null,
  documentUploadData: [],
  documentUploadLoading: false,
  getDocumentStatus: null,
  getDocumentData: [],
  getDocumentLoading: false,
  getRcStatus: null,
  getRcData: [],
  getRcLoading: false,
  qrCodeStatus: null,
  qrCodeData: [],
  qrCodeLoading: false,
  //Maps
  mapOrigin: null,
  mapDestination: null,
  mapLoading: false,
  mapError: null,
  // create order
  orderLoading: false,
  orderData: null,
  orderStatus: null,
  // verify payment
  verifyPaymentLoading: false,
  verifyPaymentData: null,
  verifyPaymentStatus: null,
  // complete Booking Document
  completeDocumentLoading: false,
  completeDocumentData: null,
  completeDocumentStatus: null,
  // transcation detials
  transcationLoading: false,
  transcationData: null,
  transcationStatus: null,
  // gps token generate
  gpsTokenLoading: false,
  gpsTokenData: null,
  gpsTokenStatus: null,
  // gpsdevicedata
  gpsDeviceLoading: false,
  gpsDeviceData: null,
  gpsDeviceStatus: null,
  // websocket
  wsMessages: [],
  wsConnected: false,
  wsError: null,
  wsDevices: [],
  wsEvents: [],
  wsPositions: [],
  // gps address
  gpsAddressLoading: false,
  gpsAddressData: null,
  gpsAddressError: null,
  // gps summary
  gpsSummaryLoading: false,
  gpsSummaryError: null,
  gpsSummaryData: null,
  // gps notification
  gpsNotificationLoading: false,
  gpsNotificationError: null,
  gpsNotificationData: null,
  // gps replay
  gpsReplayLoading: false,
  gpsReplayError: null,
  gpsReplayData: [],
  // gps stops
  gpsStopsLoading: false,
  gpsStopsError: null,
  gpsStopsData: null,
  // gps trips
  gpsTripsLoading: false,
  gpsTripsError: null,
  gpsTripsData: null,
  // gps plans
  gpsPlansData: [],
  rechargePlansData: [],
  gpsPlansLoading: false,
  gpsPlansError: null,
  // gps order
  gpsOrderLoading: false,
  gpsOrderData: null,
  gpsOrderStatus: null,
  // gps order Details
  gpsOrderDetailsLoading: false,
  gpsOrderDetailsData: null,
  gpsOrderDetailsStatus: null,
  gpsPriceDetailsData: null,
  // single gps devices
  singleGpsDevice: null,
  singleGpsDeviceLoading: false,
  singleGpsDeviceError: null,
  // full address
  fullAddressLoading: false,
  fullAddressData: null,
  fullAddressStatus: null,
  // gps relay
  gpsRelayloading: false,
  gpsRelayData: null,
  gpsRelayStatus: null,
  // set gps relay
  setGpsRelayloading: false,
  setGpsRelayData: null,
  setGpsRelayStatus: null,
};

const reducer = (state = initialState, action) => {
  const {payload, type} = action;
  // console.log('Reducer', payload);

  switch (type) {
    case actionTypes.INIT_LOGIN:
      return {
        ...state,
        loading: true,
        success: false,
        message: null,
        status: null,
        dashboardStatus: null,
        user: null,
        data: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return updateState(state, {
        data: payload?.data,
        loading: false,
        dashboardStatus: payload?.data?.status,
        status: payload,
      });

    case actionTypes.LOGIN_FAILURE:
      return updateState(state, {
        loading: false,
        data: payload,
        dashboardStatus: null,
        status: null,
      });

    case actionTypes.INIT_VERIFY_OTP:
      return {
        ...state,
        otpLoading: true,
        status: null,
        otpdata: null,
      };
    case actionTypes.VERIFY_OTP_SUCCESS:
      return updateState(state, {
        otpdata: payload,
        otpLoading: false,
        status: payload?.data?.status,
      });

    case actionTypes.VERIFY_OTP_FAILURE:
      return updateState(state, {
        otpLoading: false,
        otpdata: payload,
        status: payload?.data?.status,
      });
    case actionTypes.INIT_PROFILE_SETUP:
      return {
        ...state,
        profileSetupLoading: true,
        profileSetupStatus: null,
        profileSetupData: null,
      };
    case actionTypes.PROFILE_SETUP_SUCCESS:
      return updateState(state, {
        profileSetupData: payload?.data,
        profileSetupLoading: false,
        profileSetupStatus: payload?.data?.status,
      });
    case actionTypes.PROFILE_SETUP_FAILURE:
      return updateState(state, {
        profileSetupLoading: false,
        profileSetupData: payload,
        profileSetupStatus: null,
      });

    case actionTypes.INIT_ADDLORRY:
      return {
        ...state,
        loading: true,
        status: null,
        addLorrydata: null,
      };
    case actionTypes.ADDLORRY_SUCCESS:
      return updateState(state, {
        addLorrydata: payload?.data,
        loading: false,
        status: payload?.data?.status,
      });
    case actionTypes.ADDLORRY_FAILURE:
      return updateState(state, {
        loading: false,
        addLorrydata: payload,
        status: null,
      });
    case actionTypes.INIT_LOCATION:
      return {
        ...state,
        //loading: true,
        status: null,
        locationData: null,
      };
    case actionTypes.LOCATION_SUCCESS:
      return updateState(state, {
        locationData: payload?.data?.data,
        //loading: false,
        status: payload?.data,
      });
    case actionTypes.LOCATION_FAILURE:
      return updateState(state, {
        //loading: false,
        locationData: payload,
        status: null,
      });

    case actionTypes.INIT_DASHBOARD:
      return {
        ...state,
        dashboardLoading: true,
        status: null,
        DashboardData: null,
        DashboardSuggestData: [],
        DashboardBanner: [],
        DashboardUser: null,
      };
    case actionTypes.DASHBOARD_SUCCESS:
      // console.log("DASHBOARD_SUCCESS payload:", payload?.data);
      // console.log("State before update:", state);
      return updateState(state, {
        DashboardData: payload?.data?.truck,
        DashboardSuggestData: payload?.data?.suggest,
        DashboardBanner: payload?.data?.banner,
        DashboardUser: payload?.data?.user,
        dashboardLoading: false,
        //status: payload?.data?.status,
      });

    case actionTypes.DASHBOARD_FAILURE:
      return updateState(state, {
        dashboardLoading: false,
        DashboardData: payload,
        DashboardSuggestData: [],
        DashboardBanner: null,
        DashboardUser: null,
        status: null,
      });

    //REQUEST BOOKING
    case actionTypes.INIT_REQUEST_BOOKING:
      return {
        ...state,
        loading: true,
        requestSendStatus: null,
        requestLorrydata: null,
      };
    case actionTypes.REQUEST_BOOKING_SUCCESS:
      return updateState(state, {
        requestLorrydata: payload?.data,
        loading: false,
        requestSendStatus: payload?.data?.status,
      });
    case actionTypes.REQUEST_BOOKING_FAILURE:
      return updateState(state, {
        requestLorrydata: payload,
        loading: false,
        requestSendStatus: null,
      });

    // ACCEPT BOOKING
    case actionTypes.INIT_ACCEPT_BOOKING:
      return {
        ...state,
        loading: true,
        bookingLorrydata: null,
        acceptBookingStatus: null,
      };
    case actionTypes.ACCEPT_BOOKING_SUCCESS:
      return updateState(state, {
        loading: false,
        bookingLorrydata: payload?.data,
        acceptBookingStatus: payload?.data?.status,
      });
    case actionTypes.ACCEPT_BOOKING_FAILURE:
      return updateState(state, {
        loading: false,
        bookingLorrydata: payload?.data,
        acceptBookingStatus: null,
      });

    case actionTypes.INIT_PROFILE:
      return {
        ...state,
        profileLoading: true,
        status: null,
        DashboardUser: null,
        Userdata: null,
        UserVerifyPercentage: null,
      };
    case actionTypes.PROFILE_SUCCESS:
      return updateState(state, {
        DashboardUser: payload?.data?.user,
        Userdata: payload?.data?.user,
        profileLoading: false,
        status: payload?.data?.status,
        UserVerifyPercentage: payload?.data?.verify,
      });
    case actionTypes.PROFILE_FAILURE:
      return updateState(state, {
        profileLoading: false,
        DashboardUser: null,
        Userdata: null,
        status: null,
        UserVerifyPercentage: null,
      });

    case actionTypes.INIT_LANGUAGE:
      return {
        ...state,
        language: null,
      };
    case actionTypes.LANGUAGE_SUCCESS:
      return updateState(state, {
        language: payload,
        //status: payload?.data?.status,
      });
    case actionTypes.LANGUAGE_FAILURE:
      return updateState(state, {
        language: payload,
      });

    case actionTypes.INIT_FIND_LOAD:
      return {
        ...state,
        findLoadData: [],
        findLoadStatus: null,
        findLoadLoading: true,
      };
    case actionTypes.FIND_LOAD_SUCCESS:
      return updateState(state, {
        findLoadData: payload?.data?.data,
        findLoadStatus: payload?.data?.status,
        findLoadLoading: false,
      });
    case actionTypes.FIND_LOAD_FAILURE:
      return updateState(state, {
        findLoadData: payload,
        findLoadStatus: null,
        findLoadLoading: false,
      });

    case actionTypes.INIT_MYLORRY:
      return {
        ...state,
        myLorryTruckData: null,
        myLorryStatus: null,
        myLorryLoding: true,
        myLorryUserData: null,
      };
    case actionTypes.MYLORRY_SUCCESS:
      return updateState(state, {
        myLorryTruckData: payload?.data?.truck,
        myLorryStatus: payload?.data?.status,
        myLorryLoding: false,
        myLorryUserData: payload?.data?.user,
      });
    case actionTypes.MYLORRY_FAILURE:
      return updateState(state, {
        myLorryTruckData: payload,
        myLorryStatus: null,
        myLorryUserData: payload,
        myLorryLoding: false,
      });

    case actionTypes.INIT_MYLORRY_BY_ID:
      return {
        ...state,
        mySingleTruckData: null,
        mySingleTruckStatus: null,
        mySingleTruckLoding: true,
        mySingleUserData: null,
      };
    case actionTypes.MYLORRY_ID_SUCCESS:
      return updateState(state, {
        mySingleTruckData: payload?.data?.truck,
        mySingleTruckStatus: payload?.data?.status,
        mySingleTruckLoding: false,
        mySingleUserData: payload?.data?.user,
      });
    case actionTypes.MYLORRY_ID_FAILURE:
      return updateState(state, {
        mySingleTruckData: payload,
        mySingleTruckStatus: null,
        mySingleUserData: null,
        mySingleTruckLoding: false,
      });

    case actionTypes.INIT_MYLOAD_BY_ID:
      return {
        ...state,
        mySingleLoadData: null,
        mySingleLoadStatus: null,
        mySingleLoadLoding: true,
        mySingleUserData: null,
      };
    case actionTypes.MYLOAD_ID_SUCCESS:
      return updateState(state, {
        mySingleLoadData: payload?.data?.load,
        mySingleLoadStatus: payload?.data?.status,
        mySingleLoadLoding: false,
        mySingleUserData: payload?.data?.user,
      });
    case actionTypes.MYLOAD_ID_FAILURE:
      return updateState(state, {
        mySingleLoadData: payload,
        mySingleLoadStatus: null,
        mySingleUserData: null,
        mySingleLoadLoding: false,
      });

    case actionTypes.INIT_GET_REQUEST_BOOKING:
      return {
        ...state,
        getRequestBookingdata: null,
        getRequestBookingdataReceived: null,
        getRequestBookingdataSent: null,
        getRequestBookingStatus: null,
        getRequestBookingLoding: true,
        getRequestBookingLodingReceived: true,
        getRequestBookingLodingSent: true,
      };
    case actionTypes.INIT_GET_REQUEST_BOOKING_SUCCESS:
      return updateState(state, {
        getRequestBookingdata: payload?.data?.data,
        getRequestBookingStatus: payload?.data?.status,
        getRequestBookingLoding: false,
      });
    case actionTypes.INIT_GET_REQUEST_BOOKING_SUCCESS_RECEIVED:
      return updateState(state, {
        getRequestBookingdataReceived: payload?.data?.data,
        getRequestBookingStatus: payload?.data?.status,
        getRequestBookingLodingReceived: false,
        getRequestBookingLodingSent: true,
      });
    case actionTypes.INIT_GET_REQUEST_BOOKING_SUCCESS_SENT:
      return updateState(state, {
        getRequestBookingdataSent: payload?.data?.data,
        getRequestBookingStatus: payload?.data?.status,
        getRequestBookingLodingSent: false,
        getRequestBookingLodingReceived: true,
      });
    case actionTypes.INIT_GET_REQUEST_BOOKING_FAILURE:
      return updateState(state, {
        getRequestBookingdata: payload,
        getRequestBookingdataReceived: payload,
        getRequestBookingdataSent: payload,
        getRequestBookingStatus: null,
        getRequestBookingLoding: false,
        getRequestBookingLodingReceived: false,
        getRequestBookingLodingSent: false,
      });

    case actionTypes.INIT_MYLOAD:
      return {
        ...state,
        myLoadTruckData: null,
        myLoadStatus: null,
        myLoadLoding: true,
        myLoadUserData: null,
      };
    case actionTypes.MYLOAD_SUCCESS:
      return updateState(state, {
        myLoadTruckData: payload?.data?.load,
        myLoadStatus: payload?.data?.status,
        myLoadLoding: false,
        myLoadUserData: payload?.data?.user,
      });
    case actionTypes.MYLOAD_FAILURE:
      return updateState(state, {
        myLoadTruckData: payload,
        myLoadStatus: null,
        myLoadUserData: payload,
        myLoadLoding: false,
      });

    case actionTypes.INIT_CONTACTUS:
      return {
        ...state,
        contactusData: null,
        contactusLoading: true,
        contactusStatus: null,
      };
    case actionTypes.CONTACTUS_SUCCESS:
      return updateState(state, {
        contactusData: payload?.data?.message,
        contactusStatus: payload?.data?.status,
        contactusLoading: false,
      });
    case actionTypes.CONTACTUS_FAILURE:
      return updateState(state, {
        contactusData: payload,
        contactusStatus: payload,
        contactusLoading: false,
      });

    case actionTypes.INIT_GUIDE:
      return {
        ...state,

        guideData: null,
        guideLoading: true,
        guideStatus: null,
      };
    case actionTypes.GUIDE_SUCCESS:
      return updateState(state, {
        guideData: payload?.data?.guide,
        guideStatus: payload?.data?.status,
        guideLoading: false,
      });
    case actionTypes.GUIDE_FAILURE:
      return updateState(state, {
        guideData: payload,
        guideStatus: payload,
        guideLoading: false,
      });

    case actionTypes.INIT_BOOKING:
      return {
        ...state,
        BookingData: [],
        BookingLoading: true,
        BookingStatus: null,
        BookingDashUser: null,
      };
    case actionTypes.BOOKING_SUCCESS:
      return updateState(state, {
        BookingData: payload?.data?.data,
        BookingStatus: payload?.status,
        BookingLoading: false,
        BookingDashUser: payload?.data?.user,
      });
    // case actionTypes.PENDING_BOOKING_SUCCESS:
    //   return updateState(state, {
    //     BookingStatus: payload?.status,
    //     bookingPending: payload?.data?.data,
    //     BookingDashUser: payload?.data?.user,
    //   });
    // case actionTypes.ONGOING_BOOKING_SUCCESS:
    //   return updateState(state, {
    //     BookingStatus: payload?.status,
    //     bookingOngoing: payload?.data?.data,
    //     BookingDashUser: payload?.data?.user,
    //   });
    // case actionTypes.COMPLETE_BOOKING_SUCCESS:
    //   return updateState(state, {
    //     BookingStatus: payload?.status,
    //     bookingCompleted: payload?.data?.data,
    //     BookingDashUser: payload?.data?.user,
    //   });
    case actionTypes.BOOKING_FAILURE:
      return updateState(state, {
        BookingData: payload,
        BookingStatus: payload,
        BookingLoading: false,
        BookingDashUser: null,
      });

    case actionTypes.INIT_ACCEPT_REJECT:
      return {
        ...state,
        accept_rejectData: null,
        accept_rejectLoading: true,
        accept_rejectStatus: null,
      };
    case actionTypes.ACCEPT_REJECT_SUCCESS:
      return updateState(state, {
        accept_rejectData: payload?.data?.message,
        accept_rejectLoading: false,
        accept_rejectStatus: payload?.status,
      });
    case actionTypes.ACCEPT_REJECT_FAILURE:
      return updateState(state, {
        accept_rejectData: null,
        accept_rejectLoading: false,
        accept_rejectStatus: null,
      });

    case actionTypes.INIT_NOTIFICATION:
      return {
        ...state,
        NotificationData: [],
        NotificationLoading: true,
        NotificationStatus: null,
      };
    case actionTypes.NOTIFICATION_SUCCESS:
      return updateState(state, {
        NotificationData: payload?.data?.notification,
        NotificationStatus: payload?.status,
        NotificationLoading: false,
      });
    case actionTypes.NOTIFICATION_FAILURE:
      return updateState(state, {
        NotificationData: payload,
        NotificationStatus: payload,
        NotificationLoading: false,
      });

    case actionTypes.INIT_MYPOST_LOAD:
      return {
        ...state,
        myPostLoadData: [],
        myfindLoadLoading: true,
        myPostLoadStatus: null,
      };
    case actionTypes.MYPOST_LOAD_SUCCESS:
      return updateState(state, {
        myPostLoadData: payload,
        myPostLoadStatus: payload?.data?.status,
        myfindLoadLoading: false,
      });
    case actionTypes.MYPOST_LOAD_FAILURE:
      return updateState(state, {
        myPostLoadData: payload,
        myPostLoadStatus: payload,
        myfindLoadLoading: false,
      });

    case actionTypes.INIT_WALLET:
      return {
        ...state,
        wallletData: null,
        walletLoading: true,
        walletStatus: null,
      };
    case actionTypes.WALLET_SUCCESS:
      return updateState(state, {
        wallletData: payload?.data?.message,
        walletStatus: payload?.status,
        walletLoading: false,
      });
    case actionTypes.WALLET_FAILURE:
      return updateState(state, {
        wallletData: null,
        walletStatus: null,
        walletLoading: false,
      });

    case actionTypes.INIT_GET_WALLET:
      return {
        ...state,
        getWallletData: null,
        geWwalletLoading: true,
        getWalletStatus: null,
      };
    case actionTypes.GET_WALLET_SUCCESS:
      return updateState(state, {
        getWallletData: payload?.data?.data?.user,
        getWalletStatus: payload?.status,
        geWwalletLoading: false,
      });
    case actionTypes.GET_WALLET_FAILURE:
      return updateState(state, {
        getWallletData: payload,
        getWalletStatus: payload,
        geWwalletLoading: false,
      });

    case actionTypes.INIT_LOGOUT:
      return {
        ...state,
        logoutData: null,
        logoutLoading: true,
        logoutStatus: null,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return updateState(state, {
        logoutData: payload?.data?.data?.user,
        logoutStatus: payload?.status,
        logoutLoading: false,
      });
    case actionTypes.LOGOUT_FAILURE:
      return updateState(state, {
        logoutData: payload,
        logoutStatus: payload,
        logoutLoading: false,
      });

    case actionTypes.INIT_LOAD_TRUCK:
      return {
        ...state,
        loadTruckData: null,
        loadTruckLoading: true,
        loadTruckStatus: null,
      };
    case actionTypes.LOAD_TRUCK_SUCCESS:
      return updateState(state, {
        loadTruckData: payload?.data?.truck_type,
        loadTruckStatus: payload?.data?.status,
        loadTruckLoading: false,
      });
    case actionTypes.LOAD_TRUCK_FAILURE:
      return updateState(state, {
        loadTruckData: payload,
        loadTruckStatus: payload,
        loadTruckLoading: false,
      });

    case actionTypes.INIT_RATING:
      return {
        ...state,
        ratingData: null,
        ratingLoading: true,
        ratingStatus: null,
      };
    case actionTypes.RATING_SUCCESS:
      return updateState(state, {
        ratingData: payload?.data?.truck_type,
        ratingStatus: payload?.data?.status,
        ratingLoading: false,
      });
    case actionTypes.RATING_FAILURE:
      return updateState(state, {
        ratingData: payload,
        ratingStatus: payload,
        ratingLoading: false,
      });

    case actionTypes.INIT_USER_PROFILE:
      return {
        ...state,
        getUserData: null,
        getUserLoading: true,
        getUserStatus: null,
      };
    case actionTypes.USER_PROFILE_SUCCESS:
      return updateState(state, {
        getUserData: payload?.data?.user,
        getUserStatus: payload?.data?.status,
        getUserLoading: false,
      });
    case actionTypes.USER_PROFILE_FAILURE:
      return updateState(state, {
        getUserData: payload,
        getUserStatus: payload,
        getUserLoading: false,
      });

    case actionTypes.INIT_STATUS_CHANGE:
      return {
        ...state,
        statusChangeData: null,
        statusChange_Status: null,
        statusChangeLoading: true,
      };
    case actionTypes.STATUS_CHANGE_SUCCESS:
      return updateState(state, {
        statusChangeData: payload?.data?.message,
        statusChange_Status: payload?.data?.status,
        statusChangeLoading: false,
      });
    case actionTypes.STATUS_CHANGE_FAILURE:
      return updateState(state, {
        statusChangeData: payload,
        statusChange_Status: payload,
        statusChangeLoading: false,
      });

    case actionTypes.INIT_FIND_LORRY:
      return {
        ...state,
        findLorryData: [],
        findLorryStatus: null,
        findLorryLoading: true,
      };
    case actionTypes.FIND_LORRY_SUCCESS:
      return updateState(state, {
        findLorryData: payload?.data?.data,
        findLorryStatus: payload?.status,
        findLorryLoading: false,
      });
    case actionTypes.FIND_LORRY_FAILURE:
      return updateState(state, {
        findLorryData: [],
        findLorryStatus: null,
        findLorryLoading: false,
      });

    case actionTypes.INIT_MODAL_LOCATION:
      return {
        ...state,
        modalLocation: null,
      };
    case actionTypes.INIT_SEARCH_FROM_ID:
      return {
        ...state,
        searchFromId: null,
      };
    case actionTypes.INIT_SEARCH_TO_ID:
      return {
        ...state,
        searchToId: null,
      };
    case actionTypes.MODAL_LOCATION_SUCCESS:
      return updateState(state, {
        modalLocation: payload,
      });
    case actionTypes.SEARCH_FROM_ID_SUCCESS:
      return updateState(state, {
        searchFromId: payload,
      });
    case actionTypes.SEARCH_TO_ID_SUCCESS:
      return updateState(state, {
        searchToId: payload,
      });
    case actionTypes.MODAL_CLOSE_LOCATION:
      return updateState(state, {
        modalLocation: null,
      });
    case actionTypes.MODAL_LOCATION_CLEAR:
      return updateState(state, {
        modalLocation: null,
      });

    case actionTypes.INIT_MODAL_LOCATION_TO:
      return {
        ...state,
        modalLocationTo: null,
      };
    case actionTypes.MODAL_LOCATION_TO_SUCCESS:
      return updateState(state, {
        modalLocationTo: payload,
      });
    case actionTypes.MODAL_LOCATION_TO_CLEAR:
      return updateState(state, {
        modalLocationTo: null,
      });

    case actionTypes.INIT_CURRENT_LOCATION:
      return {
        ...state,
        currentLocationData: null,
        currentLocationStatus: null,
      };
    case actionTypes.CURRENT_LOCATION_SUCCESS:
      return updateState(state, {
        currentLocationData: payload,
        currentLocationStatus: payload,
      });
    case actionTypes.CURRENT_LOCATION_FAILURE:
      return updateState(state, {
        currentLocationData: null,
        currentLocationStatus: null,
      });

    case actionTypes.INIT_LORRY_REQUIRE:
      return {
        ...state,
        truckTypeData: [],
        permitData: [],
        wheeldata: [],
        addLorryStatus: null,
        lorryRequireLoading: true,
      };
    case actionTypes.LORRY_REQUIRE_SUCCESS:
      return updateState(state, {
        truckTypeData: payload?.data?.truck_type,
        permitData: payload?.data?.permit,
        wheeldata: payload?.data?.wheel,
        addLorryStatus: payload?.data?.status,
        lorryRequireLoading: false,
      });
    case actionTypes.LORRY_REQUIRE_FAILURE:
      return updateState(state, {
        truckTypeData: [],
        permitData: [],
        wheeldata: [],
        addLorryStatus: null,
        lorryRequireLoading: false,
      });

    case actionTypes.INIT_DELETE_LORRY:
      return {
        ...state,
        deleteLorryStatus: null,
        deleteLorryMessage: null,
        deletelorryLoading: true,
      };
    case actionTypes.DELETE_LORRY_SUCCESS:
      return updateState(state, {
        deleteLorryStatus: payload?.data?.status,
        deleteLorryMessage: payload?.data?.message,
        deletelorryLoading: false,
      });
    case actionTypes.DELETE_LORRY_FAILURE:
      return updateState(state, {
        deleteLorryStatus: null,
        deleteLorryMessage: null,
        deletelorryLoading: false,
      });

    case actionTypes.INIT_CANCEL_BOOKING:
      return {
        ...state,
        cancelBookingStatus: null,
        cancelBookingMessage: null,
        cancelBookingLoading: true,
      };
    case actionTypes.CANCEL_BOOKING_SUCCESS:
      return updateState(state, {
        cancelBookingStatus: payload?.data?.status,
        cancelBookingMessage: payload?.data?.message,
        cancelBookingLoading: false,
      });
    case actionTypes.CANCEL_BOOKING_FAILURE:
      return updateState(state, {
        cancelBookingStatus: null,
        cancelBookingMessage: null,
        cancelBookingLoading: false,
      });

    case actionTypes.INIT_DOCUMENT_VERIFY:
      return {
        ...state,
        documentUploadStatus: null,
        documentUploadData: [],
        documentUploadLoading: true,
      };
    case actionTypes.DOCUMENT_UPLOAD_SUCCESS:
      return updateState(state, {
        documentUploadStatus: payload?.data?.status,
        documentUploadData: payload?.data,
        documentUploadLoading: false,
      });
    case actionTypes.DOCUMENT_UPLOAD_FAILURE:
      return updateState(state, {
        documentUploadStatus: null,
        documentUploadData: [],
        documentUploadLoading: false,
      });

    case actionTypes.INIT_DOCUMENT_VERIFICATION:
      return {
        ...state,
        getDocumentStatus: null,
        getDocumentData: [],
        getDocumentLoading: true,
      };
    case actionTypes.DOCUMENT_VERIFICATION_SUCCESS:
      return updateState(state, {
        getDocumentStatus: payload?.data?.status,
        getDocumentLoading: false,
        getDocumentData: payload?.data?.data,
      });
    case actionTypes.DOCUMENT_VERIFICATION_FAILURE:
      return updateState(state, {
        getDocumentLoading: false,
        getDocumentData: [],
        getDocumentStatus: null,
      });

    //RC-Verification
    case actionTypes.INIT_RC_VERIFICATION:
      return {
        ...state,
        getRcStatus: null,
        getRcData: [],
        getRcLoading: true,
      };
    case actionTypes.RC_VERIFICATION_SUCCESS:
      return updateState(state, {
        getRcStatus: payload?.data?.status,
        getRcLoading: false,
        getRcData: payload?.data?.data,
      });
    case actionTypes.RC_VERIFICATION_FAILURE:
      return updateState(state, {
        getRcLoading: false,
        getRcData: [],
        getRcStatus: null,
      });

    // QR-Scanner
    case actionTypes.INIT_QR_SCANNER:
      return {
        ...state,
        qrCodeStatus: null,
        qrCodeData: [],
        qrCodeLoading: true,
      };
    case actionTypes.QR_SCANNER_SUCCESS:
      return updateState(state, {
        qrCodeStatus: payload?.data?.status,
        qrCodeLoading: false,
        qrCodeData: payload?.data?.data,
      });
    case actionTypes.QR_SCANNER_FAILURE:
      return updateState(state, {
        qrCodeStatus: null,
        qrCodeData: [],
        qrCodeLoading: false,
      });

    // Maps
    case actionTypes.FETCH_MAP_DATA_START:
      return {
        ...state,
        mapLoading: true,
      };
    case actionTypes.FETCH_MAP_DATA_SUCCESS:
      return updateState(state, {
        mapOrigin: payload?.data?.data?.origin,
        mapDestination: payload?.data?.data?.destination,
        mapLoading: false,
      });
    case actionTypes.FETCH_MAP_DATA_FAILURE:
      return updateState(state, {
        mapLoading: false,
        mapError: payload,
      });

    //create order
    case actionTypes.CREATE_ORDER_REQUEST:
      return {
        ...state,
        orderLoading: true,
        orderData: null,
        orderStatus: null,
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      return updateState(state, {
        orderLoading: false,
        orderData: payload?.data,
        orderStatus: payload?.status,
      });
    case actionTypes.CREATE_ORDER_FAILURE:
      return updateState(state, {
        orderLoading: false,
        orderData: null,
        orderStatus: null,
      });

    // Verify Payment
    case actionTypes.VERIFY_PAYMENT_REQUEST:
      return {
        ...state,
        verifyPaymentLoading: true,
        verifyPaymentData: null,
        verifyPaymentStatus: null,
      };
    case actionTypes.VERIFY_PAYMENT_SUCCESS:
      return updateState(state, {
        verifyPaymentLoading: false,
        verifyPaymentData: payload?.data,
        verifyPaymentStatus: payload?.status,
      });
    case actionTypes.VERIFY_PAYMENT_FAILURE:
      return updateState(state, {
        verifyPaymentLoading: false,
        verifyPaymentData: null,
        verifyPaymentStatus: null,
      });

    // complete Booking Document
    case actionTypes.COMPLETE_BOOKING_DOCUMENT_REQUEST:
      return {
        ...state,
        completeDocumentLoading: true,
        completeDocumentData: null,
        completeDocumentStatus: null,
      };
    case actionTypes.COMPLETE_BOOKING_DOCUMENT_SUCCESS:
      return updateState(state, {
        completeDocumentLoading: false,
        completeDocumentData: payload?.data,
        completeDocumentStatus: payload?.status,
      });
    case actionTypes.COMPLETE_BOOKING_DOCUMENT_FAILURE:
      return updateState(state, {
        completeDocumentLoading: false,
        completeDocumentData: null,
        completeDocumentStatus: null,
      });

    // transcation Details
    case actionTypes.FETCH_TRANSACTIONS_REQUEST:
      return {
        ...state,
        transcationLoading: true,
        transcationData: null,
        transcationStatus: null,
      };
    case actionTypes.FETCH_TRANSACTIONS_SUCCESS:
      return updateState(state, {
        transcationLoading: false,
        transcationData: payload?.data?.transaction,
        transcationStatus: payload?.status,
      });
    case actionTypes.FETCH_TRANSACTIONS_FAILURE:
      return updateState(state, {
        transcationLoading: false,
        transcationData: null,
        transcationStatus: null,
      });

    // GPS TOKEN GENERATE
    case actionTypes.FETCH_GPS_TOKEN_REQUEST:
      return {
        ...state,
        gpsTokenLoading: true,
        gpsTokenData: null,
        gpsTokenStatus: null,
      };
    case actionTypes.FETCH_GPS_TOKEN_SUCCESS:
      return updateState(state, {
        gpsTokenLoading: false,
        gpsTokenData: payload,
        gpsTokenStatus: payload?.status,
      });
    case actionTypes.FETCH_GPS_TOKEN_FAILURE:
      return updateState(state, {
        gpsTokenLoading: false,
        gpsTokenData: null,
        gpsTokenStatus: null,
      });

    // GPS Device fetching
    case actionTypes.FETCH_GPS_DEVICES_REQUEST:
      return {
        ...state,
        gpsDeviceLoading: true,
        gpsDeviceStatus: null,
      };
    case actionTypes.FETCH_GPS_DEVICES_SUCCESS:
      return updateState(state, {
        gpsDeviceLoading: false,
        gpsDeviceData: payload?.data?.devices,
        // gpsDeviceData: payload,
        // wsDevices: payload,
        wsDevices: payload?.data?.devices,
        gpsDeviceStatus: payload?.status,
      });
    case actionTypes.FETCH_GPS_DEVICES_FAILURE:
      return updateState(state, {
        gpsDeviceLoading: false,
        gpsDeviceStatus: null,
      });

    // Single GPS device cases
    case actionTypes.FETCH_SINGLE_GPS_DEVICE_REQUEST:
      return updateState(state, {
        singleGpsDeviceLoading: true,
        singleGpsDeviceError: null,
        singleGpsDevice: null,
      });
    case actionTypes.FETCH_SINGLE_GPS_DEVICE_SUCCESS:
      return updateState(state, {
        singleGpsDevice: payload,
        singleGpsDeviceLoading: false,
      });
    case actionTypes.FETCH_SINGLE_GPS_DEVICE_FAILURE:
      return updateState(state, {
        singleGpsDeviceError: payload,
        singleGpsDeviceLoading: false,
        singleGpsDevice: null,
      });

    // Gps Websocket Connect
    case actionTypes.WEBSOCKET_CONNECT:
      return {...state, wsConnected: true};
    case actionTypes.WEBSOCKET_DISCONNECT:
      return updateState(state, {wsConnected: false, wsError: null});
    case actionTypes.WEBSOCKET_MESSAGE:
      return updateState(state, {
        wsMessages: [...state.wsMessages, payload],
        wsConnected: true,
      });
    case actionTypes.WEBSOCKET_ERROR:
      return updateState(state, {wsError: payload, wsConnected: false});
    case actionTypes.WEBSOCKET_CLOSED:
      return updateState(state, {wsConnected: false});
    case actionTypes.UPDATE_DEVICES:
      return updateState(state, {wsDevices: payload, wsConnected: true});
    case actionTypes.UPDATE_POSITIONS:
      return updateState(state, {wsPositions: payload, wsConnected: true});
    case actionTypes.UPDATE_EVENTS:
      return updateState(state, {wsEvents: payload, wsConnected: true});

    // GPS Address
    case actionTypes.FETCH_GPS_ADDRESS_REQUEST:
      return {
        ...state,
        gpsAddressLoading: true,
        gpsAddressError: null,
      };
    case actionTypes.FETCH_GPS_ADDRESS_SUCCESS:
      return updateState(state, {
        gpsAddressLoading: false,
        gpsAddressData: payload,
      });
    case actionTypes.FETCH_GPS_ADDRESS_FAILURE:
      return updateState(state, {
        gpsAddressLoading: false,
        gpsAddressError: payload,
        gpsAddressData: null,
      });

    // GPS Summary report
    case actionTypes.FETCH_SUMMARY_REPORT_REQUEST:
      return {
        ...state,
        gpsSummaryLoading: true,
        gpsSummaryError: null,
      };
    case actionTypes.FETCH_SUMMARY_REPORT_SUCCESS:
      return updateState(state, {
        gpsSummaryLoading: false,
        gpsSummaryData: payload,
      });
    case actionTypes.FETCH_SUMMARY_REPORT_FAILURE:
      return updateState(state, {
        gpsSummaryLoading: false,
        gpsSummaryError: payload,
        gpsSummaryData: null,
      });

    // GPS Notification
    case actionTypes.FETCH_GPS_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        gpsNotificationLoading: true,
        gpsNotificationError: null,
      };
    case actionTypes.FETCH_GPS_NOTIFICATIONS_SUCCESS:
      return updateState(state, {
        gpsNotificationLoading: false,
        gpsNotificationData: payload,
      });
    case actionTypes.FETCH_GPS_NOTIFICATIONS_FAILURE:
      return updateState(state, {
        gpsNotificationLoading: false,
        gpsNotificationError: payload,
        gpsNotificationData: null,
      });

    // GPS Replay
    case actionTypes.FETCH_POSITIONS_REQUEST:
      return {
        ...state,
        gpsReplayLoading: true,
        gpsReplayError: null,
        gpsReplayData: [],
      };
    case actionTypes.FETCH_POSITIONS_SUCCESS:
      return updateState(state, {
        gpsReplayLoading: false,
        gpsReplayData: payload,
      });
    case actionTypes.FETCH_POSITIONS_FAILURE:
      return updateState(state, {
        gpsReplayLoading: false,
        gpsReplayError: payload,
        gpsReplayData: [],
      });

    // GPS Stops
    case actionTypes.FETCH_GPS_STOPS_REQUEST:
      return {
        ...state,
        gpsStopsLoading: true,
        gpsStopsError: null,
        gpsStopsData: null,
      };
    case actionTypes.FETCH_GPS_STOPS_SUCCESS:
      return updateState(state, {
        gpsStopsLoading: false,
        gpsStopsError: null,
        gpsStopsData: payload,
      });
    case actionTypes.FETCH_GPS_STOPS_FAILURE:
      return updateState(state, {
        gpsStopsLoading: false,
        gpsStopsError: payload,
        gpsStopsData: null,
      });

    // GPS Trips
    case actionTypes.FETCH_GPS_TRIPS_REQUEST:
      return {
        ...state,
        gpsTripsLoading: true,
        gpsTripsError: null,
        gpsTripsData: null,
      };
    case actionTypes.FETCH_GPS_TRIPS_SUCCESS:
      return updateState(state, {
        gpsTripsLoading: false,
        gpsTripsError: null,
        gpsTripsData: payload,
      });
    case actionTypes.FETCH_GPS_TRIPS_FAILURE:
      return updateState(state, {
        gpsTripsLoading: false,
        gpsTripsError: payload,
        gpsTripsData: null,
      });

    // GPS Plans
    case actionTypes.FETCH_GPS_PLANS_REQUEST:
      return {
        ...state,
        gpsPlansLoading: true,
        gpsPlansError: null,
        gpsPlansData: null,
      };
    case actionTypes.FETCH_GPS_PLANS_SUCCESS:
      const gpsPlans = action.payload.filter(plan => plan.plan_type === 1);
      const rechargePlans = action.payload.filter(plan => plan.plan_type !== 1);
      return updateState(state, {
        gpsPlansLoading: false,
        gpsPlansError: null,
        gpsPlansData: gpsPlans,
        rechargePlansData: rechargePlans,
      });
    case actionTypes.FETCH_GPS_PLANS_FAILURE:
      return updateState(state, {
        gpsPlansLoading: false,
        gpsPlansError: payload,
        gpsPlansData: null,
      });

    case actionTypes.PLACE_GPS_ORDER_REQUEST:
      return {
        ...state,
        gpsOrderLoading: true,
        gpsOrderData: null,
        gpsOrderStatus: null,
      };
    case actionTypes.PLACE_GPS_ORDER_SUCCESS:
      return updateState(state, {
        gpsOrderLoading: false,
        gpsOrderData: payload?.data?.data,
        gpsOrderStatus: payload?.status,
      });
    case actionTypes.PLACE_GPS_ORDER_FAILURE:
      return updateState(state, {
        gpsOrderLoading: false,
        gpsOrderStatus: null,
        // gpsOrderData: null,
      });

    // gps order details
    case actionTypes.FETCH_GPS_ORDER_DETAIL_REQUEST:
      return {
        ...state,
        gpsOrderDetailsLoading: true,
        gpsOrderDetailsData: null,
        gpsPriceDetailsData: null,
        gpsOrderDetailsStatus: null,
      };
    case actionTypes.FETCH_GPS_ORDER_DETAIL_SUCCESS:
      return updateState(state, {
        gpsOrderDetailsLoading: false,
        gpsOrderDetailsData: payload?.data?.order,
        gpsPriceDetailsData: payload?.data?.pricing,
        gpsOrderDetailsStatus: payload?.status,
      });
    case actionTypes.FETCH_GPS_ORDER_DETAIL_FAILURE:
      return updateState(state, {
        gpsOrderDetailsLoading: false,
        gpsOrderDetailsStatus: null,
        gpsOrderDetailsData: null,
        gpsPriceDetailsData: null,
      });

    // full gps address
    case actionTypes.FETCH_FULLADDRESS_REQUEST:
      return {
        ...state,
        fullAddressLoading: true,
        fullAddressData: null,
        fullAddressStatus: null,
      };
    case actionTypes.FETCH_FULLADDRESS_SUCCESS:
      return updateState(state, {
        fullAddressLoading: false,
        fullAddressStatus: payload?.status,
        // fullAddressData: payload,
        fullAddressData: payload.results[0].formatted_address,
      });
    case actionTypes.FETCH_FULLADDRESS_FAILURE:
      return updateState(state, {
        fullAddressLoading: false,
        fullAddressStatus: payload?.status,
        fullAddressData: null,
      });

    // Gps Relay
    case actionTypes.GPS_RELAY_REQUEST:
      return {
        ...state,
        gpsRelayloading: true,
        gpsRelayStatus: null,
      };
    case actionTypes.GPS_RELAY_SUCCESS:
      return updateState(state, {
        gpsRelayloading: false,
        gpsRelayData: payload?.data,
        gpsRelayStatus: payload?.status,
      });
    case actionTypes.GPS_RELAY_FAILURE:
      return updateState(state, {
        gpsRelayloading: false,
        gpsRelayStatus: payload?.status,
      });
    // set gps relay
    case actionTypes.SET_GPS_RELAY_REQUEST:
      return {
        ...state,
        setGpsRelayloading: true,
        setGpsRelayStatus: null,
      };
    case actionTypes.SET_GPS_RELAY_SUCCESS:
      return updateState(state, {
        setGpsRelayloading: false,
        setGpsRelayData: payload?.data,
        setGpsRelayStatus: payload?.status,
      });
    case actionTypes.SET_GPS_RELAY_FAILURE:
      return updateState(state, {
        setGpsRelayloading: false,
        setGpsRelayStatus: payload?.status,
      });

    // Clear Store on logout
    case actionTypes.CLEAR_STORE:
      return initialState;

    // default state
    default:
      return state;
  }
};

export default reducer;
