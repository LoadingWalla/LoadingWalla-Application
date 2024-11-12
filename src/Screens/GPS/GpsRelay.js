import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import InnerButton from '../../Components/InnerButton';
import TruckRelayIcon from '../../../assets/SVG/svg/TruckRelayIcon';
import {setGpsRelayRequest} from '../../Store/Actions/Actions';
import styles from './style';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const GpsRelay = ({navigation, route}) => {
  useTrackScreenTime('GpsRelay');
  const {t} = useTranslation();
  const {deviceId, item} = route.params;
  // console.log('gpsrelay-----------', route);

  const dispatch = useDispatch();
  const {gpsRelayData} = useSelector(state => state.data);
  const {wsConnected} = useSelector(state => state.wsData);

  useEffect(() => {
    if (wsConnected) {
      dispatch(websocketDisconnect());
    }
  }, [wsConnected]);

  const handleRelayToggle = () => {
    dispatch(setGpsRelayRequest(deviceId, gpsRelayData?.relay ? 2 : 1));
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };
  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.overlay} />
      <View style={styles.screenModalView}>
        <View style={styles.header}>
          <View style={styles.gpsRelayIconBox}>
            <TruckRelayIcon size={160} />
          </View>
          <View style={styles.speedBox}>
            <Text style={styles.gpsRelayHeaderText}>Vehicle Speed:</Text>
            <Text style={styles.headerValue}>0 Kmph</Text>
          </View>
        </View>
        <View style={styles.relayTextContainer}>
          <Text style={styles.relayText}>{t(Constants.TO_TURN)}</Text>
          <Text style={styles.relayTextBold(gpsRelayData.relay)}>
            {gpsRelayData.relay
              ? t(Constants.OFF_RELAY)
              : t(Constants.ON_RELAY)}
          </Text>
        </View>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            {t(Constants.BY_CLICK)}
            {'  '}
            <Text style={styles.descriptionTextBold(gpsRelayData.relay)}>
              {gpsRelayData.relay
                ? t(Constants.TURN_OFF_RELAY)
                : t(Constants.TURN_ON_RELAY)}
            </Text>
            {t(Constants.VEH_STOP)}
          </Text>
        </View>

        <InnerButton
          navigation={handleRelayToggle}
          title={
            gpsRelayData.relay
              ? t(Constants.TURN_OFF_RELAY)
              : t(Constants.TURN_ON_RELAY)
          }
          enabledStyle={styles.gpsRelayBtnStyle(gpsRelayData.relay)}
          textStyle={styles.gpsRelayBtnText}
        />
      </View>
    </View>
  );
};

export default GpsRelay;
