import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, ScrollView, Text, Dimensions, BackHandler} from 'react-native';
import Swiper from 'react-native-swiper';
import * as Constants from '../../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {initDashboard} from '../../../Store/Actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import style from './style';
import Toast from 'react-native-simple-toast';
import Banner from '../../../Components/Banner';
import DashboardHeader from '../../../Components/DashboardHeader';
import TruckItem from '../../../Components/TruckItem';
import DashboardShimmer from '../../../Components/Shimmer/DashboardShimmer';
import {NetworkContext} from '../../../Context/NetworkContext';
import NoInternetScreen from '../../Details/NoInternetScreen';
import SearchFilter from '../../../Components/SearchFilter';
import Button from '../../../Components/Button';
import {GradientColor2} from '../../../Color/color';

const {height, width} = Dimensions.get('window');

const Dashboard = ({navigation}) => {
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
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const {
    DashboardData,
    DashboardBanner,
    DashboardUser,
    locationData,
    dashboardLoading,
    loadTruckLoading,
  } = useSelector(state => {
    console.log('Dashboard Truck', state.data);
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

  useFocusEffect(
    React.useCallback(() => {
      dispatch(initDashboard());
    }, [dispatch]),
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

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <>
      <View style={style.DashboardHeaderView}>
        <DashboardHeader
          img={DashboardUser?.profile_img}
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          notification={() => navigation.navigate('Notification')}
          isDashboard={true}
          title={DashboardUser?.name}
          gotoProfile={() => navigation.navigate(Constants.MENU)}
          navigate={() => navigation?.navigate('Contactus')}
          loading={dashboardLoading}
          wallet={DashboardUser?.wallet}
          verify={DashboardUser?.verify}
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
                  {Constants.SELECT_LOCATION}
                </Text>
                <SearchFilter
                  defaultValue={searchFrom}
                  leftTitle={Constants.FROM}
                  onSearchPress={() => navigateToSeach('from')}
                  closeIconClick={() => closeIconClick('from')}
                  placeholder={Constants.SELECT_LOCATION_TITLE}
                />
                <SearchFilter
                  onSearchPress={() => navigateToSeach()}
                  defaultValue={searchTo}
                  leftTitle={Constants.TO}
                  closeIconClick={() => closeIconClick('to')}
                  placeholder={Constants.SELECT_LOCATION_TITLE}
                />
                <View style={{marginTop: 30}}>
                  <Text style={style.locationTitle}>
                    {Constants.TRUCK_TYPE}
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
                      ? Constants.FIND_LORRY
                      : Constants.FIND_LOADS
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
    </>
  );
};

export default Dashboard;
