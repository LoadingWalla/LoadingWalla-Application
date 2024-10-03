import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Marker,
  Circle,
  Polyline,
} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import ActiveLocation from '../../../assets/SVG/svg/ActiveLocation';
import {backgroundColorNew, GradientColor1, textColor} from '../../Color/color';
import {useFocusEffect} from '@react-navigation/native';
import {getGeofenceRequest} from '../../Store/Actions/Actions';
import DeleteIcon from '../../../assets/SVG/svg/DeleteIcon';

// Helper function to get live positions
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

// Helper function to generate circle points for polyline
const generateCirclePoints = (center, radius, numPoints = 60) => {
  let circlePoints = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 360) / numPoints;
    const latitudeOffset = radius * Math.cos(angle * (Math.PI / 180));
    const longitudeOffset = radius * Math.sin(angle * (Math.PI / 180));
    circlePoints.push({
      latitude: center.latitude + latitudeOffset / 111320,
      longitude:
        center.longitude +
        longitudeOffset /
          (111320 * Math.cos(center.latitude * (Math.PI / 180))),
    });
  }
  return circlePoints;
};

const Geozones = ({navigation, route}) => {
  const {deviceId, lat, lon} = route.params;
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGeofence, setActiveGeofence] = useState(null); // State for active geofence

  const {wsMessages, wsConnected} = useSelector(state => state.wsData);
  const {addGeofenceStatus, geofenceData, geofenceLoading, geofenceError} =
    useSelector(state => state.data);

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

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getGeofenceRequest(deviceId));
    }, [dispatch]),
  );

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

  const handleGeofencePress = geofence => {
    setActiveGeofence(geofence.id); // Set the active geofence
    mapRef.current.animateToRegion({
      latitude: geofence.latitude,
      longitude: geofence.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const Separator = () => (
    <View style={{height: 1, backgroundColor: '#F7F7F7', marginVertical: 5}} />
  );

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
                  radius={2000}
                  fillColor="rgba(135,206,250,0.3)"
                  strokeColor="transparent"
                  strokeWidth={0}
                />
                <Polyline
                  coordinates={
                    livePositions.length > 0
                      ? generateCirclePoints(
                          livePositions[livePositions.length - 1],
                          2000,
                        )
                      : []
                  }
                  strokeColor={backgroundColorNew}
                  strokeWidth={2}
                  lineDashPattern={[2, 5]}
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

      {/* Scrollable Bottom Container */}
      <View style={styles.bottomContainer}>
        <ScrollView>
          {geofenceData && geofenceData.length > 0 ? (
            geofenceData.map((geofence, index) => (
              <View key={geofence.id}>
                <TouchableOpacity
                  onPress={() => handleGeofencePress(geofence)}
                  style={[
                    styles.geofenceItem,
                    {
                      backgroundColor:
                        activeGeofence === geofence.id ? '#FFF7F5' : '#FFFFFF',
                    },
                  ]}>
                  <Text
                    style={{fontFamily: 'PlusJakartaSans-Bold', fontSize: 12}}>
                    {geofence.name}
                  </Text>
                  <TouchableOpacity style={{borderWidth: 0}}>
                    <DeleteIcon size={20} color={backgroundColorNew} />
                  </TouchableOpacity>
                </TouchableOpacity>
                {index < geofenceData.length - 1 && <Separator />}
              </View>
            ))
          ) : (
            <Text>No geofences available</Text>
          )}
        </ScrollView>
      </View>
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
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: Dimensions.get('window').height / 2.2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 3,
    borderColor: '#F7F7F7',
    borderWidth: 1,
  },
  geofenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
