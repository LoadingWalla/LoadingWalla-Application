import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import {View, Text, ScrollView, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {TabView, SceneMap} from 'react-native-tab-view';
import * as Constants from '../../../Constants/Constant';
import {NetworkContext} from '../../../Context/NetworkContext';
import {initMyLoad, initMyLorry} from '../../../Store/Actions/Actions';
import MyLorryShimmer from '../../../Components/Shimmer/MyLorryShimmer';
import {PrivacyPolicy} from '../../../Color/color';
import MyLorryItem from '../../../Components/MyLorryItem';
import NoInternetScreen from '../../Details/NoInternetScreen';
import DashboardHeader from '../../../Components/DashboardHeader';
import style from './style';
import Button from '../../../Components/Button';
import RenderTabBar from '../../Requests/RenderTabBar';

function getRoutesForUserType(type) {
  if (type === '1') {
    return [
      {key: 'active', title: 'Active Load'},
      {key: 'inactive', title: 'Inactive Load'},
    ];
  } else if (type === '2') {
    return [
      {key: 'active', title: 'Active Truck'},
      {key: 'inactive', title: 'Inactive Truck'},
    ];
  }
  return [];
}

const MyLorry = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const [userType, setUserType] = useState('');
  const [isStatus, setShowStatus] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [selected, setSelected] = useState(1);
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const {
    myLoadTruckData,
    myLorryTruckData,
    myLoadLoding,
    myLorryLoding,
    myLorryUserData,
    myLoadUserData,
  } = useSelector(state => {
    // console.log("My Lorry/Load", state.data);
    return state.data;
  });

  const routes = useMemo(() => getRoutesForUserType(userType), [userType]);

  useFocusEffect(
    useCallback(() => {
      const fetchUserType = async () => {
        const userType = await AsyncStorage.getItem('UserType');
        setUserType(userType);

        if (userType === '1') {
          dispatch(initMyLoad(selected));
        } else {
          dispatch(initMyLorry(selected));
        }
      };
      fetchUserType();
    }, [selected, dispatch]),
  );

  const bannerButton = async () => {
    if (userType === '1') {
      navigation.navigate('PostLoads', {from: '', to: ''});
    } else {
      navigation.navigate('AddLorry', {from: 'lorry'});
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (userType === '1') {
      dispatch(initMyLoad(selected));
    } else {
      dispatch(initMyLorry(selected));
    }
    setRefreshing(false);
  };

  const renderContentOrShimmer = relevantData => {
    if (myLoadLoding || myLorryLoding) {
      return (
        <View style={{flex: 1}}>
          <MyLorryShimmer />
          <MyLorryShimmer />
          <MyLorryShimmer />
        </View>
      );
    }

    if (relevantData?.length === 0) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: PrivacyPolicy,
                fontFamily: 'PlusJakartaSans-Medium',
              }}>
              {t(Constants.NOT_FOUND)}
            </Text>
            {/* <Lottie
              source={require('../../../../assets/notfound.json')}
              autoPlay
              loop
              style={{height: 250, width: 250}}
            /> */}
          </View>
        </ScrollView>
      );
    }

    return (
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={relevantData}
          renderItem={({item}) => (
            <MyLorryItem
              item={item}
              userType={userType}
              t={t}
              openStatusModal={openStatusModal}
              navigation={navigation}
              selected={selected}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  };

  const ActiveTab = () => {
    const relevantData =
      userType === '1'
        ? Array.isArray(myLoadTruckData)
          ? myLoadTruckData.filter(data => data?.status === 1)
          : []
        : Array.isArray(myLorryTruckData)
        ? myLorryTruckData.filter(data => data?.status === 1)
        : [];
    return renderContentOrShimmer(relevantData);
  };

  const InactiveTab = () => {
    const relevantData =
      userType === '1'
        ? Array.isArray(myLoadTruckData)
          ? myLoadTruckData.filter(data => data?.status === 0)
          : []
        : Array.isArray(myLorryTruckData)
        ? myLorryTruckData.filter(
            data => data?.status === 0 || data?.status === 2,
          )
        : [];
    return renderContentOrShimmer(relevantData);
  };

  function keyExtractor(item) {
    return userType === '1' ? item?.id : item?.truck_id;
  }

  const openStatusModal = item => {
    setStatusData(item);
    setShowStatus(true);
  };

  useEffect(() => {
    switch (index) {
      case 0:
        setSelected(1);
        break;
      case 1:
        setSelected(0);
        break;
      default:
        break;
    }
  }, [index]);

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View style={style.Container}>
      <View style={style.DashboardHeaderView}>
        <DashboardHeader
          img={
            userType === '1'
              ? myLoadUserData?.profile_img
              : myLorryUserData?.profile_img
          }
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          title={
            userType === '1' ? myLoadUserData?.name : myLorryUserData?.name
          }
          isDashboard={true}
          gotoProfile={() => navigation.navigate(Constants.MENU)}
          notification={() => navigation.navigate('Notification')}
          navigate={() => navigation.navigate('Contactus')}
          onPress={() => navigation.navigate('KYC')}
          loading={userType === '1' ? myLoadLoding : myLorryLoding}
          wallet={
            userType === '1' ? myLoadUserData?.wallet : myLorryUserData?.wallet
          }
          verify={
            userType === '1' ? myLoadUserData?.verify : myLorryUserData?.verify
          }
        />
      </View>
      <View style={style.tabView}>
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            active: ActiveTab,
            inactive: InactiveTab,
          })}
          onIndexChange={setIndex}
          renderTabBar={RenderTabBar}
        />
      </View>

      <Button
        title={
          userType === '1'
            ? t(Constants.POST_LOADS)
            : t(Constants.ADD_NEW_LORRY)
        }
        textStyle={style.buttonTextStyle}
        style={style.buttonstyle}
        touchStyle={style.touchStyle}
        onPress={() => bannerButton()}
      />
    </View>
  );
};

export default MyLorry;
