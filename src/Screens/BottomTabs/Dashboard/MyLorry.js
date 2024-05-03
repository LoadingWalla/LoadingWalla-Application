import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
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
import MyTabBar from '../../Requests/MyTabBar';
import NotFound from '../../../Components/NotFound';

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
          <NotFound
            imageName={userType === '1' ? 'noLoadFound' : 'noTruckFound'}
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

// import React, {
//   useState,
//   useEffect,
//   useContext,
//   useMemo,
//   useCallback,
//   useRef,
// } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   FlatList,
//   RefreshControl,
//   TouchableOpacity,
//   Animated,
//   I18nManager,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {useTranslation} from 'react-i18next';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {useFocusEffect} from '@react-navigation/native';
// import {TabView, SceneMap} from 'react-native-tab-view';
// import * as Constants from '../../../Constants/Constant';
// import {NetworkContext} from '../../../Context/NetworkContext';
// import {initMyLoad, initMyLorry} from '../../../Store/Actions/Actions';
// import MyLorryShimmer from '../../../Components/Shimmer/MyLorryShimmer';
// import {
//   GradientColor2,
//   PrivacyPolicy,
//   pageBackground,
//   titleColor,
// } from '../../../Color/color';
// import MyLorryItem from '../../../Components/MyLorryItem';
// import NoInternetScreen from '../../Details/NoInternetScreen';
// import DashboardHeader from '../../../Components/DashboardHeader';
// import style from './style';
// import Button from '../../../Components/Button';

// const Tab = createMaterialTopTabNavigator();

// function MyTabBar({state, navigation, position, tabs}) {
//   const layoutWidth = useRef(0);
//   return (
//     <View
//       style={style.tabsContainer}
//       onLayout={e => (layoutWidth.current = e.nativeEvent.layout.width)}>
//       {state.routes.map((route, index) => {
//         const isFocused = state.index === index;
//         const onPress = () =>
//           !isFocused && navigation.navigate({name: route.name, merge: true});

//         const inputRange = state.routes.map((_, i) => i);
//         const translateX = (isText = false) =>
//           Animated.multiply(
//             position.interpolate({
//               inputRange,
//               outputRange: inputRange.map(i => {
//                 const diff = i - index;
//                 const x = layoutWidth.current / tabs.length;
//                 const value = diff > 0 ? x : diff < 0 ? -x : 0;
//                 return !isText ? value : -value;
//               }),
//             }),
//             I18nManager.isRTL ? -1 : 1,
//           );

//         return (
//           <TouchableOpacity
//             key={`${route.name}_${index}`}
//             style={{flex: 1, overflow: 'hidden'}}
//             onPress={onPress}>
//             <View style={[style.iconTextContainer]}>
//               <Text style={{color: 'grey'}}>{route.name}</Text>
//             </View>

//             <Animated.View
//               style={[
//                 style.tabBgColor,
//                 {
//                   overflow: 'hidden',
//                   transform: [{translateX: translateX()}],
//                 },
//               ]}>
//               <Animated.View
//                 style={[
//                   style.iconTextContainer,
//                   {transform: [{translateX: translateX()}]},
//                 ]}>
//                 <Text style={{color: 'black'}}>{route.name}</Text>
//               </Animated.View>
//             </Animated.View>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const TABS = [{title: 'Active Load'}, {title: 'Inactive Load'}];

// const renderCustomTabView = props => <MyTabBar {...props} tabs={TABS} />;

// function getRoutesForUserType(type) {
//   if (type === '1') {
//     return [
//       {key: 'active', title: 'Active Load'},
//       {key: 'inactive', title: 'Inactive Load'},
//     ];
//   } else if (type === '2') {
//     return [
//       {key: 'active', title: 'Active Truck'},
//       {key: 'inactive', title: 'Inactive Truck'},
//     ];
//   }
//   return [];
// }

// const MyLorry = ({navigation}) => {
//   const dispatch = useDispatch();
//   const {t} = useTranslation();
//   const {isConnected} = useContext(NetworkContext);
//   const [userType, setUserType] = useState('');
//   const [isStatus, setShowStatus] = useState(false);
//   const [statusData, setStatusData] = useState(null);
//   const [selected, setSelected] = useState(1);
//   const [index, setIndex] = useState(0);
//   const [refreshing, setRefreshing] = useState(false);

//   const {
//     myLoadTruckData,
//     myLorryTruckData,
//     myLoadLoding,
//     myLorryLoding,
//     myLorryUserData,
//     myLoadUserData,
//   } = useSelector(state => {
//     return state.data;
//   });

//   useFocusEffect(
//     useCallback(() => {
//       const fetchUserType = async () => {
//         const userType = await AsyncStorage.getItem('UserType');
//         setUserType(userType);

//         if (userType === '1') {
//           dispatch(initMyLoad(selected));
//         } else {
//           dispatch(initMyLorry(selected));
//         }
//       };
//       fetchUserType();
//     }, [selected, dispatch]),
//   );

//   const bannerButton = async () => {
//     if (userType === '1') {
//       navigation.navigate('PostLoads', {from: '', to: ''});
//     } else {
//       navigation.navigate('AddLorry', {from: 'lorry'});
//     }
//   };

//   const onRefresh = () => {
//     setRefreshing(true);
//     if (userType === '1') {
//       dispatch(initMyLoad(selected));
//     } else {
//       dispatch(initMyLorry(selected));
//     }
//     setRefreshing(false);
//   };

//   const renderContentOrShimmer = relevantData => {
//     if (myLoadLoding || myLorryLoding) {
//       return (
//         <View style={{flex: 1}}>
//           <MyLorryShimmer />
//           <MyLorryShimmer />
//           <MyLorryShimmer />
//         </View>
//       );
//     }

//     if (relevantData?.length === 0) {
//       return (
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }>
//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 50,
//             }}>
//             <Text
//               style={{
//                 fontSize: 18,
//                 color: PrivacyPolicy,
//                 fontFamily: 'PlusJakartaSans-Medium',
//               }}>
//               {t(Constants.NOT_FOUND)}
//             </Text>
//           </View>
//         </ScrollView>
//       );
//     }

//     return (
//       <View style={{flex: 1}}>
//         <FlatList
//           keyExtractor={keyExtractor}
//           data={relevantData}
//           renderItem={({item}) => (
//             <MyLorryItem
//               item={item}
//               userType={userType}
//               t={t}
//               openStatusModal={openStatusModal}
//               navigation={navigation}
//               selected={selected}
//             />
//           )}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         />
//       </View>
//     );
//   };

//   const ActiveTab = () => {
//     const relevantData =
//       userType === '1'
//         ? Array.isArray(myLoadTruckData)
//           ? myLoadTruckData.filter(data => data?.status === 1)
//           : []
//         : Array.isArray(myLorryTruckData)
//         ? myLorryTruckData.filter(data => data?.status === 1)
//         : [];
//     return renderContentOrShimmer(relevantData);
//   };

//   const InactiveTab = () => {
//     const relevantData =
//       userType === '1'
//         ? Array.isArray(myLoadTruckData)
//           ? myLoadTruckData.filter(data => data?.status === 0)
//           : []
//         : Array.isArray(myLorryTruckData)
//         ? myLorryTruckData.filter(
//             data => data?.status === 0 || data?.status === 2,
//           )
//         : [];
//     return renderContentOrShimmer(relevantData);
//   };

//   function keyExtractor(item) {
//     return userType === '1' ? item?.id : item?.truck_id;
//   }

//   const openStatusModal = item => {
//     setStatusData(item);
//     setShowStatus(true);
//   };

//   useEffect(() => {
//     switch (index) {
//       case 0:
//         setSelected(1);
//         break;
//       case 1:
//         setSelected(0);
//         break;
//       default:
//         break;
//     }
//   }, [index]);

//   if (!isConnected) {
//     return <NoInternetScreen navigation={navigation} />;
//   }
//   return (
//     <View style={style.Container}>
//       <View style={style.DashboardHeaderView}>
//         <DashboardHeader
//           img={
//             userType === '1'
//               ? myLoadUserData?.profile_img
//               : myLorryUserData?.profile_img
//           }
//           title={
//             userType === '1' ? myLoadUserData?.name : myLorryUserData?.name
//           }
//           isDashboard={true}
//           gotoProfile={() => navigation.navigate(Constants.MENU)}
//           notification={() => navigation.navigate('Notification')}
//           navigate={() => navigation.navigate('Contactus')}
//           onPress={() => navigation.navigate('KYC')}
//           loading={userType === '1' ? myLoadLoding : myLorryLoding}
//           verify={
//             userType === '1' ? myLoadUserData?.verify : myLorryUserData?.verify
//           }
//         />
//       </View>
//       <View style={style.tabView}>
//         <Tab.Navigator tabBar={renderCustomTabView}>
//           <Tab.Screen name={TABS[0].title} component={ActiveTab} />
//           <Tab.Screen name={TABS[1].title} component={InactiveTab} />
//         </Tab.Navigator>
//       </View>

//       <Button
//         title={
//           userType === '1'
//             ? t(Constants.POST_LOADS)
//             : t(Constants.ADD_NEW_LORRY)
//         }
//         textStyle={style.buttonTextStyle}
//         style={style.buttonstyle}
//         touchStyle={style.touchStyle}
//         onPress={() => bannerButton()}
//       />
//     </View>
//   );
// };

// export default MyLorry;
