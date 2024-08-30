import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, AnimatedRegion, Polyline} from 'react-native-maps';
import PauseIcon from '../../../assets/SVG/svg/PauseIcon';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import TruckNavigationIcon from '../../../assets/SVG/svg/TruckNavigationIcon';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapComponent = ({positions}) => {
  console.log('ooooooo============>', positions);

  const [directionsCoordinates, setDirectionsCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapType, setMapType] = useState('standard');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const mapRef = useRef();
  const markerRef = useRef();

  const animatedMarkerPosition = useRef(
    new AnimatedRegion({
      latitude: positions[0].latitude,
      longitude: positions[0].longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  ).current;

  useEffect(() => {
    fetchOSMRoute();
  }, []);

  useEffect(() => {
    if (isPlaying && directionsCoordinates.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          if (newIndex < directionsCoordinates.length) {
            const newPosition = directionsCoordinates[newIndex];
            animate(
              newPosition.latitude,
              newPosition.longitude,
              newPosition.course,
            );
          } else {
            clearInterval(interval);
          }
          return newIndex;
        });
      }, 1000); // Adjust speed by changing the interval time
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex, directionsCoordinates]);

  const fetchOSMRoute = async () => {
    try {
      const coordinates = positions
        .map(pos => `${pos.longitude},${pos.latitude}`)
        .join(';');

      const response = await fetch(
        `http://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`,
      );

      const data = await response.json();
      if (data.routes.length) {
        const routeCoordinates = data.routes[0].geometry.coordinates.map(
          ([longitude, latitude]) => ({latitude, longitude}),
        );
        setDirectionsCoordinates(routeCoordinates);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching the route:', error);
      setIsLoading(false);
    }
  };

  const animate = (latitude, longitude, course) => {
    const newCoordinate = {latitude, longitude};

    if (Platform.OS === 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 1000); // Smooth animation with 1s duration
      }
    } else {
      animatedMarkerPosition
        .timing({
          ...newCoordinate,
          duration: 1000, // Smooth animation with 1s duration
          useNativeDriver: false,
        })
        .start();
    }

    // Optionally, center the map on the new position
    mapRef.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      1000,
    ); // Center map with smooth animation
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMapType = () => {
    setMapType(prevType =>
      prevType === 'standard' ? 'satellite' : 'standard',
    );
  };

  return (
    <View style={styles.mapContainer}>
      {isLoading && <ActivityIndicator size="large" />}
      <MapView
        ref={mapRef}
        mapType={mapType}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: positions[0].latitude,
          longitude: positions[0].longitude,
          latitudeDelta: LATITUDE_DELTA * 5,
          longitudeDelta: LONGITUDE_DELTA * 5,
        }}>
        {/* Display the fetched route */}
        <Polyline
          coordinates={directionsCoordinates}
          strokeWidth={3}
          strokeColor="blue"
        />

        {/* Display markers for all positions */}
        {positions.map((position, index) => (
          <Marker
            key={index}
            coordinate={position}
            title={
              index === 0
                ? 'Start'
                : index === positions.length - 1
                ? 'End'
                : `Stop ${index}`
            }
          />
        ))}

        {/* Display animated marker for current position */}
        {directionsCoordinates.length > 0 && (
          <Marker.Animated
            ref={markerRef}
            coordinate={animatedMarkerPosition}
            anchor={{x: 0.5, y: 0.5}}
            rotation={directionsCoordinates[currentIndex]?.course || 0}>
            <TruckNavigationIcon width={40} height={40} />
          </Marker.Animated>
        )}
      </MapView>

      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={togglePlayPause}>
        {isPlaying ? <PauseIcon size={40} /> : <PlayIcon size={40} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapToggleButton} onPress={toggleMapType}>
        <Image
          source={
            mapType === 'standard'
              ? require('../../../assets/satellite-view.png')
              : require('../../../assets/satellites.png')
          }
          style={{width: 40, height: 40}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  mapContainer: {flex: 1},
  mapToggleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
  },
  playPauseButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});
