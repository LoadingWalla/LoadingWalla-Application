import React, {useState, useEffect} from 'react';
import {Animated, Button, Easing, StyleSheet, View} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import VehicleIcon from '../../../assets/SVG/svg/VehicleIcon';
import StopsIcon from '../../../assets/SVG/svg/StopsIcon';

const JourneyMap = ({routeData, isPlaying, followVehicle, stops = []}) => {
  const [carPosition, setCarPosition] = useState({
    latitude: routeData[0].latitude,
    longitude: routeData[0].longitude,
    heading: routeData[0].course || 0, // Initial heading
  });
  const [mapType, setMapType] = useState('standard');

  const mapRef = React.useRef(null);
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isPlaying) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000, // Adjust duration for the journey
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      animation.stopAnimation(); // Pause the animation
    }
  }, [isPlaying]);

  useEffect(() => {
    animation.addListener(({value}) => {
      // Calculate total segments
      const totalSegments = routeData.length - 1;
      // Find which segment we are in (between two points)
      const currentSegmentIndex = Math.floor(value * totalSegments);
      const nextSegmentIndex = currentSegmentIndex + 1;

      if (nextSegmentIndex < routeData.length) {
        // Get the starting and ending points for the current segment
        const start = routeData[currentSegmentIndex];
        const end = routeData[nextSegmentIndex];
        // Calculate the segment progress (how far we've traveled in the current segment)
        const segmentProgress = (value * totalSegments) % 1;
        // Calculate dynamic car position
        const newPosition = {
          latitude:
            start.latitude + (end.latitude - start.latitude) * segmentProgress,
          longitude:
            start.longitude +
            (end.longitude - start.longitude) * segmentProgress,
          heading: start.course,
        };

        setCarPosition(newPosition);
        // Only animate the map when followVehicle is true
        if (followVehicle && mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: newPosition.latitude,
              longitude: newPosition.longitude,
              latitudeDelta: 0.1, // Adjust zoom level
              longitudeDelta: 0.1, // Adjust zoom level
            },
            1000,
          ); // Animation duration
        }
      }
    });
  }, [animation, followVehicle]);

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView
        ref={mapRef}
        mapType={mapType}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: routeData[0].latitude,
          longitude: routeData[0].longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}>
        <Polyline
          coordinates={routeData.map(point => ({
            latitude: point.latitude,
            longitude: point.longitude,
          }))}
          strokeWidth={5}
          strokeColor="blue"
        />
        <Marker
          coordinate={carPosition}
          title="Car is zooming!"
          rotation={carPosition.heading}
          anchor={{x: 0.5, y: 0.5}}>
          <VehicleIcon width={40} height={40} />
        </Marker>
        {stops.map((stop, index) => (
          <Marker
            key={`stop-${index}`}
            coordinate={{latitude: stop.latitude, longitude: stop.longitude}}
            anchor={{x: 0.5, y: 0.5}}>
            <StopsIcon number={index + 1} size={40} />
          </Marker>
        ))}
      </MapView>
      <View style={{position: 'absolute', top: 20, right: 20}}>
        <Button
          title={`Switch to ${
            mapType === 'standard' ? 'Hybrid' : 'Standard'
          } Mode`}
          onPress={() =>
            setMapType(prevType =>
              prevType === 'standard' ? 'hybrid' : 'standard',
            )
          }
        />
      </View>
    </View>
  );
};

export default JourneyMap;
