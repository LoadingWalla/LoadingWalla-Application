import {StyleSheet} from 'react-native';
import {shimmerColor, white} from '../../Color/color';

export default StyleSheet.create({
  playcontainer: {
    flex: 1,
  },
  playcard: {
    backgroundColor: '#fff',
    padding: 8,
    width: '100%',
    height: '100%',
  },
  playheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playfooter: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playstatus: {
    width: '30%',
    height: 30,
    borderRadius: 5,
  },
  texts: wid => ({
    width: `${wid}%`,
    height: 30,
    borderRadius: 5,
  }),

  notishimmerItemView: {
    width: 110,
    height: 110,
    marginHorizontal: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmerButtonView: {
    borderRadius: 8,
    height: 60,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 15,
    width: 180,
  },
  notishimmerCardView: {
    borderRadius: 8,
    height: 60,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 15,
  },
  notishimmerTextView: {
    borderRadius: 8,
    height: 20,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 15,
    width: 200,
  },
  notibannerContainer: {
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
  },

  topbar: {
    height: 45,
    alignItems: 'center',
  },
  mainTopBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  myGpscard: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    height: 150,
  },
  myGpsheader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 55,
    height: 55,
    borderRadius: 6,
  },
  myGpsheaderContent: {
    flex: 1,
    marginLeft: 10,
  },
  myGpsstatus: {
    marginTop: 5,
    width: 50,
    height: 15,
    borderRadius: 5,
  },
  myGpsspeed: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  topBtn: wid => ({
    width: wid,
    height: 30,
    borderRadius: 5,
    marginRight: 5,
  }),
  topBtn2: wid => ({
    width: wid,
    height: 30,
    borderRadius: 5,
  }),
  location: {
    marginTop: 10,
  },
  address: {
    width: '90%',
    height: 15,
    borderRadius: 5,
  },
  myGpsdate: {
    marginTop: 5,
    width: '70%',
    height: 15,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  footerText: {
    width: '45%',
    height: 15,
    borderRadius: 5,
  },
  distance: {
    width: '45%',
    height: 15,
    borderRadius: 5,
  },

  mapShimmer: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    backgroundColor: 'red',
  },

  historycontainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  historycard: {
    backgroundColor: '#fff',
    padding: 8,
    margin: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    height: 150,
  },
  historyheader: {
    height: '100%',
  },
  historyheaderContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  historytitle: {
    width: '90%',
    height: 45,
    borderRadius: 5,
  },
  historystatus: {
    width: '70%',
    height: 25,
    borderRadius: 5,
  },

  guideshimmerContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  shimmerOpen: {
    height: 100,
    marginBottom: 10,
    borderRadius: 4,
  },
  shimmer: {
    height: 40,
    marginBottom: 10,
    borderRadius: 4,
  },
  shimmerHeading: {
    height: 50,
    marginBottom: 30,
    borderRadius: 4,
    marginRight: 30,
  },

  gpsNoticontainer: {
    flex: 1,
  },
  gpsNoticard: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 20,
    height: 20,
  },
  gpsNotiheaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gpsNotistatus: {
    width: 100,
    height: 15,
    borderRadius: 5,
  },

  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 8,
    // margin:8
  },
  card: {
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    height: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 2,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    width: 100,
    height: 15,
    borderRadius: 5,
  },
  status: {
    marginTop: 5,
    width: 150,
    height: 15,
    borderRadius: 5,
  },
  speed: {
    width: 100,
    height: 75,
    borderRadius: 5,
  },
  date: {
    marginTop: 5,
    width: '50%',
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  date2: {
    marginTop: 5,
    width: '30%',
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
  },

  geozoneshimmerCardView: {
    borderRadius: 8,
    height: 50,
    marginHorizontal: 10,
    marginTop: 10,
  },

  shimmerContainer: {
    paddingHorizontal: 10,
  },
  addLorryshimmerDirection: {
    marginTop: 20,
    flexDirection: 'column',
  },
  addLorryshimmerNameView: {
    height: 15,
    width: 200,
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
  shimmerInputView: {
    height: 15,
    width: 200,
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
  shimmerTruckType: {
    flexDirection: 'row',
  },
  addLorryshimmerLocationView: {
    borderRadius: 8,
    height: 50,
    elevation: 2,
    marginTop: 18,
    marginHorizontal: 10,
  },
  shimmerBodyType: {
    borderRadius: 8,
    height: 50,
    width: 100,
    elevation: 2,
    marginTop: 18,
    marginHorizontal: 10,
  },
  addLorrybuttonView: {
    marginTop: 50,
    height: 60,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  mainViewShimmer: {
    borderRadius: 8,
    elevation: 2,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: white,
  },
  borderLineShimmer: {backgroundColor: shimmerColor, height: 0.5},
  shimmerDirection: {marginTop: 20, flexDirection: 'row'},
  shimmerProfile: {height: 25, width: 25, borderRadius: 20},
  shimmerNameView: {
    height: 15,
    width: 150,
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 5,
  },
  shimmerFlex: {flex: 1},
  shimmerIconView: {
    marginTop: 10,
    height: 15,
    width: 75,
    borderRadius: 5,
  },
  shimmerBorderIconView: {
    marginTop: 10,
    height: 15,
    width: 150,
    borderRadius: 5,
  },
  shimmerLocationView: {
    borderRadius: 8,
    height: 50,
    elevation: 2,
    marginTop: 18,
  },
  bannerContainer: {
    height: 130,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    flexDirection: 'row',
  },
  shimmerItemView: {
    width: 110,
    height: 110,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmerCardView: {
    borderRadius: 8,
    elevation: 2,
    padding: 10,
    marginTop: 20,
    backgroundColor: white,
  },
  commonMarginTop: {marginTop: 10},
  shimmerUpperTextView: {height: 15, width: 75, borderRadius: 5},
  shimmerLowerTextView: {
    height: 15,
    width: 150,
    marginTop: 10,
    borderRadius: 5,
  },
  lorryShimmerItemView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  lorryShimmerView: {
    borderRadius: 8,
    elevation: 2,
    padding: 10,
    margin: 1,
    marginTop: 20,
    backgroundColor: white,
  },
  dotView: {height: 10, width: 60, borderRadius: 5},
  lorryTextShimmer: {
    height: 15,
    width: 200,
    marginLeft: 10,
    borderRadius: 8,
    flex: 1,
  },
  buttonView: {
    height: 40,
    width: 100,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  buttonActiveView: {
    height: 50,
    width: 150,
    borderRadius: 8,
    justifyContent: 'space-between',
    elevation: 2,
  },
  requestShimmer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
});
