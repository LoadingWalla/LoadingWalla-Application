import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, Text, Dimensions, BackHandler} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Constants from '../../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTokenRequest,
  initDashboard,
  websocketDisconnect,
} from '../../../Store/Actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import style from './style';
import Toast from 'react-native-simple-toast';
import Banner from '../../../Components/Banner';
import DashboardHeader from '../../../Components/DashboardHeader';
import TruckItem from '../../../Components/TruckItem';
import DashboardShimmer from '../../../Components/Shimmer/DashboardShimmer';
import SearchFilter from '../../../Components/SearchFilter';
import Button from '../../../Components/Button';
import {GradientColor2} from '../../../Color/color';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const Dashboard = ({navigation}) => {
  const {t} = useTranslation();
  const [allLocation, setAllLocation] = useState([]);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchFromId, setSearchFromId] = useState(0);
  const [searchToId, setSearchToId] = useState(0);
  const [showLocationFrom, setLocationFrom] = useState(false);
  const [showLocationTo, setLocationTo] = useState(false);
  const [truckItem, setTruckItem] = useState('');
  const user = useRef('');
  const handleNavigate = useRef(false);
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const {
    DashboardData,
    DashboardBanner,
    DashboardUser,
    locationData,
    dashboardLoading,
    loadTruckLoading,
    wsConnected,
    gpsTokenData,
  } = useSelector(state => {
    console.log('Dashboard Truck', state.data);
    return state.data;
  });

  useEffect(() => {
    if (gpsTokenData === null) {
      dispatch(fetchTokenRequest());
    }
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

  useFocusEffect(
    React.useCallback(() => {
      if (wsConnected) {
        dispatch(websocketDisconnect());
      }
      dispatch(initDashboard());
    }, [dispatch, wsConnected]),
  );

  const navigateToSeach = val => {
    navigation.navigate('Search', {
      allLocation,
      locId: val === 'from' ? searchToId : searchFromId,
      onReturn: item => {
        if (val === 'from') {
          setSearchFromId(item.id);
          setSearchFrom(item?.place_name);
          setSearchTo('Anywhere');
          setSearchToId(0);
          return;
        }
        setSearchTo(item?.place_name);
        setSearchToId(item?.id);
      },
    });
  };

  useEffect(() => {
    setAllLocation(locationData);
  }, [locationData]);

  useEffect(() => {
    AsyncStorage.getItem('UserType')
      .then(res => {
        user.current = res;
      })
      .catch(() => {});
  }, []);

  const searchLoad = () => {
    if (searchFrom === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    if (truckItem === '') {
      Toast.show('Select Truck', Toast.LONG);
      return;
    }
    handleNavigate.current = true;
    navigation.navigate('FindLoadResult', {
      searchFrom,
      searchFromId,
      searchTo,
      searchToId,
      truckItem,
    });
    setSearchFrom('');
    setSearchTo('');
    setTruckItem('');
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

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', marginBottom: 60}}>
      <View style={style.DashboardHeaderView}>
        <DashboardHeader
          img={DashboardUser?.profile_img}
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          notification={() => navigation.navigate('Notification')}
          isDashboard={true}
          title={DashboardUser?.name}
          gotoProfile={() => navigation.navigate(t(Constants.MENU))}
          navigate={() => navigation?.navigate('Contactus')}
          loading={dashboardLoading}
          wallet={DashboardUser?.wallet}
          verify={DashboardUser?.verify}
          t={t}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={style.scrollView}>
        <View>
          {dashboardLoading === true ? (
            <View>
              <DashboardShimmer />
            </View>
          ) : (
            <>
              <View>
                {DashboardBanner?.length > 0 && (
                  <Swiper
                    style={{height: width / 2}}
                    showsButtons={false}
                    activeDotColor={GradientColor2}
                    autoplay
                    activeDotStyle={{width: 15}}
                    autoplayTimeout={3}>
                    {DashboardBanner?.map((item, index) => {
                      return (
                        <Banner
                          key={index}
                          bannerKey={index}
                          uri={item?.banner_url}
                        />
                      );
                    })}
                  </Swiper>
                )}
                <Text style={style.locationTitle}>
                  {t(Constants.SELECT_LOCATION)}
                </Text>
                <SearchFilter
                  defaultValue={searchFrom}
                  leftTitle={t(Constants.FROM)}
                  onSearchPress={() => navigateToSeach('from')}
                  closeIconClick={() => closeIconClick('from')}
                  placeholder={t(Constants.SELECT_LOCATION_TITLE)}
                />
                <SearchFilter
                  onSearchPress={() => navigateToSeach()}
                  defaultValue={searchTo}
                  leftTitle={t(Constants.TO)}
                  closeIconClick={() => closeIconClick('to')}
                  placeholder={t(Constants.SELECT_LOCATION_TITLE)}
                />
                <View style={{marginTop: 30}}>
                  <Text style={style.locationTitle}>
                    {t(Constants.TRUCK_TYPE)}
                  </Text>
                  <TruckItem
                    click={e => setTruckItem(e?.id)}
                    backgroundStyle={style.truckItem}
                    imageRequire={true}
                    horizontal={true}
                    checkIcon={true}
                    unseleckBackground={style.unseleckBackground}
                    renderItem={DashboardData}
                  />
                </View>
                <Button
                  onPress={() => searchLoad()}
                  title={
                    user.current === '1'
                      ? t(Constants.FIND_LORRY)
                      : t(Constants.FIND_LOADS)
                  }
                  textStyle={style.buttonTextStyle}
                  style={style.buttonstyle}
                  touchStyle={style.touchStyle}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
