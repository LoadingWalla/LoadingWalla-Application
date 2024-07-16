import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import CheckOutline from '../../../assets/SVG/svg/CheckOutline';
import {titleColor} from '../../Color/color';
import PercentageIcon from '../../../assets/SVG/svg/PercentageIcon';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGpsPlansRequest,
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/Actions';

const Plan = ({text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 8,
      }}>
      <CheckOutline size={15} color={'green'} style={{marginHorizontal: 10}} />
      <Text style={{fontFamily: 'PlusJakartaSans-Medium', fontSize: 14}}>
        {text}
      </Text>
    </View>
  );
};

const Rates = ({item, navigation}) => {
  const features = item.description.split('\n\n');

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('GpsType')}
      style={styles.rateContainer}>
      <View style={styles.rateHeader}>
        <View style={{borderWidth: 0, padding: 8}}>
          <Text style={styles.planTitle}>{item.plan_name}</Text>
          <View style={styles.discountContainer}>
            <PercentageIcon size={15} color={'#0F8B00'} />
            <Text style={styles.discountText}>
              {Math.round(
                ((item.price - item.selling_price) / item.price) * 100,
              )}
              % discount on current plan
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>₹ {item.price}/year</Text>
          <Text style={styles.newPrice}>₹ {item.selling_price}/ year</Text>
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
      console.log('Buy Gps', state.data);
      return state.data;
    });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(websocketDisconnect());
      return () => {
        dispatch(websocketConnect(gpsTokenData?.cookie));
      };
    }, [dispatch, gpsTokenData]),
  );

  useEffect(() => {
    dispatch(fetchGpsPlansRequest());
  }, [dispatch]);

  const renderRates = ({item}) => <Rates item={item} navigation={navigation} />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {gpsPlansLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : gpsPlansError ? (
        <Text>Error: {gpsPlansError}</Text>
      ) : (
        <FlatList
          data={gpsPlansData}
          renderItem={renderRates}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </ScrollView>
  );
};

export default BuyGps;

const styles = StyleSheet.create({
  rateContainer: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    paddingVertical: 15,
    padding: 5,
  },
  rateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  planTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: titleColor,
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  discountText: {
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 12,
    color: '#0F8B00',
    marginLeft: 5,
  },
  priceContainer: {
    paddingVertical: 10,
    backgroundColor: '#EFFFE6',
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  oldPrice: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  newPrice: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    color: '#0F8B00',
  },
});
