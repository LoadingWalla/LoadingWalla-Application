import React, {useContext, useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import {NetworkContext} from '../../Context/NetworkContext';
import Gallery from '../../../assets/SVG/Gallery';
import Cammera from '../../../assets/SVG/Gallery';
import NoInternetScreen from '../Details/NoInternetScreen';
import {GradientColor3, titleColor} from '../../Color/color';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {initRcVerify, rcVerifyFailure} from '../../Store/Actions/Actions';

const RCVerification = ({navigation, route}) => {
  const {title, RC, truck_id} = route.params;
  const {isConnected} = useContext(NetworkContext);
  const [rcFrontImage, setRcFrontImage] = useState(null);
  const [rcBackImage, setRcBackImage] = useState(null);
  const [currentSide, setCurrentSide] = useState(null);
  const [isCameraOptions, setCameraOptions] = useState(false);
  const dispatch = useDispatch();

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
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
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
        height: 400,
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
        width: 960,
        height: 1280,
        cropping: true,
        cropperCircleOverlay: true,
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
      alert('Please select both front and back images.');
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
        <View
          style={{
            backgroundColor: 'rgba(0,0,0, 0.5)',
            flex: 1,
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              padding: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              position: 'absolute',
              bottom: 0,
              marginTop: 200,
            }}>
            <Icon
              name="close-circle"
              color="#252B41"
              size={26}
              onPress={() => setCameraOptions(false)}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Cammera />
                  <Text>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
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

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      {chooseOptions()}
      <View style={{flex: 2}}>
        <View
          style={{
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 3,
            backgroundColor: '#FFF',
          }}>
          <Text>{`RC verification for truck no. `}</Text>
          <Text style={styles.label}>{RC}</Text>
        </View>
        <View style={{marginTop: 20, flex: 1}}>
          <Text style={styles.label}>Upload your {title}*</Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1.5,
              borderColor: GradientColor3,
              borderStyle: 'dotted',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 15,
              flex: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Text>Front Side</Text>
              <TouchableOpacity
                onPress={() => onClickProfile('front')}
                style={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                }}>
                {getRcLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={GradientColor3}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                ) : (
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
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
              style={{
                backgroundColor: '#AFAFAF',
                width: 1.5,
                height: '100%',
                marginHorizontal: 10,
              }}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginTop: 5,
              }}>
              <Text style={{textAlign: 'center'}}>Back Side</Text>
              <TouchableOpacity
                onPress={() => onClickProfile('back')}
                style={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                }}>
                {getRcLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={GradientColor3}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
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

      <View
        style={{
          borderColor: 'teal',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        <View
          style={{
            backgroundColor: titleColor,
            height: 2,
            flex: 1,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: titleColor,
            fontFamily: 'PlusJakartaSans-Bold',
            marginHorizontal: 5,
          }}>
          OR
        </Text>
        <View
          style={{
            backgroundColor: titleColor,
            height: 2,
            flex: 1,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('QRScanner', {truck_id: truck_id})}
        style={{
          borderWidth: 1,
          borderColor: GradientColor3,
          borderStyle: 'dotted',
          borderRadius: 5,
          marginBottom: 10,
          flex: 1,
          paddingVertical: 10,
        }}>
        <Image
          style={styles.image}
          source={require('../../../assets/qr-code.png')}
        />
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
