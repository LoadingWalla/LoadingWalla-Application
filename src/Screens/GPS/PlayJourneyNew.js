import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Animated, Easing} from 'react-native';
import JourneyMap from './JourneyMap';
import MapView, {Marker, Polyline} from 'react-native-maps';
import VehicleIcon from '../../../assets/SVG/svg/VehicleIcon';
import data from './routeData.json';

const PlayJourneyNew = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [followVehicle, setFollowVehicle] = useState(false);

  console.log(44444, data);

  const [routeData] = useState(data);
  // const [routeData] = useState([
  //   {latitude: 27.409836666666667, longitude: 80.15091277777778, course: 290},
  //   {latitude: 28.6139, longitude: 77.209, course: 580},
  //   {latitude: 26.9124, longitude: 75.7873, course: 200},
  //   {latitude: 19.076, longitude: 72.8777, course: 10},
  // ]);
  // const stops = [
  //   {latitude: 28.6139, longitude: 77.209, course: 580},
  //   {latitude: 26.9124, longitude: 75.7873, course: 200},
  // ];
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <JourneyMap
        routeData={routeData}
        isPlaying={isPlaying}
        // stops={stops}
        followVehicle={followVehicle}
      />

      <View style={{position: 'absolute', bottom: 80, left: '40%'}}>
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

// const PlayJourneyNew = () => {
//   const [routeCoordinates] = useState([
//     {latitude: 27.409836666666667, longitude: 80.15091277777778, course: 290},
//     {latitude: 28.6139, longitude: 77.209, course: 580},
//     {latitude: 26.9124, longitude: 75.7873, course: 200},
//     {latitude: 19.076, longitude: 72.8777, course: 10},
//   ]);
//   const [carPosition, setCarPosition] = useState({
//     latitude: 27.409836666666667,
//     longitude: 80.15091277777778,
//     heading: 60, // For rotation
//   });
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [followVehicle, setFollowVehicle] = useState(false);
//   const mapRef = React.useRef(null);
//   const animation = useState(new Animated.Value(0))[0];

//   useEffect(() => {
//     if (isPlaying) {
//       Animated.timing(animation, {
//         toValue: 1,
//         duration: 100000, // Duration for the whole journey
//         easing: Easing.linear,
//         useNativeDriver: false,
//       }).start();
//     } else {
//       animation.stopAnimation(); // Pause the animation
//     }
//   }, [isPlaying]);

//   useEffect(() => {
//     animation.addListener(({value}) => {
//       // Calculate total segments
//       const totalSegments = routeCoordinates.length - 1;
//       // Find which segment we are in (between two points)
//       const currentSegmentIndex = Math.floor(value * totalSegments);
//       const nextSegmentIndex = currentSegmentIndex + 1;

//       if (nextSegmentIndex < routeCoordinates.length) {
//         // Get the starting and ending points for the current segment
//         const start = routeCoordinates[currentSegmentIndex];
//         const end = routeCoordinates[nextSegmentIndex];
//         // Calculate the segment progress (how far we've traveled in the current segment)
//         const segmentProgress = (value * totalSegments) % 1;
//         // Calculate dynamic car position
//         const newPosition = {
//           latitude:
//             start.latitude + (end.latitude - start.latitude) * segmentProgress,
//           longitude:
//             start.longitude +
//             (end.longitude - start.longitude) * segmentProgress,
//           heading: start.course,
//         };

//         setCarPosition(newPosition);
//         // Only animate the map when followVehicle is true
//         if (followVehicle && mapRef.current) {
//           mapRef.current.animateToRegion(
//             {
//               latitude: newPosition.latitude,
//               longitude: newPosition.longitude,
//               latitudeDelta: 0.1, // Adjust zoom level
//               longitudeDelta: 0.1, // Adjust zoom level
//             },
//             1000,
//           ); // Animation duration
//         }
//       }
//     });
//   }, [animation, followVehicle]);

//   return (
//     <View style={{flex: 1}}>
//       <MapView
//         ref={mapRef}
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: 27.409836666666667,
//           longitude: 80.15091277777778,
//           latitudeDelta: 1,
//           longitudeDelta: 1,
//         }}
//         onMapReady={() => {
//           console.log('Map is ready!'); // Debug log to confirm map is ready
//         }}>
//         <Polyline
//           coordinates={routeCoordinates.map(point => ({
//             latitude: point.latitude,
//             longitude: point.longitude,
//           }))}
//           strokeWidth={5}
//           strokeColor="blue"
//         />
//         <Marker
//           coordinate={carPosition}
//           title="Car is zooming!"
//           rotation={carPosition.heading} // Rotate the car to face the right direction
//           anchor={{x: 0.5, y: 0.5}} // To rotate from the center of the icon
//         >
//           <VehicleIcon width={40} height={40} />
//         </Marker>
//       </MapView>
//       <View style={{position: 'absolute', bottom: 30}}>
//         <Button
//           title={isPlaying ? 'Pause Journey' : 'Play Journey'}
//           onPress={() => setIsPlaying(!isPlaying)} // Toggle play/pause
//         />
//       </View>
//       <View style={{position: 'absolute', bottom: 30, left: '40%'}}>
//         <Button
//           title={followVehicle ? 'Stop Following Vehicle' : 'Follow Vehicle'}
//           onPress={() => setFollowVehicle(!followVehicle)} // Toggle follow/unfollow
//         />
//       </View>
//     </View>
//   );
// };

export default PlayJourneyNew;
