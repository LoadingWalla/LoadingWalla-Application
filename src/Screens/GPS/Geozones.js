import React, {useEffect, useRef, useState, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import MapView, {Marker, Circle, Polyline} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import ActiveLocation from '../../../assets/SVG/svg/ActiveLocation';
import {backgroundColorNew, textColor} from '../../Color/color';
import {useFocusEffect} from '@react-navigation/native';
import {
  clearAllGeofenceData,
  getGeofenceRequest,
  removeGeofenceFailure,
  removeGeofenceRequest,
} from '../../Store/Actions/Actions';
import DeleteIcon from '../../../assets/SVG/svg/DeleteIcon';
import NoGeozones from '../../../assets/SVG/svg/NoGeozones';
import Button from '../../Components/Button';
import GeozoneShimmer from '../../Components/Shimmer/GeozoneShimmer';
import AlertBox from '../../Components/AlertBox';

const Separator = React.memo(() => <View style={styles.separator} />);

const parseGeofenceArea = area => {
  const areaParts = area.match(/CIRCLE \((.*)\)/);
  if (areaParts && areaParts[1]) {
    const [coordinates, radius] = areaParts[1].split(',');
    const [latitude, longitude] = coordinates.trim().split(' ');

    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      radius: parseFloat(radius),
    };
  }
  return null;
};

const Geozones = ({navigation, route}) => {
  const {deviceId} = route.params;
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [activeGeofence, setActiveGeofence] = useState(null);
  const [initialRegionSet, setInitialRegionSet] = useState(false);
  const [deletingGeofenceId, setDeletingGeofenceId] = useState(null);

  const {
    geofenceData = [],
    geofenceLoading,
    removeGeozoneError,
    removeGeozoneData,
  } = useSelector(state => state.data);

  // Fetch geofences when the screen is focused
  useFocusEffect(
    useCallback(() => {
      dispatch(getGeofenceRequest(deviceId));
      return () =>
        dispatch(clearAllGeofenceData(), dispatch(removeGeofenceFailure()));
    }, [dispatch, deviceId]),
  );

  // Set default geofenceData[0] on the map
  useEffect(() => {
    if (geofenceData.length > 0 && !initialRegionSet && mapRef.current) {
      const geofence = parseGeofenceArea(geofenceData[0]?.area);
      if (geofence) {
        setActiveGeofence(geofenceData[0].id);
        mapRef.current.animateToRegion({
          latitude: geofence.latitude,
          longitude: geofence.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setInitialRegionSet(true);
      }
    }
  }, [geofenceData, initialRegionSet]);

  // Handle geofence selection
  const handleGeofencePress = useCallback(geofence => {
    const parsedGeofence = parseGeofenceArea(geofence.area);
    if (parsedGeofence) {
      setActiveGeofence(geofence.id);
      mapRef.current.animateToRegion({
        latitude: parsedGeofence.latitude,
        longitude: parsedGeofence.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, []);

  const handleDelete = useCallback(
    geofenceId => {
      setDeletingGeofenceId(geofenceId);
      dispatch(removeGeofenceRequest(geofenceId));
    },
    [dispatch],
  );

  // Check for successful or failed deletion and refresh the geofence list
  useEffect(() => {
    if (removeGeozoneData?.status === 200) {
      AlertBox('Geozone deleted successfully!');
      setDeletingGeofenceId(null);
      dispatch(getGeofenceRequest(deviceId));
    } else if (removeGeozoneError) {
      AlertBox('Something went wrong!');
      setDeletingGeofenceId(null);
    }
  }, [removeGeozoneData, removeGeozoneError, dispatch, deviceId]);

  // Generate circle points for polyline
  const generateCirclePoints = useCallback((center, radius, numPoints = 60) => {
    const circlePoints = [];
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
  }, []);

  const renderGeozoneList = useMemo(() => {
    if (geofenceData.length === 0) {
      return (
        <View>
          <View style={styles.noGeozonesContainer}>
            <Text style={styles.oohText}>Ooh!</Text>
            <Text style={styles.noGeozonesText}>No Geozones</Text>
            <NoGeozones size={135} />
          </View>
          <Button
            title="Create geozone"
            onPress={() => navigation.goBack()}
            textStyle={styles.btnText}
            style={styles.btnStyle}
          />
        </View>
      );
    }

    return geofenceData.map((geofence, index) => (
      <View key={geofence.id}>
        <View
          style={[
            styles.geofenceItem,
            {
              backgroundColor:
                activeGeofence === geofence.id ? '#FFF7F5' : '#FFFFFF',
            },
          ]}>
          <TouchableOpacity
            style={styles.geofenceTouch}
            onPress={() => handleGeofencePress(geofence)}>
            <Text style={styles.geofenceText}>{geofence.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(geofence.id)}
            disabled={deletingGeofenceId === geofence.id}
            style={styles.deleteTouch}>
            {deletingGeofenceId === geofence.id ? (
              <ActivityIndicator size="small" color={backgroundColorNew} />
            ) : (
              <DeleteIcon size={25} color={backgroundColorNew} />
            )}
          </TouchableOpacity>
        </View>
        {index < geofenceData.length - 1 && <Separator />}
      </View>
    ));
  }, [geofenceData, activeGeofence, deletingGeofenceId, handleDelete]);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {geofenceLoading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={backgroundColorNew}
          />
        ) : (
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: 20.5937,
              longitude: 78.9629,
              latitudeDelta: 20,
              longitudeDelta: 20,
            }}>
            {geofenceData.length > 0 &&
              geofenceData.map(geofence => {
                const parsedGeofence = parseGeofenceArea(geofence.area);
                if (parsedGeofence && geofence.id === activeGeofence) {
                  return (
                    <React.Fragment key={geofence.id}>
                      <Marker
                        coordinate={{
                          latitude: parsedGeofence.latitude,
                          longitude: parsedGeofence.longitude,
                        }}>
                        <ActiveLocation size={40} course={50} />
                      </Marker>
                      <Circle
                        center={{
                          latitude: parsedGeofence.latitude,
                          longitude: parsedGeofence.longitude,
                        }}
                        radius={parsedGeofence.radius}
                        fillColor="rgba(135,206,250,0.3)"
                        strokeColor="transparent"
                        strokeWidth={0}
                      />
                      <Polyline
                        coordinates={generateCirclePoints(
                          {
                            latitude: parsedGeofence.latitude,
                            longitude: parsedGeofence.longitude,
                          },
                          parsedGeofence.radius,
                        )}
                        strokeColor={backgroundColorNew}
                        strokeWidth={2}
                        lineDashPattern={[2, 5]}
                      />
                    </React.Fragment>
                  );
                }
              })}
          </MapView>
        )}
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={() => handleGeofencePress(geofenceData[0])}>
          <GpsIcon2 size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        {geofenceLoading ? (
          <GeozoneShimmer />
        ) : (
          <ScrollView>{renderGeozoneList}</ScrollView>
        )}
      </View>
    </View>
  );
};

export default Geozones;

const styles = StyleSheet.create({
  container: {flex: 1},
  mapContainer: {flex: 1},
  loader: {flex: 0.5, justifyContent: 'center', alignItems: 'center'},
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
    maxHeight: Dimensions.get('window').height / 2.4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 3,
    borderColor: '#F7F7F7',
    borderWidth: 1,
    padding: 10,
  },
  geofenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  geofenceTouch: {
    flex: 0.9,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  deleteTouch: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  separator: {height: 1, backgroundColor: '#F7F7F7', marginVertical: 5},
  geofenceText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
  },
  noGeozonesContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oohText: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 40,
    color: backgroundColorNew,
  },
  noGeozonesText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    marginBottom: 10,
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
