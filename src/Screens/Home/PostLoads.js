import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as Constants from '../../Constants/Constant';
import SearchFilter from '../../Components/SearchFilter';
import TextInputField from '../../Components/TextInputField';
import TruckItem from '../../Components/TruckItem';
import {
  inputColor,
  pageBackground,
  textColor,
  titleColor,
} from '../../Color/color';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  initLoadTrucks,
  initMyPostLoad,
  myPostLoadFailure,
} from '../../Store/Actions/Actions';
import {useTranslation} from 'react-i18next';
import styles from './style'

const PostLoads = ({navigation, route}) => {
  const [searchFrom, setSearchFrom] = useState(
    !!route?.params?.from ? route?.params?.from : '',
  );
  const [searchTo, setSearchTo] = useState(
    !!route?.params?.to ? route?.params?.to : '',
  );

  const [searchFromId, setSearchFromId] = useState(
    !!route?.params?.fromId ? route?.params?.fromId : 0,
  );
  const [searchToId, setSearchToId] = useState(
    !!route?.params?.toId ? route?.params?.toId : 0,
  );
  const [allLocation, setAllLocation] = useState([]);
  const [showLocationFrom, setLocationFrom] = useState(false);
  const [showLocationTo, setLocationTo] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [truckItem, setTruckItem] = useState('');
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {
    locationData,
    DashboardData,
    myPostLoadLoading,
    myPostLoadStatus,
    myPostLoadData,
  } = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  useEffect(() => {
    setAllLocation(locationData);
  }, [locationData]);

  useEffect(() => {
    dispatch(initLoadTrucks());
  }, [dispatch]);

  useEffect(() => {
    if (myPostLoadStatus === 200) {
      Toast.show(`${myPostLoadData?.data?.message}`, Toast.LONG);
      // AlertBox(myPostLoadData?.data?.message);
      dispatch(myPostLoadFailure());
      navigation.goBack();
      return;
    }
  }, [dispatch, myPostLoadData?.data?.message, myPostLoadStatus, navigation]);

  const truckLoadCapacity = [
    {
      id: 1,
      label: t(Constants.FIXED),
    },
    {
      id: 2,
      label: t(Constants.PER_TON),
    },
  ];
  const postLoadSubmit = () => {
    if (searchFrom === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    if (searchTo === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    if (quantity === '') {
      Toast.show('Enter quantity', Toast.LONG);
      return;
    }
    if (materialName === '') {
      Toast.show('Enter material name', Toast.LONG);
      return;
    }
    if (truckItem === '') {
      Toast.show('Select truck', Toast.LONG);
      return;
    }
    if (price === '') {
      Toast.show('Enter price', Toast.LONG);
      return;
    }
    if (weight === '') {
      Toast.show('Select price type', Toast.LONG);
      return;
    }
    dispatch(
      initMyPostLoad(
        searchFromId,
        searchToId,
        quantity,
        materialName,
        truckItem,
        price,
        weight?.id,
      ),
    );
  };

  const closeIconClick = closeStatus => {
    if (closeStatus === 'from') {
      setSearchFrom('');
      setLocationFrom(false);
    } else {
      setSearchTo('');
      setLocationTo(false);
    }
  };

  const navigateToSeach = val => {
    navigation.navigate('Search', {
      allLocation,
      locId: val === 'from' ? searchToId : searchFromId,
      onReturn: item => {
        if (val === 'from') {
          setSearchFrom(item?.place_name);
          setSearchFromId(item?.id);
          return;
        }
        setSearchTo(item?.place_name);
        setSearchToId(item?.id);
      },
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollViewBox}>
      <View style={styles.postLoadBackgroundViewContainer}>
        <View>
          <SearchFilter
            defaultValue={searchFrom}
            leftTitle={t(Constants.FROM)}
            closeIconClick={() => closeIconClick('from')}
            placeholder={t(Constants.SELECT_LOCATION_TITLE)}
            onSearchPress={() => navigateToSeach('from')}
          />
          <SearchFilter
            defaultValue={searchTo}
            leftTitle={t(Constants.TO)}
            closeIconClick={() => closeIconClick('to')}
            placeholder={t(Constants.SELECT_LOCATION_TITLE)}
            onSearchPress={() => navigateToSeach()}
          />
        </View>
        <View style={styles.ItemView}>
          <View>
            <Text style={styles.label}>{`${t(
              Constants.QUANTITY,
            )} (Ton)`}</Text>
            <TextInputField
              isPhone
              value={quantity}
              // onChangeText={(e) => setQuantity(e)}
              onChangeText={e => {
                const sanitizedInput = e.replace(/\s+/g, '');
                setQuantity(sanitizedInput);
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>{t(Constants.MATERIAL_NAME)}</Text>
            <TextInputField
              value={materialName}
              // onChangeText={(e) => setMaterialName(e)}
              onChangeText={e => {
                // const sanitizedInput = e.replace(/\s+/g, '');
                const sanitizedInput = e.replace(/[^a-zA-Z0-9]/g, '');
                setMaterialName(sanitizedInput);
              }}
            />
          </View>
          <View>
            <Text style={styles.label}>{t(Constants.SELECT_TRUCK)}</Text>
            <TruckItem
              click={e => setTruckItem(e?.id)}
              backgroundStyle={{
                padding: 20,
                marginRight: 10,
                // marginBottom: 10,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              imageRequire={true}
              horizontal={true}
              checkIcon={true}
              unseleckBackground={{
                padding: 20,
                backgroundColor: inputColor,
                borderRadius: 8,
                marginRight: 10,
                // marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              renderItem={DashboardData}
            />
          </View>
          <View>
            <Text style={styles.label}>{t(Constants.PRICE)}</Text>
            <TextInputField
              isPhone={true}
              value={price}
              // onChangeText={(e) => setPrice(e)}
              onChangeText={e => {
                const sanitizedInput = e.replace(/\s+/g, '');
                setPrice(sanitizedInput);
              }}
            />
          </View>
          <View style={styles.selectTrucType}>
            <Text style={styles.label}>
              {t(Constants.SELECT_PRICE_TYPE)}
            </Text>
            <TruckItem
              backgroundStyle={styles.truckTypeItem}
              unseleckBackground={styles.TyuckTypeUnSelectItem}
              horizontal={true}
              checkIcon={false}
              renderItem={truckLoadCapacity}
              click={e => setWeight(e)}
            />
          </View>
          <Button
            loading={myPostLoadLoading}
            onPress={() => postLoadSubmit()}
            title={t(Constants.POST_LOADS)}
            textStyle={styles.postLoadButtonTitile}
            style={styles.postLoadButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PostLoads;

// const styles = StyleSheet.create({
//   button: {
//     flexDirection: 'row',
//     borderRadius: 10,
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
//     // borderWidth: 1,
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
//   ItemView: {marginTop: 20},
//   backgroundViewContainer: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//     // backgroundColor: pageBackground,
//     // height: '100%',
//     // borderWidth: 1,
//   },
//   scrollViewBox: {
//     flex: 1,
//     backgroundColor: '#FDFDFD',
//   },
//   selectTrucType: {minWidth: '45%', maxWidth: '50%'},
// });
