import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SettingIcon from '../../../assets/SVG/svg/SettingIcon';
import FuelIcon from '../../../assets/SVG/svg/FuelIcon';
import BatteryIcon from '../../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../../assets/SVG/svg/NetworkIcon';
import GeoFencingIcon from '../../../assets/SVG/svg/GeoFencingIcon';
import KeyIcon from '../../../assets/SVG/svg/KeyIcon';
import DamageIcon from '../../../assets/SVG/svg/DamageIcon';
import {backgroundColorNew, titleColor} from '../../Color/color';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import NavigationIcon from '../../../assets/SVG/svg/NavigationIcon';
import MapView, {Marker, Polyline} from 'react-native-maps';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import ToggleIconText from '../../Components/ToggleIconText';
import LocationHistory from '../../../assets/SVG/svg/LocationHistory';
import FuelPumpIcon from '../../../assets/SVG/svg/FuelPumpIcon';
import {useDispatch, useSelector} from 'react-redux';
import useAddress from '../../hooks/useAddress';

const IconWithName = ({title, IconComponent, iconSize, onPress}) => {
  return (
    <TouchableOpacity style={styles.iconView} onPress={onPress}>
      <IconComponent size={iconSize} />
      <Text style={styles.iconText}>{title}</Text>
    </TouchableOpacity>
  );
};

const getLivePositions = wsMessages => {
  return wsMessages
    .flatMap(message => message.positions || [])
    .map(position => ({
      latitude: position.latitude,
      longitude: position.longitude,
    }));
};

const TrackingTruck = ({navigation, route}) => {
  const {deviceId} = route.params;
  // console.log(444, deviceId);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const device = useSelector(state =>
    state.data.wsDevices.find(d => d.id === deviceId),
  );
  const positions = useSelector(state =>
    state.data.wsPositions.filter(p => p.deviceId === deviceId),
  );
  const events = useSelector(state =>
    state.data.wsEvents.filter(e => e.deviceId === deviceId),
  );

  // console.log('positons444444', positions);

  const {wsPositions, wsMessages, wsError, wsDevices, wsConnected} =
    useSelector(state => {
      console.log('Tracking truck', state.data);
      return state.data;
    });

  // useEffect(() => {
  //   const position = getLivePositions(wsMessages);
  //   // console.log(343434343, position);
  //   setLivePositions(position);
  // }, [wsMessages]);
  useEffect(() => {
    if (!wsConnected) {
      setError('Service unavailable. Please try again later.');
      setLoading(false);
    } else {
      const position = getLivePositions(wsMessages);
      setLivePositions(position);
      if (position.length > 0) {
        setLoading(false);
      }
    }
  }, [wsMessages, wsConnected]);

  const handlePress = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const {address, fetchAddress} = useAddress(livePositions);

  // console.log('livepositons22222', livePositions);

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

  return (
    <View style={styles.conatiner}>
      <View style={styles.topContainer}>
        <View style={styles.leftTopContainer}>
          <View style={styles.distanceBox}>
            <Text style={styles.distanceText}>Total distance:</Text>
            <Text style={styles.highlightText}>
              {positions[0]?.attributes?.todayDistance
                ? `${(positions[0]?.attributes?.todayDistance / 1000).toFixed(
                    2,
                  )} KM`
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
              text="Battery"
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
              IconComponent={KeyIcon}
              text="Key"
              iconSize={25}
              color={'#727272'}
              index={4}
              activeIndex={activeIndex}
              onPress={() => handlePress(4)}
            />
            <ToggleIconText
              IconComponent={DamageIcon}
              text="Damage"
              iconSize={25}
              color={'#727272'}
              index={5}
              activeIndex={activeIndex}
              onPress={() => handlePress(5)}
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
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude:
                // livePositions[livePositions.length - 1]?.latitude ||
                positions[positions.length - 1]?.latitude,
              longitude:
                // livePositions[livePositions.length - 1]?.longitude ||
                positions[positions.length - 1]?.longitude,
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
                title="Current Location">
                <BatteryIcon color={'red'} size={30} />
              </Marker>
            )}
          </MapView>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => navigation.navigate('GpsAlert')}>
            <AlertsIcon size={20} />
            <Text style={styles.alertButtonText}>Alerts</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.gpsButton}>
            <GpsIcon size={30} />
          </TouchableOpacity> */}
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
  conatiner: {flex: 1},
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
    // left: 10,
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
    //   borderWidth: 1,
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
