import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../../Constants/Constant';
import {
  ProfileSetupFailure,
  initProfileSetup,
} from '../../../Store/Actions/Actions';
import AlertBox from '../../../Components/AlertBox';
import Gallery from '../../../../assets/SVG/Gallery';
import Cammera from '../../../../assets/SVG/Camera';
import {
  GradientColor2,
  PrivacyPolicy,
  inputColor,
  textColor,
  titleColor,
} from '../../../Color/color';
import TextInputField from '../../../Components/TextInputField';
import Button from '../../../Components/Button';
// import DateTimePickerButton from '../../../Components/DateTimePickerButton';
import CloseCircle from '../../../../assets/SVG/svg/CloseCircle';
import CameraIcon from '../../../../assets/SVG/svg/CameraIcon';
import Toast from 'react-native-simple-toast';
import {useTranslation} from 'react-i18next';
import style from './style';

const EditProfile = ({
  defaultValue,
  isEdit,
  dismissModal,
  editStatus,
  navigation,
}) => {
  const [isCameraOptions, setCameraOptions] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [name, setname] = useState(defaultValue?.name);
  // const [city, setCity] = useState(defaultValue?.city);
  // const [dob, setDob] = useState(
  //   defaultValue?.dob ? new Date(defaultValue.dob) : new Date(),
  // );

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {profileSetupLoading, profileSetupStatus, profileSetupData} =
    useSelector(state => {
      // console.log('Edit profile', state.data);
      return state.data;
    });

  const onClickProfile = async () => {
    setCameraOptions(true);
  };

  useEffect(() => {
    if (profileSetupStatus === 200) {
      editStatus(profileSetupLoading);
      Toast.show(`${profileSetupData.message}`, Toast.LONG);
      dispatch(ProfileSetupFailure());
      dismissModal();
    }
  }, [
    profileSetupStatus,
    dispatch,
    editStatus,
    profileSetupLoading,
    navigation,
  ]);

  const profileSetup = async removeImage => {
    const id = defaultValue?.id;
    if (removeImage) {
      setProfilePic('');
      setCameraOptions(false);
      return dispatch(initProfileSetup(id, '', '', '', '', true));
    }
    const userType = await AsyncStorage.getItem('final_UserType');
    if (name === '') {
      return AlertBox('Enter Name');
    }
    // if (city === '') {
    //   return AlertBox('Enter City');
    // }
    // if (dob === '') {
    //   return AlertBox('Enter DOB');
    // }
    // console.log(88888);
    dispatch(
      initProfileSetup(
        id,
        name || defaultValue?.name,
        defaultValue?.city,
        userType,
        profilePic || defaultValue?.profileImg,
        false,
      ),
    );
  };

  const showAlert = () => {
    Alert.alert(
      '',
      'Remove profile photo?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => profileSetup(true),
        },
      ],
      {cancelable: false},
    );
  };

  const takePhoto = async () => {
    setCameraOptions(false);
    try {
      const image = await ImagePicker.openCamera({
        width: 960,
        height: 1280,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        hideBottomControls: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      });
      // console.log(image);
      const profilePicData = {
        fileName: image.filename || image.path.split('/').pop(),
        fileSize: image.size || null,
        height: image.height,
        type: image.mime,
        uri: image.path,
        width: image.width,
      };
      setProfilePic(profilePicData);
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
        compressImageQuality: 0.8,
        hideBottomControls: true,
        freeStyleCropEnabled: true,
        includeBase64: true,
      });
      const profilePicData = {
        fileName: image.filename || image.path.split('/').pop(),
        fileSize: image.size || null,
        height: image.height,
        type: image.mime,
        uri: image.path,
        width: image.width,
      };

      // console.log(profilePicData);
      setProfilePic(profilePicData);
    } catch (e) {
      console.error(e);
    }
  };

  const chooseOptions = () => {
    const isRemoveButtonDisabled = defaultValue.profileImg === '';
    return (
      <Modal
        onDismiss={() => false}
        animationType="slide"
        transparent={true}
        visible={isCameraOptions}
        onRequestClose={() => {}}>
        <View style={style.chooseOpnOutterView}>
          <View style={style.chooseOtnInnerView}>
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle color="#252B41" size={26} />
            </TouchableOpacity>
            <View style={style.allEditBtnView}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={style.cammeraView}>
                  <Cammera />
                  <Text style={style.CameraText}>{t(Constants.CAMERA)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={style.galleryView}>
                  <Gallery />
                  <Text style={style.CameraText}>{t(Constants.GALLERY)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                disabled={isRemoveButtonDisabled}
                onPress={showAlert}>
                <View style={style.cammeraView}>
                  <Image
                    style={style.editRemoveImg}
                    source={require('../../../../assets/remove.png')}
                  />
                  <Text style={style.CameraText}>{t(Constants.REMOVE)}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <Modal
      onDismiss={() => false}
      animationType="slide"
      transparent={true}
      visible={isEdit}>
      {chooseOptions()}
      <TouchableOpacity activeOpacity={1} style={style.editProfileModalStyle}>
        <View style={style.editModalView}>
          <View style={style.closeBtnView}>
            <TouchableOpacity onPress={() => dismissModal()}>
              <CloseCircle color={GradientColor2} size={30} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <Text style={style.editProfileTitle}>
              {t(Constants.EDIT_PROFILE)}
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => onClickProfile()}>
              <View style={[style.editProfileContainer]}>
                <Image
                  source={
                    profilePic === '' &&
                    (defaultValue?.profileImg === '' ||
                      defaultValue?.profileImg === null)
                      ? require('../../../../assets/placeholder.png')
                      : {
                          uri:
                            profilePic !== ''
                              ? profilePic?.uri
                              : defaultValue?.profileImg,
                        }
                  }
                  resizeMode={'cover'}
                  style={style.editProfileImg}
                />
                <View style={style.profileImgEdit}>
                  <CameraIcon size={15} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            <View style={style.paddingStyle}>
              <Text style={style.editProfileLabel}>{t(Constants.NAME)}</Text>
              <TextInputField
                defaultValue={defaultValue?.name}
                onChangeText={e => setname(e)}
              />
              {/* <Text style={style.label}>{'DOB'}</Text>
              <DateTimePickerButton
                initialDate={dob}
                onDateChange={e => setDob(e)}
              /> */}
              {/* <Text style={style.label}>{(Constants.ENTER_CITY_NAME)}</Text>
              <TextInputField
                defaultValue={defaultValue?.city}
                onChangeText={e => setCity(e)}
              /> */}
              <Text style={style.editProfileLabel}>
                {t(Constants.MOBILE_NUMBER)}
              </Text>
              <Text style={style.mobileTxt}>{defaultValue?.mobile}</Text>
            </View>
            <Button
              loading={profileSetupLoading}
              onPress={() => profileSetup(false)}
              title={t(Constants.UPDATE)}
              textStyle={style.buttonTitile}
              style={[style.button, {margin: 20}]}
            />
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EditProfile;

// const style = StyleSheet.create({
//   button: {
//     flexDirection: 'row',
//     borderRadius: 8,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonTitile: {
//     fontWeight: 'bold',
//     color: textColor,
//     fontSize: 16,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   label: {
//     fontWeight: '700',
//     fontSize: 18,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   CameraText: {
//     fontSize: 15,
//     color: 'black',
//     textAlign: 'center',
//     fontFamily: 'PlusJakartaSans-Medium',
//   },
//   editProfileTitle: {
//     fontWeight: '700',
//     color: titleColor,
//     fontSize: 20,
//     marginBottom: 10,
//     textAlign: 'center',
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   editProfileContainer: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//     alignSelf: 'center',
//     justifyContent: 'center',
//   },
//   profileImgEdit: {
//     height: 25,
//     width: 25,
//     backgroundColor: GradientColor2,
//     borderRadius: 40,
//     position: 'absolute',
//     bottom: -5,
//     left: 30,
//     borderWidth: 1,
//     borderColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileImg: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//   },
//   paddingStyle: {
//     padding: 20,
//   },
//   editModalView: {
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     borderRadius: 8,
//     margin: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     marginTop: 60,
//   },
// });
