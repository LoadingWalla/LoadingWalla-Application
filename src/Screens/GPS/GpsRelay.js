import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {pageBackground, textColor, titleColor} from '../../Color/color';
import {useDispatch, useSelector} from 'react-redux';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import InnerButton from '../../Components/InnerButton';
import TruckRelayIcon from '../../../assets/SVG/svg/TruckRelayIcon';
import {setGpsRelayRequest} from '../../Store/Actions/Actions';

const GpsRelay = ({navigation, route}) => {
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
    dispatch(setGpsRelayRequest(deviceId, gpsRelayData.relay ? 2 : 1));
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };
  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.overlay} />
      <View style={styles.screenModalView}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <TruckRelayIcon size={160} />
          </View>
          <View style={styles.speedBox}>
            <Text style={styles.headerText}>Vehicle Speed:</Text>
            <Text style={styles.headerValue}>0 Kmph</Text>
          </View>
        </View>
        <View style={styles.relayTextContainer}>
          <Text style={styles.relayText}>Like to turn</Text>
          <Text style={styles.relayTextBold(gpsRelayData.relay)}>
            {gpsRelayData.relay ? 'OFF RELAY?' : 'ON RELAY?'}
          </Text>
        </View>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            By clicking{'  '}
            <Text style={styles.descriptionTextBold(gpsRelayData.relay)}>
              {gpsRelayData.relay ? 'TURN OFF RELAY' : 'TURN ON RELAY'}
            </Text>
            , your vehicle will stop if the speed drops below 20 km/h.
          </Text>
        </View>

        <InnerButton
          navigation={handleRelayToggle}
          title={gpsRelayData.relay ? 'TURN OFF RELAY' : 'TURN ON RELAY'}
          enabledStyle={styles.btnStyle(gpsRelayData.relay)}
          textStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

export default GpsRelay;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  screenModalView: {
    flex: 1,
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
    maxHeight: 400,
    padding: 20,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  speedBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
    marginRight: 5,
  },
  headerValue: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#EF4D23',
  },
  relayTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  relayText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: titleColor,
  },
  relayTextBold: color => ({
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    color: color ? 'red' : '#3BA700',
    marginLeft: 5,
  }),
  descriptionBox: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 40,
  },
  descriptionText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: titleColor,
    textAlign: 'center',
  },
  descriptionTextBold: color => ({
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 12,
    color: color ? 'red' : '#3BA700',
  }),
  btnStyle: color => ({
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: color ? 'red' : '#3CA604',
    borderColor: color ? 'red' : '#3CA604',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
  }),
  btnText: {
    fontSize: 14,
    color: textColor,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    textAlign: 'center',
    width: 150,
  },
  iconBox: {
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    marginBottom: 10,
  },
});
