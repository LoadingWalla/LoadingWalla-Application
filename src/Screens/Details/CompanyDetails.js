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
  StyleSheet,
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
import {
  GradientColor2,
  inputColor,
  pageBackground,
  textColor,
  titleColor,
  white,
} from '../../Color/color';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import CameraIcon from '../../../assets/SVG/svg/CameraIcon';
import CheckCircle from '../../../assets/SVG/svg/CheckCircle';

const CompanyDetails = ({navigation, route}) => {
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
          style={styleSheet.checkIconStyle}
          size={20}
          color="white"
        />
      )}

      <View>
        <Image source={data.image} style={styleSheet.protypeimageStyle} />
        <Text
          style={
            selected === data.id ? styleSheet.gridText : styleSheet.gridGreyText
          }>
          {data.owner}
        </Text>
      </View>
    </>
  );

  // const GridView = ({data, index}) => {
  //   if (selected === data.id) {
  //     AsyncStorage.setItem('UserType', JSON.stringify(data.typeId));
  //     setType(data.typeId);
  //   }
  //   return (
  //     <TouchableOpacity onPress={() => setSelected(index)}>
  //       {selected === data.id ? (
  //         <Background style={styleSheet.selectItem}>
  //           {selectOwnerLorry(data)}
  //         </Background>
  //       ) : (
  //         <View style={styleSheet.unSelectItem}>{selectOwnerLorry(data)}</View>
  //       )}
  //     </TouchableOpacity>
  //   );
  // };

  const handleSelection = index => {
    const selectedItem = vehicleTypes[index];
    setSelected(selectedItem.id);
    AsyncStorage.setItem('UserType', JSON.stringify(selectedItem.typeId));
    setType(selectedItem.typeId);
  };

  const GridView = ({data, index, handleSelection}) => (
    <TouchableOpacity onPress={() => handleSelection(index)}>
      {selected === data.id ? (
        <Background style={styleSheet.selectItem}>
          {selectOwnerLorry(data)}
        </Background>
      ) : (
        <View style={styleSheet.unSelectItem}>{selectOwnerLorry(data)}</View>
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
        <View style={styleSheet.chooseOptionBox}>
          <View style={styleSheet.chooseOptionBoxView}>
            <TouchableOpacity onPress={() => setCameraOptions(false)}>
              <CloseCircle
                color="#252B41"
                size={26}
                onPress={() => setCameraOptions(false)}
              />
            </TouchableOpacity>
            <View style={styleSheet.imagePickerView}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => takePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Cammera />
                  <Text style={styleSheet.CameraText}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => choosePhoto()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Gallery />
                  <Text style={styleSheet.CameraText}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styleSheet.MainContainer, {flex: 1}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => onClickProfile()}>
          <View style={styleSheet.signupBackground}>
            {chooseOptions()}
            <Text style={styleSheet.WelcomeTruckTitle}>
              {Constants.TELL_US_ABOUT}
            </Text>
            <View style={[styleSheet.profileImgContainer]}>
              <Image
                resizeMode="cover"
                source={
                  profilePic !== ''
                    ? {
                        uri: profilePic?.uri,
                      }
                    : require('../../../assets/placeholder.png')
                }
                style={styleSheet.profileImg}
              />
              {/* <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onClickProfile()}
              > */}
              <View style={[styleSheet.profileImgEdit]}>
                <CameraIcon size={15} color="white" />
              </View>
              {/* </TouchableOpacity> */}
            </View>
          </View>
        </TouchableOpacity>
        <View style={{marginBottom: 30}}>
          <View style={styleSheet.paddingStyle}>
            <Text style={styleSheet.label}>{Constants.NAME}</Text>
            <TextInputField
              isCloseIcon={false}
              onChangeText={handleNameChange}
            />
            {/* <Text style={styleSheet.label}>{(Constants.ENTER_CITY_NAME)}</Text> */}
            {/* <TextInputField
              isCloseIcon={false}
              onChangeText={(e) => setCity(e)}
            /> */}
            {/* <TextInputField
              isText={true}
              defaultValue={city}
              isCloseIcon={true}
              onSearchPress={() => navigateToSeach()}
              closeIconClick={() => closeIconClick()}
            /> */}
            <Text style={styleSheet.label}>{Constants.iam}</Text>
            <FlatList
              style={styleSheet.flatListStyle}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={vehicleTypes}
              // renderItem={({item, index}) => (
              //   <GridView data={item} index={index} />
              // )}
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
            textStyle={styleSheet.buttonTitile}
            style={styleSheet.button}
            touchStyle={styleSheet.touchStyle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDetails;

const styleSheet = StyleSheet.create({
  MainContainer: {
    backgroundColor: white,
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    borderRadius: 28,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchStyle: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
  protypeimageStyle: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 5,
  },
  checkIconStyle: {position: 'absolute', top: 5, left: 5},
  flatListStyle: {marginTop: 12, marginBottom: 20},
  buttonTitile: {
    fontWeight: 'bold',
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  selectItem: {
    padding: 18,
    margin: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unSelectItem: {
    padding: 18,
    backgroundColor: inputColor,
    borderRadius: 8,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
  signupBackground: {
    padding: 20,
    backgroundColor: pageBackground,
    justifyContent: 'center',
    marginTop: 25,
    alignItems: 'center',
  },
  WelcomeTruckTitle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Medium',
  },
  gridText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    // marginTop: 5,
    // paddingBottom: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  gridGreyText: {
    fontSize: 12,
    color: titleColor,
    // marginTop: 5,
    // paddingBottom: 5,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  profileImgContainer: {
    height: 80,
    width: 80,
    marginTop: 30,
    borderRadius: 40,
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
  imagePickerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chooseOptionBox: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    flex: 1,
  },
  chooseOptionBoxView: {
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
  },
});
