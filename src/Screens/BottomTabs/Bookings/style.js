import {StyleSheet} from 'react-native';
import {
  GradientColor1,
  GradientColor3,
  textColor,
  titleColor,
  PrivacyPolicy,
  GradientColor2,
  back_color,
  white,
  black,
  backgroundColorNew,
} from '../../../Color/color';

export default StyleSheet.create({
  Container: {
    flex: 1, 
    backgroundColor: '#FFFDFD', 
    marginBottom: 60
  },
  prevBookingContainer: {
    flex: 1,
    backgroundColor: '#FFFDFD',
  },
  prevBookingCard: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  bookingStatusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  gifView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
  },
  congratsText: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  verifyText: {
    fontSize: 18,
    color: titleColor,
    marginBottom: 20,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  cardContainer: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor1,
    borderStyle: 'dashed',
    padding: 10,
  },
  image: {
    width: 100,
    height: 70,
    resizeMode: 'contain',
  },
  info: {
    marginTop: 10,
    alignItems: 'center',
  },
  truckNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  truckType: {
    fontSize: 14,
    color: '#555',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  searchLoadButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: GradientColor3,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    color: GradientColor3,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  buttonTextStyle: {
    color: textColor,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  touchStyle: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  buttonstyle: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingBottom: 20,
    alignItems: 'center',
    elevation: 1,
  },
  childCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5EA',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  details2: {
    marginLeft: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckNumber2: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
    color: titleColor,
  },
  specs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '90%',
  },
  specsText: {
    fontSize: 14,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  horizontalLine: {
    backgroundColor: '#ddd',
    height: 1,
    margin: 5,
  },
  verticalLine: {
    backgroundColor: '#ddd',
    width: 2,
    marginHorizontal: 10,
  },
  text: {
    marginVertical: 30,
    marginHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
  },
  boldText: {
    color: black,
    fontWeight: '700',
  },
  verticalDashedLine: {
    borderWidth: 1,
    width: 1,
    height: 50,
    borderStyle: 'dashed',
    borderColor: GradientColor1,
  },
  btnView: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  prevBookingHorizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 16,
    color: 'green',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  viewDetail: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  lottieStyle: {height: 250, width: 250},
  detailsButton: {
    alignItems: 'center',
  },  
  truckTypeView: {
    marginTop: 30
  },
  bookingContainer: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  mainContainer: {
    flex: 1,
    marginTop: 60,
    paddingVertical: 10,
  },
  truckTitle: {
    fontSize: 16,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '700',
  },
  dateStyle: {
    fontSize: 12,
    color: PrivacyPolicy,
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  dotStyle: data => ({
    color:
      data === 'pending'
        ? GradientColor2
        : data === 'ongoing'
        ? '#fbbc04'
        : data === 'complete'
        ? '#2a9a48'
        : '#d73b29',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
    marginRight: 5,
  }),
  truckHeaderStyle: {
    flex: 1,
    marginLeft: 17,
  },
  bookingStatus: data => ({
    color:
      data === 'pending'
        ? GradientColor2
        : data === 'ongoing'
        ? '#fbbc04'
        : data === 'complete'
        ? '#2a9a48'
        : '#d73b29',
    fontWeight: '700',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
  }),
  smallImage: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
  dividerLine: {
    backgroundColor: '#AFAFAF',
    height: 0.5,
    marginTop: 10,
  },
  transportTitleStyle: {
    marginLeft: 10,
    fontSize: 12,
    textAlign: 'center',
    color: titleColor,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  flexStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
    fontSize: 12,
    color: PrivacyPolicy,
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  value: {
    marginTop: 10,
    fontSize: 14,
    color: titleColor,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  bookingHeaderview: {flexDirection: 'row', marginBottom: 10},
  bookingItem: (selected, id) => ({
    flex: 1,
    margin: 10,
    backgroundColor: selected === id ? GradientColor2 : back_color,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: GradientColor2,
  }),
  bookingTextItem: (selected, id) => ({
    color: selected === id ? white : black,
    fontFamily:
      selected === id ? 'PlusJakartaSans-SemiBold' : 'PlusJakartaSans-Regular',
    fontSize: 12,
  }),
  lottieView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: 'transparent',
  },
  lottieText: {
    fontSize: 18,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  lottieStyle: {height: 250, width: 250},

  //
  DashboardHeaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    maxHeight: 60,
    padding: 10,
    backgroundColor: white,
    zIndex: 9999,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  previousBooking: {
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 18,
    color: PrivacyPolicy,
    borderColor: backgroundColorNew,
    // bottom: 10,
    marginTop: 20,
  },
});
