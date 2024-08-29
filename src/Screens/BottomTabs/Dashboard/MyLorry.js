import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {View, ScrollView, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {TabView, SceneMap} from 'react-native-tab-view';
import * as Constants from '../../../Constants/Constant';
import {initMyLoad, initMyLorry} from '../../../Store/Actions/Actions';
import MyLorryShimmer from '../../../Components/Shimmer/MyLorryShimmer';
import MyLorryItem from '../../../Components/MyLorryItem';
import DashboardHeader from '../../../Components/DashboardHeader';
import style from './style';
import Button from '../../../Components/Button';
import RenderTabBar from '../../Requests/RenderTabBar';
import NotFound from '../../../Components/NotFound';
import {useTranslation} from 'react-i18next';
import {websocketDisconnect} from '../../../Store/Actions/WebSocketActions';

function getRoutesForUserType(type, t) {
  if (type === '1') {
    return [
      {key: 'active', title: `${t(Constants.ACTIVE)} ${t(Constants.LOAD)}`},
      {
        key: 'inactive',
        title: `${t(Constants.INACTIVE)} ${t(Constants.LOAD)}`,
      },
    ];
  } else if (type === '2') {
    return [
      {key: 'active', title: `${t(Constants.ACTIVE)} ${t(Constants.LORRY)}`},
      {
        key: 'inactive',
        title: `${t(Constants.INACTIVE)} ${t(Constants.LORRY)}`,
      },
    ];
  }
  return [];
}

const MyLorry = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
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
    DashboardUser,
    dashboardLoading,
    wsConnected,
  } = useSelector(state => {
    console.log('My Lorry/Load', state.data);
    return state.data;
  });

  const routes = useMemo(() => getRoutesForUserType(userType, t), [userType]);

  useFocusEffect(
    useCallback(() => {
      if (wsConnected) {
        dispatch(websocketDisconnect());
      }
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
    }, [selected, dispatch, wsConnected]),
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
          <NotFound
            imageName={userType === '1' ? 'noLoadFound' : 'noTruckFound'}
            height={200}
            width={200}
            // title={userType === '1' ? 'No Load Found' : 'No Truck Found'}
          />
        </ScrollView>
      );
    }

    return (
      <View style={{flex: 1, paddingHorizontal: 5}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={relevantData}
          showsVerticalScrollIndicator={false}
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

  return (
    <View style={style.Container}>
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
          t={t}
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
