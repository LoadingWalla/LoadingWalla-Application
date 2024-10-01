import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {AnimatedRegion, Marker, Circle} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import ActiveLocation from '../../../assets/SVG/svg/ActiveLocation';
import {backgroundColorNew, textColor} from '../../Color/color';

const getLivePositions = (wsMessages, deviceId) => {
  return wsMessages
    .flatMap(message => message.positions || [])
    .filter(position => position.deviceId === deviceId)
    .map(({deviceId, latitude, longitude, course}) => ({
      deviceId,
      latitude,
      longitude,
      course,
    }));
};

const Geozones = ({navigation, route}) => {
  const {deviceId, lat, lon} = route.params;
  console.log(666666, route);

  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const {wsMessages, wsConnected} = useSelector(state => state.wsData);
  const {addGeofenceStatus} = useSelector(state => state.data);

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
    new AnimatedRegion({
      latitude: livePositions.length > 0 ? livePositions[0].latitude : lat || 0,
      longitude:
        livePositions.length > 0 ? livePositions[0].longitude : lon || 0,
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
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={backgroundColorNew} />
          </View>
        ) : (
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude:
                livePositions.length > 0 ? livePositions[0].latitude : lat || 0,
              longitude:
                livePositions.length > 0
                  ? livePositions[0].longitude
                  : lon || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {livePositions.length > 0 && (
              <>
                <Marker.Animated coordinate={animatedMarkerPosition}>
                  <ActiveLocation size={40} course={50} />
                </Marker.Animated>
                <Circle
                  center={livePositions[livePositions.length - 1]}
                  radius={1000}
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

      <View style={styles.bottomContainer}></View>
    </View>
  );
};

export default Geozones;

const styles = StyleSheet.create({
  container: {flex: 1},
  mapContainer: {flex: 1},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
  bottomContainer: {
    backgroundColor: '#FFF7F5',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    elevation: 3,
    borderColor: '#F7F7F7',
    borderWidth: 1,
  },
  geozoneContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    borderColor: '#00000029',
    borderWidth: 1,
  },
  geozoneText: {
    marginHorizontal: 15,
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  slider: {width: '75%'},
  textvalue: {
    width: '20%',
    textAlign: 'center',
    borderRadius: 3,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    borderWidth: 0.3,
    paddingVertical: 5,
    marginRight: 5,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  inputLabel: {
    marginRight: 15,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  textInput: {
    borderBottomWidth: 1,
    flex: 1,
    paddingVertical: 0,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  btnStyle: {
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
