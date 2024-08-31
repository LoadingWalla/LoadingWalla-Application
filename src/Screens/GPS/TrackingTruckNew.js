import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {backgroundColorNew, titleColor} from '../../Color/color';
import {AnimatedRegion} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import NavigationIcon from '../../../assets/SVG/svg/NavigationIcon';
import LocationHistory from '../../../assets/SVG/svg/LocationHistory';
import FuelPumpIcon from '../../../assets/SVG/svg/FuelPumpIcon';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import IconWithName from '../../Components/IconWithName';
import TheftIcon from '../../../assets/SVG/svg/TheftIcon';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import {
  fetchAddressFailure,
  fetchAddressRequest,
  fetchPositionsRequest,
  gpsRelayFailure,
  gpsRelayRequest,
} from '../../Store/Actions/Actions';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import RelayIcon from '../../../assets/SVG/svg/RelayIcon';
import MapComponent from './MapComponent';

const getLivePositions = (wsMessages, deviceId) => {
  console.log(
    '------------------>>>>',
    wsMessages
      .flatMap(message => message.positions || [])
      .filter(position => position.deviceId === deviceId)
      .map(position => ({
        deviceId: position.deviceId,
        latitude: position.latitude,
        longitude: position.longitude,
        course: position.course,
      })),
  );

  return wsMessages
    .flatMap(message => message.positions || [])
    .filter(position => position.deviceId === deviceId)
    .map(position => ({
      deviceId: position.deviceId,
      latitude: position.latitude,
      longitude: position.longitude,
      course: position.course,
    }));
};

const TrackingTruckNew = ({navigation, route}) => {
  const {item, name, lat, long, deviceId} = route.params;
  console.log(8888888888888, route);

  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    fullAddressData,
    fullAddressLoading,
    gpsReplayData,
    gpsTokenData,
    gpsRelayData,
  } = useSelector(state => {
    console.log('Tracking Truck -------------->>>>>', state.data);
    return state.data;
  });

  const {wsMessages, wsConnected, wsDevices, wsPositions, wsEvents} =
    useSelector(state => state.wsData);

  const device = wsDevices.find(d => d.id === item?.id);
  const positions = wsPositions.filter(p => p.deviceId === item?.id);
  const events = wsEvents.filter(e => e.deviceId === item?.id);
  // console.log(999999999, positions);

  const animatedMarkerPosition = useRef(
    new AnimatedRegion({
      latitude:
        item?.position[0]?.latitude || gpsReplayData?.[0]?.latitude || 0,
      longitude:
        item?.position[0]?.longitude || gpsReplayData?.[0]?.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
  ).current;

  const fetchPositions = useCallback(() => {
    if (gpsTokenData && item?.id) {
      const defaultFrom = moment().utc().startOf('day').toISOString();
      const defaultTo = moment().utc().endOf('day').toISOString();
      dispatch(
        fetchPositionsRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          item?.id,
          defaultFrom,
          defaultTo,
        ),
      );
    }
  }, [dispatch, gpsTokenData, item]);

  useFocusEffect(
    useCallback(() => {
      fetchPositions();
    }, [fetchPositions]),
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(gpsRelayRequest(item?.id));
      return () => {
        dispatch(fetchAddressFailure());
      };
    }, []),
  );

  useEffect(() => {
    if (device?.name) {
      navigation.setOptions({
        title: name,
      });
    }
  }, [device, navigation]);

  const handleTruckIconPress = () => {
    if (livePositions.length > 0) {
      // console.log('Live positions:', livePositions);
      dispatch(
        fetchAddressRequest(
          livePositions[livePositions.length - 1].latitude,
          livePositions[livePositions.length - 1].longitude,
        ),
      );
      if (markerRef.current) {
        markerRef.current.showCallout();
      }
    } else {
      console.log('No live positions available to fetch the address.');
    }
  };

  useEffect(() => {
    // console.log('Live positions:', livePositions);
  }, [livePositions]);

  useEffect(() => {
    if (gpsReplayData && gpsReplayData.length > 0) {
      const replayPositions = gpsReplayData.map(position => ({
        latitude: position.latitude,
        longitude: position.longitude,
        deviceId: position.deviceId,
        timeStamps: position.serverTime,
        // totalDistance: position.attributes.totalDistance,
      }));
      setLivePositions(replayPositions);
      setLoading(false);
      if (replayPositions.length > 0) {
        animatedMarkerPosition.setValue({
          latitude: replayPositions[replayPositions.length - 1].latitude,
          longitude: replayPositions[replayPositions.length - 1].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    }
  }, [gpsReplayData]);

  useEffect(() => {
    if (wsConnected) {
      const position = getLivePositions(wsMessages, item?.id);
      if (position.length > 0) {
        setLivePositions(prevPositions => [
          ...prevPositions,
          ...position.map(p => {
            console.log('>>>>>>>>>>liveposition single -------------->', p);
            return {
              latitude: p.latitude,
              longitude: p.longitude,
              course: p.course,
              deviceId: p.id,
            };
          }),
        ]);
        updateMarkerPosition(position[position.length - 1]);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [wsMessages, wsConnected]);

  const updateMarkerPosition = position => {
    animatedMarkerPosition
      .timing({
        latitude: position.latitude,
        longitude: position.longitude,
        duration: 1000,
        useNativeDriver: false,
      })
      .start();
  };

  const handlePress = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleNavigate = () => {
    const destination =
      livePositions[livePositions.length - 1] ||
      positions[positions.length - 1];
    if (destination) {
      const url = `google.navigation:q=${destination.latitude},${destination.longitude}`;
      Linking.openURL(url).catch(err =>
        console.error('Error opening Google Maps', err),
      );
    }
  };

  const animateToDevicePosition = () => {
    if (livePositions.length > 0 && mapRef.current) {
      const latestPosition = livePositions[livePositions.length - 1];
      mapRef.current.animateToRegion({
        latitude: latestPosition.latitude,
        longitude: latestPosition.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapComponent
          positions={livePositions}
          loading={loading}
          fullAddressLoading={fullAddressLoading}
          fullAddressData={fullAddressData}
          animateToDevicePosition={animateToDevicePosition}
          animatedMarkerPosition={animatedMarkerPosition}
          mapRef={mapRef}
          markerRef={markerRef}
          handleTruckIconPress={handleTruckIconPress}
          currentAddress={item.address}
        />
        <TouchableOpacity
          style={styles.alertButton}
          onPress={() => navigation.navigate('GpsAlert')}>
          <AlertsIcon size={20} />
          <Text style={styles.alertButtonText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={animateToDevicePosition}>
          <GpsIcon2 size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollBox}>
          <IconWithName
            IconComponent={NavigationIcon}
            iconSize={30}
            title={'Navigate'}
            onPress={handleNavigate}
          />
          <IconWithName
            IconComponent={LocationHistory}
            iconSize={30}
            title={'History'}
            onPress={() =>
              navigation.navigate('LocationHistory', {
                deviceId: deviceId,
                name: name,
                from: moment().utc().startOf('day').toISOString(),
                to: moment().utc().endOf('day').toISOString(),
              })
            }
          />
          <IconWithName
            IconComponent={RelayIcon}
            iconSize={30}
            title={'Relay'}
            dynamicTitle={gpsRelayData?.relay ? '(ON)' : '(OFF)'}
            dynamicTitleColor={gpsRelayData?.relay ? 'green' : 'red'}
            onPress={() => {
              navigation.navigate('GpsRelay', {
                deviceId: item?.id,
                item: item,
                gpsRelayData,
              });
              dispatch(gpsRelayFailure());
            }}
          />
          <IconWithName
            IconComponent={FuelPumpIcon}
            iconSize={25}
            title={'Fuel Pump'}
            onPress={() =>
              navigation.navigate('FuelPump', {
                headerTitle: 'Fuel Pump',
                theft: false,
                latitude: livePositions[livePositions.length - 1].latitude,
                longitude: livePositions[livePositions.length - 1].longitude,
              })
            }
          />
          <IconWithName
            IconComponent={TheftIcon}
            iconSize={25}
            title={'Theft'}
            onPress={() =>
              navigation.navigate('FuelPump', {
                headerTitle: 'Nearby Police Station',
                theft: true,
                latitude: livePositions[livePositions.length - 1].latitude,
                longitude: livePositions[livePositions.length - 1].longitude,
              })
            }
          />
        </ScrollView>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() =>
              navigation.navigate('PlayJourney', {deviceId: item?.id})
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
    </View>
  );
};

export default TrackingTruckNew;

const styles = StyleSheet.create({
  container: {flex: 1},
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 5},
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
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 10,
    height: '100%',
  },
  alertButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    position: 'absolute',
    bottom: 100,
    left: 10,
    paddingVertical: 10,
  },
  speedButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
  },
  speedText: {
    textAlign: 'center',
    fontSize: 18,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  speedUnit: {
    textAlign: 'center',
    fontSize: 10,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  gpsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    position: 'absolute',
    bottom: 100,
    right: 10,
  },
  geofencingButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 120,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    position: 'absolute',
    bottom: 100,
    right: 10,
    paddingVertical: 10,
  },
  geofencingButtonText: {
    marginRight: 8,
    textAlign: 'center',
    fontSize: 12,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: -10,
  },
  leftTopContainer: {minWidth: '70%', paddingHorizontal: 5},
  mapContainer: {flex: 1},
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    minHeight: 35,
  },
  mapView: {flex: 1, width: '100%', height: '100%'},
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scrollBox: {marginRight: 10, borderRadius: 10},
  highlightText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    textAlign: 'left',
  },
  alertButtonText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  distanceBox: {
    minWidth: '70%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textAlign: 'right',
    marginRight: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBoldItalic',
    color: '#FFFFFF',
    // textDecorationLine: 'underline',
  },
  fetchedAddressText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    textTransform: 'uppercase',
    textDecorationLine: 'none',
    fontSize: 12,
    textAlign: 'center',
  },
  mapToggleButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    elevation: 3,
  },
  settingsButton: {
    backgroundColor: '#f8f8f8',
    padding: 8,
    borderRadius: 50,
    elevation: 5,
    shadowOffset: {x: 10, y: 20},
    shadowColor: backgroundColorNew,
  },

  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  addressContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    elevation: 5,
    backgroundColor: 'rgba(1, 1, 0, 0.7)',
    maxWidth: 300,
  },
  truckIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowBottom: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(1, 1, 0, 0.7)',
    transform: [{rotate: '180deg'}],
    alignSelf: 'center',
  },
});
