import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {backgroundColorNew, PrivacyPolicy, textColor} from '../../Color/color';
import MapView, {AnimatedRegion, Marker, Circle} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import ActiveLocation from '../../../assets/SVG/svg/ActiveLocation';
import Button from '../../Components/Button';

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
  const [sliderValue, setSliderValue] = useState(0.5);

  const {wsMessages, wsConnected} = useSelector(state => state.wsData);

  useEffect(() => {
    if (wsConnected) {
      const position = getLivePositions(wsMessages, deviceId);
      setLivePositions(position);

      if (position.length > 0) {
        setLoading(false);
        updateMarkerPosition(position[position.length - 1]);
      }
    } else {
      setLoading(false);
    }
  }, [wsMessages, wsConnected]);

  const animatedMarkerPosition = useRef(
    livePositions.length > 0
      ? new AnimatedRegion({
          latitude: livePositions[0].latitude,
          longitude: livePositions[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      : new AnimatedRegion({
          latitude: lat || 0,
          longitude: long || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }),
  ).current;

  const updateMarkerPosition = position => {
    animatedMarkerPosition
      .timing({
        latitude: position.latitude,
        longitude: position.longitude,
        duration: 1000,
        useNativeDriver: false,
      })
      .start();
  };

  const handleSliderChange = value => {
    setSliderValue(value);
  };

  const handleSave = () => {
    console.log(`Geofence radius saved: ${sliderValue * 5000} meters`);
  };

  const animateToDevicePosition = () => {
    if (livePositions.length > 0 && mapRef.current) {
      const latestPosition = livePositions[livePositions.length - 1];
      mapRef.current.animateToRegion({
        latitude: latestPosition.latitude,
        longitude: latestPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapView}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={backgroundColorNew} />
            </View>
          ) : (
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              mapType="standard"
              initialRegion={
                livePositions.length > 0
                  ? {
                      latitude: livePositions[0].latitude,
                      longitude: livePositions[0].longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }
                  : {
                      latitude: lat || 0,
                      longitude: long || 0,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }
              }>
              {livePositions.length > 0 && (
                <>
                  <Marker.Animated coordinate={animatedMarkerPosition}>
                    <ActiveLocation size={40} course={50} />
                  </Marker.Animated>
                  <Circle
                    center={livePositions[livePositions.length - 1]}
                    radius={sliderValue * 5000}
                    fillColor="rgba(135,206,250,0.3)"
                    strokeColor={backgroundColorNew}
                    strokeWidth={1}
                  />
                </>
              )}
            </MapView>
          )}

          <TouchableOpacity
            style={styles.gpsButton}
            onPress={animateToDevicePosition}>
            <GpsIcon2 size={20} />
          </TouchableOpacity>
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
            <Text style={styles.textvalue}>
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
  mapContainer: {flex: 1},
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
  gpsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    position: 'absolute',
    bottom: 150,
    right: 10,
  },
  textvalue: {
    width: '20%',
    textAlign: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 3,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
  },
});
