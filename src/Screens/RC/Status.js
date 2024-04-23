import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {
  GradientColor1,
  GradientColor3,
  PrivacyPolicy,
  black,
  titleColor,
} from '../../Color/color';
import {NetworkContext} from '../../Context/NetworkContext';
import NoInternetScreen from '../Details/NoInternetScreen';
import {useDispatch, useSelector} from 'react-redux';
import {initMyLorryById} from '../../Store/Actions/Actions';
import Shield from '../../../assets/SVG/svg/Shield';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';

const Status = ({navigation, route}) => {
  const {truck_id} = route.params;
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const {mySingleLoding, mySingleStatus, mySingleTruckData, mySingleUserData} =
    useSelector(state => {
      // console.log("My Lorry/Load", state.data);
      return state.data;
    });

  const userType = mySingleUserData?.user_type;

  useEffect(() => {
    dispatch(initMyLorryById(truck_id));
  }, [dispatch, truck_id]);

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CloseCircle size={25} style={styles.closeButton} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text
            style={[
              styles.congratsText,
              {color: mySingleTruckData?.verified ? '#119500' : '#e5b900'},
            ]}>
            {mySingleTruckData?.verified ? 'Congratulations!' : 'Pending!'}
          </Text>
          <Text style={styles.verifyText}>
            {mySingleTruckData?.verified
              ? 'Apka yea truck verified ho gaya hai'
              : 'Verification Pending'}
          </Text>

          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.childCard}>
                <View>
                  <Image
                    source={{uri: mySingleTruckData?.image}}
                    style={styles.image}
                  />
                </View>
                <View style={styles.details}>
                  <View style={styles.header}>
                    <Text style={styles.truckNumber}>
                      {mySingleTruckData?.vehicle_number}
                    </Text>
                    <Shield
                      size={20}
                      color={
                        mySingleTruckData?.verified ? '#119500' : '#e5b900'
                      }
                      verified={mySingleTruckData?.verified}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.specs}>
                <Text style={styles.specsText}>
                  {mySingleTruckData?.truck_capacity}
                </Text>
                <View style={styles.verticalLine} />
                <Text style={styles.specsText}>{mySingleTruckData?.wheel}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.specsText}>
                  {`${mySingleTruckData?.truck_type} Body`}
                </Text>
              </View>
              {mySingleTruckData?.verified ? (
                <Text style={styles.text}>
                  Abb <Text style={styles.boldText}>load</Text> search Kare,
                  apke <Text style={styles.boldText}>truck</Text> ke according.
                </Text>
              ) : (
                <Text style={styles.text}>
                  You can still search
                  <Text style={styles.boldText}> load </Text>
                  while We are verifying your
                  <Text style={styles.boldText}> truck </Text>.
                </Text>
              )}
              <TouchableOpacity
                style={styles.buttonstyle}
                onPress={() => {
                  navigation.navigate('FindLoads', {
                    Owner: mySingleTruckData,
                    userType: userType,
                  });
                }}>
                <Text style={styles.buttonTextStyle}>Search Load</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.navigate('AddLorry');
            }}>
            <Text style={styles.buttonText}>Add Truck</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
    color: titleColor,
  },
  mainContainer: {
    margin: '3%',
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 30,
    // backgroundColor: "#fff",
    // borderRadius: 10,
  },
  congratsText: {
    fontSize: 30,
    marginBottom: 10,
    marginTop: 20,
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
    borderStyle: 'dotted',
    padding: 5,
    marginBottom: 30,
  },
  info: {
    marginTop: 10,
    alignItems: 'center',
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
    // marginTop: 10,
    // marginBottom: 20,
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
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  buttonstyle: {
    backgroundColor: GradientColor3,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
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
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
  },
  childCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5EA',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    // borderWidth: 1,
  },
  image: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
  },
  // image: {
  //   width: 100,
  //   height: 70,
  //   resizeMode: 'contain',
  // },
  details: {
    marginLeft: 20,
    flex: 1,
    justifyContent: 'center',
    fontSize: 14,
    color: '#555',
    alignItems: 'flex-start',
    // borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  truckNumber: {
    fontSize: 18,
    marginRight: 10,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  truckType: {
    fontSize: 16,
    color: PrivacyPolicy,
    fontWeight: '600',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  specs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '90%',
    // borderWidth: 1,
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
});

export default Status;
