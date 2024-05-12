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
      label: Constants.FIXED,
    },
    {
      id: 2,
      label: Constants.PER_TON,
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
      showsHorizontalScrollIndicator={false}>
      <View style={styleSheet.backgroundViewContainer}>
        <SearchFilter
          defaultValue={searchFrom}
          leftTitle={Constants.FROM}
          closeIconClick={() => closeIconClick('from')}
          placeholder={Constants.SELECT_LOCATION_TITLE}
          onSearchPress={() => navigateToSeach('from')}
        />
        <SearchFilter
          defaultValue={searchTo}
          leftTitle={Constants.TO}
          closeIconClick={() => closeIconClick('to')}
          placeholder={Constants.SELECT_LOCATION_TITLE}
          onSearchPress={() => navigateToSeach()}
        />
        <View style={styleSheet.ItemView}>
          <Text style={styleSheet.label}>{`${Constants.QUANTITY} (Ton)`}</Text>
          <TextInputField
            isPhone
            value={quantity}
            // onChangeText={(e) => setQuantity(e)}
            onChangeText={e => {
              const sanitizedInput = e.replace(/\s+/g, '');
              setQuantity(sanitizedInput);
            }}
          />
          <Text style={styleSheet.label}>{Constants.MATERIAL_NAME}</Text>
          <TextInputField
            value={materialName}
            // onChangeText={(e) => setMaterialName(e)}
            onChangeText={e => {
              const sanitizedInput = e.replace(/\s+/g, '');
              setMaterialName(sanitizedInput);
            }}
          />
          <Text style={styleSheet.label}>{Constants.SELECT_TRUCK}</Text>
          <TruckItem
            click={e => setTruckItem(e?.id)}
            backgroundStyle={{
              padding: 20,
              marginRight: 10,
              marginBottom: 10,
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
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            renderItem={DashboardData}
          />
          <Text style={styleSheet.label}>{Constants.PRICE}</Text>
          <TextInputField
            isPhone={true}
            value={price}
            // onChangeText={(e) => setPrice(e)}
            onChangeText={e => {
              const sanitizedInput = e.replace(/\s+/g, '');
              setPrice(sanitizedInput);
            }}
          />
          <Text style={styleSheet.label}>{Constants.SELECT_PRICE_TYPE}</Text>
          <TruckItem
            backgroundStyle={styleSheet.truckTypeItem}
            unseleckBackground={styleSheet.TyuckTypeUnSelectItem}
            horizontal={true}
            checkIcon={false}
            renderItem={truckLoadCapacity}
            click={e => setWeight(e)}
          />
          <Button
            loading={myPostLoadLoading}
            onPress={() => postLoadSubmit()}
            title={Constants.POST_LOADS}
            textStyle={styleSheet.buttonTitile}
            style={[styleSheet.button, {marginTop: 20}]}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PostLoads;

const styleSheet = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderRadius: 28,
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
  truckTypeItem: {
    // width: 60,
    height: 45,
    paddingHorizontal: 10,
    minWidth: 45,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f19e72',
  },
  TyuckTypeUnSelectItem: {
    height: 45,
    paddingHorizontal: 10,
    minWidth: 45,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: inputColor,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
    fontSize: 18,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  ItemView: {marginTop: 30},
  backgroundViewContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: pageBackground,
    height: '100%',
    justifyContent: 'center',
  },
});
