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
import {useTranslation} from 'react-i18next';
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
  black,
  inputColor,
  textColor,
  titleColor,
} from '../../../Color/color';
import TextInputField from '../../../Components/TextInputField';
import Button from '../../../Components/Button';
import DateTimePickerButton from '../../../Components/DateTimePickerButton';
import CloseCircle from '../../../../assets/SVG/svg/CloseCircle';
import CameraIcon from '../../../../assets/SVG/svg/CameraIcon';

const EditProfile = ({
  isEdit,
  dismissModal,
  editStatus,
  defaultValue,
  navigation,
}) => {
  const [isCameraOptions, setCameraOptions] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [name, setname] = useState(defaultValue?.name);
  const [city, setCity] = useState(defaultValue?.city);
  const [dob, setDob] = useState(
    defaultValue?.dob ? new Date(defaultValue.dob) : new Date(),
  );

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {profileSetupLoading, profileSetupStatus} = useSelector(
    state => state.data,
  );

  const onClickProfile = async () => {
    setCameraOptions(true);
  };

  useEffect(() => {
    if (profileSetupStatus === 200) {
      editStatus(profileSetupLoading);
      dispatch(ProfileSetupFailure());
    }
  }, [profileSetupStatus, dispatch, editStatus, profileSetupLoading]);

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
    if (dob === '') {
      return AlertBox('Enter DOB');
    }
    // console.log(88888, city);
    dispatch(
      initProfileSetup(
        id,
        name || defaultValue?.name,
        city || defaultValue?.city,
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
        compressImageQuality: 1,
        hideBottomControls: true,
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
        compressImageQuality: 1,
        hideBottomControls: true,
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
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle
                color="#252B41"
                size={26}
                onPress={() => setCameraOptions(false)}
              />
            </TouchableOpacity>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Cammera />
                  <Text style={style.CameraText}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Gallery />
                  <Text style={style.CameraText}>Gallery</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                disabled={isRemoveButtonDisabled}
                onPress={showAlert}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{height: 35, width: 40}}
                    source={require('../../../../assets/remove.png')}
                  />
                  <Text style={style.CameraText}>Remove</Text>
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
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0, 0.5)',
          justifyContent: 'center',
        }}>
        <View style={style.editModalView}>
          <View style={{alignItems: 'flex-end'}}>
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
                  style={style.profileImg}
                />
                <View style={style.profileImgEdit}>
                  <CameraIcon size={15} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            <View style={style.paddingStyle}>
              <Text style={style.label}>{t(Constants.NAME)}</Text>
              <TextInputField
                defaultValue={defaultValue?.name}
                onChangeText={e => setname(e)}
              />
              {/* <Text style={style.label}>{'DOB'}</Text>
              <DateTimePickerButton
                initialDate={dob}
                onDateChange={e => setDob(e)}
              /> */}
              {/* <Text style={style.label}>{t(Constants.ENTER_CITY_NAME)}</Text>
              <TextInputField
                defaultValue={defaultValue?.city}
                onChangeText={e => setCity(e)}
              /> */}
              <Text style={style.label}>Mobile number</Text>
              <Text
                style={{
                  backgroundColor: inputColor,
                  marginTop: 12,
                  borderRadius: 8,
                  padding: 15,
                  color: PrivacyPolicy,
                }}>
                {defaultValue?.mobile}
              </Text>
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

const style = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitile: {
    fontWeight: 'bold',
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  label: {
    fontWeight: '700',
    fontSize: 18,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  CameraText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  editProfileTitle: {
    fontWeight: '700',
    color: titleColor,
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  editProfileContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  profileImgEdit: {
    height: 25,
    width: 25,
    backgroundColor: GradientColor2,
    borderRadius: 40,
    position: 'absolute',
    bottom: -5,
    left: 30,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  paddingStyle: {
    padding: 20,
  },
  editModalView: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 60,
  },
});
