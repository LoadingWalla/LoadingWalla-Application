import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {AnimatedRegion, Marker, Circle} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import Slider from '@react-native-community/slider';
import GpsIcon2 from '../../../assets/SVG/svg/GpsIcon2';
import Button from '../../Components/Button';
import {backgroundColorNew, PrivacyPolicy} from '../../Color/color';
import {
  addGeofenceRequest,
  clearGeofenceAddedData,
} from '../../Store/Actions/Actions';
import AlertBox from '../../Components/AlertBox';
import SettingIcon from '../../../assets/SVG/svg/SettingIcon';
import TruckNavigationIcon from '../../../assets/SVG/svg/TruckNavigationIcon';
import styles from './style'
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const getLivePositions = (wsMessages, deviceId) => {
  return wsMessages
    .flatMap(message => message.positions || [])
    .filter(position => position.deviceId === deviceId)
    .map(({deviceId, latitude, longitude, course}) => ({
      deviceId,
      latitude,
      longitude,
      course,
    }));
};

const AddGeozone = ({navigation, route}) => {
  useTrackScreenTime('AddGeozones');
  const {deviceId, lat, lon, address} = route.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [livePositions, setLivePositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderValue, setSliderValue] = useState(0.5);
  const [geozoneName, setGeozoneName] = useState('');

  const {wsMessages, wsConnected} = useSelector(state => state.wsData);
  const {addGeofenceStatus} = useSelector(state => state.data);

  useEffect(() => {
    if (wsConnected) {
      const position = getLivePositions(wsMessages, deviceId);
      setLivePositions(position);

      if (position.length > 0) {
        setLoading(false);
        updateMarkerPosition(position[position.length - 1]);
      }
    } else {
      setLoading(false);
    }
  }, [wsMessages, wsConnected]);

  const animatedMarkerPosition = useRef(
    new AnimatedRegion({
      latitude: livePositions.length > 0 ? livePositions[0].latitude : lat || 0,
      longitude:
        livePositions.length > 0 ? livePositions[0].longitude : lon || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
  ).current;

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

  const handleSave = () => {
    if (!geozoneName.trim()) {
      AlertBox(t(Constants.ADD_GEO_NAME));
      return;
    }
    dispatch(
      addGeofenceRequest(
        `CIRCLE (${lat} ${lon}, ${sliderValue * 5000})`,
        deviceId,
        geozoneName,
      ),
    );
  };

  useEffect(() => {
    if (addGeofenceStatus !== null) {
      if (addGeofenceStatus === 200) {
        AlertBox(t(Constants.GEO_ADD_SUC));
        navigation.navigate('geozones', {deviceId, lat, lon});
        setGeozoneName('');
        setSliderValue(0.5);
        dispatch(clearGeofenceAddedData());
      } else {
        AlertBox(t(Constants.GEO_ADD_ERR));
        dispatch(clearGeofenceAddedData());
      }
    }
  }, [addGeofenceStatus]);

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
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={backgroundColorNew} />
          </View>
        ) : (
          <MapView
            ref={mapRef}
            style={styles.geozoneAbsFillObj} 
            initialRegion={{
              latitude:
                livePositions.length > 0 ? livePositions[0].latitude : lat || 0,
              longitude:
                livePositions.length > 0
                  ? livePositions[0].longitude
                  : lon || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {livePositions.length > 0 && (
              <>
                <Marker.Animated coordinate={animatedMarkerPosition}>
                  {/* <ActiveLocation size={40} course={50} /> */}
                  <TruckNavigationIcon size={40} />
                </Marker.Animated>
                <Circle
                  center={livePositions[livePositions.length - 1]}
                  radius={sliderValue * 5000}
                  fillColor="rgba(135,206,250,0.3)"
                  strokeColor={backgroundColorNew}
                  strokeWidth={1}
                />
              </>
            )}
          </MapView>
        )}
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={animateToDevicePosition}>
          <GpsIcon2 size={20} />
        </TouchableOpacity>

        <View style={styles.speedDistanceBox}>
          <View style={styles.infoColumn}>
            <Text style={styles.addGeozoneBoldText}>{address}</Text>
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={() =>
                navigation.navigate('geozones', {deviceId, lat, lon})
              }>
              <Text style={styles.btnText2}>{t(Constants.GEO)}</Text>
              <SettingIcon
                size={15}
                color={backgroundColorNew}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.geozoneContainer}>
          <Text style={styles.geozoneText}>{t(Constants.GEO_RADIUS)}</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={sliderValue}
              onValueChange={setSliderValue}
              minimumTrackTintColor={backgroundColorNew}
              maximumTrackTintColor={PrivacyPolicy}
              thumbImage={require('../../../assets/slider1.png')}
              // thumbTintColor={backgroundColorNew}
            />
            <Text style={styles.textvalue}>
              {((sliderValue * 5000) / 1000).toFixed(1)} KM
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{t(Constants.GEO_NAME)}</Text>
            <TextInput
              placeholder={t(Constants.GEO_NAME)}
              placeholderTextColor="#8A8A8A"
              style={styles.textInput}
              value={geozoneName}
              onChangeText={setGeozoneName}
            />
          </View>
        </View>

        <Button
          title={t(Constants.SAVE)}
          onPress={handleSave}
          textStyle={styles.btnText}
          style={styles.addGeozoneBtnStyle}
        />
      </View>
    </View>
  );
};

export default AddGeozone;
