import React, {useRef, useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, Callout, Polyline} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAddressRequest} from '../../Store/Actions/Actions';
import moment from 'moment';
import ActiveLocation from '../../../assets/SVG/svg/ActiveLocation';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import {backgroundColorNew} from '../../Color/color';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import TruckNavigationIcon from '../../../assets/SVG/svg/TruckNavigationIcon';
import {useFocusEffect} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapComponent = ({
  initialRegion,
  item,
  positions,
  navigation,
  routeData,
}) => {
  console.log(
    11111,
    'MapComponent--->',
    initialRegion,
    item,
    positions,
    routeData,
  );

  const [mapType, setMapType] = useState('standard');
  const [previousPosition, setPreviousPosition] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [polylineReady, setPolylineReady] = useState(false);
  const mapRef = useRef();
  const markerRef = useRef();
  const dispatch = useDispatch();

  const fullAddressData = useSelector(state => state.data.fullAddressData);

  const initialMapRegion = useMemo(
    () => ({
      ...initialRegion,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    [initialRegion],
  );

  const handleMapLayout = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.showCallout();
    }
  }, []);

  const toggleMapType = useCallback(() => {
    setMapType(prevType =>
      prevType === 'standard' ? 'satellite' : 'standard',
    );
  }, []);

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
        mapRef.current?.animateToRegion(
          {
            latitude: lastPosition.latitude,
            longitude: lastPosition.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          1000,
        );

        // Move the marker smoothly
        markerRef.current?.animateMarkerToCoordinate(
          {
            latitude: lastPosition.latitude,
            longitude: lastPosition.longitude,
          },
          1000,
        );

        // Delay drawing the polyline until marker has moved
        setTimeout(() => setPolylineReady(true), 1000);
      }

      // Hide loader after everything is rendered
      // setLoading(false);
    }
  }, [positions, previousPosition, dispatch]);

  // Combine positions and routeData
  // console.log(333333, routeData);
  const combinedRouteData = useMemo(() => {
    const routeDataCoords = routeData.map(({latitude, longitude}) => ({
      latitude,
      longitude,
    }));
    const positionCoords = positions.map(({latitude, longitude}) => ({
      latitude,
      longitude,
    }));
    return [...routeDataCoords, ...positionCoords];
  }, [routeData, positions]);

  const renderMarkers = useMemo(() => {
    return positions.map((position, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: position.latitude,
          longitude: position.longitude,
        }}
        ref={markerRef}>
        <ActiveLocation size={40} course={50} />
        {/* <TruckNavigationIcon size={30} /> */}
        <Callout tooltip>
          <View style={styles.calloutView}>
            <Text style={styles.calloutText}>
              {fullAddressData === null ? item?.address : fullAddressData}
            </Text>
          </View>
        </Callout>
      </Marker>
    ));
  }, [positions, fullAddressData, item]);

  return (
    <View style={styles.mapContainer}>
      {/* {loading && (
        <ActivityIndicator
          size="large"
          color={backgroundColorNew}
          style={styles.loader}
        />
      )} */}

      <MapView
        ref={mapRef}
        mapType={mapType}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialMapRegion}
        onLayout={handleMapLayout}>
        <>
          {renderMarkers}
          {polylineReady && (
            <Polyline
              coordinates={combinedRouteData}
              strokeColor="blue"
              strokeWidth={3}
            />
          )}
        </>
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

      <TouchableOpacity
        style={styles.alertButton}
        onPress={() => navigation.navigate('GpsAlert', {deviceId: item?.id})}>
        <AlertsIcon size={25} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.gpsButton} onPress={() => {}}>
        <GpsIcon2 size={25} />
      </TouchableOpacity> */}

      <View style={styles.speedDistanceBox}>
        <View style={styles.infoBox}>
          <View style={styles.infoColumn}>
            <Text style={styles.boldText}>{`${(item?.distance / 1000).toFixed(
              2,
            )} KM`}</Text>
            <Text style={styles.labelText}>Today distance</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.infoColumn}>
            <Text style={styles.boldText}>
              {`${Math.floor(
                (positions[0]?.speed || item?.position[0]?.speed) * 1.852,
              )} KMPH`}
            </Text>
            <Text style={styles.labelText}>Vehicle Speed</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() =>
            navigation.navigate('PlayJourney', {
              deviceId: item?.id,
              from: moment().utc().startOf('day').toISOString(),
              to: moment().utc().endOf('day').toISOString(),
              // from: moment().utcOffset(330).startOf('day').toISOString(),
              // to: moment().utcOffset(330).endOf('day').toISOString(),
              name: item?.name,
              item,
            })
          }>
          <PlayIcon
            size={25}
            color={backgroundColorNew}
            style={styles.iconStyle}
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
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 100,
    transform: [{translateX: -25}, {translateY: -25}],
  },
  mapToggleButton: {
    position: 'absolute',
    top: 80,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
    zIndex: 99,
  },
  alertButton: {
    position: 'absolute',
    top: 130,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
    zIndex: 99,
    padding: 5,
  },
  gpsButton: {
    position: 'absolute',
    top: 170,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
    zIndex: 99,
    padding: 5,
  },
  speedDistanceBox: {
    position: 'absolute',
    top: 10,
    backgroundColor: '#ffffff',
    elevation: 3,
    zIndex: 99,
    borderRadius: 8,
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calloutView: {
    width: 300,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(1, 1, 0, 0.5)',
    borderColor: '#707070',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-SemiBoldItalic',
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
  infoBox: {flexDirection: 'row', alignItems: 'center'},
  infoColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  boldText: {fontFamily: 'PlusJakartaSans-ExtraBold', fontSize: 12},
  labelText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 8,
    color: '#434343',
  },
});
