import {StyleSheet} from 'react-native';
import {
  GradientColor2,
  pageBackground,
  blueButton,
  titleColor,
  inputColor,
  white,
  black,
  PrivacyPolicy,
  seperator,
  shimmerColor,
  divider,
  GradientColor3,
  textColor,
  backgroundColorNew,
  GradientColor1,
  GradientColor5,
  grayColor,
} from '../Color/color';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default StyleSheet.create({

  webmodal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '92%',
    height: '92%',
  },
  flex: {flex: 1},
  alignItem: {alignItems: 'flex-end'},
  webView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  togglecontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    marginLeft: 10,
  },
  hiddenText: color => ({
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: color,
    textTransform: 'lowercase',
  }),

  permitmodalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  permitcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  modalTextView: {
    borderWidth: 1,
    borderColor: PrivacyPolicy,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#FFC5B5',
    margin: 5,
  },
  modaTtext: {
    color: titleColor,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  searchcontainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  defaultContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: 10,
    backgroundColor: '#E9E9E9',
    borderRadius: 5,
    padding: 5,
  },
  refreshIcon: {
    backgroundColor: '#E9E9E9',
    borderRadius: 5,
    padding: 5,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E9E9E9',
    // borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 3,
    color: '#000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  refreshBtnBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginLeft: 5,
  },
  searchbutton: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#E9E9E9',
    borderRadius: 5,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: GradientColor5,
  },
  searchbuttonText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: titleColor,
  },
  activeButtonText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#FFFFFF',
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: size => ({
    height: size ? size : 24,
    width: size ? size : 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: GradientColor2,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  innerCircle: size => ({
    height: size ? size : 12,
    width: size ? size : 12,
    borderRadius: 6,
    backgroundColor: GradientColor2,
  }),
  radioText: font => ({
    marginLeft: 10,
    fontSize: font ? font : 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  }),

  purchasecontainer: {padding: 10},
  mainBox: {
    //   borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
    elevation: 2,
  },
  mainBoxHeader: edit => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00000029',
    paddingBottom: edit ? 30 : 15,
    paddingVertical: 10,
  }),
  planText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  purchaseeditButton: {
    flexDirection: 'row',
    borderRadius: 20,
    // borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  purchaseeditButtonText: {
    marginLeft: 10,
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  mainBoxBottom: {paddingHorizontal: 10, paddingVertical: 15},
  mainBoxBottomText: {
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  mainBoxFooter: {
    flexDirection: 'row',
    //   borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: -10,
    backgroundColor: '#EFFFE6',
  },
  purchasefooterText: {marginLeft: 5, color: '#3BA700'},


  barContainer: {
    flexDirection: 'row',
    width: '48%',
    justifyContent: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#00000057',
  },
  backgroundBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  completedBar: {
    position: 'absolute',
    left: 0,
    height: '100%',
    borderRadius: 5,
  },
  barText: {
    fontSize: 16,
    position: 'absolute',
    textAlign: 'center',
    color: titleColor,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    zIndex: 1,
    marginStart: 15,
  },
  percentagearrowView: {
    marginLeft: 'auto',
    elevation: 1,
    // borderWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    right: 10,
  },
  completeView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeText: {
    fontSize: 14,
    textAlign: 'center',
    color: titleColor,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    marginStart: 15,
  },

  notFoundcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // borderWidth: 1,
    // backgroundColor: backgroundColorNew,
  },
  notFoundsplashImage: (hei, wid) => ({
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width / 1.9,
    height: hei || 200,
    width: wid || 300,
  }),
  notFoundtextStyle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  negocontainer: {
    marginTop: 10,
  },
  locationCard: {
    borderWidth: 1,
    borderColor: '#DBD7D7',
    padding: 10,
    borderRadius: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: titleColor,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DBD7D7',
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: '70%',
  },
  rupeeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: titleColor,
    marginEnd: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  inputStyle: {
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
    color: '#000',
    width: '75%',
  },
  priceType: {
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  btnBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  myLorrycard: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  myLorrydashboardHeaderVerifiedTitle: color => ({
    fontSize: 12,
    color: color ? 'green' : GradientColor2,
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 5,
  }),
  ac_time: {
    marginTop: 5,
    fontSize: 12,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    marginRight: 10,
  },
  editButtonStyle: {
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  requestButtonContainerDisabled: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: PrivacyPolicy,
  },
  findButtonContainerDisabled: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: PrivacyPolicy,
    backgroundColor: PrivacyPolicy,
  },
  disabledText: {
    color: PrivacyPolicy,
  },
  findDisabledText: {
    color: white,
  },

  modal: {
    position: 'absolute',
    bottom: 0,
    top: '50%',
    width: '100%',
    margin: 0,
  },
  fullScreenModal: {
    flex: 1,
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    // justifyContent: "space-between",
    // alignItems: "center",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  modalTopLine: {
    height: 5,
    backgroundColor: '#E2E2E2',
    width: '30%',
    position: 'absolute',
    borderRadius: 50,
    top: 0,
    alignSelf: 'center',
    marginVertical: 10,
  },
  modalBottom: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  modaltextStyle: {
    color: '#352422',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    // alignSelf: "center",
    // flex: 1,
  },

  menuiconView: {flexDirection: 'row', alignItems: 'center'},
  arrowView: {
    elevation: 1,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },

  mapContainer: {flex: 1},
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 100,
    transform: [{translateX: -25}, {translateY: -25}],
  },
  mapToggleButton: {
    position: 'absolute',
    top: 80,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
    zIndex: 99,
  },
  alertButton: {
    position: 'absolute',
    top: 130,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
    zIndex: 99,
    padding: 5,
  },
  gpsButton: {
    position: 'absolute',
    top: 170,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
    zIndex: 99,
    padding: 5,
  },
  speedDistanceBox: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#ffffff',
    elevation: 3,
    zIndex: 99,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calloutView: {
    width: 300,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(1, 1, 0, 0.5)',
    borderColor: '#707070',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-SemiBoldItalic',
  },
  imageStyle: {width: 40, height: 40},
  mapbtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 1,
    backgroundColor: '#F7F7F7',
  },
  mapbtnText: {
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
  mapverticalLine: {
    backgroundColor: '#707070',
    width: 1,
    marginHorizontal: 5,
    height: 40,
    alignSelf: 'center',
  },
  infoBox: {flexDirection: 'row', alignItems: 'center'},
  infoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  boldText: {fontFamily: 'PlusJakartaSans-ExtraBold', fontSize: 12},
  labelText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 8,
    color: '#434343',
  },

  iconNameiconBox: {borderWidth: 0, minWidth: 20},

  iconNameiconView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  iconText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-end',
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headermenuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },

  headerHelpcontainer: {flexDirection: 'row'},
  headerHelpbtnContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#F7F7F7',
  },
  iconStyle: {marginRight: 5},
  headerHelpbtnText: {
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
  shareBtn: {
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    backgroundColor: '#F7F7F7',
  },

  detailBox: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    // elevation: 2,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#00000029',
    borderRadius: 8,
    width: '48%',
  },

  textHeader: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  switchBox: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  inputBox: {flexDirection: 'row', marginTop: 10, backgroundColor: '#f7f7f7'},
  inputView: {
    // borderWidth: 1,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    // borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  textInput: {
    width: 50,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  textInputCaption: {
    padding: 2,
    textAlign: 'center',
    // marginLeft: 5,
    fontSize: 12,
    color: grayColor,
    fontFamily: 'PlusJakartaSans-Bold',
    // backgroundColor: '#ffffff',
    // borderWidth: 1,
  },

  cardContainer: {
    marginBottom: 20,
    backgroundColor: '#FFE5DE',
    borderRadius: 8,
  },
  gpsItemcontainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 2,
    // borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  imgContainer: {
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imgBox: {
    backgroundColor: '#ededed',
    borderRadius: 6,
    width: 65,
    height: 60,
    marginTop: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,
  },
  textViewContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  highlightText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  speedText: color => ({
    color: color ? '#3BA700' : '#FF0000',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  }),
  distanceBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#EFEFEF',
    maxWidth: 50,
    maxHeight: 50,
    padding: 10,
  },
  distanceText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    textAlign: 'center',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    minWidth: 180,
  },
  gpsItemverticalLine: {
    backgroundColor: '#AFAFAF',
    width: 1,
    marginHorizontal: 10,
    marginTop: 2,
    height: '80%',
  },
  ignBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  ignitionText: status => ({
    color: status ? 'green' : 'red',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
    // textTransform: 'uppercase',
  }),
  motionText: {
    textAlign: 'left',
    marginLeft: 10,
  },
  ignitionStatus: {
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  addressText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 10,
  },
  lastUpdateText: {
    color: 'red',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 10,
  },
  row: {
    flexDirection: 'row',
  },
  gpsItemiconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 40,
    marginRight: 5,
  },
  hiddenIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 40,
    marginLeft: 10,
  },
  addressContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5,
    // borderWidth: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
  footerText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
  },
  footerDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerDistanceText: {
    textAlign: 'left',
    marginLeft: 5,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 4,
  },

  findLoadHeadercard: {
    elevation: 5,
    backgroundColor: '#FFFDFD',
  },
  cardTop: {padding: 10, backgroundColor: white},
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verifyTruck: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 2,
    backgroundColor: white,
  },
  warning: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  warningText: {
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  findLoadHeaderdashboardHeaderVerifiedTitle: color => ({
    fontSize: 12,
    color: color ? 'green' : GradientColor2,
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 5,
  }),

  homeView: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundView: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#707070',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
  subText: {
    color: '#707070',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    marginTop: 15,
  },
  getNowView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
  },
  offerText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#3BA700',
    textAlign: 'center',
    paddingVertical: 10,
  },
  splashImage: (height, width) => ({
    height: height,
    width: width,
  }),
  btnStyle: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#3CA604',
    borderColor: '#3CA604',
    alignItems: 'center',
    width: '50%',
    // height: 50,
    // justifyContent: 'center',
    // alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    color: textColor,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    // borderWidth: 1,
    width: 200,
  },

  inputField: {
    backgroundColor: inputColor,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  dateTimePickertextStyle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    color: PrivacyPolicy,
  },

  notificationItemView: color => ({
    backgroundColor: white,
    borderRadius: 5,
    flexDirection: 'column',
    elevation: 2,
    margin: 5,
    padding: 10,
    borderLeftWidth: 10,
    borderColor: 'green',
  }),
  notificationTitle: color => ({
    fontSize: 14,
    color: 'green',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'left',
  }),
  notitficationDesc: {
    fontSize: 12,
    color: PrivacyPolicy,
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  NotificationText: {
    textAlign: 'right',
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 10,
    color: PrivacyPolicy,
  },

  cardHeaderheaderView: {flexDirection: 'row'},
  image: {height: 60, width: 60, borderRadius: 5},
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
  },
  square: {
    width: 8,
    height: 8,
    borderRadius: 1,
    backgroundColor: 'red',
  },
  routeInfo: {
    flex: 1,
    marginLeft: 20,
  },
  routeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeading: {
    minWidth: 45,
    marginLeft: 10,
    color: PrivacyPolicy,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  bottomContainer: {
    position: 'absolute',
    paddingBottom: 8,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF7F5',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    zIndex: 1,
  },
  swipeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#CCCCCC',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 10,
  },
  iconRow: {
    // flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: '#00000029',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    borderWidth: 1,
    flex: 0.7,
    margin: 10,
    minHeight: 150,
    padding: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: '#00000029',
    backgroundColor: '#FFFFFF',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  button: color => ({
    backgroundColor: `${color}`,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    flex: 1,
  }),
  buttonText: {
    // borderWidth: 2,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    color: titleColor,
  },
  parkingAlarm: {
    // flex: 0.2,
    minHeight: 40,
    borderWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderColor: '#00000029',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parkingText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: '#696969',
  },

  bookingItemcard: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  routeText: {
    flex: 1,
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  bookingItemrowdirection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bookingItemtextStyle: {
    color: PrivacyPolicy,
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    overflow: 'hidden',
    flex: 1,
    // maxWidth: 200,
    // borderWidth: 1,
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  headerView: {flexDirection: 'row', width: '100%'},
  backIconView: {
    width: 38,
    height: 38,
    // elevation: 2,
    margin: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBackIconView: {
    backgroundColor: 'transparent',
    width: 38,
    height: 38,
    marginBottom: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  WelcomeTruckTitle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  backgroundView: {
    padding: 20,
    backgroundColor: pageBackground,
    height: '100%',
  },
  title: {
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  bannerContainer: {
    height: '90%',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  bannerInnerView: {
    flex: 2,
    padding: 20,
  },
  bannerText: {
    fontSize: 14,
    color: white,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  bannerButton: {
    fontSize: 12,
    padding: 10,
    backgroundColor: blueButton,
    color: white,
    width: 100,
    textAlign: 'center',
    borderRadius: 28,
    marginTop: 15,
  },
  normalFlex: {
    flex: 1,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  toolbarContainer: (modal, color) => ({
    flexDirection: modal ? 'row-reverse' : 'row',
    width: '100%',
    padding: color ? 20 : 0,
  }),
  dashboardHeaderContainer: marginBottom => ({
    flexDirection: 'row',
    marginBottom: marginBottom ? 0 : 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  }),
  dashboardHeaderImage: {
    height: 40,
    width: 40,
    // elevation: 2,
    borderRadius: 10,
  },
  dashboardRoundImage: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
  dashboardHeaderTextView: {
    flex: 1,
    marginLeft: 15,
  },
  lorryShimmerItemView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  dashboardHeaderTextShimmer: {
    width: '100%',
    height: 15,
    borderRadius: 5,
  },
  dashboardHeaderTitle: {
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowDirectionShimmer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardHeaderVerifiedTitle: color => ({
    fontSize: 10,
    color: color ? 'green' : GradientColor2,
    fontFamily: 'PlusJakartaSans-SemiBold',
    // marginLeft: 5,
    // borderWidth: 1,
    textAlign: 'center',
  }),
  headerCallView: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  acTime: {fontSize: 10, color: 'green', marginTop: 5},
  editButton: {
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  callButtonView: {
    padding: 10,
    backgroundColor: GradientColor2,
    width: 100,
    justifyContent: 'center',
    borderRadius: 28,
    flexDirection: 'row',
  },
  callText: {
    fontSize: 13,
    color: white,
    textAlign: 'center',
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  commonMargin: {
    marginRight: 15,
  },
  wallet: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  inputLabel: {
    backgroundColor: inputColor,
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    color: black,
  },
  menuItem: {
    fontSize: 14,
    color: titleColor,
    fontWeight: '500',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  logOut: {
    fontSize: 14,
    color: GradientColor2,
    fontWeight: '500',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  indicatorStyle: {
    marginRight: 10,
  },
  notificationIconView: {height: 40, width: 40, borderRadius: 10},
  searchLocationText: {
    fontSize: 15,
    padding: 5,
    margin: 5,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  innerbuttonStyle: {
    padding: 10,
    width: 100,
    borderRadius: 8,
    backgroundColor: pageBackground,
    marginTop: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  innerButtonText: isGrey => ({
    fontSize: 13,
    color: isGrey ? black : white,
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  }),
  countMsg: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 1,
    backgroundColor: '#fff',
    paddingVertical: 1,
    paddingHorizontal: 1,
    width: 20,
    height: 20,
    borderRadius: 100,
    color: '#000',
    borderWidth: 2,
    borderColor: GradientColor2,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  gradientButtonStyle: {
    padding: 8,
    width: 100,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },

  seperatorView: {
    height: 0.5,
    width: '100%',
    backgroundColor: seperator,
    margin: 5,
  },
  menuView: {
    flexDirection: 'row',
    padding: 10,
  },
  menuImage: {height: 50, width: 50, borderRadius: 10},
  menuTtile: {
    fontSize: 14,
    color: titleColor,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  menuDesc: {
    fontSize: 12,
    color: PrivacyPolicy,
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  menuDivider: {
    width: '100%',
    height: 1,
    backgroundColor: shimmerColor,
    marginTop: 5,
    marginBottom: 5,
  },
  postItemView: {
    borderRadius: 8,
    elevation: 2,
    margin: 5,
    backgroundColor: white,
    padding: 10,
  },
  postItemDivider: {backgroundColor: shimmerColor, height: 0.5},
  postItemTitle: {
    marginTop: 10,
    fontSize: 12,
    color: PrivacyPolicy,
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  postItemText: {
    fontSize: 14,
    color: titleColor,
    fontWeight: '500',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  searchFilter: {
    backgroundColor: white,
    flexDirection: 'row',
    elevation: 2,
    marginTop: 18,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  searchLeftText: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
    alignSelf: 'center',
    width: 50,
    textTransform: 'uppercase',
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  searchDivider: {
    width: 1,
    height: 50,
    backgroundColor: divider,
  },
  searchInput: {
    flex: 4,
    marginLeft: 10,
    alignSelf: 'center',
  },
  locationIcon: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
  },
  searchText: {fontFamily: 'PlusJakartaSans-Bold', color: PrivacyPolicy},
  //
  detailItem: {
    padding: 10,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginLeft: 10,
  },
  flexDirection: {flexDirection: 'row'},

  //
  card: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: white,
    padding: 10,
    margin: 10,
    marginBottom: 10,
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 15,
    height: '100%',
  },
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  rowdirection: {flexDirection: 'row', alignItems: 'center'},
  smallImageHeaderTitle: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  point: {
    height: 8,
    width: 8,
    backgroundColor: PrivacyPolicy,
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  requestButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor3,
  },
  findButtonContainer: {
    marginLeft: 20,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
  },
  gradientButtonText: {
    fontSize: 13,
    color: GradientColor3,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  findButtonText: {
    fontSize: 13,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  btnContainer: {flexDirection: 'row', justifyContent: 'flex-end'},
});
