import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import MapView, {Marker, Callout, Polyline} from 'react-native-maps';
import ActiveLocation from '../../../assets/SVG/svg/ActiveLocation';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAddressRequest} from '../../Store/Actions/Actions';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapComponent = ({initialRegion, item, positions}) => {
  const [mapType, setMapType] = useState('standard');
  const [previousPosition, setPreviousPosition] = useState(null);
  const mapRef = useRef();
  const markerRef = useRef();
  const dispatch = useDispatch();

  const {fullAddressData} = useSelector(state => {
    // console.log('Tracking Truck -------------->>>>>', state.data);
    return state.data;
  });

  console.log(
    'Positions:',
    positions,
    'Item:',
    item,
    'Initial Region:',
    initialRegion,
  );

  const initialMapRegion = {
    ...initialRegion,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const handleMapLayout = () => {
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
  };

  const toggleMapType = () => {
    setMapType(prevType =>
      prevType === 'standard' ? 'satellite' : 'standard',
    );
  };

  useEffect(() => {
    if (positions.length > 0) {
      const lastPosition = positions[0];
      // Check if the position has changed
      if (
        !previousPosition ||
        previousPosition.latitude !== lastPosition.latitude ||
        previousPosition.longitude !== lastPosition.longitude
      ) {
        // Update the previous position
        console.log(888888888, 'New Positon');

        setPreviousPosition(lastPosition);

        // Fetch the new address
        dispatch(
          fetchAddressRequest(
            lastPosition.latitude,
            lastPosition.longitude,
            positions[0].id,
          ),
        );
      }
    }
  }, [positions, previousPosition, dispatch]);

  const hasPositions = positions.length > 0;
  console.log(89898989899, hasPositions ? positions : 0);

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        mapType={mapType}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialMapRegion}
        onLayout={handleMapLayout}>
        {hasPositions ? (
          <>
            <Polyline
              coordinates={positions.map(position => ({
                latitude: position.latitude,
                longitude: position.longitude,
              }))}
              strokeColor="#000" // Customize the color
              strokeWidth={3} // Customize the width
            />
            {/* Show markers for each position with direction  */}
            {positions.map((position, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: initialRegion.latitude,
                  longitude: initialRegion.longitude,
                }}
                ref={markerRef}>
                <ActiveLocation size={30} course={50} />
                <Callout>
                  <View style={styles.calloutView}>
                    <Text style={styles.calloutText}>
                      {fullAddressData === null
                        ? item?.address
                        : fullAddressData}
                      {/* {`Lat: ${position.latitude}, Long: ${position.longitude}`} */}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </>
        ) : (
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            ref={markerRef}>
            <ActiveLocation size={30} course={50} />
            <Callout>
              <View style={styles.calloutView}>
                <Text style={styles.calloutText}>
                  {fullAddressData === null ? item?.address : fullAddressData}
                  {/* {`Lat: ${initialRegion.latitude}, Long: ${initialRegion.longitude}`} */}
                </Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      <TouchableOpacity style={styles.mapToggleButton} onPress={toggleMapType}>
        <Image
          source={
            mapType === 'standard'
              ? require('../../../assets/satellite-view.png')
              : require('../../../assets/satellites.png')
          }
          style={styles.imageStyle}
        />
      </TouchableOpacity>
      <View style={styles.speedDistanceBox}>
        <Text>
          {hasPositions ? positions[0]?.speed : item?.position[0].speed}
        </Text>
        <Text>{item?.distance}</Text>
      </View>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  mapContainer: {flex: 1},
  mapToggleButton: {
    position: 'absolute',
    top: 70,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
    zIndex: 99,
  },
  speedDistanceBox: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#ffffff',
    elevation: 3,
    zIndex: 99,
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    padding: 10,
  },
  calloutView: {
    width: 300,
    // padding: 5,
    // backgroundColor: 'rgba(1, 1, 0, 0.7)',
    borderRadius: 5,
    borderWidth: 1,
  },
  calloutText: {
    fontSize: 14,
    textAlign: 'center',
  },
  imageStyle: {width: 40, height: 40},
});
