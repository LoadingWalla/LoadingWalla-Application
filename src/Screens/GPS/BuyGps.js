import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CheckOutline from '../../../assets/SVG/svg/CheckOutline';
import {backgroundColorNew} from '../../Color/color';
import PercentageIcon from '../../../assets/SVG/svg/PercentageIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGpsPlansRequest} from '../../Store/Actions/Actions';
import {
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/WebSocketActions';
import {useTranslation} from 'react-i18next';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import BuyGPSShimmer from '../../Components/Shimmer/BuyGPSShimmer';

const Plan = ({text}) => {
  return (
    <View style={styles.planContainer}>
      <CheckOutline size={15} color={'green'} style={{marginHorizontal: 10}} />
      <Text style={styles.planText}>{text}</Text>
    </View>
  );
};

const Rates = ({item, navigation}) => {
  const {t} = useTranslation();
  const features = item.description.split('\n\n');
  const markedPrice =
    Math.ceil(item.gps_price * 1.18) +
    Math.ceil(item.recharge_price * 1.18) +
    Math.ceil(item.relay * 1.18);
  const sellingPrice = markedPrice - item.discount;
  const percentageDiscount = Math.ceil(
    ((markedPrice - sellingPrice) / markedPrice) * 100,
  );

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GpsType', {sellingPrice, plan_id: item.id})
      }
      style={styles.rateContainer}>
      <View style={styles.rateHeader}>
        <View style={styles.rateHeaderView}>
          <Text style={styles.planTitle}>{item.plan_name}</Text>
          <View style={styles.discountContainer}>
            <PercentageIcon size={15} color={'#0F8B00'} />
            <Text style={styles.discountText}>
              {percentageDiscount}
              {t(Constants.PERCENTAGE_DISCOUNT)}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>₹ {markedPrice}/year</Text>
          <Text style={styles.newPrice}>₹ {sellingPrice}/ year</Text>
        </View>
      </View>
      <View>
        {features.map((feature, index) => (
          <Plan key={index} text={feature} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const BuyGps = ({navigation}) => {
  useTrackScreenTime('BuyGps');
  const dispatch = useDispatch();
  const {gpsTokenData, gpsPlansData, gpsPlansError, gpsPlansLoading} =
    useSelector(state => {
      console.log('Buy Gps', state.data.gpsPlansData);
      return state.data;
    });

  const lastNavigationDirection = useRef(null);
  // Track navigation direction
  navigation.addListener('beforeRemove', e => {
    if (e.data.action.type === 'GO_BACK') {
      lastNavigationDirection.current = 'back';
    } else {
      lastNavigationDirection.current = 'forward';
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(websocketDisconnect());
      return () => {
        if (lastNavigationDirection.current === 'back') {
          dispatch(websocketConnect(gpsTokenData?.cookie));
        }
      };
    }, [dispatch, gpsTokenData]),
  );

  useEffect(() => {
    dispatch(fetchGpsPlansRequest());
  }, [dispatch]);

  const renderRates = ({item}) => <Rates item={item} navigation={navigation} />;

  return (
    <View style={styles.container}>
      {gpsPlansLoading ? (
        <View>
          <BuyGPSShimmer />
        </View>
      ) : gpsPlansError ? (
        <Text>Error: {gpsPlansError}</Text>
      ) : (
        <FlatList
          data={gpsPlansData}
          renderItem={renderRates}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default BuyGps;