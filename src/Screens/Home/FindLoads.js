import React, {useContext, useEffect, useRef} from 'react';
import {View, Text, FlatList, Animated, Easing, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as Constants from '../../Constants/Constant';
import {initFindLoad, initFindLorry} from '../../Store/Actions/Actions';
import PostItem from '../../Components/PostItem';
import {DialCall} from '../../Utils/DialCall';
import FindLoadHeader from '../../Components/FindLoadHeader';
import {PrivacyPolicy} from '../../Color/color';
import FindLoadShimmer from '../../Components/Shimmer/FindLoadShimmer';
import NotFound from '../../Components/NotFound';

const FindLoads = ({navigation, route}) => {
  // console.log(22222, route.params);
  const {Owner, userType} = route?.params;
  const animationProgress = useRef(new Animated.Value(0));
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#FFFDFD',
      }}>
      <FindLoadHeader
        title={`${Constants.RESULTS} (${
          userType === '2' ? findLoadData?.length : findLorryData?.length
        })`}
        goBack={() => navigation.goBack()}
        from={Owner?.from}
        to={Owner?.to === null ? 'Anywhere' : Owner?.to}
        icon={Owner?.image}
        fullPrice={
          userType === '2'
            ? Owner?.vehicle_number
            : `₹ ${Owner?.price} / ${
                Owner?.price_type === '1' ? 'Per Truck' : 'Fixed'
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
        <NotFound imageName="noLoadFound" />
      )}
    </View>
  );
};

export default FindLoads;
