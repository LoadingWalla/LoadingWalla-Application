import moment from 'moment';
import React, {useRef, useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import MapView, {Marker, Callout, Polyline} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAddressRequest} from '../Store/Actions/Actions';
import ActiveLocation from '../../assets/SVG/svg/ActiveLocation';
import PlayIcon from '../../assets/SVG/svg/PlayIcon';
import {backgroundColorNew} from '../Color/color';
import AlertsIcon from '../../assets/SVG/svg/AlertsIcon';
import StopsIcon from '../../assets/SVG/svg/StopsIcon';
import * as Constants from '../Constants/Constant';
import {useTranslation} from 'react-i18next';
import styles from './style';
import TruckNavigationIcon from '../../assets/SVG/svg/TruckNavigationIcon';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapComponent = React.memo(
  ({
    initialRegion,
    item,
    positions,
    navigation,
    routeData,
    eventData,
    stopsData,
  }) => {
    const [mapType, setMapType] = useState('standard');
    const [combinedRouteData, setCombinedRouteData] = useState([]);
    const mapRef = useRef();
    const markerRef = useRef();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    // console.log(9999999, positions);

    const fullAddressData = useSelector(state => state.data.fullAddressData);

    const initialMapRegion = useMemo(
      () => ({
        ...initialRegion,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      [initialRegion],
    );

    const handleMapLayout = useCallback(() => {
      if (markerRef.current) {
        markerRef.current.showCallout();
      }
    }, []);

    const toggleMapType = useCallback(() => {
      setMapType(prevType => (prevType === 'standard' ? 'hybrid' : 'standard'));
    }, []);

    // Transform routeData from [[longitude, latitude], [longitude, latitude]]
    const transformedRouteData = useMemo(() => {
      return routeData.map(([longitude, latitude]) => ({
        latitude,
        longitude,
      }));
    }, [routeData]);

    // Update combinedRouteData when positions change
    useEffect(() => {
      if (positions.length > 0) {
        const lastPosition = positions[0];
        const latestCombinedRoute = [...combinedRouteData];

        // Only append the new position if it's not already the last point
        const lastRoutePoint =
          latestCombinedRoute[latestCombinedRoute.length - 1];

        if (
          !lastRoutePoint ||
          (lastRoutePoint.latitude !== lastPosition.latitude &&
            lastRoutePoint.longitude !== lastPosition.longitude)
        ) {
          setCombinedRouteData(prevData => [
            ...prevData,
            {
              latitude: lastPosition.latitude,
              longitude: lastPosition.longitude,
            },
          ]);

          // Animate the map to the new position
          mapRef.current?.animateToRegion(
            {
              latitude: lastPosition.latitude,
              longitude: lastPosition.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            1000,
          );

          // Move the marker smoothly
          markerRef.current?.animateMarkerToCoordinate(
            {
              latitude: lastPosition.latitude,
              longitude: lastPosition.longitude,
            },
            1000,
          );

          // Fetch address for the latest position
          dispatch(
            fetchAddressRequest(
              lastPosition.latitude,
              lastPosition.longitude,
              lastPosition.id,
            ),
          );
        }
      }
    }, [positions, dispatch, combinedRouteData]);

    const renderMarkers = useMemo(() => {
      if (positions.length === 0 || !positions[0]) {
        return (
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            ref={markerRef}>
            {/* <ActiveLocation size={40} course={50} /> */}
            <TruckNavigationIcon size={40} course={0} />
            <Callout tooltip>
              <View style={styles.calloutView}>
                <Text style={styles.calloutText}>
                  {fullAddressData === null ? item?.address : fullAddressData}
                </Text>
              </View>
            </Callout>
          </Marker>
        );
      } else {
        return positions.map((position, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            ref={markerRef}>
            {/* <ActiveLocation size={40} course={50} /> */}
            <TruckNavigationIcon size={40} course={position.course} />
            <Callout tooltip>
              <View style={styles.calloutView}>
                <Text style={styles.calloutText}>
                  {fullAddressData === null ? item?.address : fullAddressData}
                </Text>
              </View>
            </Callout>
          </Marker>
        ));
      }
    }, [positions, initialRegion, fullAddressData, item]);

    return (
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          mapType={mapType}
          style={StyleSheet.absoluteFillObject}
          initialRegion={initialMapRegion}
          onLayout={handleMapLayout}>
          <>
            {/* Render the historical routeData */}
            {transformedRouteData.length > 0 && (
              <Polyline
                coordinates={transformedRouteData}
                strokeColor="blue"
                strokeWidth={3}
              />
            )}
            {/* Render the real-time combined route */}
            {combinedRouteData.length > 0 && (
              <Polyline
                coordinates={combinedRouteData}
                strokeColor="blue"
                strokeWidth={3}
              />
            )}
            {renderMarkers}
          </>
          {/* Stops data on map which come in combined */}
          {stopsData?.map((stop, index) => (
            <Marker
              key={`stop-${index}`}
              coordinate={{
                latitude: stop.latitude,
                longitude: stop.longitude,
              }}>
              <StopsIcon size={40} number={index + 1} />
            </Marker>
          ))}
        </MapView>

        <TouchableOpacity
          style={styles.mapToggleButton}
          onPress={toggleMapType}>
          <Image
            source={
              mapType === 'standard'
                ? require('../../assets/satellite-view.png')
                : require('../../assets/satellites.png')
            }
            style={styles.imageStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.alertButton}
          onPress={() =>
            navigation.navigate('GpsAlert', {deviceId: item?.id, eventData})
          }>
          <AlertsIcon size={25} />
        </TouchableOpacity>

        <View style={styles.speedDistanceBox}>
          <View style={styles.infoBox}>
            <View style={styles.infoColumn}>
              <Text style={styles.boldText}>{`${(item?.distance / 1000).toFixed(
                2,
              )} KM`}</Text>
              <Text style={styles.labelText}>{t(Constants.TODAY_DIS)}</Text>
            </View>
            <View style={styles.mapverticalLine} />
            <View style={styles.infoColumn}>
              <Text style={styles.boldText}>
                {`${Math.floor(
                  (positions[0]?.speed || item?.position[0]?.speed) * 1.852,
                )} KMPH`}
              </Text>
              <Text style={styles.labelText}>{t(Constants.VEHICLE_SPEED)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.mapbtnContainer}
            onPress={() =>
              navigation.navigate('PlayJourney', {
                deviceId: item?.id,
                from: moment().utcOffset(330).startOf('day').toISOString(),
                to: moment().utcOffset(330).endOf('day').toISOString(),
                name: item?.name,
                item,
              })
            }>
            <PlayIcon
              size={25}
              color={backgroundColorNew}
              style={styles.iconStyle}
            />
            <Text style={styles.mapbtnText}>{`${t(Constants.PLAY)}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default MapComponent;
