import React, {useContext} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  GradientColor1,
  GradientColor3,
  PrivacyPolicy,
  black,
  textColor,
  titleColor,
} from '../../../Color/color';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorImage from '../../../../assets/GIFs/error.gif';
import successImage from '../../../../assets/GIFs/success.gif';
import {NetworkContext} from '../../../Context/NetworkContext';
import NoInternetScreen from '../../Details/NoInternetScreen';
import Button from '../../../Components/Button';
import Shield from '../../../../assets/SVG/svg/Shield';

const BookingStatus = ({navigation, route}) => {
  console.log('booking---status', route);
  const {status, Owner, userType, messages, renter} = route.params;
  const {isConnected} = useContext(NetworkContext);

  const getStatusContent = () => {
    if (status >= 500) {
      return {
        message: messages,
        image: ErrorImage,
        color: '#e5b900',
      };
    } else {
      switch (status) {
        case 200:
          return {
            message: messages,
            image: successImage,
            color: '#119500',
          };
        default:
          return {
            message: messages,
            image: ErrorImage,
            color: '#e5b900',
          };
      }
    }
  };
  const {message, image, color} = getStatusContent();

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[styles.congratsText, {color: color}]}>{message}</Text>
        <Image source={image} style={{height: 70, width: 70}} />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.childCard}>
            <View>
              <Image source={{uri: Owner?.image}} style={styles.image} />
            </View>
            <View style={styles.details}>
              <View style={styles.header}>
                <Text style={styles.truckNumber}>
                  {userType === '1'
                    ? Owner?.material_name
                    : Owner?.vehicle_number}
                </Text>
                {userType === '2' && (
                  <Shield
                    size={20}
                    color={Owner?.verified ? '#119500' : '#e5b900'}
                    verified={Owner?.verified}
                  />
                )}
              </View>
              <Text style={styles.truckType}>
                {userType === '2'
                  ? `${Owner?.truck_type} Body`
                  : `₹ ${Owner?.price} / ${
                      Owner?.price_type === '2' ? 'Fixed' : 'Per Ton'
                    }`}
              </Text>
            </View>
          </View>
          <View style={styles.specs}>
            <Text style={styles.specsText}>
              {userType === '2'
                ? `Capacity: ${Owner?.truck_capacity}`
                : `Capacity: ${Owner?.qty} Ton`}
            </Text>
            <View style={styles.verticalLine} />
            <Text style={styles.specsText}>
              {userType === '2'
                ? `Tyre: ${Owner?.wheel}`
                : `${Math.ceil(Owner?.distance)} KM`}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          width: 1,
          height: 50,
          borderStyle: 'dashed',
          borderColor: GradientColor1,
        }}
      />
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.childCard}>
            <View>
              <Image source={{uri: renter?.image}} style={styles.image} />
            </View>
            <View style={styles.details}>
              <View style={styles.header}>
                <Text style={styles.truckNumber}>
                  {userType === '2'
                    ? renter?.material_name
                    : renter?.vehicle_number}
                </Text>
                {userType === '1' && (
                  <EditIcon
                    name={
                      renter?.verified ? 'check-circle' : 'information-outline'
                    }
                    size={20}
                    color={renter?.verified ? '#119500' : '#e5b900'}
                  />
                )}
              </View>
              <Text style={styles.truckType}>
                {userType === '1'
                  ? `${renter?.truck_type} Body`
                  : `₹ ${renter?.price} / ${
                      renter?.price_type === '2' ? 'Fixed' : 'Per Ton'
                    }`}
              </Text>
            </View>
          </View>
          <View style={styles.specs}>
            <Text style={styles.specsText}>
              {userType === '1'
                ? `Capacity: ${renter?.truck_capacity}`
                : `Capacity: ${renter?.loads} Ton`}
            </Text>
            <View style={styles.verticalLine} />
            <Text style={styles.specsText}>
              {userType === '1'
                ? `Tyre: ${renter?.wheel}`
                : `${Math.ceil(renter?.distance)} KM`}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 20,
          alignItems: 'center',
        }}>
        <Button
          onPress={() =>
            navigation.navigate('FindLoads', {
              Owner: Owner,
              userType: userType,
            })
          }
          title={'Find More Loads'}
          style={styles.buttonstyle}
          textStyle={styles.buttonTextStyle}
          touchStyle={styles.touchStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
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
});

export default BookingStatus;
