import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Vibration,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {initQrCodeVerify, qrScanningFailure} from '../../Store/Actions/Actions';
import {PrivacyPolicy} from '../../Color/color';
import FlashOn from '../../../assets/SVG/svg/FlashOn';
import FlashOff from '../../../assets/SVG/svg/FlashOff';
import styles from './style'
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const QRscanner = ({route, navigation}) => {
  useTrackScreenTime('QRscanner');
  const {truck_id} = route.params;
  const dispatch = useDispatch();
  const qrCodeStatus = useSelector(state => state.data.qrCodeStatus);
  const qrCodeLoading = useSelector(state => state.data.qrCodeLoading);

  const [isScanning, setIsScanning] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const onQRCodeRead = codes => {
    if (codes.length > 0 && !isScanning) {
      setIsScanning(true);
      Vibration.vibrate(5000); // Vibrate the device
      const qrData = codes[0].value;
      // console.log(987987, qrData);
      dispatch(initQrCodeVerify(truck_id, qrData)); // Dispatch the action to verify QR code
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'upc-a'],
    onCodeScanned: onQRCodeRead,
  });

  useEffect(() => {
    if (!qrCodeLoading && qrCodeStatus === 200) {
      navigation.navigate('Status', {truck_id});
      dispatch(qrScanningFailure());
    } else if (!qrCodeLoading) {
      dispatch(qrScanningFailure());
    }
  }, [qrCodeLoading, qrCodeStatus, navigation, dispatch, truck_id]);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    // Reset isScanning when component is unmounted or status changes
    return () => {
      setIsScanning(false);
    };
  }, [qrCodeStatus]);

  const toggleFlashlight = () => {
    setIsFlashOn(!isFlashOn);
  };

  if (!hasPermission || device == null) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.qrContainer}>
      {qrCodeLoading && (
        <View style={styles.modalBackground}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      )}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
        torch={isFlashOn ? 'on' : 'off'}
      />
      {/* <View style={styles.focusBorder} /> */}
      <View style={styles.focusBorder}>
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>
      <TouchableOpacity
        style={styles.flashlightButton}
        onPress={toggleFlashlight}>
        {isFlashOn ? (
          <FlashOff size={30} color={PrivacyPolicy} />
        ) : (
          <FlashOn size={30} color={PrivacyPolicy} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default QRscanner;

