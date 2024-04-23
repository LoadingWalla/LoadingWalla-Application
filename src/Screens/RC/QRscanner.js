// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Modal,
//   Text,
//   ActivityIndicator,
//   Vibration,
// } from 'react-native';
// import {CameraScreen} from 'react-native-camera-kit';
// import {useDispatch, useSelector} from 'react-redux';
// import {initQrCodeVerify, qrScanningFailure} from '../../Store/Actions/Actions';

// const QRscanner = ({route, navigation}) => {
//   const [isScanning, setIsScanning] = useState(false);
//   const {truck_id} = route.params;
//   const dispatch = useDispatch();

//   const {qrCodeStatus, qrCodeData, qrCodeLoading} = useSelector(state => {
//     // console.log("My Lorry/Load", state.data);
//     return state.data;
//   });

//   useEffect(() => {
//     if (!qrCodeLoading && qrCodeStatus === 200) {
//       navigation.navigate('Status', {truck_id});
//     }
//     dispatch(qrScanningFailure());
//   }, [qrCodeLoading, qrCodeStatus, navigation, dispatch, truck_id]);

//   const onQRCodeRead = event => {
//     if (isScanning) {
//       return;
//     }
//     setIsScanning(true);
//     Vibration.vibrate(1000);
//     const qrData = event.nativeEvent.codeStringValue;
//     // QRscannerRequest(truck_id, qrData);
//     dispatch(initQrCodeVerify(truck_id, qrData));
//   };

//   return (
//     <View style={styles.container}>
//       <Modal
//         transparent={true}
//         animationType="none"
//         visible={qrCodeLoading}
//         onRequestClose={() => {}}>
//         <View style={styles.modalBackground}>
//           <View style={styles.activityIndicatorWrapper}>
//             <ActivityIndicator animating={qrCodeLoading} size="large" />
//             <Text>Loading...</Text>
//           </View>
//         </View>
//       </Modal>
//       <CameraScreen
//         scanBarcode={true}
//         onReadCode={onQRCodeRead}
//         showFrame={true}
//         laserColor="red"
//         frameColor="white"
//         surfaceColor="blue"
//         hideControls={false}
//       />
//     </View>
//   );
// };

// export default QRscanner;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   modalBackground: {
//     flex: 1,
//     alignItems: 'center',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
//     backgroundColor: '#00000040',
//   },
//   activityIndicatorWrapper: {
//     backgroundColor: '#FFFFFF',
//     height: 100,
//     width: 100,
//     borderRadius: 10,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
// });

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const QRscanner = () => {
  return (
    <View>
      <Text>QRscanner</Text>
    </View>
  );
};

export default QRscanner;

const styles = StyleSheet.create({});
