import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, ScrollView, Text, Dimensions, BackHandler} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Constants from '../../../Constants/Constant';
import {useFocusEffect} from '@react-navigation/native';
import style from './style';
import Toast from 'react-native-simple-toast';
import Button from '../../../Components/Button';
import SearchFilter from '../../../Components/SearchFilter';
import Banner from '../../../Components/Banner';
import Swiper from 'react-native-swiper';
import DashboardShimmer from '../../../Components/Shimmer/DashboardShimmer';
import {GradientColor2} from '../../../Color/color';
import DashboardHeader from '../../../Components/DashboardHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  initDashboard,
  myPostLoadFailure,
  websocketDisconnect,
} from '../../../Store/Actions/Actions';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const DashboardLoad = ({navigation}) => {
  const [allLocation, setAllLocation] = useState([]);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchFromId, setSearchFromId] = useState(0);
  const [searchToId, setSearchToId] = useState(0);
  const [showLocationFrom, setLocationFrom] = useState(false);
  const [showLocationTo, setLocationTo] = useState(false);
  const user = useRef('');
  const childRef = useRef(null);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {
    DashboardBanner,
    DashboardUser,
    locationData,
    dashboardLoading,
    findLoadData,
    findLoadLoading,
    findLoadStatus,
  } = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  const handleNavigate = useRef(false);
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
      dispatch(websocketDisconnect());
      dispatch(initDashboard());
    }, [dispatch]),
  );

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

  useEffect(() => {
    if (findLoadStatus === 200) {
      if (handleNavigate.current === true) {
        handleNavigate.current = false;
        if (findLoadData?.length > 0) {
          navigation.navigate('FindLoadResult', {...{findLoadData}});
        } else {
          Toast.show('Not found', Toast.LONG);
        }
        dispatch(myPostLoadFailure());
      }
    }
  }, [dispatch, findLoadData, findLoadStatus, navigation]);

  const continueSearch = () => {
    if (searchFrom === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    if (searchTo === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    handleNavigate.current = true;
    navigation.navigate('PostLoads', {
      from: searchFrom,
      to: searchTo,
      fromId: searchFromId,
      toId: searchToId,
    });
    setSearchFrom('');
    setSearchTo('');
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
    <View style={{flex: 1, backgroundColor: '#FFFFFF', marginBottom: 60}}>
      <View style={style.DashboardHeaderView}>
        <DashboardHeader
          img={DashboardUser?.profile_img}
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          notification={() => navigation.navigate('Notification')}
          title={DashboardUser?.name}
          isDashboard={true}
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
        ref={childRef}
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
                    autoplayTimeout={2}>
                    {DashboardBanner.map((item, index) => {
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
                  {t(Constants.POST_LOAD_CARRY)}
                </Text>
                <SearchFilter
                  onSearchPress={() => navigateToSeach('from')}
                  defaultValue={searchFrom}
                  leftTitle={t(Constants.FROM)}
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
                <Button
                  onPress={() => continueSearch()}
                  title={
                    user.current === '1'
                      ? t(Constants.CONTINUE)
                      : t(Constants.FIND_LORRY)
                  }
                  loading={findLoadLoading}
                  touchStyle={style.touchStyle}
                  textStyle={style.buttonTextStyle}
                  style={style.buttonstyle}
                />
                {/* </View> */}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardLoad;
