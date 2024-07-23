import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useMemo, useRef} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {backgroundColorNew, titleColor} from '../../Color/color';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import Slider from '@react-native-community/slider';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import {
  fetchGpsStopsRequest,
  fetchPositionsRequest,
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import PauseIcon from '../../../assets/SVG/svg/PauseIcon';
import FilterIcon from '../../../assets/SVG/svg/FilterIcon';
import PrevIcon from '../../../assets/SVG/svg/PrevIcon';
import NextIcon from '../../../assets/SVG/svg/NextIcon';
import TruckNavigationIcon from '../../../assets/SVG/svg/TruckNavigationIcon';

export default function PlayJourney({navigation, route}) {
  const {deviceId, from, to} = route.params;
  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [currentStop, setCurrentStop] = useState(null);

  const mapRef = useRef(null);

  const dispatch = useDispatch();
  const {
    gpsTokenData,
    gpsReplayLoading,
    gpsReplayError,
    gpsReplayData,
    gpsStopsLoading,
    gpsStopsError,
    gpsStopsData,
  } = useSelector(state => state.data);

  const coordinates = useMemo(
    () =>
      gpsReplayData?.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
        course: point.course,
        speed: point.speed,
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

      // Disconnect WebSocket and call REST APIs
      dispatch(websocketDisconnect());
      dispatch(
        fetchPositionsRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
        ),
      );
      dispatch(
        fetchGpsStopsRequest(
          gpsTokenData?.email,
          gpsTokenData?.password,
          deviceId,
          defaultFrom,
          defaultTo,
        ),
      );
      return () => {
        dispatch(websocketConnect(gpsTokenData.cookie));
      };
    }, [dispatch, from, to, deviceId, gpsTokenData]),
  );

  useEffect(() => {
    let interval = null;
    if (isPlaying && currentIndex < coordinates?.length) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          const newPosition = coordinates[newIndex];
          setCurrentPosition(newPosition);
          setSliderValue(newIndex / (coordinates?.length - 1));
          if (mapRef.current && newPosition) {
            mapRef.current.animateToRegion({
              latitude: newPosition.latitude,
              longitude: newPosition.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
          return newIndex;
        });
      }, 1000 / playbackSpeed);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, coordinates, playbackSpeed]);

  useEffect(() => {
    if (gpsStopsData && gpsStopsData?.length > 0) {
      setCurrentStop(gpsStopsData[0]);
    }
  }, [gpsStopsData]);

  const goToNextStop = () => {
    if (currentStopIndex < gpsStopsData?.length - 1) {
      const newIndex = currentStopIndex + 1;
      setCurrentStopIndex(newIndex);
      const nextStop = gpsStopsData[newIndex];
      setCurrentPosition({
        latitude: nextStop.latitude,
        longitude: nextStop.longitude,
      });
      setCurrentStop(nextStop); // Update current stop
      mapRef.current?.animateToRegion({
        latitude: nextStop.latitude,
        longitude: nextStop.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }); // Animate to the new stop location
    }
  };

  const goToPrevStop = () => {
    if (currentStopIndex > 0) {
      const newIndex = currentStopIndex - 1;
      setCurrentStopIndex(newIndex);
      const prevStop = gpsStopsData[newIndex];
      setCurrentPosition({
        latitude: prevStop.latitude,
        longitude: prevStop.longitude,
      });
      setCurrentStop(prevStop); // Update current stop
      mapRef.current?.animateToRegion({
        latitude: prevStop.latitude,
        longitude: prevStop.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }); // Animate to the new stop location
    }
  };

  const totalStops = gpsStopsData ? gpsStopsData.length : 0;
  const totalRun =
    gpsStopsData && gpsStopsData.length > 0
      ? (gpsStopsData[gpsStopsData.length - 1].endOdometer -
          gpsStopsData[0].startOdometer) /
        1000
      : 0;

  const totalDuration =
    gpsStopsData && gpsStopsData.length > 0
      ? gpsStopsData.reduce((acc, stop) => acc + stop.duration, 0)
      : 0;

  const formatDuration = duration => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  console.log(4444, currentPosition);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Stop</Text>
          <Text style={styles.stopCount}>{currentStopIndex + 1}</Text>
        </View>
        <View style={styles.verticalLine} />
        <Text style={styles.addressText}>
          {currentStop && currentStop.address
            ? `${currentStop.address}`
            : 'No address available'}
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
            <FilterIcon size={30} color={backgroundColorNew} />
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
                ref={mapRef}
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
                    title="Speed"
                    description={`${(currentPosition.speed * 1.852).toFixed(
                      2,
                    )} km/h`}
                    rotation={currentPosition.course || 0}>
                    <TruckNavigationIcon
                      width={60}
                      height={50}
                      style={{
                        transform: [
                          {
                            rotate: `${
                              currentPosition.course
                                ? currentPosition.course
                                : 45
                            }deg`,
                          },
                        ],
                      }}
                    />
                  </Marker>
                )}
                {gpsStopsData?.map((stop, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: stop.latitude,
                      longitude: stop.longitude,
                    }}
                    pinColor={index === currentStopIndex ? 'blue' : 'red'}
                    title={`Stop ${index + 1}`}
                    description={stop.address}
                  />
                ))}
              </MapView>
            )}
            <View style={styles.extraButtonBox}>
              <TouchableOpacity
                onPress={() => navigation.navigate('stops')}
                style={styles.stopsBtnStyle}>
                <AlertsIcon size={20} />
                <Text style={styles.alertButtonText}>Stops</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ctrlBtn} onPress={goToPrevStop}>
                <PrevIcon size={30} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ctrlBtn} onPress={goToNextStop}>
                <NextIcon size={30} />
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
                const newIndex = Math.round(value * (coordinates?.length - 1));
                setCurrentIndex(newIndex);
                const newPosition = coordinates[newIndex];
                setCurrentPosition(newPosition);
                if (mapRef.current && newPosition) {
                  mapRef.current.animateToRegion({
                    latitude: newPosition.latitude,
                    longitude: newPosition.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  });
                }
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
            <Text style={[styles.stopText, {color: '#3BA700'}]}>
              Total run: {Math.ceil(totalRun)} KM
            </Text>
            <Text style={styles.stopCount}>00:00:00</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.stopBox}>
            <Text style={[styles.stopText, {color: '#F50000'}]}>
              Total Stops: {totalStops}
            </Text>
            <Text style={styles.stopCount}>
              {formatDuration(totalDuration)}
            </Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.stopBox}>
            <Text style={[styles.stopText, {color: '#E0BD00'}]}>
              Signal Losts: 0 KM
            </Text>
            <Text style={styles.stopCount}>00:00:00</Text>
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
