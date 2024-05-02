import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Vibration,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {initQrCodeVerify, qrScanningFailure} from '../../Store/Actions/Actions';

const QRscanner = ({route, navigation}) => {
  const {truck_id} = route.params;
  const dispatch = useDispatch();
  const qrCodeStatus = useSelector(state => state.data.qrCodeStatus);
  const qrCodeLoading = useSelector(state => state.data.qrCodeLoading);

  const [isScanning, setIsScanning] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const onQRCodeRead = codes => {
    if (codes.length > 0 && !isScanning) {
      setIsScanning(true);
      Vibration.vibrate(5000); // Vibrate the device
      const qrData = codes[0].value;
      console.log(987987, qrData);
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

  if (!hasPermission || device == null) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
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
      />
    </View>
  );
};

export default QRscanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
