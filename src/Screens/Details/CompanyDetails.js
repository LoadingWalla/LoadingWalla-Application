import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';
import * as Constants from '../../Constants/Constant';
import Background from '../../Components/BackgroundGradient';
import Gallery from '../../../assets/SVG/Gallery';
import Cammera from '../../../assets/SVG/Camera';
import TextInputField from '../../Components/TextInputField';
import Button from '../../Components/Button';
import {
  ProfileSetupFailure,
  initProfileSetup,
} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import CameraIcon from '../../../assets/SVG/svg/CameraIcon';
import CheckCircle from '../../../assets/SVG/svg/CheckCircle';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const CompanyDetails = ({navigation, route}) => {
  useTrackScreenTime('CompanyDetails');
  const [selected, setSelected] = useState('');
  const [name, setname] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [isCameraOptions, setCameraOptions] = useState(false);
  const dispatch = useDispatch();

  const vehicleTypes = [
    {
      id: 0,
      typeId: 2,
      owner: Constants.LORRY_OWNER,
      image: require('../../../assets/truckowner.png'),
    },
    {
      id: 1,
      typeId: 1,
      owner: Constants.LOAD_OWNER,
      image: require('../../../assets/loadowner.png'),
    },
    {
      id: 2,
      typeId: 3,
      owner: Constants.GPS_OWNER,
      image: require('../../../assets/gpsowner.png'),
    },
  ];

  const {profileSetupStatus, profileSetupLoading} = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const selectOwnerLorry = data => (
    <>
      {selected === data.id && (
        <CheckCircle
          style={styles.checkIconStyle}
          size={20}
          color="white"
        />
      )}

      <View>
        <Image source={data.image} style={styles.protypeimageStyle} />
        <Text
          style={
            selected === data.id ? styles.gridText : styles.gridGreyText
          }>
          {data.owner}
        </Text>
      </View>
    </>
  );

  const handleSelection = index => {
    const selectedItem = vehicleTypes[index];
    setSelected(selectedItem.id);
    AsyncStorage.setItem('UserType', JSON.stringify(selectedItem.typeId));
    setType(selectedItem.typeId);
  };

  const GridView = ({data, index, handleSelection}) => (
    <TouchableOpacity onPress={() => handleSelection(index)}>
      {selected === data.id ? (
        <Background style={styles.selectItem}>
          {selectOwnerLorry(data)}
        </Background>
      ) : (
        <View style={styles.unSelectItem}>{selectOwnerLorry(data)}</View>
      )}
    </TouchableOpacity>
  );

  const localdata = async () => {
    const userType = await AsyncStorage.getItem('UserType');
    if (userType === '1') {
      navigation.replace('LoadHome');
    } else if (userType === '3') {
      navigation.replace('GPSHome');
    } else {
      navigation.replace('Home');
    }
  };

  useEffect(() => {
    if (profileSetupStatus === 200) {
      AsyncStorage.setItem('new_user', '0')
        .then(res => {
          localdata();
        })
        .catch(() => {});
      dispatch(ProfileSetupFailure());
    } else {
      dispatch(ProfileSetupFailure());
    }
  }, [dispatch, profileSetupStatus]);

  const profileSetup = () => {
    if (name === '') {
      Toast.show('Enter Full name', Toast.LONG);
      return;
    }
    // if (city === '') {
    //   Toast.show('Enter city', Toast.LONG);
    //   return;
    // }
    if (type === '') {
      Toast.show('Select Profile Type', Toast.LONG);
      return;
    }
    const id = route?.params.userId;
    dispatch(initProfileSetup(id, name, city, type, profilePic));
  };

  const choosePhoto = async () => {
    setCameraOptions(false);
    try {
      const image = await ImageCropPicker.openPicker({
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

  const handleNameChange = text => {
    // Remove non-alphabet characters using regex
    const updatedText = text.replace(/[^a-zA-Z]/g, '');
    setname(updatedText);
  };

  const navigateToSeach = val => {
    navigation.navigate('Search', {
      onReturn: item => {
        setCity(item?.place_name);
      },
    });
  };
  const closeIconClick = () => {
    setCity('');
  };

  const onClickProfile = async () => {
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
        <View style={styles.chooseOptionBox}>
          <View style={styles.chooseOptionBoxView}>
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle
                color="#252B41"
                size={26}
                onPress={() => setCameraOptions(false)}
              />
            </TouchableOpacity>
            <View style={styles.imagePickerView}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Cammera />
                  <Text style={styles.CameraText}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Gallery />
                  <Text style={styles.CameraText}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.MainContainer, {flex: 1}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => onClickProfile()}>
          <View style={styles.companyDetailsSignupBackground}>
            {chooseOptions()}
            <Text style={styles.WelcomeTruckTitle}>
              {Constants.TELL_US_ABOUT}
            </Text>
            <View style={[styles.profileImgContainer]}>
              <Image
                resizeMode="cover"
                source={
                  profilePic !== ''
                    ? {
                        uri: profilePic?.uri,
                      }
                    : require('../../../assets/placeholder.png')
                }
                style={styles.profileImg}
              />
              {/* <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onClickProfile()}
              > */}
              <View style={[styles.companyDetailsProfileImgEdit]}>
                <CameraIcon size={15} color="white" />
              </View>
              {/* </TouchableOpacity> */}
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.companyDetailsView}>
          <View style={styles.companyDetailsPaddingStyle}>
            <Text style={styles.label}>{Constants.NAME}</Text>
            <TextInputField
              isCloseIcon={false}
              onChangeText={handleNameChange}
            />
            {/* <Text style={styles.label}>{(Constants.ENTER_CITY_NAME)}</Text>
            <TextInputField
              isCloseIcon={false}
              onChangeText={(e) => setCity(e)}
            />
            <TextInputField
              isText={true}
              defaultValue={city}
              isCloseIcon={true}
              onSearchPress={() => navigateToSeach()}
              closeIconClick={() => closeIconClick()}
            /> */}
            <Text style={styles.label}>{Constants.iam}</Text>
            <FlatList
              style={styles.flatListStyle}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={vehicleTypes}
              renderItem={({item, index}) => (
                <GridView
                  data={item}
                  index={index}
                  handleSelection={handleSelection}
                />
              )}
            />
          </View>
          <Button
            loading={profileSetupLoading}
            onPress={() => profileSetup()}
            title={Constants.CONTINUE}
            textStyle={styles.buttonTitile}
            style={styles.companyDetailsBtn}
            touchStyle={styles.companyDetailsTouchStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDetails;
