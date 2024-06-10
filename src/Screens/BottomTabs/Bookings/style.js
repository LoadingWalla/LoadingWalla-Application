import {StyleSheet} from 'react-native';
import {
  titleColor,
  PrivacyPolicy,
  GradientColor2,
  back_color,
  white,
  black,
  backgroundColorNew,
} from '../../../Color/color';

export default StyleSheet.create({
  Container: {flex: 1, backgroundColor: '#FFFDFD'},
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
    backgroundColor: 'white',
    zIndex: 9999,
  },
  previousBooking: {
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 18,
    color: PrivacyPolicy,
    borderColor: backgroundColorNew,
    bottom: 10,
  },
});
