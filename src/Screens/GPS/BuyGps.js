import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import CheckOutline from '../../../assets/SVG/svg/CheckOutline';
import {backgroundColorNew, titleColor} from '../../Color/color';
import PercentageIcon from '../../../assets/SVG/svg/PercentageIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGpsPlansRequest} from '../../Store/Actions/Actions';
import {
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/WebSocketActions';
import styles from './style'

const Plan = ({text}) => {
  return (
    <View style={styles.planContainer}>
      <CheckOutline size={15} color={'green'} style={{marginHorizontal: 10}} />
      <Text style={styles.planText}>{text}</Text>
    </View>
  );
};

const Rates = ({item, navigation}) => {
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
              {percentageDiscount}% discount on current plan
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
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={backgroundColorNew} />
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

// const styles = StyleSheet.create({
//   rateContainer: {
//     margin: 10,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     elevation: 2,
//     paddingVertical: 15,
//     padding: 5,
//   },
//   rateHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   planTitle: {
//     fontFamily: 'PlusJakartaSans-Bold',
//     fontSize: 14,
//     color: titleColor,
//     textTransform: 'capitalize',
//   },
//   discountContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   discountText: {
//     fontFamily: 'PlusJakartaSans-Light',
//     fontSize: 12,
//     color: '#0F8B00',
//     marginLeft: 5,
//   },
//   priceContainer: {
//     paddingVertical: 10,
//     backgroundColor: '#EFFFE6',
//     borderRadius: 6,
//     paddingHorizontal: 15,
//   },
//   oldPrice: {
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     fontSize: 12,
//     textDecorationLine: 'line-through',
//   },
//   newPrice: {
//     fontFamily: 'PlusJakartaSans-Bold',
//     fontSize: 14,
//     color: '#0F8B00',
//   },
//   planContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginVertical: 8,
//   },
//   planText: {
//     fontFamily: 'PlusJakartaSans-Medium',
//     fontSize: 14,
//     textTransform: 'capitalize',
//   },
//   loader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
// });
