import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {backgroundColorNew, titleColor} from '../../Color/color';
import ToggleIconText from '../../Components/ToggleIconText';
import MapView, {AnimatedRegion, Marker, Polyline} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import useAddress from '../../hooks/useAddress';
import KeyIcon from '../../../assets/SVG/svg/KeyIcon';
import BatteryIcon from '../../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../../assets/SVG/svg/NetworkIcon';
import GeoFencingIcon from '../../../assets/SVG/svg/GeoFencingIcon';
import AlertIcon from '../../../assets/SVG/AlertIcon';
import FuelIcon from '../../../assets/SVG/svg/FuelIcon';
import SettingIcon from '../../../assets/SVG/svg/SettingIcon';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import NavigationIcon from '../../../assets/SVG/svg/NavigationIcon';
import LocationHistory from '../../../assets/SVG/svg/LocationHistory';
import FuelPumpIcon from '../../../assets/SVG/svg/FuelPumpIcon';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import IconWithName from '../../Components/IconWithName';
import TruckNavigationIcon from '../../../assets/SVG/svg/TruckNavigationIcon';
import AnimatedText from '../../Components/AnimatedText';

const getLivePositions = (wsMessages, deviceId) => {
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

const TrackingTruck = ({navigation, route}) => {
  const {deviceId, lat, long} = route.params;
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addressFetched, setAddressFetched] = useState(false);

  const {wsMessages, wsConnected, wsDevices, wsPositions, wsEvents} =
    useSelector(state => state.data);

  const device = wsDevices.find(d => d.id === deviceId);
  const positions = wsPositions.filter(p => p.deviceId === deviceId);
  const events = wsEvents.filter(e => e.deviceId === deviceId);

  useEffect(() => {
    if (!wsConnected) {
      setLoading(false);
    } else {
      const position = getLivePositions(wsMessages, deviceId);
      setLivePositions(position);
      // console.log(444444, position);

      if (position.length > 0) {
        setLoading(false);
        animateToPosition(position[position.length - 1]);
      } else {
        setLoading(false);
      }
    }
  }, [wsMessages, wsConnected]);

  const animateToPosition = position => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      animatedMarkerPosition
        .timing({
          latitude: position.latitude,
          longitude: position.longitude,
          duration: 1000,
          useNativeDriver: false,
        })
        .start();
    }
  };

  const animatedMarkerPosition = useRef(
    new AnimatedRegion({
      latitude: lat || 0,
      longitude: long || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
  ).current;

  const handlePress = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const {address, fetchAddress, gpsAddressLoading} = useAddress(livePositions);

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

  const handleFetchAddress = () => {
    setAddressFetched(false);
    fetchAddress();
    setAddressFetched(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftTopContainer}>
          <View style={styles.distanceBox}>
            <Text style={styles.distanceText}>Distance:</Text>
            <Text style={styles.highlightText}>
              {positions[0]?.attributes?.distance
                ? `${(positions[0]?.attributes?.distance).toFixed(3)} KM`
                : '0 KM'}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.iconBox}>
            <ToggleIconText
              IconComponent={FuelIcon}
              text="Fuel"
              iconSize={30}
              color={'#727272'}
              index={0}
              activeIndex={activeIndex}
              onPress={() => handlePress(0)}
            />
            <ToggleIconText
              IconComponent={BatteryIcon}
              text={positions[0]?.attributes?.batteryLevel || 'Battery'}
              iconSize={25}
              color={
                positions[0]?.attributes?.batteryLevel
                  ? positions[0]?.attributes?.batteryLevel > 60
                    ? 'green'
                    : 'red'
                  : '#727272'
              }
              index={1}
              activeIndex={activeIndex}
              onPress={() => handlePress(1)}
            />
            <ToggleIconText
              IconComponent={NetworkIcon}
              text="Network"
              iconSize={23}
              color={'#727272'}
              index={2}
              activeIndex={activeIndex}
              onPress={() => handlePress(2)}
            />
            <ToggleIconText
              IconComponent={GeoFencingIcon}
              text="GeoFencing"
              iconSize={28}
              color={'#727272'}
              index={3}
              activeIndex={activeIndex}
              onPress={() => handlePress(3)}
            />
            <ToggleIconText
              IconComponent={KeyIcon}
              text={
                positions?.[0]?.attributes?.ignition ||
                positions?.[0]?.attributes?.motion
                  ? 'ON'
                  : 'OFF'
              }
              iconSize={23}
              color={
                positions?.[0]?.attributes?.ignition ||
                positions?.[0]?.attributes?.motion
                  ? 'green'
                  : 'red'
              }
              index={4}
              activeIndex={activeIndex}
              onPress={() => handlePress(4)}
            />

            <ToggleIconText
              IconComponent={AlertIcon}
              text="Damage"
              iconSize={27}
              color={'#727272'}
              index={5}
              activeIndex={activeIndex}
              onPress={() => handlePress(5)}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('GpsSetting', {deviceId})}>
          <SettingIcon size={30} color={backgroundColorNew} />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <View style={styles.mapHeader}>
          <Text style={styles.fetchedAddressText}>{device?.name}</Text>
          <View style={styles.verticalLine} />
          <TouchableOpacity onPress={handleFetchAddress}>
            {gpsAddressLoading ? (
              <ActivityIndicator size="small" color={backgroundColorNew} />
            ) : (
              <AnimatedText
                text={address}
                style={[
                  styles.addressText,
                  addressFetched && styles.fetchedAddressText,
                ]}
                showAnimation={true}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.mapView}>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={backgroundColorNew} />
            </View>
          ) : (
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              initialRegion={{
                latitude: lat || livePositions[0]?.latitude || 0,
                longitude: long || livePositions[0]?.longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {positions[0]?.attributes?.motion && (
                <Polyline
                  coordinates={livePositions}
                  strokeColor="#000"
                  strokeWidth={6}
                />
              )}
              {livePositions.length > 0 && (
                <Marker.Animated
                  coordinate={animatedMarkerPosition}
                  // title={'Speed'}
                  // description={
                  //   positions[0]?.speed
                  //     ? `${(positions[0]?.speed * 1.852).toFixed(2)} km/h`
                  //     : '0 km/h'
                  // }
                  rotation={
                    livePositions[livePositions.length - 1].course || 0
                  }>
                  <TruckNavigationIcon
                    width={50}
                    height={50}
                    // style={{
                    //   transform: [
                    //     {
                    //       rotate: `${
                    //         livePositions[livePositions.length - 1].course || 0
                    //       }deg`,
                    //     },
                    //   ],
                    // }}
                  />
                </Marker.Animated>
              )}
            </MapView>
          )}
          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => navigation.navigate('GpsAlert')}>
            <AlertsIcon size={20} />
            <Text style={styles.alertButtonText}>Alerts</Text>
          </TouchableOpacity>
          <View
            style={styles.alertButton}
            onPress={() => navigation.navigate('GpsAlert')}>
            <AlertsIcon size={20} />
            <Text style={styles.alertButtonText}>Alerts</Text>
          </View>
        </View>
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
                name: device?.name,
              })
            }
          />
          <IconWithName
            IconComponent={FuelPumpIcon}
            iconSize={30}
            title={'Fuel Pump'}
            onPress={() =>
              navigation.navigate('FuelPump', {
                headerTitle: 'Fuel Pump',
                theft: false,
              })
            }
          />
          <IconWithName
            IconComponent={FuelPumpIcon}
            iconSize={30}
            title={'Theft'}
            onPress={() =>
              navigation.navigate('FuelPump', {
                headerTitle: 'Nearby Police Station',
                theft: true,
              })
            }
          />
        </ScrollView>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => navigation.navigate('PlayJourney', {deviceId})}>
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

export default TrackingTruck;

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
    right: 10,
    paddingVertical: 10,
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
    marginTop: 10,
  },
  leftTopContainer: {minWidth: '70%', paddingHorizontal: 5},
  mapContainer: {flex: 1},
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
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
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Italic',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  fetchedAddressText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    textTransform: 'uppercase',
    textDecorationLine: 'none',
    fontSize: 14,
    minWidth: 60,
    textAlign: 'center',
  },
});
