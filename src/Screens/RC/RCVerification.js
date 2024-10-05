import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
  Modal,
  PermissionsAndroid,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './style';
import Gallery from '../../../assets/SVG/Gallery';
import Cammera from '../../../assets/SVG/Camera';
import {GradientColor3, titleColor} from '../../Color/color';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {initRcVerify, rcVerifyFailure} from '../../Store/Actions/Actions';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import QRScanner from '../../../assets/SVG/svg/QRScanner';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';

const RCVerification = ({navigation, route}) => {
  const {title, RC, truck_id} = route.params;
  const [rcFrontImage, setRcFrontImage] = useState(null);
  const [rcBackImage, setRcBackImage] = useState(null);
  const [currentSide, setCurrentSide] = useState(null);
  const [isCameraOptions, setCameraOptions] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {getRcData, getRcLoading, getRcStatus} = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message:
              'This app requires camera permission to function properly.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Camera permission granted');
        } else {
          // console.log('Camera permission denied');
          // Show an alert if camera permissions are not granted
          Alert.alert(
            'Permission Denied',
            'Camera permission is required to use this feature.',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestCameraPermission();
  }, []);

  const takePhoto = async () => {
    setCameraOptions(false);
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 200,
        cropping: true,
      });
      // console.log(image);
      const documentData = {
        fileName: image.filename || image.path.split('/').pop(),
        fileSize: image.size || null,
        height: image.height,
        type: image.mime,
        uri: image.path,
        width: image.width,
      };
      if (currentSide === 'front') {
        setRcFrontImage(documentData);
      } else {
        setRcBackImage(documentData);
      }
    } catch (e) {
      console.error('Take photo error', e);
    }
  };

  const choosePhoto = async () => {
    setCameraOptions(false);
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 200,
        cropping: true,
        compressImageQuality: 1,
        hideBottomControls: true,
      });
      const documentData = {
        fileName: image.filename || image.path.split('/').pop(),
        fileSize: image.size || null,
        height: image.height,
        type: image.mime,
        uri: image.path,
        width: image.width,
      };
      if (currentSide === 'front') {
        setRcFrontImage(documentData);
      } else {
        setRcBackImage(documentData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClickProfile = async side => {
    setCurrentSide(side);
    setCameraOptions(true);
  };

  const uploadRC = async () => {
    if (!rcFrontImage || !rcBackImage) {
      Alert.alert('Please select both front and back images.');
      return;
    }
    // rcUploadRequest(truck_id, [rcFrontImage, rcBackImage]);
    dispatch(initRcVerify(truck_id, [rcFrontImage, rcBackImage]));
  };

  useEffect(() => {
    if (getRcStatus != null) {
      navigation.navigate('Status', {truck_id});
    }
    dispatch(rcVerifyFailure());
  }, [dispatch, getRcStatus, navigation, truck_id]);

  const chooseOptions = () => {
    return (
      <Modal
        onDismiss={() => false}
        animationType="slide"
        transparent={true}
        visible={isCameraOptions}
        onRequestClose={() => {}}>
        <View style={stylesss.modalContainer}>
          <View style={stylesss.modalChildContainer}>
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle color="#252B41" size={26} />
            </TouchableOpacity>
            <View style={stylesss.optionBox}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={stylesss.iconBox}>
                  <Cammera />
                  <Text>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={stylesss.iconBox}>
                  <Gallery />
                  <Text>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {chooseOptions()}
      <View style={styles.setFlex}>
        <View style={stylesss.paramBox}>
          <Text style={styles.RCText}>{t(Constants.RCV_TRUCK)}</Text>
          <Text style={styles.label}>{RC}</Text>
        </View>
        <View style={stylesss.imageBox}>
          <Text style={styles.label}>Upload your {title}*</Text>
          <View style={stylesss.borderLineContainer}>
            <View style={stylesss.innerContainer}>
              <Text>Front Side</Text>
              <TouchableOpacity
                onPress={() => onClickProfile('front')}
                style={styles.touchableOpacityStyle}>
                {getRcLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={GradientColor3}
                    style={styles.activityIndicator}
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={
                      rcFrontImage
                        ? {uri: rcFrontImage.uri}
                        : require('../../../assets/placeholder.png')
                    }
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={styles.cardDetailsView}
            />
            <View
              style={styles.backTextView}>
              <Text style={styles.backTextStyle}>Back Side</Text>
              <TouchableOpacity
                onPress={() => onClickProfile('back')}
                style={styles.touchableOpacityStyle}>
                {getRcLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={GradientColor3}
                    style={styles.activityIndicator}
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={
                      rcBackImage
                        ? {uri: rcBackImage.uri}
                        : require('../../../assets/placeholder.png')
                    }
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.smallText}>
            Maximum file size 2MB (.jpeg/.png/.jpg)
          </Text>
        </View>
      </View>

      <View style={stylesss.seperatorBox}>
        <View style={stylesss.halfHorizontalLine} />
        <Text style={stylesss.orText}>OR</Text>
        <View style={stylesss.halfHorizontalLine} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('QRScanner', {truck_id: truck_id})}
        style={styles.activityIndicator}>
        <QRScanner size={200} />
      </TouchableOpacity>

      <Button
        title="Continue"
        textStyle={styles.buttonTextStyle}
        style={styles.buttonstyle}
        onPress={uploadRC}
      />
    </KeyboardAvoidingView>
  );
};

export default RCVerification;

// const stylesss = StyleSheet.create({
//   modalContainer: {
//     backgroundColor: 'rgba(0,0,0, 0.5)',
//     flex: 1,
//   },
//   modalChildContainer: {
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     position: 'absolute',
//     bottom: 0,
//     marginTop: 200,
//   },
//   iconBox: {justifyContent: 'center', alignItems: 'center'},
//   optionBox: {flexDirection: 'row', justifyContent: 'space-around'},
//   seperatorBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   halfHorizontalLine: {
//     backgroundColor: titleColor,
//     height: 2,
//     flex: 1,
//   },
//   orText: {
//     fontSize: 14,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//     marginHorizontal: 5,
//   },
//   paramBox: {
//     borderRadius: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     backgroundColor: '#FFEBE6',
//   },
//   RCText: {
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//   },
//   imageBox: {marginTop: 20, flex: 1},
//   borderLineContainer: {
//     flexDirection: 'row',
//     borderWidth: 1.5,
//     borderColor: GradientColor3,
//     borderStyle: 'dotted',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 15,
//     flex: 1,
//   },
//   innerContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     marginTop: 5,
//   },
// });
