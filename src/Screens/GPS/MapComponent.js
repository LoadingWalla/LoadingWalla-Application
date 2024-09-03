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
import moment from 'moment';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import {backgroundColorNew} from '../../Color/color';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapComponent = ({initialRegion, item, positions, navigation}) => {
  const [mapType, setMapType] = useState('standard');
  const [previousPosition, setPreviousPosition] = useState(null);
  const mapRef = useRef();
  const markerRef = useRef();
  const dispatch = useDispatch();

  const {fullAddressData} = useSelector(state => {
    // console.log('Tracking Truck -------------->>>>>', state.data);
    return state.data;
  });
  // console.log(33333, item);

  // console.log(
  //   'Positions:',
  //   positions,
  //   'Item:',
  //   item,
  //   'Initial Region:',
  //   initialRegion,
  // );

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

      if (
        !previousPosition ||
        previousPosition.latitude !== lastPosition.latitude ||
        previousPosition.longitude !== lastPosition.longitude
      ) {
        setPreviousPosition(lastPosition);

        dispatch(
          fetchAddressRequest(
            lastPosition.latitude,
            lastPosition.longitude,
            lastPosition.id,
          ),
        );

        // Animate the map to the new position
        mapRef.current.animateToRegion(
          {
            latitude: lastPosition.latitude,
            longitude: lastPosition.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          1000,
        );

        // Optionally, move the marker smoothly if needed
        if (markerRef.current) {
          markerRef.current.animateMarkerToCoordinate(
            {
              latitude: lastPosition.latitude,
              longitude: lastPosition.longitude,
            },
            1000,
          );
        }
      }
    }
  }, [positions, previousPosition, dispatch]);

  const hasPositions = positions.length > 0;
  // console.log(89898989899, hasPositions ? positions : 0);

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
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text>{`${(item?.distance / 1000).toFixed(2)} KM`}</Text>
            <Text>Today distance</Text>
          </View>
          <View style={styles.verticalLine} />
          <Text>
            {Math.floor(
              (hasPositions ? positions[0]?.speed : item?.position[0]?.speed) *
                1.852,
            )}
          </Text>
          <Text>Speed</Text>
        </View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() =>
            navigation.navigate('PlayJourney', {
              deviceId: item?.id,
              from: moment().utcOffset(330).startOf('day').toISOString(),
              to: moment().utcOffset(330).endOf('day').toISOString(),
              // from: moment().utc().startOf('day').toISOString(),
              // to: moment().utc().endOf('day').toISOString(),
              name: item?.name,
            })
          }>
          <PlayIcon
            size={25}
            style={styles.iconStyle}
            color={backgroundColorNew}
          />
          <Text style={styles.btnText}>Play Journey</Text>
        </TouchableOpacity>
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
    // borderWidth: 1,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 1,
    backgroundColor: '#F7F7F7',
  },
  iconStyle: {marginRight: 5},
  btnText: {
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
  verticalLine: {
    backgroundColor: '#707070',
    width: 1,
    marginHorizontal: 5,
    height: 40,
    alignSelf: 'center',
  },
});
