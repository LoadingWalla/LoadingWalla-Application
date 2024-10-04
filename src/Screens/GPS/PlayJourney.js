import React, {useEffect, useState, useMemo, useRef} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {AnimatedRegion, Marker, Polyline} from 'react-native-maps';
import {backgroundColorNew, titleColor} from '../../Color/color';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import Slider from '@react-native-community/slider';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import {
  fetchAddressRequest,
  fetchGpsStopsRequest,
  fetchPositionsRequest,
  fetchSummaryReportRequest,
} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import PauseIcon from '../../../assets/SVG/svg/PauseIcon';
import FilterIcon from '../../../assets/SVG/svg/FilterIcon';
import PrevIcon from '../../../assets/SVG/svg/PrevIcon';
import NextIcon from '../../../assets/SVG/svg/NextIcon';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import StopsIcon from '../../../assets/SVG/svg/StopsIcon';
import useConvertMillisToTime from '../../hooks/useConvertMillisToTime';
import ActiveLocation from '../../../assets/SVG/svg/ActiveLocation';
import styles from './style'

export default function PlayJourney({navigation, route}) {
  const {deviceId, from, to, name, item} = route.params;
  console.log(1111, 'PlayJourney Parmas----->', route);

  const [sliderValue, setSliderValue] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [currentStop, setCurrentStop] = useState(null);
  const [mapType, setMapType] = useState('standard');

  const {convertMillisToTime} = useConvertMillisToTime();

  const mapRef = useRef(null);
  const markerRefs = useRef([]);

  const dispatch = useDispatch();
  const {
    gpsTokenData,
    gpsReplayLoading,
    gpsReplayData,
    gpsStopsData,
    gpsStopsLoading,
    fullAddressCustomId,
    fullAddressData,
    gpsSummaryLoading,
    gpsSummaryData,
  } = useSelector(state => {
    console.log(55555, 'playJourney---->', state.data);

    return state.data;
  });

  const {wsConnected} = useSelector(state => state.wsData);

  const loading = gpsReplayLoading || gpsStopsLoading || gpsSummaryLoading;

  useEffect(() => {
    if (wsConnected) {
      dispatch(websocketDisconnect());
    }
  }, [wsConnected]);

  const toggleMapType = () => {
    setMapType(prevType =>
      prevType === 'standard' ? 'satellite' : 'standard',
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      const defaultFrom =
        from || moment().utcOffset(330).startOf('day').toISOString();
      const defaultTo =
        to || moment().utcOffset(330).endOf('day').toISOString();

      const fetchData = async () => {
        await dispatch(
          fetchPositionsRequest(
            gpsTokenData?.email,
            gpsTokenData?.password,
            deviceId,
            defaultFrom,
            defaultTo,
          ),
        );

        await dispatch(
          fetchGpsStopsRequest(
            gpsTokenData?.email,
            gpsTokenData?.password,
            deviceId,
            defaultFrom,
            defaultTo,
          ),
        );

        await dispatch(
          fetchSummaryReportRequest(
            gpsTokenData?.email,
            gpsTokenData?.password,
            deviceId,
            defaultFrom,
            defaultTo,
            false,
          ),
        );
      };

      fetchData();

      return () => {};
    }, [dispatch, from, to, deviceId, gpsTokenData]),
  );

  useEffect(() => {
    if (gpsStopsData && gpsStopsData.length > 0) {
      setCurrentStop(gpsStopsData[0]);
    }
  }, [gpsStopsData]);

  useEffect(() => {
    if (markerRefs.current[currentStopIndex]) {
      markerRefs.current[currentStopIndex].showCallout();
    }
  }, [currentStopIndex, gpsStopsData]);

  useEffect(() => {
    let interval = null;

    if (isPlaying && currentIndex < coordinates?.length) {
      const adjustedPlaybackSpeed = playbackSpeed * 1000; // Adjust playback speed

      interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          const newPosition = coordinates[newIndex];

          if (newPosition) {
            // Set the new currentPosition
            setCurrentPosition(newPosition);

            // Animate marker movement
            animatedMarkerPosition
              .timing({
                latitude: newPosition.latitude,
                longitude: newPosition.longitude,
                duration: 4000 / adjustedPlaybackSpeed, // Adjusted duration for smoother movement
                useNativeDriver: true,
              })
              .start();

            setSliderValue(newIndex / (coordinates?.length - 1));
          }

          return newIndex;
        });
      }, 1000 / adjustedPlaybackSpeed); // Interval based on adjusted speed
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, coordinates, playbackSpeed]);

  const coordinates = useMemo(
    () =>
      gpsReplayData?.map(point => ({
        latitude: point.latitude,
        longitude: point.longitude,
        course: point.course,
        speed: point.speed,
        time: point.deviceTime,
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

  const animatedMarkerPosition = useRef(
    new AnimatedRegion({
      latitude: coordinates?.[0]?.latitude || 0,
      longitude: coordinates?.[0]?.longitude || 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
  ).current;

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

  const goToNextStop = () => {
    if (currentStopIndex < gpsStopsData?.length - 1) {
      const newIndex = currentStopIndex + 1;
      setCurrentStopIndex(newIndex);
      const nextStop = gpsStopsData[newIndex];

      // Fetch the address for the next stop if not already fetched
      if (!nextStop.address && fullAddressCustomId !== nextStop.positionId) {
        dispatch(
          fetchAddressRequest(
            nextStop.latitude,
            nextStop.longitude,
            nextStop.positionId,
          ),
        );
      }

      animatedMarkerPosition
        .timing({
          latitude: nextStop.latitude,
          longitude: nextStop.longitude,
          duration: 500,
          useNativeDriver: true,
        })
        .start();

      setCurrentStop(nextStop);
      mapRef.current?.animateToRegion({
        latitude: nextStop.latitude,
        longitude: nextStop.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const goToPrevStop = () => {
    if (currentStopIndex > 0) {
      const newIndex = currentStopIndex - 1;
      setCurrentStopIndex(newIndex);
      const prevStop = gpsStopsData[newIndex];

      // Fetch the address for the previous stop if not already fetched
      if (!prevStop.address && fullAddressCustomId !== prevStop.positionId) {
        dispatch(
          fetchAddressRequest(
            prevStop.latitude,
            prevStop.longitude,
            prevStop.positionId,
          ),
        );
      }

      animatedMarkerPosition
        .timing({
          latitude: prevStop.latitude,
          longitude: prevStop.longitude,
          duration: 1000,
          useNativeDriver: false,
        })
        .start();

      setCurrentStop(prevStop);
      mapRef.current?.animateToRegion({
        latitude: prevStop.latitude,
        longitude: prevStop.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  // const goToNextStop = () => {
  //   if (currentStopIndex < gpsStopsData?.length - 1) {
  //     const newIndex = currentStopIndex + 1;
  //     setCurrentStopIndex(newIndex);
  //     const nextStop = gpsStopsData[newIndex];
  //     animatedMarkerPosition
  //       .timing({
  //         latitude: nextStop.latitude,
  //         longitude: nextStop.longitude,
  //         duration: 500,
  //         useNativeDriver: true,
  //       })
  //       .start();
  //     setCurrentStop(nextStop);
  //     mapRef.current?.animateToRegion({
  //       latitude: nextStop.latitude,
  //       longitude: nextStop.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   }
  // };

  // const goToPrevStop = () => {
  //   if (currentStopIndex > 0) {
  //     const newIndex = currentStopIndex - 1;
  //     setCurrentStopIndex(newIndex);
  //     const prevStop = gpsStopsData[newIndex];
  //     animatedMarkerPosition
  //       .timing({
  //         latitude: prevStop.latitude,
  //         longitude: prevStop.longitude,
  //         duration: 1000,
  //         useNativeDriver: true,
  //       })
  //       .start();
  //     setCurrentStop(prevStop);
  //     mapRef.current?.animateToRegion({
  //       latitude: prevStop.latitude,
  //       longitude: prevStop.longitude,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     });
  //   }
  // };

  const totalStops = gpsStopsData ? gpsStopsData.length : 0;
  const totalRun = gpsSummaryData[0]?.distance / 1000;

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

  const isDataAvailable = () => {
    return (
      gpsTokenData &&
      gpsReplayData?.length > 0 &&
      gpsStopsData?.length > 0 &&
      gpsSummaryData?.length > 0
    );
  };

  const handleMarkerPress = (stop, index) => {
    // Fetch the address if it's not available and not already being fetched
    if (!stop.address && fullAddressCustomId !== stop.positionId) {
      dispatch(
        fetchAddressRequest(stop.latitude, stop.longitude, stop.positionId),
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={backgroundColorNew} />
        </View>
      )}
      {!loading && !isDataAvailable() && (
        <View style={styles.noDataContainer}>
          {/* <Text style={styles.noDataText}>No data available</Text> */}
          <TouchableOpacity
            style={styles.calendarIconBox}
            onPress={() =>
              navigation.navigate('quickfilters', {
                deviceId,
                navigationPath: 'PlayJourney',
                name,
              })
            }>
            <FilterIcon size={20} color={backgroundColorNew} />
          </TouchableOpacity>
        </View>
      )}
      {!loading && isDataAvailable() && (
        <>
          <TouchableOpacity
            style={styles.calendarIconBox}
            onPress={() =>
              navigation.navigate('quickfilters', {
                deviceId,
                navigationPath: 'PlayJourney',
                name,
              })
            }>
            <FilterIcon size={25} color={backgroundColorNew} />
          </TouchableOpacity>
          <View style={styles.container}>
            {!loading && (
              <View style={styles.mapView}>
                {initialRegion && (
                  <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFillObject}
                    initialRegion={initialRegion}
                    // onLayout={handleMapLayout}
                    mapType={mapType}>
                    <Polyline
                      coordinates={coordinates}
                      strokeColor="#0158AF"
                      strokeWidth={3}
                    />
                    {currentPosition && (
                      <Marker.Animated
                        coordinate={{
                          latitude: currentPosition.latitude,
                          longitude: currentPosition.longitude,
                        }}>
                        <View style={styles.markerContainer}>
                          <View style={styles.addressContainer}>
                            <Text style={styles.kmText}>
                              {`${Math.floor(
                                currentPosition.speed * 1.852,
                              )} km/h`}
                            </Text>
                            <Text style={styles.kmText}>
                              {`${moment(currentPosition.time)
                                .utcOffset(330)
                                .format('D MMM YYYY, h:mm A')}`}
                            </Text>
                          </View>
                          <View style={styles.arrowBottom} />
                          <View style={styles.truckIconContainer}>
                            <ActiveLocation
                              size={40}
                              course={currentPosition.course || 0}
                            />
                          </View>
                        </View>
                      </Marker.Animated>
                    )}
                    {gpsStopsData?.map((stop, index) => (
                      <Marker
                        key={`stop-${index}`}
                        ref={el => (markerRefs.current[index] = el)}
                        coordinate={{
                          latitude: stop.latitude,
                          longitude: stop.longitude,
                        }}
                        onPress={() => handleMarkerPress(stop, index)}>
                        <View style={styles.markerContainer}>
                          <View style={styles.addressContainer}>
                            <Text style={styles.kmText}>
                              {fullAddressCustomId === stop.positionId
                                ? fullAddressData
                                : stop.address || 'Click below to Show Address'}
                            </Text>
                          </View>
                          <View style={styles.arrowBottom} />
                          <View style={styles.truckIconContainer}>
                            <StopsIcon size={40} number={index + 1} />
                          </View>
                        </View>
                      </Marker>
                    ))}
                  </MapView>
                )}
                <TouchableOpacity
                  style={styles.mapToggleButton}
                  onPress={toggleMapType}>
                  <Image
                    source={
                      mapType === 'standard'
                        ? require('../../../assets/satellite-view.png')
                        : require('../../../assets/satellites.png')
                    }
                    style={{width: 40, height: 40}}
                  />
                </TouchableOpacity>
                <View style={styles.extraButtonBox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('stops')}
                    style={styles.stopsBtnStyle}>
                    <AlertsIcon size={20} />
                    <Text style={styles.alertButtonText}>Stops</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ctrlBtn}
                    onPress={goToPrevStop}>
                    <PrevIcon size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.ctrlBtn}
                    onPress={goToNextStop}>
                    <NextIcon size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View style={styles.playJourneyBottomContainer}>
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
              <View style={styles.playJourneySliderContainer}>
                <Slider
                  style={styles.playJourneySlider}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor={backgroundColorNew}
                  maximumTrackTintColor="#FFDCD3"
                  thumbTintColor={backgroundColorNew}
                  value={sliderValue}
                  onValueChange={value => {
                    setSliderValue(value);
                    const newIndex = Math.round(
                      value * (coordinates?.length - 1),
                    );
                    setCurrentIndex(newIndex);
                    const newPosition = coordinates[newIndex];
                    setCurrentPosition(newPosition);
                    animatedMarkerPosition
                      .timing({
                        latitude: newPosition.latitude,
                        longitude: newPosition.longitude,
                        duration: 500,
                        useNativeDriver: true,
                      })
                      .start();
                    if (mapRef.current && newPosition) {
                      mapRef.current.animateToRegion({
                        latitude: newPosition?.latitude,
                        longitude: newPosition?.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
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
                  Total Distance
                </Text>
                <Text style={styles.stopCount}>
                  {Math.abs(totalRun).toFixed(2)} KM
                </Text>
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
                  Engine Hours
                </Text>
                <Text style={styles.stopCount}>
                  {convertMillisToTime(gpsSummaryData[0]?.engineHours)}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {flex: 1},
//   loaderOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 10,
//   },
//   verticalLine: {
//     backgroundColor: '#AFAFAF',
//     width: 1,
//     marginHorizontal: 5,
//     height: '90%',
//   },
//   extraButtonBox: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 130,
//     right: 0,
//     zIndex: 10,
//   },
//   addressText: {
//     flex: 1,
//     fontSize: 10,
//     fontFamily: 'PlusJakartaSans-Italic',
//     // color: titleColor,
//     color: '#FFFFFF',
//   },
//   topContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     elevation: 2,
//   },
//   mapContainer: {flex: 1},
//   mapView: {flex: 1, width: '100%', height: '100%'},
//   bottomContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFFFFF',
//     position: 'absolute',
//     bottom: 0,
//     padding: 10,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: '#F7F7F7',
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     width: '100%',
//   },
//   alertButtonText: {
//     marginLeft: 10,
//     textAlign: 'center',
//     fontSize: 14,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   stopBox: {
//     paddingHorizontal: 5,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   stopText: {
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     fontSize: 10,
//     textAlign: 'center',
//   },
//   stopCount: {
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//     fontSize: 16,
//     textAlign: 'center',
//     marginTop: -5,
//   },
//   totalBox: {
//     flexDirection: 'row',
//     flex: 1,
//     justifyContent: 'space-evenly',
//     paddingVertical: 10,
//     marginTop: 10,
//   },
//   stopsBtnStyle: {
//     flexDirection: 'row',
//     elevation: 3,
//     backgroundColor: '#ffffff',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   ctrlBtn: {
//     elevation: 3,
//     backgroundColor: '#ffffff',
//     padding: 5,
//     borderRadius: 40,
//     marginRight: 10,
//   },
//   controlsContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   playPauseButton: {
//     borderWidth: 1,
//     borderRadius: 20,
//     padding: 5,
//     borderColor: backgroundColorNew,
//   },
//   sliderContainer: {
//     flex: 1,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slider: {
//     flex: 1,
//     width: '100%',
//   },
//   speedButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   speedButton: {
//     paddingVertical: 5,
//     paddingHorizontal: 8,
//     backgroundColor: '#E0E0E0',
//     borderRadius: 5,
//     marginRight: 5,
//     borderColor: '#E0E0E0',
//     borderWidth: 1,
//   },
//   activeSpeedButton: {
//     backgroundColor: backgroundColorNew,
//   },
//   speedButtonText: {
//     fontFamily: 'PlusJakartaSans-ExtraBold',
//     color: backgroundColorNew,
//   },
//   activeSpeedButtonText: {
//     color: '#FFF',
//   },
//   calendarIconBox: {
//     position: 'absolute',
//     zIndex: 99,
//     right: 10,
//     top: 10,
//     padding: 8,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#f7f7f7',
//     elevation: 2,
//   },
//   noDataContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: '#555',
//     fontFamily: 'PlusJakartaSans-Bold',
//     marginBottom: 20,
//   },
//   calloutView: {
//     width: 300,
//     borderRadius: 5,
//     borderWidth: 1,
//   },
//   calloutText: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   markerContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     // borderWidth: 1,
//   },
//   addressContainer: {
//     borderRadius: 5,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     elevation: 5,
//     backgroundColor: 'rgba(1, 1, 0, 0.5)',
//     maxWidth: 300,
//     // borderWidth: 1,
//   },
//   kmText: {
//     fontSize: 12,
//     fontFamily: 'PlusJakartaSans-SemiBoldItalic',
//     color: '#FFFFFF',
//   },
//   arrowBottom: {
//     width: 0,
//     height: 0,
//     borderLeftWidth: 5,
//     borderRightWidth: 5,
//     borderBottomWidth: 10,
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderBottomColor: 'rgba(1, 1, 0, 0.5)',
//     transform: [{rotate: '180deg'}],
//     alignSelf: 'center',
//   },
//   mapToggleButton: {
//     position: 'absolute',
//     top: 60,
//     right: 10,
//     backgroundColor: '#ffffff',
//     borderRadius: 50,
//     elevation: 3,
//   },
// });
