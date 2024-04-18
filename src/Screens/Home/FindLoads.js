import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, FlatList, Animated, Easing} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
// import Lottie from 'lottie-react-native';
import * as Constants from '../../Constants/Constant';
import {NetworkContext} from '../../Context/NetworkContext';
import {initFindLoad, initFindLorry} from '../../Store/Actions/Actions';
import PostItem from '../../Components/PostItem';
import {DialCall} from '../../Utils/DialCall';
import NoInternetScreen from '../Details/NoInternetScreen';
import FindLoadHeader from '../../Components/FindLoadHeader';
import {PrivacyPolicy} from '../../Color/color';
import FindLoadShimmer from '../../Components/Shimmer/FindLoadShimmer';

const FindLoads = ({navigation, route}) => {
  // console.log(22222, route.params);
  const {Owner, userType} = route?.params;
  const animationProgress = useRef(new Animated.Value(0));
  const {isConnected} = useContext(NetworkContext);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {findLoadData, findLoadLoading, findLorryData, findLorryLoading} =
    useSelector(state => ({
      findLoadData: state.data.findLoadData,
      findLoadLoading: state.data.findLoadLoading,
      findLorryData: state.data.findLorryData,
      findLorryLoading: state.data.findLorryLoading,
    }));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (userType === '1') {
      dispatch(initFindLorry(Owner?.id));
    } else {
      dispatch(initFindLoad(Owner?.from_id, Owner?.to_id, Owner?.wheel));
    }
  }, [dispatch, Owner, userType]);

  const renderItem = item => (
    <PostItem
      item={item}
      owner={Owner}
      userType={userType}
      call={() => DialCall(item?.phone)}
    />
  );

  const dataToShow = userType === '1' ? findLorryData : findLoadData;
  const isLoading = userType === '1' ? findLorryLoading : findLoadLoading;

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }

  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <FindLoadHeader
        title={`${t(Constants.RESULTS)} (${
          userType == '2' ? findLoadData?.length : findLorryData?.length
        })`}
        goBack={() => navigation.goBack()}
        from={Owner?.from}
        to={Owner?.to === null ? 'Anywhere' : Owner?.to}
        icon={Owner?.image}
        fullPrice={
          userType == '2'
            ? Owner?.vehicle_number
            : `₹ ${Owner?.price} / ${
                Owner?.price_type === '1' ? 'Per Ton' : 'Fixed'
              }`
        }
        userType={userType}
        permit={Owner?.permit}
        navigation={navigation}
        material_name={Owner?.material_name}
        qty={`${Owner?.qty} Ton`}
        id={Owner?.truck_id}
      />
      {isLoading ? (
        <FindLoadShimmer />
      ) : dataToShow?.length > 0 ? (
        <FlatList
          data={dataToShow}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item?.load_id || item?.truck_id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
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
      )}
    </View>
  );
};

export default FindLoads;
