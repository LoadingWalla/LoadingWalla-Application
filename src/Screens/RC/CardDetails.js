import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import {NetworkContext} from '../../Context/NetworkContext';
import Gallery from '../../../assets/SVG/Gallery';
import Cammera from '../../../assets/SVG/Gallery';
import NoInternetScreen from '../Details/NoInternetScreen';
import Button from '../../Components/Button';
import {GradientColor3} from '../../Color/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  documentVerifyFailure,
  initDocumentVerification,
  initDocumentVerify,
} from '../../Store/Actions/Actions';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';

const CardDetails = ({route, navigation}) => {
  const {title, from, headerTitle} = route.params;
  const {isConnected} = useContext(NetworkContext);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarFrontImage, setAadhaarFrontImage] = useState(null);
  const [aadhaarBackImage, setAadhaarBackImage] = useState(null);
  const [isCameraOptions, setCameraOptions] = useState(false);
  const [currentSide, setCurrentSide] = useState(null);
  const dispatch = useDispatch();

  const {
    documentUploadStatus,
    documentUploadLoading,
    getDocumentData,
    getDocumentLoading,
    getDocumentStatus,
  } = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  const regexPatterns = {
    fromAadhar: /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/,
    fromPan: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    fromGst: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  };

  const documentTypeMapping = {
    fromAadhar: 'adhaar_card',
    fromPan: 'pan_card',
    fromGst: 'gst',
  };

  const getStatus = documentType => {
    const document = getDocumentData.find(
      doc => doc.document_type === documentType,
    );
    switch (document?.status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Verified';
      case 2:
        return 'Rejected';
      default:
        return 'Not Verified';
    }
  };

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
        setAadhaarFrontImage(documentData);
      } else {
        setAadhaarBackImage(documentData);
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
        setAadhaarFrontImage(documentData);
      } else {
        setAadhaarBackImage(documentData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onClickProfile = async side => {
    setCurrentSide(side);
    setCameraOptions(true);
  };

  const uploadAadhar = async () => {
    const documentType = documentTypeMapping[from.from];
    const regexPattern = regexPatterns[from.from];

    if (!documentType) {
      alert('Invalid document type');
      return;
    }
    if (!regexPattern.test(aadhaarNumber)) {
      alert('Invalid input. Please enter a valid document number.');
      return;
    }

    if (documentTypeMapping[from.from] === 'adhaar_card') {
      if (!aadhaarFrontImage || !aadhaarBackImage) {
        alert('Please select both front and back images.');
        return;
      }
    } else {
      if (!aadhaarFrontImage) {
        alert('Please select image.');
        return;
      }
    }

    console.log(654654, aadhaarFrontImage);
    console.log(321321, aadhaarBackImage);

    // documentUploadRequest(aadhaarNumber, documentType, [aadhaarFrontImage,aadhaarBackImage]);
    dispatch(
      initDocumentVerify(aadhaarNumber, documentType, [
        aadhaarFrontImage,
        aadhaarBackImage,
      ]),
    );
  };

  useEffect(() => {
    dispatch(initDocumentVerification());
  }, [dispatch]);

  useEffect(() => {
    if (documentUploadStatus === 200) {
      navigation.navigate('KYC');
    }
    dispatch(documentVerifyFailure());
  }, [dispatch, documentUploadStatus, navigation]);

  const chooseOptions = () => {
    return (
      <Modal
        onDismiss={() => false}
        animationType="slide"
        transparent={true}
        visible={isCameraOptions}
        onRequestClose={() => {}}>
        <View style={{backgroundColor: 'rgba(0,0,0, 0.5)', flex: 1}}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              padding: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              position: 'absolute',
              bottom: 0,
              marginTop: 200,
            }}>
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle color="#252B41" size={26} />
            </TouchableOpacity>
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
    <SafeAreaView style={styles.container}>
      {chooseOptions()}
      <View style={styles.otpSection}>
        <Text style={styles.otpLabel}>Enter {title} Number</Text>
        <TextInput
          style={styles.otpInput}
          placeholder={
            from.from === 'fromAadhar'
              ? 'XXXX XXXX XXXX'
              : from.from === 'fromPan'
              ? 'ABCDE1234F'
              : '22AAAAA0000A1Z5'
          }
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
          keyboardType={
            documentTypeMapping[from.from] === 'adhaar_card'
              ? 'numeric'
              : 'default'
          }
        />
        <View style={{flex: 1}}>
          <Text style={styles.otpLabel}>Upload your {title}*</Text>

          {from.from === 'fromAadhar' ? (
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
                height: 200,
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
                  style={{width: '100%', height: '100%', flex: 1}}>
                  {documentUploadLoading ? (
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
                        aadhaarFrontImage
                          ? {uri: aadhaarFrontImage.uri}
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
                  style={{width: '100%', height: '100%', flex: 1}}>
                  {documentUploadLoading ? (
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
                        aadhaarBackImage
                          ? {uri: aadhaarBackImage.uri}
                          : require('../../../assets/placeholder.png')
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
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
                height: 200,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  onPress={() => onClickProfile('front')}
                  style={{width: '100%', height: '100%', flex: 1}}>
                  {documentUploadLoading ? (
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
                        aadhaarFrontImage
                          ? {uri: aadhaarFrontImage.uri}
                          : require('../../../assets/placeholder.png')
                      }
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={styles.smallText}>
            Maximum file size 2MB (.jpeg/.png/.jpg)
          </Text>
        </View>
      </View>

      <Button
        title={
          getStatus(documentTypeMapping[from.from]) === 'Rejected'
            ? 'Re Upload'
            : 'Continue'
        }
        textStyle={styles.buttonTextStyle}
        style={styles.buttonstyle}
        onPress={uploadAadhar}
      />
    </SafeAreaView>
  );
};

export default CardDetails;
