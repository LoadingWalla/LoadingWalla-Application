import React, {useState, useEffect} from 'react';
import {View, Animated, Easing, Button} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import VehicleIcon from '../../../assets/SVG/svg/VehicleIcon';

const PlayJourneyNew = () => {
  const [routeCoordinates] = useState([
    {
      id: 9059234,
      attributes: {
        sat: 15,
        ignition: false,
        event: 0,
        archive: false,
        odometer: 432359,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:30:05.000+00:00',
      deviceTime: '2024-10-24T18:30:00.000+00:00',
      fixTime: '2024-10-24T18:30:00.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: {
        radioType: 'gsm',
        considerIp: false,
        cellTowers: [
          {
            cellId: 28838,
            locationAreaCode: 8521,
            mobileCountryCode: 405,
            mobileNetworkCode: 51,
          },
        ],
      },
      geofenceIds: [166],
    },
    {
      id: 9059624,
      attributes: {
        sat: 15,
        ignition: false,
        event: 0,
        archive: false,
        odometer: 432359,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:33:06.000+00:00',
      deviceTime: '2024-10-24T18:33:00.000+00:00',
      fixTime: '2024-10-24T18:33:00.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: {
        radioType: 'gsm',
        considerIp: false,
        cellTowers: [
          {
            cellId: 28838,
            locationAreaCode: 8521,
            mobileCountryCode: 405,
            mobileNetworkCode: 51,
          },
        ],
      },
      geofenceIds: [166],
    },
    {
      id: 9059664,
      attributes: {
        adc1: 12.9,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:33:26.000+00:00',
      deviceTime: '2024-10-24T18:33:26.000+00:00',
      fixTime: '2024-10-24T18:33:00.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: null,
      geofenceIds: [166],
    },
    {
      id: 9059669,
      attributes: {
        status: 68,
        ignition: false,
        charge: true,
        blocked: false,
        batteryLevel: 100,
        rssi: 4,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:33:29.000+00:00',
      deviceTime: '2024-10-24T18:33:29.000+00:00',
      fixTime: '2024-10-24T18:33:00.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: null,
      geofenceIds: [166],
    },
    {
      id: 9060019,
      attributes: {
        sat: 15,
        ignition: false,
        event: 0,
        archive: false,
        odometer: 432359,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:36:06.000+00:00',
      deviceTime: '2024-10-24T18:36:01.000+00:00',
      fixTime: '2024-10-24T18:36:01.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: {
        radioType: 'gsm',
        considerIp: false,
        cellTowers: [
          {
            cellId: 28838,
            locationAreaCode: 8521,
            mobileCountryCode: 405,
            mobileNetworkCode: 51,
          },
        ],
      },
      geofenceIds: [166],
    },
    {
      id: 9060361,
      attributes: {
        status: 68,
        ignition: false,
        charge: true,
        blocked: false,
        batteryLevel: 100,
        rssi: 4,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:38:29.000+00:00',
      deviceTime: '2024-10-24T18:38:29.000+00:00',
      fixTime: '2024-10-24T18:36:01.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: null,
      geofenceIds: [166],
    },
    {
      id: 9060430,
      attributes: {
        sat: 15,
        ignition: false,
        event: 0,
        archive: false,
        odometer: 432359,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:39:07.000+00:00',
      deviceTime: '2024-10-24T18:39:01.000+00:00',
      fixTime: '2024-10-24T18:39:01.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: {
        radioType: 'gsm',
        considerIp: false,
        cellTowers: [
          {
            cellId: 28838,
            locationAreaCode: 8521,
            mobileCountryCode: 405,
            mobileNetworkCode: 51,
          },
        ],
      },
      geofenceIds: [166],
    },
    {
      id: 9060892,
      attributes: {
        sat: 15,
        ignition: false,
        event: 0,
        archive: false,
        odometer: 432359,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:42:07.000+00:00',
      deviceTime: '2024-10-24T18:42:02.000+00:00',
      fixTime: '2024-10-24T18:42:02.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: {
        radioType: 'gsm',
        considerIp: false,
        cellTowers: [
          {
            cellId: 28838,
            locationAreaCode: 8521,
            mobileCountryCode: 405,
            mobileNetworkCode: 51,
          },
        ],
      },
      geofenceIds: [166],
    },
    {
      id: 9061122,
      attributes: {
        adc1: 13.0,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:43:27.000+00:00',
      deviceTime: '2024-10-24T18:43:27.000+00:00',
      fixTime: '2024-10-24T18:42:02.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: null,
      geofenceIds: [166],
    },
    {
      id: 9061134,
      attributes: {
        status: 68,
        ignition: false,
        charge: true,
        blocked: false,
        batteryLevel: 100,
        rssi: 4,
        distance: 0.0,
        totalDistance: 1563337.949046858,
        motion: false,
        hours: 56009000,
      },
      deviceId: 165,
      protocol: 'gt06',
      serverTime: '2024-10-24T18:43:30.000+00:00',
      deviceTime: '2024-10-24T18:43:30.000+00:00',
      fixTime: '2024-10-24T18:42:02.000+00:00',
      outdated: false,
      valid: true,
      latitude: 24.957880555555555,
      longitude: 87.98061,
      altitude: 0.0,
      speed: 0.0,
      course: 124.0,
      address: null,
      accuracy: 0.0,
      network: null,
      geofenceIds: [166],
    },
  ]);
  const [carPosition, setCarPosition] = useState({
    latitude: 27.409836666666667,
    longitude: 80.15091277777778,
    heading: 60, // For rotation
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [followVehicle, setFollowVehicle] = useState(false);
  const mapRef = React.useRef(null);
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isPlaying) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100000, // Duration for the whole journey
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
      const totalSegments = routeCoordinates.length - 1;
      // Find which segment we are in (between two points)
      const currentSegmentIndex = Math.floor(value * totalSegments);
      const nextSegmentIndex = currentSegmentIndex + 1;

      if (nextSegmentIndex < routeCoordinates.length) {
        // Get the starting and ending points for the current segment
        const start = routeCoordinates[currentSegmentIndex];
        const end = routeCoordinates[nextSegmentIndex];
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
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        initialRegion={{
          latitude: 27.409836666666667,
          longitude: 80.15091277777778,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
        onMapReady={() => {
          console.log('Map is ready!'); // Debug log to confirm map is ready
        }}>
        <Polyline
          coordinates={routeCoordinates.map(point => ({
            latitude: point.latitude,
            longitude: point.longitude,
          }))}
          strokeWidth={5}
          strokeColor="blue"
        />
        <Marker
          coordinate={carPosition}
          title="Car is zooming!"
          rotation={carPosition.heading} // Rotate the car to face the right direction
          anchor={{x: 0.5, y: 0.5}} // To rotate from the center of the icon
        >
          <VehicleIcon width={40} height={40} />
        </Marker>
      </MapView>
      <View style={{position: 'absolute', bottom: 30}}>
        <Button
          title={isPlaying ? 'Pause Journey' : 'Play Journey'}
          onPress={() => setIsPlaying(!isPlaying)} // Toggle play/pause
        />
      </View>
      <View style={{position: 'absolute', bottom: 30, left: '40%'}}>
        <Button
          title={followVehicle ? 'Stop Following Vehicle' : 'Follow Vehicle'}
          onPress={() => setFollowVehicle(!followVehicle)} // Toggle follow/unfollow
        />
      </View>
    </View>
  );
};

export default PlayJourneyNew;
