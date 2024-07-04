import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {backgroundColorNew, titleColor} from '../../Color/color';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import Slider from '@react-native-community/slider';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import GpsIcon from '../../../assets/SVG/svg/GpsIcon';
import {fetchPositionsRequest} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import PauseIcon from '../../../assets/SVG/svg/PauseIcon';
import BatteryIcon from '../../../assets/SVG/svg/BatteryIcon';
import CalendarIcon from '../../../assets/SVG/CalendarIcon';

export default function PlayJourney({navigation, route}) {
  const {deviceId, from, to} = route.params;
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const dispatch = useDispatch();
  const {gpsTokenData, gpsReplayLoading, gpsReplayError, gpsReplayData} =
    useSelector(state => state.data);

  const coordinates = useMemo(
    () =>
      gpsReplayData?.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
      })),
    [gpsReplayData],
  );

  const initialRegion = useMemo(
    () =>
      coordinates?.length > 0
        ? {
            latitude: coordinates[0].latitude,
            longitude: coordinates[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        : null,
    [coordinates],
  );

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const changePlaybackSpeed = speed => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      togglePlayback();
      togglePlayback();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const defaultFrom = from || moment().utc().startOf('day').toISOString();
      const defaultTo = to || moment().utc().endOf('day').toISOString();
      dispatch(
        fetchPositionsRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
        ),
      );
    }, [dispatch, from, to, deviceId, gpsTokenData]),
  );

  useEffect(() => {
    let interval = null;
    if (isPlaying && currentIndex < coordinates?.length) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          setCurrentPosition(coordinates[newIndex]);
          setSliderValue(newIndex / (coordinates.length - 1));
          return newIndex;
        });
      }, 1000 / playbackSpeed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, coordinates, playbackSpeed]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Stop</Text>
          <Text style={styles.stopCount}>02</Text>
        </View>
        <View style={styles.verticalLine} />
        <Text style={styles.addressText}>
          Road number - C/33, Gali number 03, new Ashok Nagar, demo address for
          length, Delhi - 110030
        </Text>
        <View>
          <TouchableOpacity
            style={styles.calendarIconBox}
            onPress={() =>
              navigation.navigate('quickfilters', {
                deviceId,
                navigationPath: 'PlayJourney',
              })
            }>
            <CalendarIcon size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mapContainer}>
        {gpsReplayLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={backgroundColorNew} />
          </View>
        ) : (
          <View style={styles.mapView}>
            {initialRegion && (
              <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={initialRegion}>
                <Polyline
                  coordinates={coordinates}
                  strokeColor="#000"
                  strokeWidth={6}
                />
                {currentPosition && (
                  <Marker
                    coordinate={{
                      latitude: currentPosition.latitude,
                      longitude: currentPosition.longitude,
                    }}
                    title={`Current Position`}
                    description={`Lat: ${currentPosition.latitude}, Lon: ${currentPosition.longitude}`}>
                    <BatteryIcon size={20} fill={backgroundColorNew} />
                  </Marker>
                )}
              </MapView>
            )}
            <View style={styles.extraButtonBox}>
              <TouchableOpacity
                onPress={() => navigation.navigate('stops')}
                style={styles.stopsBtnStyle}>
                <AlertsIcon size={20} />
                <Text style={styles.alertButtonText}>Stops</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayback}>
            {isPlaying ? (
              <PauseIcon size={20} color={backgroundColorNew} />
            ) : (
              <PlayIcon size={20} color={backgroundColorNew} />
            )}
          </TouchableOpacity>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={backgroundColorNew}
              maximumTrackTintColor="#FFDCD3"
              thumbTintColor={backgroundColorNew}
              value={sliderValue}
              onValueChange={value => {
                setSliderValue(value);
                const newIndex = Math.round(value * (coordinates.length - 1));
                setCurrentIndex(newIndex);
                setCurrentPosition(coordinates[newIndex]);
              }}
            />
          </View>
          <View style={styles.speedButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.speedButton,
                playbackSpeed === 1 && styles.activeSpeedButton,
              ]}
              onPress={() => changePlaybackSpeed(1)}>
              <Text
                style={[
                  styles.speedButtonText,
                  playbackSpeed === 1 && styles.activeSpeedButtonText,
                ]}>
                1X
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.speedButton,
                playbackSpeed === 2 && styles.activeSpeedButton,
              ]}
              onPress={() => changePlaybackSpeed(2)}>
              <Text
                style={[
                  styles.speedButtonText,
                  playbackSpeed === 2 && styles.activeSpeedButtonText,
                ]}>
                2X
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.totalBox}>
          <View style={styles.stopBox}>
            <Text style={styles.stopText}>Total run: 307 KM</Text>
            <Text style={styles.stopCount}>06 : 37 : 42</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.stopBox}>
            <Text style={styles.stopText}>Total Stops: 12</Text>
            <Text style={styles.stopCount}>06 : 37 : 42</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.stopBox}>
            <Text style={styles.stopText}>Signal Losts: 2KM</Text>
            <Text style={styles.stopCount}>06 : 37 : 42</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  loader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 1,
    marginHorizontal: 5,
    height: '100%',
  },
  extraButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 130,
    right: 0,
    zIndex: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Italic',
    color: titleColor,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 5,
    elevation: 2,
  },
  mapContainer: {flex: 1},
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
  alertButtonText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  stopBox: {
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    textAlign: 'center',
  },
  stopCount: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: -5,
  },
  totalBox: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 10,
  },
  stopsBtnStyle: {
    flexDirection: 'row',
    elevation: 3,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  ctrlBtn: {
    elevation: 3,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 40,
    marginRight: 10,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playPauseButton: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    borderColor: backgroundColorNew,
  },
  sliderContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    width: '100%',
  },
  speedButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedButton: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginRight: 5,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  activeSpeedButton: {
    backgroundColor: backgroundColorNew,
  },
  speedButtonText: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    color: backgroundColorNew,
  },
  activeSpeedButtonText: {
    color: '#FFF',
  },
  calendarIconBox: {
    // borderWidth: 1,
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
    elevation: 2,
  },
});
