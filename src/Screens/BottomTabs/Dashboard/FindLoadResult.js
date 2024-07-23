import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  Animated,
  BackHandler,
  Easing,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';
import * as Constants from '../../../Constants/Constant';
import {initFindLoad} from '../../../Store/Actions/Actions';
import CardHeader from '../../../Components/CardHeader';
import InnerButton from '../../../Components/InnerButton';
import {DialCall} from '../../../Utils/DialCall';

import SearchFilter from '../../../Components/SearchFilter';
import LocationModal from '../../../Components/LocationModal';
import Button from '../../../Components/Button';
import NotFound from '../../../Components/NotFound';
import {useTranslation} from 'react-i18next';

const FindLoadResult = ({navigation, route}) => {
  const user = useRef('');
  const animationProgress = useRef(new Animated.Value(0));
  const [searchFrom, setSearchFrom] = useState(route?.params?.searchFrom);
  const [searchTo, setSearchTo] = useState(route?.params?.searchTo);
  const [searchFromId, setSearchFromId] = useState(route?.params?.searchFromId);
  const [searchToId, setSearchToId] = useState(route?.params?.searchToId);
  const [showLocationFrom, setLocationFrom] = useState(false);
  const [showLocationTo, setLocationTo] = useState(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {findLoadData, findLoadLoading, findLoadStatus} = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler;
  }, [navigation]);

  const onItemSelect = (item, identify) => {
    if (identify === 'To') {
      setLocationTo(false);
    } else {
      setLocationFrom(false);
    }

    if (identify === 'To') {
      setSearchTo(`${item?.place_name}`);
    } else {
      setSearchFrom(`${item?.place_name}`);
      setSearchTo('Anywhere');
    }
  };

  const searchLoad = () => {
    if (searchFrom === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    if (searchTo === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    dispatch(initFindLoad(searchFromId, searchToId));
  };

  useEffect(() => {
    dispatch(initFindLoad(searchFromId, searchToId, route?.params?.truckItem));
  }, [dispatch, route?.params?.truckItem, searchFromId, searchToId]);

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
      onReturn: item => {
        if (val === 'from') {
          setSearchFrom(item?.place_name);
          setSearchFromId(item?.id);
          setSearchTo('Anywhere');
          return;
        }
        setSearchTo(item?.place_name);
        setSearchToId(item?.id);
      },
    });
  };

  useEffect(() => {
    AsyncStorage.getItem('UserType')
      .then(res => {
        user.current = res;
      })
      .catch(err => {
        console.error(err);
      });
  });

  const renderItem = item => {
    return (
      <View style={style.card}>
        <CardHeader from={item?.from} to={item?.to} icon={item?.image} t={t} />
        <View style={style.horizontalLine} />
        <View style={style.rowdirection}>
          <View style={style.point} />
          <Text style={style.smallImageHeaderTitle}>{item?.name}</Text>
        </View>
        <View style={style.rowdirection}>
          <View style={style.point} />
          <Text style={style.smallImageHeaderTitle}>
            {`₹ ${item?.price} / ${
              item?.price_type === 1 ? 'Per Truck' : 'Fixed'
            }`}
          </Text>
        </View>
        <View style={style.horizontalLine} />
        <View style={[style.rowdirection, {justifyContent: 'center'}]}>
          <Text style={style.textStyle}>{item?.loads}</Text>
          <View style={style.verticalLine} />
          <Text style={style.textStyle}>{item?.material_name}</Text>
          <View style={style.verticalLine} />
          <Text style={style.textStyle}>{item?.distance}</Text>
        </View>
        <View style={style.horizontalLine} />
        <View style={style.btnContainer}>
          <InnerButton
            enabledStyle={style.findButtonContainer}
            textStyle={style.findButtonText}
            title={'Call'}
            navigation={() => DialCall(item?.phone)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={style.MainContainer}>
      <View style={style.findLocationBox}>
        <SearchFilter
          defaultValue={searchFrom}
          leftTitle={Constants.FROM}
          closeIconClick={() => closeIconClick('from')}
          onSearchPress={() => navigateToSeach('from')}
          placeholder={Constants.SELECT_LOCATION_TITLE}
        />
        {showLocationFrom === true && (
          <LocationModal
            click={e => onItemSelect(e)}
            styles={style.locationModalStyle}
          />
        )}
        <SearchFilter
          defaultValue={searchTo}
          leftTitle={Constants.TO}
          closeIconClick={() => closeIconClick('to')}
          onSearchPress={() => navigateToSeach()}
          placeholder={Constants.SELECT_LOCATION_TITLE}
        />
        {showLocationTo === true && (
          <LocationModal
            click={e => onItemSelect(e, 'To')}
            styles={style.locationModalStyle}
          />
        )}
        <Button
          onPress={() => searchLoad()}
          title={Constants.FIND_LOADS}
          loading={findLoadLoading}
          textStyle={style.buttonTextStyle}
          style={style.findBtnStyle}
          touchStyle={style.touchStyle}
        />
      </View>

      {findLoadData?.length > 0 ? (
        <FlatList
          data={findLoadData}
          renderItem={({item}) => renderItem(item)}
        />
      ) : (
        <NotFound
          imageName="noLoadFound"
          title={'No Load Found'}
          height={200}
          width={300}
        />
      )}
    </View>
  );
};

export default FindLoadResult;
