import React, {useEffect, useRef, useState, useCallback} from 'react';
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
import {backgroundColorNew, textColor} from '../../Color/color';
import {useFocusEffect} from '@react-navigation/native';
import {getGeofenceRequest} from '../../Store/Actions/Actions';
import DeleteIcon from '../../../assets/SVG/svg/DeleteIcon';
import NoGeozones from '../../../assets/SVG/svg/NoGeozones';
import Button from '../../Components/Button';

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

  const {geofenceData = [], geofenceLoading} = useSelector(state => {
    console.log(55555, 'All Geozones', state);
    return state.data;
  });

  useFocusEffect(
    useCallback(() => {
      dispatch(getGeofenceRequest(deviceId));
      return () => {
        // unsubscribe();
      };
    }, [dispatch, deviceId]),
  );

  // Set the default geofence (geofenceData[0]) on the map when data is available
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

  // Helper function to get live positions
  const getLivePositions = useCallback((wsMessages, deviceId) => {
    return wsMessages
      .flatMap(message => message.positions || [])
      .filter(position => position.deviceId === deviceId)
      .map(({latitude, longitude}) => ({latitude, longitude}));
  }, []);

  // Helper function to generate circle points for polyline
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

  const handleGeofencePress = geofence => {
    setActiveGeofence(geofence.id);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: geofence.latitude,
        longitude: geofence.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const Separator = () => <View style={styles.separator} />;

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
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {geofenceData.length > 0 &&
              geofenceData.map(geofence => {
                const parsedGeofence = parseGeofenceArea(geofence.area);
                if (parsedGeofence && geofence.id === activeGeofence) {
                  return (
                    <React.Fragment key={geofence.id}>
                      <Marker.Animated
                        coordinate={{
                          latitude: parsedGeofence.latitude,
                          longitude: parsedGeofence.longitude,
                        }}>
                        <ActiveLocation size={40} course={50} />
                      </Marker.Animated>
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {geofenceData && geofenceData.length ? (
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
                  <Text style={styles.geofenceText}>{geofence.name}</Text>
                  <DeleteIcon size={20} color={backgroundColorNew} />
                </TouchableOpacity>
                {index < geofenceData.length - 1 && <Separator />}
              </View>
            ))
          ) : (
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
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
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
    padding: 10,
  },
  geofenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
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
