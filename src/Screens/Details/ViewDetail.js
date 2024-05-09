import '../../locales/index';
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import CommonToolbar from '../../Components/CommonToolbar';
import * as Constants from '../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {GradientColor1, titleColor, white} from '../../Color/color';
import Button from '../../Components/Button';
import {
  acceptRejectFailure,
  fetchMapDataStart,
  initAcceptReject,
} from '../../Store/Actions/Actions';
import ExitFullScreen from '../../../assets/SVG/svg/ExitFullScreen';
import FullScreenIcon from '../../../assets/SVG/svg/FullScreenIcon';
const blueDot = require('../../../assets/dot.png');

const GOOGLE_MAPS_APIKEY = 'AIzaSyC_QRJv6btTEpYsBdlsf075Ppdd6Vh-MJE';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function offsetCoordinates(coord, isLeft) {
  const offsetValue = 0.0005;
  return {
    latitude: coord.latitude,
    longitude: coord.longitude + (isLeft ? -offsetValue : offsetValue),
  };
}

const ViewDetail = ({navigation, route}) => {
  // console.log("view detail", route);
  const {
    from,
    material_name,
    name,
    price,
    price_type,
    qty,
    to,
    vehicle_number,
    id,
    from_id,
    to_id,
    created_at,
    load_accept,
    lorry_accept,
    profile_img,
    status,
    distance,
    user_type,
  } = route.params.item;
  const {Owner} = route.params;
  // console.log(98798798, Owner);

  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const dispatch = useDispatch();
  const {
    mapOrigin,
    mapDestination,
    mapLoading,
    mapError,
    accept_rejectData,
    accept_rejectLoading,
    accept_rejectStatus,
  } = useSelector(state => {
    // console.log('accept view details', state.data);
    return state.data;
  });

  useEffect(() => {
    dispatch(fetchMapDataStart(from_id, to_id));
  }, [dispatch, from_id, to_id]);

  useEffect(() => {
    if (accept_rejectStatus !== null) {
      navigation.navigate('Confirmation', {
        status: accept_rejectStatus,
        messages: accept_rejectData,
        Owner:
          route?.params?.userType === '1'
            ? route?.params?.item
            : {truck_id: route?.params?.item?.id},
        userType: route?.params?.userType,
        fromViewDetail: true,
      });
      dispatch(acceptRejectFailure());
    }
  }, [
    accept_rejectStatus,
    navigation,
    dispatch,
    accept_rejectData,
    route?.params?.userType,
    route?.params?.item,
  ]);

  const handleAcceptBooking = () => {
    route?.params?.userType === '1'
      ? dispatch(initAcceptReject('complete', id))
      : navigation.navigate('verifyLoadOtp');
  };

  const handleRating = () => {
    alert('We are working on it ');
  };

  const handlePressAction =
    status === 'complete' ? handleRating : handleAcceptBooking;

  useEffect(() => {
    if (mapOrigin && mapDestination) {
      const originCoords = {latitude: mapOrigin[0], longitude: mapOrigin[1]};
      const destinationCoords = {
        latitude: mapDestination[0],
        longitude: mapDestination[1],
      };

      setOrigin(originCoords);
      setDestination(destinationCoords);
    }
  }, [mapOrigin, mapDestination]);

  if (mapError) {
    return <Text style={styles.errorText}>Error loading map: {mapError}</Text>;
  }

  const region = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  if (origin && destination) {
    region.latitude = (origin.latitude + destination.latitude) / 2;
    region.longitude = (origin.longitude + destination.longitude) / 2;
    region.latitudeDelta =
      Math.abs(origin.latitude - destination.latitude) * 1.5;
    region.longitudeDelta =
      Math.abs(origin.longitude - destination.longitude) * 1.5;
  }

  const INITIAL_REGION = {
    ...region,
    latitudeDelta: Math.max(region.latitudeDelta, LATITUDE_DELTA),
    longitudeDelta: Math.max(region.longitudeDelta, LONGITUDE_DELTA),
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: isFullScreen ? 1 : 0.5}}>
        <View style={styles.backButton}>
          <CommonToolbar goBack={() => navigation.goBack()} isBack={true} />
        </View>
        {mapLoading ? (
          <ActivityIndicator
            size="large"
            color={GradientColor1}
            style={styles.centered}
          />
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            ref={mapRef}
            initialRegion={INITIAL_REGION}
            // showsUserLocation
            // showsMyLocationButton
          >
            {origin && destination && (
              <>
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={6}
                  strokeColor="#7e7e7e"
                  optimizeWaypoints={true}
                />
                <MapViewDirections
                  origin={offsetCoordinates(origin, true)}
                  destination={offsetCoordinates(destination, true)}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={2}
                  strokeColor="white"
                  lineDashPattern={[2, 10]}
                  optimizeWaypoints={true}
                />
                <Marker coordinate={origin} title="Origin">
                  <Image source={blueDot} style={{width: 20, height: 20}} />
                </Marker>
                <Marker coordinate={destination} title="Destination" />
              </>
            )}
          </MapView>
        )}
        <TouchableOpacity
          style={styles.fullScreenButton}
          onPress={toggleFullScreen}>
          {isFullScreen ? (
            <ExitFullScreen size={20} />
          ) : (
            <FullScreenIcon size={20} />
          )}
        </TouchableOpacity>
      </View>
      {!isFullScreen && (
        <View
          style={{
            flex: 0.5,
            padding: 10,
            paddingHorizontal: 20,
            elevation: 2,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={{minWidth: 50, color: titleColor}}>
                  {Constants.FROM}
                </Text>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>: {from}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={{minWidth: 50, color: titleColor}}>
                  {Constants.TO}
                </Text>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>: {to}</Text>
                </View>
              </View>
            </View>

            <View style={{marginTop: 15}}>
              <Text
                style={{fontSize: 16, color: '#352422', fontWeight: 'bold'}}>
                Logistics Details
              </Text>
              <View
                style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
                <Text style={{minWidth: 120, color: titleColor}}>
                  Truck Number
                </Text>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>: {vehicle_number}</Text>
                </View>
              </View>
            </View>

            <View>
              <View
                style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
                <Text style={{minWidth: 120, color: titleColor}}>
                  Load Name
                </Text>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>: {material_name}</Text>
                </View>
              </View>
              {/* <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 0.5}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{minWidth: 40, color: titleColor}}>
                      {Constants.QUANTITY}
                    </Text>
                    <Text style={styles.textStyle}>: {qty} Ton</Text>
                  </View>
                </View>
              </View> */}
              <View
                style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
                <Text style={{minWidth: 120, color: titleColor}}>
                  {Constants.QUANTITY}
                </Text>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>: {qty} Ton</Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
                <Text style={{minWidth: 120, color: titleColor}}>
                  {Constants.PRICE}
                </Text>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>
                    : ₹ {price}
                    {'/'}
                    {price_type === 2 ? 'Fixed' : 'Per Truck'}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
                <Text style={{minWidth: 120, color: titleColor}}>Distance</Text>
                <View style={{flex: 1}}>
                  <Text style={styles.textStyle}>: {distance}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button
              loading={accept_rejectLoading}
              onPress={handlePressAction}
              title={status === 'complete' ? 'Rate Now' : 'Complete Booking'}
              textStyle={styles.findButtonText}
              style={styles.findButtonContainer}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bce2c5',
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  fullScreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    elevation: 2,
    padding: 10,
    borderRadius: 30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textStyle: {
    color: '#352422',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
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
  findButtonContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  findButtonText: {
    fontSize: 14,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
});

export default ViewDetail;
