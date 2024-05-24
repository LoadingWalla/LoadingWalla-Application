import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import {
  GradientColor2,
  GradientColor3,
  GradientColor4,
  PrivacyPolicy,
  backgroundColorNew,
  titleColor,
  white,
} from '../../Color/color';
import RadioButton from '../../Components/RadioButton';
import CheckBox from '@react-native-community/checkbox';
import * as Constants from '../../Constants/Constant';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';
import UploadDocument from '../../../assets/SVG/svg/UploadDocument';
import CardHeader from '../../Components/CardHeader';
import ImagePicker from 'react-native-image-crop-picker';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import Gallery from '../../../assets/SVG/Gallery';
import Cammera from '../../../assets/SVG/Camera';
import {useDispatch} from 'react-redux';
import {initCompleteBookingDocumentRequest} from '../../Store/Actions/Actions';
import AlertBox from '../../Components/AlertBox';

const CompleteBooking = ({navigation, route}) => {
  const {
    id,
    from,
    to,
    name,
    icon,
    material_name,
    qty,
    vehicle_number,
    price,
    price_type,
  } = route.params.item;
  // console.log(88888888888888, route.params.item);
  const userType = route.params.userType;
  const dispatch = useDispatch();
  // console.log(88888, route);
  const [selectedDocumentType, setSelectedDocumentType] = useState(1);
  const [isChecked, setIsChecked] = useState(true);
  const [isCameraOptions, setCameraOptions] = useState(false);
  const [documentImage, setDocumentImage] = useState(null);

  const completeOrder = () => {
    if (!isChecked) {
      AlertBox(
        'You must accept the terms and conditions to complete the order.',
      );
      return;
    }
    console.log(222222, id, selectedDocumentType, documentImage);
    dispatch(
      initCompleteBookingDocumentRequest(
        id,
        selectedDocumentType,
        documentImage,
      ),
    );
  };

  const takePhoto = async () => {
    setCameraOptions(false);
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.8,
        freeStyleCropEnabled: true,
        includeBase64: true,
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
      setDocumentImage(documentData);
    } catch (e) {
      console.error('Take photo error', e);
    }
  };

  const choosePhoto = async () => {
    setCameraOptions(false);
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
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
      setDocumentImage(documentData);
    } catch (e) {
      console.error(e);
    }
  };

  const onClickProfile = () => {
    setCameraOptions(true);
  };

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

  return (
    <View style={styles.container}>
      {chooseOptions()}
      <View
        style={{
          padding: 10,
          backgroundColor: '#FFFFFF',
          elevation: 2,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        <CardHeader from={from} to={to} icon={icon} />
        <View style={styles.horizontalLine} />
        <View style={styles.rowdirection}>
          <View style={styles.point} />
          <Text style={styles.smallImageHeaderTitle}>{name}</Text>
        </View>
        <View style={styles.rowdirection}>
          <View style={styles.point} />
          <Text style={styles.smallImageHeaderTitle}>
            {`₹ ${price} / ${price_type === 2 ? 'Fixed' : 'Per Truck'}`}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textStyle}>Weight</Text>
            <Text style={styles.textStyle}>{`: ${qty} Ton`}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textStyle}>Type</Text>
            <Text style={styles.textStyle}>
              {`: ${userType === 2 ? vehicle_number : material_name}`}
            </Text>
          </View>
        </View>
      </View>
      <View
        // contentContainerStyle={{padding: 20, borderWidth: 1, flex: 1}}
        style={{padding: 20, flex: 1}}>
        <View style={{flex: 0.2}}>
          <Text style={styles.header}>Upload BILTY/POD</Text>
          <Text style={styles.subheader}>
            Confirm your delivery by uploading your BILTY / POD from load owner
          </Text>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              elevation: 2,
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <View style={styles.selectorContainer}>
              <Text style={styles.headerText}>Select document to Upload</Text>
              <View style={styles.radioButtonContainer}>
                <RadioButton
                  label="BILTY"
                  onPress={() => setSelectedDocumentType(1)}
                  selected={selectedDocumentType === 1}
                  OuterCircleSize={18}
                  InnerCircleSize={9}
                  font={14}
                />
                <RadioButton
                  label="POD"
                  onPress={() => setSelectedDocumentType(0)}
                  selected={selectedDocumentType === 0}
                  OuterCircleSize={18}
                  InnerCircleSize={9}
                  font={14}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => onClickProfile()}
              style={styles.documentContainer}>
              <UploadDocument />
              <Text style={styles.filename}>Uploadedfilename.png</Text>
            </TouchableOpacity>
            {/* <InnerButton
              enabledStyle={styles.findButtonContainer}
              textStyle={styles.findButtonText}
              title={'Upload'}
              navigation={() => {}}
            /> */}
          </View>
        </View>
        <View style={styles.centerItem}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={() => setIsChecked(!isChecked)}
              tintColors={{true: GradientColor2, false: GradientColor4}}
              style={styles.checkBoxStyle}
            />
            <Text style={{color: PrivacyPolicy}}>I agree the </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: backgroundColorNew,
                  textDecorationLine: 'underline',
                }}>
                terms & conditions
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.completeOrderButton}
            onPress={completeOrder}>
            <Text style={styles.completeOrderButtonText}>Complete order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CompleteBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFD',
  },
  subheader: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },
  selectorContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    // borderWidth: 1,
  },
  header: {
    flex: 1,
    fontSize: 14,
    color: titleColor,
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    paddingRight: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: titleColor,
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'left',
    paddingRight: 5,
  },
  radioButtonContainer: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginStart: 5,
  },
  documentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
    padding: 10,
    // marginBottom: 20,
    borderRadius: 10,
  },
  documentImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  filename: {
    fontSize: 16,
    color: 'black',
  },
  uploadButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 20,
    marginRight: 10,
  },
  termsLabel: {
    fontSize: 16,
  },
  completeOrderButton: {
    backgroundColor: GradientColor3,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  completeOrderButtonText: {
    color: 'white',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
  },
  findButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
    width: 100,
    alignItems: 'center',
    alignSelf: 'center',
  },
  findButtonText: {
    fontSize: 13,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  centerItem: {
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
    // borderWidth: 1,
    bottom: 0,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkBoxStyle: {marginRight: 10},
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  rowdirection: {flexDirection: 'row', alignItems: 'center'},
  point: {
    height: 8,
    width: 8,
    backgroundColor: PrivacyPolicy,
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  smallImageHeaderTitle: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  textStyle: {
    color: '#352422',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
