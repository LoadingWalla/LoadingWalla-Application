import {StyleSheet} from 'react-native';
import {textColor, titleColor, white} from '../../Color/color';

export default StyleSheet.create({
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
