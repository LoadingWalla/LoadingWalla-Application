import {
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
import MapView, {Marker, Polyline} from 'react-native-maps';
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

const IconWithName = ({title, IconComponent, iconSize, onPress}) => (
  <TouchableOpacity style={styles.iconView} onPress={onPress}>
    <IconComponent size={iconSize} />
    <Text style={styles.iconText}>{title}</Text>
  </TouchableOpacity>
);

const getLivePositions = (wsMessages, deviceId) => {
  // console.log(11111, wsMessages);

  return wsMessages
    .flatMap(message => message.positions || [])
    .filter(position => position.deviceId === deviceId)
    .map(position => ({
      deviceId: position.deviceId,
      latitude: position.latitude,
      longitude: position.longitude,
    }));
};

const TrackingTruck = ({navigation, route}) => {
  // console.log(55555, route.params);
  const {deviceId, lat, long} = route.params;
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    wsMessages,
    wsConnected,
    gpsTokenData,
    wsDevices,
    wsPositions,
    wsEvents,
  } = useSelector(state => state.data);

  const device = wsDevices.find(d => d.id === deviceId);
  const positions = wsPositions.filter(p => p.deviceId === deviceId);
  const events = wsEvents.filter(e => e.deviceId === deviceId);

  useEffect(() => {
    if (!wsConnected) {
      setError('Service unavailable. Please try again later.');
      setLoading(false);
    } else {
      const position = getLivePositions(wsMessages, deviceId);
      setLivePositions(position);
      if (position.length > 0) {
        setLoading(false);
        animateToPosition(position[position.length - 1]);
      }
    }
  }, [wsMessages, wsConnected]);

  const animateToPosition = position => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handlePress = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const {address, fetchAddress} = useAddress(livePositions);

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

  console.log(66666666, livePositions);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.leftTopContainer}>
          <View style={styles.distanceBox}>
            <Text style={styles.distanceText}>Today distance:</Text>
            <Text style={styles.highlightText}>
              {positions[0]?.attributes?.distance
                ? `${positions[0]?.attributes?.distance} KM`
                : '0 KM'}
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.iconBox}>
            <ToggleIconText
              IconComponent={KeyIcon}
              text={
                positions?.[0]?.attributes?.ignition ||
                positions?.[0]?.attributes?.motion
                  ? 'ON'
                  : 'OFF'
              }
              iconSize={25}
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
              IconComponent={BatteryIcon}
              text={positions[0]?.attributes?.batteryLevel || 'Battery'}
              iconSize={30}
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
              iconSize={25}
              color={'#727272'}
              index={2}
              activeIndex={activeIndex}
              onPress={() => handlePress(2)}
            />
            <ToggleIconText
              IconComponent={GeoFencingIcon}
              text="GeoFencing"
              iconSize={25}
              color={'#727272'}
              index={3}
              activeIndex={activeIndex}
              onPress={() => handlePress(3)}
            />
            <ToggleIconText
              IconComponent={AlertIcon}
              text="Damage"
              iconSize={25}
              color={'#727272'}
              index={5}
              activeIndex={activeIndex}
              onPress={() => handlePress(5)}
            />
            <ToggleIconText
              IconComponent={FuelIcon}
              text="Fuel"
              iconSize={30}
              color={'#727272'}
              index={0}
              activeIndex={activeIndex}
              onPress={() => handlePress(0)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('GpsSetting')}>
          <SettingIcon size={30} color={backgroundColorNew} />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <View style={styles.mapHeader}>
          <Text>{device?.name}</Text>
          <View style={styles.verticalLine} />
          <TouchableOpacity onPress={fetchAddress}>
            <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
              {address}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mapView}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            {positions[0]?.attributes?.motion && (
              <Polyline
                coordinates={livePositions}
                strokeColor="#000"
                strokeWidth={6}
              />
            )}
            {livePositions.length > 0 && (
              <Marker
                coordinate={livePositions[livePositions.length - 1]}
                pinColor="red"
              />
            )}
          </MapView>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => navigation.navigate('GpsAlert')}>
            <AlertsIcon size={20} />
            <Text style={styles.alertButtonText}>Alerts</Text>
          </TouchableOpacity>
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
              navigation.navigate('FuelPump', {headerTitle: 'Fuel Pump'})
            }
          />
          <IconWithName
            IconComponent={FuelPumpIcon}
            iconSize={30}
            title={'Theft'}
            onPress={() =>
              navigation.navigate('FuelPump', {
                headerTitle: 'Nearby Police Station',
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
    padding: 10,
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
  iconView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  iconText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
