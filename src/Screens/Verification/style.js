import {StyleSheet} from 'react-native';
import {
  GradientColor1,
  GradientColor3,
  PrivacyPolicy,
  textColor, 
  titleColor, 
  white
} from '../../Color/color';

export default StyleSheet.create({
  completeBookingCcontainer: {
    flex: 1,
    backgroundColor: '#FFFDFD',
  },
  subheader: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },
  selectorContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    // borderWidth: 1,
  },
  header: {
    flex: 1,
    fontSize: 14,
    color: titleColor,
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    paddingRight: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: titleColor,
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'left',
    paddingRight: 5,
  },
  radioButtonContainer: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginStart: 5,
  },
  documentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GradientColor1,
    borderStyle: 'dashed',
    padding: 10,
    // marginBottom: 20,
    borderRadius: 10,
  },
  documentImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  filename: {
    fontSize: 16,
    color: 'black',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 20,
    marginRight: 10,
  },
  termsLabel: {
    fontSize: 16,
  },
  completeOrderButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: GradientColor3,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  completeOrderButtonText: {
    color: 'white',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
  },
  findButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
    width: 100,
    alignItems: 'center',
    alignSelf: 'center',
  },
  findButtonText: {
    fontSize: 13,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  centerItem: {
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
    // borderWidth: 1,
    bottom: 0,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkBoxStyle: {marginRight: 10},
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  rowdirection: {flexDirection: 'row', alignItems: 'center'},
  point: {
    height: 8,
    width: 8,
    backgroundColor: PrivacyPolicy,
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  smallImageHeaderTitle: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  textStyle: {
    color: '#352422',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '95%',
    maxWidth: 500,
  },
  image: {
    height: 150,
    width: 150,
  },
  cardContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor1,
    borderStyle: 'dotted',
    padding: 10,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#FFF5EA',
    elevation: 1,
  },
  truckImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  truckDetails: {
    marginLeft: 10,
    flex: 1,
  },
  truckType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: titleColor,
    marginRight: 5,
  },
  confHorizontalLine: {
    backgroundColor: '#AFAFAF',
    height: 1.5,
    marginVertical: 5,
  },
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 15,
    height: '100%',
  },
  textStaticStyle: {
    color: titleColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    marginTop: 10,
    textAlign: 'center',
  },
  confTextStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  touchStyle: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  confButtonstyle: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confButtonTextStyle: {
    color: textColor,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  confHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitleTxt: {color: titleColor, fontSize: 18, marginLeft: 8},
  gifView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1,
  },
  congratsText: {
    fontSize: 26,
    marginBottom: 10,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: white,
  },

  commonToolbar: {
    marginVertical: 20,
    // paddingHorizontal: 20,
  },

  label: {
    fontWeight: '700',
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  buttonTextStyle: {
    color: textColor,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  buttonstyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '60%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: titleColor,
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans-Bold',
    alignSelf: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  circleContainer: {flexDirection: 'row', alignItems: 'center'},
  circle: status => ({
    width: 20,
    height: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 10,
    borderWidth: 3,
    borderColor:
      status === 'Pending'
        ? 'orange'
        : status === 'Verified'
        ? 'green'
        : '#ccc',
    backgroundColor:
      status === 'Pending'
        ? 'orange'
        : status === 'Verified'
        ? 'green'
        : '#ccc',
  }),
  stepText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadButton: status => ({
    flexDirection: 'row',
    borderColor: status === 'Pending' ? '#ccc' : '#d73b29',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  }),
  uploadButtonText: status => ({
    color: status === 'Pending' ? '#ccc' : '#d73b29',
    marginRight: 8,
  }),
  line: status => ({
    height: 60,
    borderLeftWidth: 3,
    borderLeftColor:
      status === 'Pending'
        ? 'orange'
        : status === 'Verified'
        ? 'green'
        : '#ccc',
    marginHorizontal: 18,
    alignSelf: 'flex-start',
    borderStyle: 'dashed',
  }),
});
