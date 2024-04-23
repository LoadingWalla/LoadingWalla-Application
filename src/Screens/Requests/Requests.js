import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../Constants/Constant';
import {useTranslation} from 'react-i18next';
import {GradientColor3, PrivacyPolicy} from '../../Color/color';
import {
  AcceptBookingFailure,
  cancelBookingFailure,
  initAcceptBooking,
  initCancelBooking,
  initGetRequestBooking,
} from '../../Store/Actions/Actions';
import MyLorryShimmer from '../../Components/Shimmer/MyLorryShimmer';
// import Lottie from 'lottie-react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import RenderTabBar from './RenderTabBar';
import Button from '../../Components/Button';
import FindLoadHeader from '../../Components/FindLoadHeader';
import NoInternetScreen from '../Details/NoInternetScreen';
import {NetworkContext} from '../../Context/NetworkContext';
import InnerButton from '../../Components/InnerButton';
import {dialCall} from '../../Utils/DialCall';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {memo} from 'react';
import PhoneCall from '../../../assets/SVG/svg/PhoneCall';

const Requests = ({route, navigation}) => {
  const {Owner, userType} = route?.params;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const [selected, setSelected] = useState(1);
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const {
    getRequestBookingLodingReceived,
    getRequestBookingLodingSent,
    getRequestBookingdataReceived,
    getRequestBookingdataSent,
    acceptBookingStatus,
    cancelBookingStatus,
    cancelBookingMessage,
    bookingLorrydata,
  } = useSelector(state => {
    // console.log("My Requests", state.data.acceptBookingStatus);
    return state.data;
  });

  const clearAcceptBookingStatus = useCallback(
    () => dispatch(AcceptBookingFailure()),
    [dispatch],
  );
  const clearCancelBookingStatus = useCallback(
    () => dispatch(cancelBookingFailure()),
    [dispatch],
  );
  const getBookingRequest = useCallback(
    (load_id, truck_id, request_type) =>
      dispatch(initGetRequestBooking(load_id, truck_id, request_type)),
    [dispatch],
  );
  const acceptBookingRequest = useCallback(
    request_id => dispatch(initAcceptBooking(request_id)),
    [dispatch],
  );
  const cancelBookingRequest = useCallback(
    req_id => dispatch(initCancelBooking(req_id)),
    [dispatch],
  );

  useFocusEffect(
    useCallback(() => {
      getBookingRequest(Owner?.id, Owner?.truck_id, selected);
    }, [getBookingRequest, Owner?.id, Owner?.truck_id, selected]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBookingRequest(Owner?.id, Owner?.truck_id, selected);
    setRefreshing(false);
  }, [getBookingRequest, Owner?.id, Owner?.truck_id, selected]);

  const ReceiveTab = useCallback(
    () => (
      <>
        {getRequestBookingLodingReceived ? (
          <MyLorryShimmer />
        ) : (
          <>
            {getRequestBookingdataReceived.length > 0 ? (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                {getRequestBookingdataReceived.map((item, idx) => (
                  <RenderItem
                    key={idx}
                    item={item}
                    cancelBookingRequest={cancelBookingRequest}
                    acceptBookingRequest={acceptBookingRequest}
                    selected={selected}
                    getBookingRequest={getBookingRequest}
                    Owner={Owner}
                  />
                ))}
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
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
                    source={require('../../../assets/notfound.json')}
                    autoPlay
                    loop
                    style={{height: 250, width: 250}}
                  /> */}
                </View>
              </ScrollView>
            )}
          </>
        )}
      </>
    ),
    [
      getRequestBookingLodingReceived,
      getRequestBookingdataReceived,
      refreshing,
      onRefresh,
    ],
  );

  const SentTab = useCallback(
    () => (
      <>
        {getRequestBookingLodingSent ? (
          <MyLorryShimmer />
        ) : (
          <>
            {getRequestBookingdataSent.length > 0 ? (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                {getRequestBookingdataSent.map((item, idx) => (
                  <RenderItem
                    key={idx}
                    item={item}
                    cancelBookingRequest={cancelBookingRequest}
                    acceptBookingRequest={acceptBookingRequest}
                    selected={selected}
                    getBookingRequest={getBookingRequest}
                    Owner={Owner}
                  />
                ))}
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
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
                    source={require('../../../assets/notfound.json')}
                    autoPlay
                    loop
                    style={{height: 250, width: 250}}
                  /> */}
                </View>
              </ScrollView>
            )}
          </>
        )}
      </>
    ),
    [
      getRequestBookingLodingSent,
      getRequestBookingdataSent,
      refreshing,
      onRefresh,
    ],
  );

  useEffect(() => {
    setSelected(index + 1);
  }, [index]);

  useEffect(() => {
    if (acceptBookingStatus !== null) {
      navigation.navigate('Confirmation', {
        status: acceptBookingStatus,
        messages: bookingLorrydata?.message,
        fromRequest: true,
        Owner: Owner,
        userType: userType,
      });
      clearAcceptBookingStatus();
    }
  }, [
    acceptBookingStatus,
    navigation,
    clearAcceptBookingStatus,
    bookingLorrydata?.message,
    Owner,
    userType,
  ]);

  useEffect(() => {
    if (cancelBookingStatus !== null) {
      navigation.navigate('Confirmation', {
        status: cancelBookingStatus,
        messages: cancelBookingMessage,
        fromRequest: true,
        Owner: Owner,
        userType: userType,
      });
      clearCancelBookingStatus();
    }
  }, [
    cancelBookingStatus,
    navigation,
    clearCancelBookingStatus,
    cancelBookingMessage,
    Owner,
    userType,
  ]);

  const RenderItem = memo(({item, key}) => {
    // console.log(7777, item);
    return (
      <View key={key} style={styles.card}>
        <View style={styles.headerView}>
          <Pressable onPress={() => {}}>
            <Image
              style={styles.image}
              source={
                item.image
                  ? {uri: item?.image}
                  : require('../../../assets/placeholder.png')
              }
              resizeMode={'cover'}
            />
          </Pressable>
          <View style={styles.routeInfo}>
            <View style={styles.routeTextContainer}>
              <Text style={styles.textHeading}>Load</Text>
              <Text style={styles.routeText}>
                {' '}
                : {`${item?.material_name} | ${item?.qty} Ton`}{' '}
              </Text>
            </View>
            <View style={styles.routeTextContainer}>
              <Text style={styles.textHeading}>Asked Price</Text>
              <Text style={styles.routeText}>
                {' '}
                :{' '}
                {`₹ ${item?.price} / ${
                  item?.price_type === 1 ? 'Per Ton' : 'Fixed'
                }`}{' '}
              </Text>
            </View>
            <View style={styles.routeTextContainer}>
              <Text style={styles.textHeading}>Revalued Price</Text>
              <Text style={styles.routeText}>
                {' '}
                :{' '}
                {`₹ ${item?.offered_price} / ${
                  item?.price_type === 1 ? 'Per Ton' : 'Fixed'
                }`}{' '}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => dialCall()}>
            <View style={styles.CallButton}>
              {/* <Icon name="phone" size={20} color={GradientColor3} /> */}
              <PhoneCall size={20} color={GradientColor3} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.buttonContainer}>
          <InnerButton
            enabledStyle={styles.declineButton}
            textStyle={styles.declineButtonText}
            title={selected === 2 ? 'Delete' : 'Decline'}
            onpressStatus={() => cancelBookingRequest(item?.id)}
          />
          {selected === 1 ? (
            <Button
              onPress={() => {
                // if (selected === 1) {
                acceptBookingRequest(item?.id);
                getBookingRequest(Owner?.id, Owner?.truck_id, selected);
                // } else {
                //   navigation.navigate("Negotiation", {
                //     item: item,
                //     // owner: owner,
                //     userType: userType,
                //   });
                // }
              }}
              // title={selected === 1 ? "Accept" : "Revalue"}
              title={'Accept'}
              textStyle={styles.textStyle}
              style={styles.buttonStyle}
            />
          ) : null}
        </View>
      </View>
    );
  });

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <FindLoadHeader
        title={'My Requests'}
        goBack={() => navigation.goBack()}
        from={Owner?.from}
        to={Owner?.to === null ? 'Anywhere' : Owner?.to}
        icon={Owner?.image}
        fullPrice={
          userType === '2'
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
        verified={Owner?.verified}
      />
      <View style={{flex: 1, marginTop: 10}}>
        <TabView
          navigationState={{
            index,
            routes: [
              {key: 'received', title: t(Constants.RECEIVED_REQUEST)},
              {key: 'sent', title: t(Constants.SENT_REQUEST)},
            ],
          }}
          renderScene={SceneMap({received: ReceiveTab, sent: SentTab})}
          onIndexChange={setIndex}
          renderTabBar={RenderTabBar}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Requests;
