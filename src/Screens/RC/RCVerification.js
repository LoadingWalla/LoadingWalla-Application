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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './style';
import Gallery from '../../../assets/SVG/Gallery';
import Cammera from '../../../assets/SVG/Camera';
import {GradientColor3} from '../../Color/color';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {initRcVerify, rcVerifyFailure} from '../../Store/Actions/Actions';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import QRScanner from '../../../assets/SVG/svg/QRScanner';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const RCVerification = ({navigation, route}) => {
  useTrackScreenTime('RCVerification');
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
        <View style={styles.modalContainer}>
          <View style={styles.modalChildContainer}>
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle color="#252B41" size={26} />
            </TouchableOpacity>
            <View style={styles.optionBox}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={styles.iconBox}>
                  <Cammera />
                  <Text>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={styles.iconBox}>
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
        <View style={styles.paramBox}>
          <Text style={styles.RCText}>{t(Constants.RCV_TRUCK)}</Text>
          <Text style={styles.label}>{RC}</Text>
        </View>
        <View style={styles.imageBox}>
          <Text style={styles.label}>Upload your {title}*</Text>
          <View style={styles.borderLineContainer}>
            <View style={styles.innerContainer}>
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
            <View style={styles.cardDetailsView} />
            <View style={styles.backTextView}>
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

      <View style={styles.seperatorBox}>
        <View style={styles.halfHorizontalLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.halfHorizontalLine} />
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
