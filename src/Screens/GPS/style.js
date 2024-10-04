import {StyleSheet} from 'react-native';
import {backgroundColorNew, pageBackground, textColor, titleColor} from '../../Color/color';
import {PrivacyPolicy} from '../../Color/color';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  stopScreenContainer: {
    padding: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1
  },
  gpsTrackContainer: {
    padding: 10,
    flex: 1,
  },
  gpsTrackHeaderContainer: {
    marginVertical: 10,
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  imageBox: {
    paddingBottom: 30,
    width: '25%',
  },
  image: {
    width: 60,
    height: 50,
    marginRight: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
  },
  itemBox: {
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  modelText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  bottomText: {
    color: '#000000',
    fontFamily: 'PlusJakartaSans-MediumItalic',
    fontSize: 12,
    textAlign: 'center',
  },
  ownedGpsDiscountText: {
    color: '#3BA700',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    textAlign: 'left',
  },
  ownedGpsPlanText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#EFFFE6',
    color: '#108B00',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  dateValue: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  bottomBox: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  textBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '75%',
    alignItems: 'flex-start',
  },
  dateBox: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  dateChild: {flexDirection: 'row', marginTop: 5, alignItems: 'center'},
  dateHeaderText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  getNowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  getNowButton: {
    backgroundColor: '#3BA700',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  getNowButtonText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
  },
  historyBox: {
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
  },
  paymentDetailBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    padding: 10,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  paymentDetailText: {
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
    marginRight: 5,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  amountValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  taxText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
    marginLeft: 5,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  orderDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  orderDateText: {
    fontSize: 14,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  downloadButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  ownedGpsBtnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistStyle: {
    marginTop: 10,
  },
  noGpsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  noGpsText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: backgroundColorNew,
  },
  paymentContainer: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  reusableItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderColor: '#00000029',
  },
  totalAmountTextContainer: {
    flexDirection: 'row',
  },
  paymentGpsBtnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentGpsBtnText: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  paymentDetailView: {
    flexDirection: 'row',
    backgroundColor: '#FFF3F0',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  discountView: {
    flexDirection: 'row',
    backgroundColor: '#FFF3F0',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  paymentGpsDiscountText: {
    fontSize: 14,
    color: '#3BA700',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  footerTextContainer: {
    paddingLeft: 10,
  },
  amountText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
  },
  markedPriceText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#EF4D23',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  sellingPriceText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#3BA700',
  },
  editButton: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    marginLeft: 10,
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  reusableItemContainerText: {
    color: '#4B4B4B',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
  },
  paymentGpsTaxText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  boldText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
  },
  sectionBackground: {
    backgroundColor: '#FAFAFA',
  },
  sectionPadding: {
    paddingHorizontal: 10,
    marginTop: -10,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 1,
    marginHorizontal: 5,
    height: '90%',
  },
  extraButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 130,
    right: 0,
    zIndex: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Italic',
    // color: titleColor,
    color: '#FFFFFF',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },
  mapView: {flex: 1, width: '100%', height: '100%'},
  playJourneyBottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  alertButtonText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  stopBox: {
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    textAlign: 'center',
  },
  stopCount: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: -5,
  },
  totalBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    marginTop: 10,
  },
  stopsBtnStyle: {
    flexDirection: 'row',
    elevation: 3,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  ctrlBtn: {
    elevation: 3,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 40,
    marginRight: 10,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playPauseButton: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: backgroundColorNew,
  },
  playJourneySliderContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speedButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginRight: 5,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  activeSpeedButton: {
    backgroundColor: backgroundColorNew,
  },
  speedButtonText: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: backgroundColorNew,
  },
  activeSpeedButtonText: {
    color: '#FFF',
  },
  calendarIconBox: {
    position: 'absolute',
    zIndex: 99,
    right: 10,
    top: 10,
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    elevation: 2,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playJourneyNoDataText: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: 20,
  },
  calloutView: {
    width: 300,
    borderRadius: 5,
    borderWidth: 1,
  },
  calloutText: {
    fontSize: 14,
    textAlign: 'center',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  addressContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 5,
    backgroundColor: 'rgba(1, 1, 0, 0.5)',
    maxWidth: 300,
    // borderWidth: 1,
  },
  kmText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBoldItalic',
    color: '#FFFFFF',
  },
  arrowBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(1, 1, 0, 0.5)',
    transform: [{rotate: '180deg'}],
    alignSelf: 'center',
  },
  mapToggleButton: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  quickFilterContainer: {
    flex: 0.4,
    flexDirection: 'row',
    padding: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: '#ff6347',
  },
  inactiveButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#000',
  },
  customFilterContainer: {
    flex: 0.7,
    paddingHorizontal: 10,
  },
  customFilterText: {
    fontSize: 16,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    padding: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  separatorText: {
    fontSize: 14,
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  input: {
    elevation: 3,
    width: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
    color: backgroundColorNew,
  },
  quickFilterBtnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  selectGpsTypeScreenModalView: {
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
    maxHeight: 250,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
    color: titleColor,
  },
  selectGpsTypeHeader: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    color: titleColor,
    fontSize: 18,
    textAlign: 'left',
    justifyContent: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
    maxWidth: 200,
    marginLeft: 10,
  },
  centeredView: {
    paddingHorizontal: 20,
  },
  buttonTitile: {
    fontWeight: 'bold',
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  selectGpsTypeButton: {
    flexDirection: 'row',
    // borderRadius: 10,
    // height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  gpsCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gpsSelectionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#EFEFEF',
  },
  selectGpsTypeBottomBox: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    // borderWidth: 1,
    width: '100%',
  },
  amountBox: {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#707070',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  totalAmountText: {
    fontSize: 12,
    color: '#4B4B4B',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  totalAmountValue: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
  },
  gpsCountValue: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
    textAlign: 'center',
  },
  selectGpsTypeIconBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    width: 50,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#707070',
    fontFamily: 'PlusJakartaSans-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  itemContainer: {
    marginBottom: 15,
  },
  summaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: backgroundColorNew,
    borderRadius: 5,
    marginBottom: 10,
  },
  stopScreenVerticalLine: {
    backgroundColor: '#FFFFFF',
    width: 2,
    marginHorizontal: 5,
    height: '100%',
  },
  verticalLine2: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 5,
    height: '100%',
  },
  headText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  headingText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  headingValue: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    marginTop: 5,
  },
  whiteBox: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    elevation: 3,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  stopScreenRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpsTrackBtnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAddressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAddressText: {
    fontSize: 16,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  screenModalView: {
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
    maxHeight: 400,
    padding: 20,
  },
  purchaseStatusScreenModalView: {
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
    maxHeight: 320,
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  speedBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpsRelayHeaderText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
    marginRight: 5,
  },
  headerValue: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#EF4D23',
  },
  relayTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  relayText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: titleColor,
  },
  relayTextBold: color => ({
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    color: color ? 'red' : '#3BA700',
    marginLeft: 5,
  }),
  descriptionBox: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 40,
  },
  descriptionText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: titleColor,
    textAlign: 'center',
  },
  descriptionTextBold: color => ({
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 12,
    color: color ? 'red' : '#3BA700',
  }),
  gpsRelayBtnStyle: color => ({
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: color ? 'red' : '#3CA604',
    borderColor: color ? 'red' : '#3CA604',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
  }),
  gpsRelayBtnText: {
    fontSize: 14,
    color: textColor,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    textAlign: 'center',
    width: 150,
  },
  gpsRelayIconBox: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  notificationContainer: {
    flex: 4,
    backgroundColor: '#ffffff',
    padding: 20,
    elevation: 2,
  },
  notificationHeader: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
  },
  headerBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    // elevation: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#00000029',
  },
  mediumTextStyle: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
  },
  gpsAlertHeaderText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    textTransform: 'capitalize',
  },
  timeText: {
    fontSize: 8,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    // borderEndWidth: 1,
  },
  speedBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  callBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#f7f7f7',
    elevation: 2,
    marginVertical: 5,
  },
  settingsContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 50,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    elevation: 2,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fuelPumpContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    padding: 3,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    transform: [{rotate: '45deg'}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  purchaseStatusHeaderText: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  headerTextValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: PrivacyPolicy,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailBox: {
    maxWidth: '73%'
  },
  listContainer: {
    flex: 1,
    borderWidth: 0,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  label: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  deliveryDetailsBtnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  deliveryDetailsBtnText: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  purchaseStatusBtnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    // paddingHorizontal: 25,
    // paddingVertical: 10,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateContainer: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    paddingVertical: 15,
    padding: 5,
  },
  rateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rateHeaderView: {
    borderWidth: 0, 
    padding: 8
  },
  planTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: titleColor,
    textTransform: 'capitalize',
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  discountText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#0F8B00',
    marginLeft: 5,
  },
  priceContainer: {
    paddingVertical: 10,
    backgroundColor: '#EFFFE6',
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  paymentGpsPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  oldPrice: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#0F8B00',
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
  },
  planText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  loader: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  loaderContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  gpsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    position: 'absolute',
    bottom: 150,
    right: 10,
  },
  bottomContainer: {
    backgroundColor: '#FFF7F5',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    elevation: 3,
    borderColor: '#F7F7F7',
    borderWidth: 1,
  },
  geozoneContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: '#00000029',
    borderWidth: 1,
  },
  geozoneText: {
    marginHorizontal: 15,
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  noGpsAvailTxt: {
    color: '#707070',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
  },
  slider: {width: '75%'},
  playJourneySlider: {
    flex: 1,
    width: '100%',
  },
  textvalue: {
    width: '20%',
    textAlign: 'center',
    borderRadius: 3,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    borderWidth: 0.3,
    paddingVertical: 5,
    marginRight: 5,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  inputLabel: {
    marginRight: 15,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  textInput: {
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: 0,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  geozoneAbsFillObj: {
    ...StyleSheet.absoluteFillObject,
  }, 
  addGeozoneBtnStyle: {
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
  },
  getGpsPlanTxt: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    marginTop: 15,
  },
  dashboardHeaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    maxHeight: 60,
    padding: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 60,
    padding: 10,
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    color: '#707070',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
  },
  notFoundView: {
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#3CA604',
    borderColor: '#3CA604',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    color: textColor,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  homeView: {
    flex: 1,
    marginVertical: 60,
    justifyContent: 'center',
  },
  notFoundView: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getNowView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
  },
  offerText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#3BA700',
    textAlign: 'center',
    paddingVertical: 10,
  },
  splashImage: (height, width) => ({
    height: height,
    width: width,
  }),
  subText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    marginTop: 15,
  },
});
