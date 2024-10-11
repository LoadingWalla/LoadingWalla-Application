import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Switch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import * as Constants from '../../Constants/Constant';
import {
  GradientColor2,
  PrivacyPolicy,
  inputColor,
  seperator,
  textColor,
  titleColor,
  white,
} from '../../Color/color';
import Button from '../../Components/Button';
import SearchFilter from '../../Components/SearchFilter';
import RadioButton from '../../Components/RadioButton';
import TruckItem from '../../Components/TruckItem';
import TextInputField from '../../Components/TextInputField';
import {useDispatch, useSelector} from 'react-redux';
import {
  addLorryFailure,
  initAddLorry,
  initLorryRequire,
  initStatusChange,
  initlocationChange,
  initlocationToChange,
  statusChangeFailure,
} from '../../Store/Actions/Actions';
import AddLorryShimmer from '../../Components/Shimmer/AddLorryShimmer';
import {useTranslation} from 'react-i18next';
import styles from './style';

const AddLorry = ({navigation, route}) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [mPermitData, setPermitdata] = useState();
  const [permitRes, setPermitRes] = useState('');
  const [isSeeMore, setSeeMore] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);
  const [isEnabled, setIsEnabled] = useState(true);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState();
  const [searchFromId, setSearchFromId] = useState(0);
  const [searchToId, setSearchToId] = useState(0);
  const [truckId, setTruchId] = useState('');
  const [userType, setUserType] = useState(null);
  const [selectedGPSOption, setSelectedGPSOption] = useState('1');

  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {
    addLorrydata,
    loading,
    status,
    addLorryStatus,
    truckTypeData,
    permitData,
    wheeldata,
    statusChangeLoading,
    statusChange_Status,
    statusChangeData,
    lorryRequireLoading,
  } = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserType');
      setUserType(value);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    dispatch(initLorryRequire());
  }, [dispatch]);

  useEffect(() => {
    if (addLorryStatus === 200) {
      setPermitdata(permitData);
    }
  }, [addLorryStatus, permitData]);

  useEffect(() => {
    if (statusChange_Status === 200) {
      Toast.show(`${statusChangeData}`, Toast.LONG);
      dispatch(statusChangeFailure());
      navigation.goBack();
      return;
    }
  }, [dispatch, navigation, statusChangeData, statusChange_Status]);

  const closeIconClick = closeStatus => {
    if (closeStatus === 'from') {
      setSearchFrom('');
    } else {
      setSearchTo('');
    }
  };

  const navigateToSeach = val => {
    navigation.navigate('Search', {
      locId: val === 'from' ? searchToId : searchFromId,
      onReturn: item => {
        if (val === 'from') {
          dispatch(initlocationChange(item?.place_name));
          setSearchFrom(item?.place_name);
          setSearchFromId(item?.id);
          setSearchTo('Anywhere');
          dispatch(initlocationToChange('Anywhere'));
          return;
        }
        setSearchTo(item?.place_name);
        setSearchToId(item?.id);
        dispatch(initlocationToChange(item?.place_name));
      },
    });
  };

  const saveChanges = () => {
    if (searchFrom === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    dispatch(
      initStatusChange(
        truckId,
        searchFromId,
        searchToId,
        isEnabled ? 1 : 0,
        userType,
      ),
    );
  };

  useEffect(() => {
    if (status === 200) {
      if (route?.params?.from === 'lorry') {
        setViewIndex(1);
        setTruchId(addLorrydata?.truck_id);
      } else {
        navigation.replace('Home');
      }
      dispatch(addLorryFailure());
    } else {
      dispatch(addLorryFailure());
    }
  }, [
    addLorrydata?.truck_id,
    dispatch,
    navigation,
    route?.params?.from,
    status,
  ]);

  const handleChange = e => {
    if (e.id === 1) {
      checkAll(e);
      return;
    }

    let temp = mPermitData.map(product => {
      if (product.id === 1) {
        return {...product, isChecked: false};
      }
      return e.id === product.id
        ? {...product, isChecked: !product.isChecked}
        : product;
    });
    let selectedId = temp?.filter(product => product.isChecked);
    setPermitRes(selectedId);
    setPermitdata(temp);
  };

  const checkAll = e => {
    if ((e.id === 1 && e?.isChecked === false) || e?.isChecked === undefined) {
      let temp = mPermitData.map(item => {
        return {...item, isChecked: true};
      });
      let selectedId = temp?.filter(product => product.isChecked);
      setPermitRes(selectedId);
      setPermitdata(temp);
    } else {
      let temp = mPermitData.map(item => {
        return {...item, isChecked: false};
      });
      let selectedId = temp?.filter(product => product.isChecked);
      setPermitRes(selectedId);
      setPermitdata(temp);
    }
  };

  // const validateVehicleNumber = () => {
  //   const pattern = /^[A-Z]{2}\s[0-9]{2}\s[A-Z]{2}\s[0-9]{4}$/;

  //   if (!pattern.test(vehicleNumber)) {
  //     console.log("Vehicle number doesn't match the expected format.");
  //     return false;
  //   }
  //   return true;
  // };

  const addLorry = async () => {
    // if (!validateVehicleNumber() || vehicleNumber === '') {
    if (vehicleNumber === '') {
      Toast.show('Enter valid vehicle number', Toast.LONG);
      return;
    }
    if (vehicle === '') {
      Toast.show('Select truck', Toast.LONG);
      return;
    }
    if (vehicleType === '') {
      Toast.show('Select Body type', Toast.LONG);
      return;
    }
    if (permitRes === '') {
      Toast.show('Select Permit', Toast.LONG);
      return;
    }

    // console.log(
    //   97879879,
    //   vehicleNumber,
    //   vehicle,
    //   vehicleType,
    //   permitRes,
    //   JSON.stringify(permitRes),
    //   selectedGPSOption,
    // );

    dispatch(
      initAddLorry(
        vehicleNumber,
        vehicle,
        vehicleType,
        permitRes,
        JSON.stringify(permitRes),
        selectedGPSOption,
      ),
    );
  };

  function removeEmojis(input) {
    var result = '';
    if (input.length === 0) {
      return input;
    }
    for (
      var indexOfInput = 0, lengthOfInput = input.length;
      indexOfInput < lengthOfInput;
      indexOfInput++
    ) {
      var charAtSpecificIndex = input[indexOfInput].charCodeAt(0);
      if (charAtSpecificIndex >= 32 && charAtSpecificIndex <= 126) {
        result += input[indexOfInput];
      }
    }
    return result;
  }

  const seeMore = () => {
    return (
      <Modal
        onDismiss={() => false}
        animationType="slide"
        transparent={true}
        visible={isSeeMore}
        style
        onRequestClose={() => {}}>
        <View style={styles.seeMoreModalView1}>
          <View style={styles.seeMoreModalView2}>
            <View style={styles.seeMoreModalView3}>
              <Text style={styles.label}>{'All Permits'}</Text>
              <TruckItem
                backgroundStyle={styles.truckTypeItem}
                unseleckBackground={styles.TyuckTypeUnSelectItem}
                isDone={true}
                checkIcon={false}
                multiple={true}
                renderItem={mPermitData}
                click={e => handleChange(e)}
              />

              <Button
                touchStyle={styles.addLorryBtnTouchStyle}
                onPress={() => {
                  setSeeMore(false);
                }}
                title={'Done'}
                textStyle={styles.buttonTitile}
                style={styles.addLorryBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.MainContainer}>
      {lorryRequireLoading ? (
        <AddLorryShimmer />
      ) : (
        <ScrollView
          style={styles.addLorryScrollView}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {seeMore()}
          {viewIndex === 0 ? (
            <View>
              <Text style={styles.label}>{t(Constants.VEHICLE_NUMBER)}</Text>
              <TextInputField
                value={removeEmojis(vehicleNumber).toUpperCase()}
                hint={'XX 00 XX 0000'}
                onChangeText={e => {
                  let input = e.toUpperCase().replace(/[^A-Z0-9]/g, '');
                  input = input.substring(0, 15);
                  setVehicleNumber(input);
                }}
              />
              <Text style={styles.label}>{t(Constants.TRUCK_TYPE)}</Text>
              <TruckItem
                click={e => setVehicle(e?.id)}
                backgroundStyle={styles.truckItemBgStyle}
                imageRequire={true}
                horizontal={true}
                checkIcon={true}
                unseleckBackground={styles.unseleckBackground}
                renderItem={wheeldata}
              />
              <Text style={styles.label}>{t(Constants.BODY_TYPE)}</Text>
              <TruckItem
                backgroundStyle={styles.truckTypeItem}
                unseleckBackground={styles.TyuckTypeUnSelectItem}
                horizontal={true}
                checkIcon={false}
                renderItem={truckTypeData}
                click={e => setVehicleType(e?.id)}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>{t(Constants.PERMIT)}</Text>
                <TouchableOpacity onPress={() => setSeeMore(true)}>
                  <Text style={styles.seeMoreTxt}>{t(Constants.SEE_MORE)}</Text>
                </TouchableOpacity>
              </View>

              <TruckItem
                backgroundStyle={styles.truckTypeItem}
                unseleckBackground={styles.TyuckTypeUnSelectItem}
                horizontal={true}
                checkIcon={false}
                multiple={true}
                renderItem={mPermitData?.slice(0, 10)}
                click={e => handleChange(e)}
              />

              {/* <View>
                <Text style={styles.label}>{'GPS Tracker*'}</Text>
                <View style={{marginTop: 15, marginLeft: 15}}>
                  <RadioButton
                    label="Get GPS Tracker Now"
                    onPress={() => setSelectedGPSOption('1')}
                    selected={selectedGPSOption === '1'}
                  />
                  <RadioButton
                    label="Already have GPS Tracker"
                    onPress={() => setSelectedGPSOption('0')}
                    selected={selectedGPSOption === '0'}
                  />
                </View>
              </View> */}

              <Button
                loading={loading}
                touchStyle={styles.addLorryTouchStyle}
                onPress={() => {
                  addLorry();
                }}
                title={t(Constants.SAVE_PROCEED)}
                textStyle={styles.buttonTitile}
                style={styles.addLorryBtn}
              />
            </View>
          ) : (
            <View style={styles.addLorryView1}>
              <View style={styles.addLorryView2}>
                <Text style={styles.activeTxt}>{t(Constants.ACTIVE)}</Text>
                <Switch
                  isOn={isEnabled}
                  onColor={GradientColor2}
                  offColor={seperator}
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size="medium"
                  onToggle={isOn => setIsEnabled(isOn)}
                />
              </View>
              <SearchFilter
                defaultValue={searchFrom}
                leftTitle={t(Constants.FROM)}
                closeIconClick={() => closeIconClick('from')}
                onSearchPress={() => navigateToSeach('from')}
                placeholder={t(Constants.SELECT_LOCATION_TITLE)}
              />
              <SearchFilter
                defaultValue={searchTo}
                leftTitle={t(Constants.TO)}
                closeIconClick={() => closeIconClick('to')}
                onSearchPress={() => navigateToSeach('to')}
                placeholder={t(Constants.SELECT_LOCATION_TITLE)}
              />
              <Button //searchLoad()
                onPress={() => saveChanges()}
                title={t(Constants.SAVE)}
                loading={statusChangeLoading}
                textStyle={styles.searchLoadTextStyle}
                style={styles.searchLoadStyle}
              />
              <Text style={styles.noteTxt}>{t(Constants.NOTE)}</Text>
              <View style={styles.skipTxtView}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.skipTxtBdColor}>
                  <Text style={styles.skipTxt}>{t(Constants.SKIP)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AddLorry;

// const styles = StyleSheet.create({
//   MainContainer: {
//     backgroundColor: white,
//     flex: 1,
//   },
//   button: {
//     flexDirection: 'row',
//     borderRadius: 8,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   touchStyle: {
//     marginLeft: 30,
//     marginRight: 30,
//     marginTop: 30,
//   },
//   buttonTitile: {
//     fontWeight: 'bold',
//     color: textColor,
//     fontSize: 16,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   truckTypeItem: {
//     // width: 60,
//     height: 45,
//     paddingHorizontal: 10,
//     minWidth: 45,
//     marginRight: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f19e72',
//   },
//   TyuckTypeUnSelectItem: {
//     height: 45,
//     paddingHorizontal: 10,
//     minWidth: 45,
//     marginRight: 10,
//     marginBottom: 10,
//     backgroundColor: inputColor,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   label: {
//     fontWeight: '700',
//     fontSize: 18,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
// });
