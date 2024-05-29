import {StyleSheet} from 'react-native';
import {
  GradientColor2,
  PrivacyPolicy,
  pageBackground,
  titleColor,
} from '../../../Color/color';

export default StyleSheet.create({
  backgroundView: {
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: '#FFFDFD',
    height: '100%',
  },
  menuIconView: {
    backgroundColor: pageBackground,
    width: 35,
    height: 35,
    margin: 1,
    elevation: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: titleColor,
    fontSize: 20,
    // width: "80%",
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  headerView: {
    // flexDirection: "row",
    // width: "100%",
    // justifyContent: "center",
    height: 50,
    // alignItems: "center",
  },
  profileTitle: {
    fontSize: 16,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 13,
    color: PrivacyPolicy,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  ratingTextStyle: {
    // marginTop: 25,
    // fontSize: 14,
    // fontWeight: "500",
    // color: titleColor,
    color: '#F0C200',
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  bigImageStyle: {
    // backgroundColor: '#000000',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
  },
  closeIcon: {position: 'absolute', right: 10, top: 10},
  imageContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileView: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    elevation: 2,
    backgroundColor: pageBackground,
    marginBottom: 10,
  },
  verticalLine: {
    backgroundColor: '#ddd',
    width: 1,
    // marginLeft: 10,
    marginHorizontal: 5,
  },
  horizontalLine: {
    backgroundColor: '#ddd',
    height: 1,
    margin: 5,
  },
  dashboardHeaderVerifiedTitle: color => ({
    fontSize: 12,
    color: color ? 'green' : GradientColor2,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginLeft: 5,
    fontWeight: '700',
  }),
  pressable: {justifyContent: 'center'},
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fffaed',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '48%',
    alignSelf: 'center',
  },
  buttonText: {
    color: titleColor,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 10,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sectionHeaderText: {
    fontWeight: '700',
    color: titleColor,
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  userDetails: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    elevation: 2,
    backgroundColor: pageBackground,
    padding: 10,
  },
  detailItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontWeight: '700',
    marginLeft: 10,
  },
  flexDirection: {flexDirection: 'row'},
});
