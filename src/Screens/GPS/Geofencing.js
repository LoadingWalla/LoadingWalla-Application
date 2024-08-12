import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  backgroundColorNew,
  PrivacyPolicy,
  textColor,
  titleColor,
} from '../../Color/color';
import MapView, {AnimatedRegion, Marker, Polyline} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import useAddress from '../../hooks/useAddress';
import TruckNavigationIcon from '../../../assets/SVG/svg/TruckNavigationIcon';
import AnimatedText from '../../Components/AnimatedText';
import Button from '../../Components/Button';
import Slider from '@react-native-community/slider';

const getLivePositions = (wsMessages, deviceId) => {
  return wsMessages
    .flatMap(message => message.positions || [])
    .filter(position => position.deviceId === deviceId)
    .map(position => ({
      deviceId: position.deviceId,
      latitude: position.latitude,
      longitude: position.longitude,
      course: position.course,
    }));
};

const Geofencing = ({navigation, route}) => {
  const {deviceId, lat, long} = route.params;
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addressFetched, setAddressFetched] = useState(false);
  const [sliderValue, setSliderValue] = useState(0.5); // Initial slider value

  const {wsMessages, wsConnected, wsDevices, wsPositions, wsEvents} =
    useSelector(state => state.data);

  const device = wsDevices.find(d => d.id === deviceId);
  const positions = wsPositions.filter(p => p.deviceId === deviceId);
  const events = wsEvents.filter(e => e.deviceId === deviceId);

  useEffect(() => {
    if (!wsConnected) {
      setLoading(false);
    } else {
      const position = getLivePositions(wsMessages, deviceId);
      setLivePositions(position);
      // console.log(444444, position);

      if (position.length > 0) {
        setLoading(false);
        animateToPosition(position[position.length - 1]);
      } else {
        setLoading(false);
      }
    }
  }, [wsMessages, wsConnected]);

  const animateToPosition = position => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      animatedMarkerPosition
        .timing({
          latitude: position.latitude,
          longitude: position.longitude,
          duration: 1000,
          useNativeDriver: false,
        })
        .start();
    }
  };

  const animatedMarkerPosition = useRef(
    new AnimatedRegion({
      latitude: lat || 0,
      longitude: long || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
  ).current;

  const {address, fetchAddress, gpsAddressLoading} = useAddress(livePositions);

  const handleFetchAddress = () => {
    setAddressFetched(false);
    fetchAddress();
    setAddressFetched(true);
  };

  const handleSliderChange = value => {
    setSliderValue(value);
  };

  const handleSave = () => {
    console.log(`Geofence radius saved: ${sliderValue * 5000} meters`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapHeader}>
          {device?.name && (
            <>
              <Text style={styles.fetchedAddressText}>{device?.name}</Text>
              <View style={styles.verticalLine} />
            </>
          )}
          <TouchableOpacity onPress={handleFetchAddress}>
            {gpsAddressLoading ? (
              <ActivityIndicator size="small" color={backgroundColorNew} />
            ) : (
              <AnimatedText
                text={address}
                style={[
                  styles.addressText,
                  addressFetched && styles.fetchedAddressText,
                ]}
                showAnimation={true}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.mapView}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={backgroundColorNew} />
            </View>
          ) : (
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              mapType="standard" // Change to "satellite", "hybrid", "standard" or "terrain" as needed
              initialRegion={{
                latitude: lat || livePositions[0]?.latitude || 0,
                longitude: long || livePositions[0]?.longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {positions[0]?.attributes?.motion && (
                <Polyline
                  coordinates={livePositions}
                  strokeColor="#000"
                  strokeWidth={6}
                />
              )}
              {livePositions.length > 0 && (
                <Marker.Animated
                  coordinate={animatedMarkerPosition}
                  rotation={
                    livePositions[livePositions.length - 1].course || 0
                  }>
                  <TruckNavigationIcon width={50} height={50} />
                </Marker.Animated>
              )}
            </MapView>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View
          style={{backgroundColor: '#EBEBEB', borderRadius: 8, padding: 10}}>
          <Text>Geofence radius</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Slider
              style={{width: '80%'}}
              minimumValue={0}
              maximumValue={1}
              value={sliderValue}
              onValueChange={handleSliderChange}
              minimumTrackTintColor={backgroundColorNew}
              maximumTrackTintColor={PrivacyPolicy}
              thumbTintColor={backgroundColorNew}
            />
            <Text
              style={{
                width: '20%',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 3,
              }}>
              {(sliderValue * 5000).toFixed(0)} m
            </Text>
          </View>
        </View>
        <Button
          title="Save"
          onPress={handleSave}
          textStyle={styles.btnText}
          style={styles.btnStyle}
        />
      </View>
    </View>
  );
};

export default Geofencing;

const styles = StyleSheet.create({
  container: {flex: 1},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 10,
    height: '100%',
  },
  mapContainer: {flex: 1},
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  mapView: {flex: 1, width: '100%', height: '100%'},
  bottomContainer: {
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBoldItalic',
    color: backgroundColorNew,
    textDecorationLine: 'underline',
  },
  fetchedAddressText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    textTransform: 'uppercase',
    textDecorationLine: 'none',
    fontSize: 14,
    minWidth: 60,
    textAlign: 'center',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%',
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
