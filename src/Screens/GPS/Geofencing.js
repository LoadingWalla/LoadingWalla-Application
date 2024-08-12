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
import {backgroundColorNew, textColor, titleColor} from '../../Color/color';
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
import TheftIcon from '../../../assets/SVG/svg/TheftIcon';
import Button from '../../Components/Button';

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

const Geofencing = ({navigation, route}) => {
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
      <View style={styles.mapContainer}>
        <View style={styles.mapHeader}>
          {device?.name && (
            <>
              <Text style={styles.fetchedAddressText}>{device?.name}</Text>
              <View style={styles.verticalLine} />
            </>
          )}
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
              mapType="standard" // Change to "satellite", "hybrid", "standard" or "terrain" as needed
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
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View></View>
        <Button
          title="Save"
          onPress={() => {}}
          textStyle={styles.btnText}
          style={styles.btnStyle}
        />
      </View>
    </View>
  );
};

export default Geofencing;

const styles = StyleSheet.create({
  container: {flex: 1},
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
  gpsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    position: 'absolute',
    bottom: 150,
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
    // borderWidth: 1,
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
    flexDirection: 'column',
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
    width: '100%',
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
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: '100%',
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
