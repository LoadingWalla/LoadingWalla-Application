import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import Gallery from '../../../assets/SVG/Gallery';
import Cammera from '../../../assets/SVG/Camera';
import Button from '../../Components/Button';
import {GradientColor3, PrivacyPolicy} from '../../Color/color';
import {useDispatch, useSelector} from 'react-redux';
import {
  documentVerifyFailure,
  initDocumentVerification,
  initDocumentVerify,
} from '../../Store/Actions/Actions';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import * as Constants from '../../Constants/Constant';

const CardDetails = ({route, navigation}) => {
  const {title, from, headerTitle} = route.params;
  // console.log(9999, route);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarFrontImage, setAadhaarFrontImage] = useState(null);
  const [aadhaarBackImage, setAadhaarBackImage] = useState(null);
  const [isCameraOptions, setCameraOptions] = useState(false);
  const [currentSide, setCurrentSide] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState();
  const dispatch = useDispatch();
  const {t} = useTranslation();

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
  };

  const documentTypeMapping = {
    fromAadhar: 'aadhar',
    fromPan: 'pan',
    // fromBusiness: 'business',
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
        height: 200,
        cropping: true,
        compressImageQuality: 0.8,
        freeStyleCropEnabled: true,
        includeBase64: true,
        hideBottomControls: true,
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
        width: 300,
        height: 200,
        cropping: true,
        cropperCircleOverlay: false,
        compressImageQuality: 0.8,
        hideBottomControls: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
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
    const documentType =
      from.from === 'business'
        ? selectedDocument
        : documentTypeMapping[from.from];

    if (!documentType) {
      Alert.alert('Invalid document type');
      return;
    }

    if (documentTypeMapping[from.from] === 'aadhar') {
      if (!aadhaarFrontImage || !aadhaarBackImage) {
        Alert.alert('Please select both front and back images.');
        return;
      }
    } else {
      if (!aadhaarFrontImage) {
        Alert.alert('Please select image.');
        return;
      }
    }

    // console.log('documet sumbitted ---->', aadhaarNumber, documentType, [
    //   aadhaarFrontImage,
    //   aadhaarBackImage,
    // ]);

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
        <View style={styles.fullScreenContainer}>
          <View
            style={styles.chooseOptionsView1}>
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle color="#252B41" size={26} />
            </TouchableOpacity>
            <View
              style={styles.chooseOptionsView2}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={styles.centeredText}>
                  <Cammera />
                  <Text>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={styles.centeredText}>
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

  const business = [
    {id: 0, code: '', name: t(Constants.SEL_DOC_TYPE)},
    {id: 1, code: 'gst', name: 'GST'},
    {id: 2, code: 'udyog', name: 'Udyog Aadhar'},
    {id: 3, code: 'trade', name: 'Trade License'},
    // {id: 4, code: 'utility', name: 'Utility Bill'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {chooseOptions()}
      {from.from === 'business' && (
        <View
          style={styles.docPickerView}>
          <Picker
            selectedValue={selectedDocument}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDocument(itemValue)
            }
            style={styles.setPrivacyPolicy}
            mode="dropdown" // Android only
            dropdownIconColor={PrivacyPolicy}>
            {business?.map(doc => (
              <Picker.Item
                key={doc.id}
                label={doc.name}
                value={doc.code}
                color={PrivacyPolicy}
              />
            ))}
          </Picker>
        </View>
      )}
      <View style={styles.otpSection}>
        <Text style={styles.otpLabel}>{`${t(Constants.ENTER)} ${title} ${t(
          Constants.NUMBER,
        )}`}</Text>
        <TextInput
          style={styles.otpInput}
          placeholder={
            from.from === 'fromAadhar'
              ? 'XXXX XXXX XXXX'
              : from.from === 'fromPan'
              ? 'ABCDE1234F'
              : t(Constants.ENTER_DOC_NUM)
          }
          value={aadhaarNumber}
          placeholderTextColor={PrivacyPolicy}
          onChangeText={setAadhaarNumber}
          maxLength={20}
          keyboardType={
            documentTypeMapping[from.from] === 'aadhar' ? 'numeric' : 'default'
          }
        />
        <View style={styles.setFlex}>
          <Text style={styles.otpLabel}>{title}</Text>

          {from.from === 'fromAadhar' ? (
            <View
              style={styles.fromAadharView}>
              <View
                style={styles.frontTxt}>
                <Text>{t(Constants.FRONT)}</Text>
                <TouchableOpacity
                  onPress={() => onClickProfile('front')}
                  style={styles.touchableOpacityStyle}>
                  {documentUploadLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={GradientColor3}
                      style={styles.docUploadLoading}
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
                style={styles.cardDetailsView}
              />
              <View
                style={styles.backTextView}>
                <Text style={styles.backTextStyle}>{t(Constants.BACK)}</Text>
                <TouchableOpacity
                  onPress={() => onClickProfile('back')}
                  style={styles.touchableOpacityStyle}>
                  {documentUploadLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={GradientColor3}
                      style={styles.docUploadLoading}
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
              style={styles.frontImgView}>
              <View
                style={styles.touchableOpacityView}>
                <TouchableOpacity
                  onPress={() => onClickProfile('front')}
                  style={styles.activityIndicatorBox}>
                  {documentUploadLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={GradientColor3}
                      style={styles.activityIndicator}
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

          {/* <Text style={styles.smallText}>
            Maximum file size 2MB (.jpeg/.png/.jpg)
          </Text> */}
        </View>
      </View>

      <Button
        title={
          getStatus(documentTypeMapping[from.from]) === 'Rejected'
            ? t(Constants.REUPLOAD)
            : t(Constants.CONTINUE)
        }
        textStyle={styles.buttonTextStyle}
        style={styles.buttonstyle}
        onPress={uploadAadhar}
      />
    </SafeAreaView>
  );
};

export default CardDetails;
