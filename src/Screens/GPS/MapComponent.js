import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, AnimatedRegion, Polyline} from 'react-native-maps';
import PauseIcon from '../../../assets/SVG/svg/PauseIcon';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const dummyPositions = [
  {latitude: 37.78825, longitude: -122.4324},
  {latitude: 37.78845, longitude: -122.4326},
  {latitude: 37.78865, longitude: -122.4328},
  {latitude: 37.78885, longitude: -122.433},
];

const MapComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef();
  const markerRef = useRef();

  const animatedMarkerPosition = useRef(
    new AnimatedRegion({
      latitude: dummyPositions[0].latitude,
      longitude: dummyPositions[0].longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  ).current;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          if (newIndex < dummyPositions.length) {
            const newPosition = dummyPositions[newIndex];
            animate(newPosition.latitude, newPosition.longitude);
          } else {
            clearInterval(interval);
          }
          return newIndex;
        });
      }, 1000); // Adjust speed by changing the interval time
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex]);

  const animate = (latitude, longitude) => {
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

  return (
    <View style={styles.mapContainer}>
      {isLoading && <ActivityIndicator size="large" />}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: dummyPositions[0].latitude,
          longitude: dummyPositions[0].longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Polyline
          coordinates={dummyPositions}
          strokeWidth={3}
          strokeColor="blue"
        />

        {/* Display the dummy markers */}
        {dummyPositions.map((position, index) => (
          <Marker
            key={index}
            coordinate={position}
            title={`Point ${index + 1}`}
          />
        ))}

        {/* Display animated marker for current position */}
        {dummyPositions.length > 0 && (
          <Marker.Animated
            ref={markerRef}
            coordinate={animatedMarkerPosition}
            anchor={{x: 0.5, y: 0.5}}>
            {/* Custom marker icon (replace with your icon if needed) */}
            <View
              style={{
                height: 40,
                width: 40,
                backgroundColor: 'red',
                borderRadius: 20,
              }}
            />
          </Marker.Animated>
        )}
      </MapView>

      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={togglePlayPause}>
        {isPlaying ? <PauseIcon size={40} /> : <PlayIcon size={40} />}
      </TouchableOpacity>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  mapContainer: {flex: 1},
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
