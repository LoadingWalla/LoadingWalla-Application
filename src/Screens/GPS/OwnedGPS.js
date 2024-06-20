import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SettingIcon from '../../../assets/SVG/svg/SettingIcon';
import FuelIcon from '../../../assets/SVG/svg/FuelIcon';
import BatteryIcon from '../../../assets/SVG/svg/BatteryIcon';
import NetworkIcon from '../../../assets/SVG/svg/NetworkIcon';
import GeoFencingIcon from '../../../assets/SVG/svg/GeoFencingIcon';
import KeyIcon from '../../../assets/SVG/svg/KeyIcon';
import DamageIcon from '../../../assets/SVG/svg/DamageIcon';
import {backgroundColorNew} from '../../Color/color';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import NavigationIcon from '../../../assets/SVG/svg/NavigationIcon';
import MapView, {Polyline} from 'react-native-maps';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import ToggleIconText from '../../Components/ToggleIconText';

const OwnedGPS = ({navigation, route}) => {
  const {item} = route.params;
  console.log(444, item);
  const [activeIndex, setActiveIndex] = useState(null);

  const handlePress = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const truckRouteCoordinates = [
    {latitude: 25.0961, longitude: 85.3131},
    {latitude: 25.0971, longitude: 85.3201},
    {latitude: 25.0981, longitude: 85.3251},
  ];

  return (
    <View style={styles.conatiner}>
      <View style={styles.topContainer}>
        <View style={styles.leftTopContainer}>
          <View style={styles.distanceBox}>
            <Text>Today distance:</Text>
            <Text>300 KM</Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.iconBox}>
            <ToggleIconText
              IconComponent={FuelIcon}
              text="Fuel"
              iconSize={30}
              index={0}
              activeIndex={activeIndex}
              onPress={() => handlePress(0)}
            />
            <ToggleIconText
              IconComponent={BatteryIcon}
              text="Battery"
              iconSize={30}
              index={1}
              activeIndex={activeIndex}
              onPress={() => handlePress(1)}
            />
            <ToggleIconText
              IconComponent={NetworkIcon}
              text="Network"
              iconSize={25}
              index={2}
              activeIndex={activeIndex}
              onPress={() => handlePress(2)}
            />
            <ToggleIconText
              IconComponent={GeoFencingIcon}
              text="GeoFencing"
              iconSize={25}
              index={3}
              activeIndex={activeIndex}
              onPress={() => handlePress(3)}
            />
            <ToggleIconText
              IconComponent={KeyIcon}
              text="Key"
              iconSize={25}
              index={4}
              activeIndex={activeIndex}
              onPress={() => handlePress(4)}
            />
            <ToggleIconText
              IconComponent={DamageIcon}
              text="Damage"
              iconSize={25}
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
          <Text>DEL 0212 DP1</Text>
          <View style={styles.verticalLine} />
          <Text>Current Location: Jamshedpur, Jharkhand</Text>
        </View>
        <View style={styles.mapView}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: 25.0961,
              longitude: 85.3131,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}>
            <Polyline
              coordinates={truckRouteCoordinates}
              strokeColor="#000"
              strokeWidth={6}
            />
          </MapView>
          <TouchableOpacity style={styles.alertButton}>
            <AlertsIcon size={20} />
            <Text style={styles.alertButtonText}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gpsButton}>
            <NavigationIcon size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollBox}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
              padding: 5,
            }}>
            <NavigationIcon size={30} />
            <Text>Navigate</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity style={styles.btnContainer}>
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

export default OwnedGPS;

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
    left: 10,
    paddingVertical: 10,
  },
  gpsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    position: 'absolute',
    bottom: 100,
    right: 10,
  },
  alertButtonText: {marginLeft: 10, textAlign: 'center', fontSize: 16},
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
  distanceBox: {
    minWidth: '70%',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
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
});
