import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useEffect} from 'react';
import GpsItem from '../../Components/GpsItem';
import Button from '../../Components/Button';
import {backgroundColorNew, textColor} from '../../Color/color';
import {
  fetchGpsDevicesRequest,
  fetchTokenRequest,
} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';

const GpsTrackings = ({navigation}) => {
  const dispatch = useDispatch();
  const getItemCount = data => data?.length;
  const getItem = (data, index) => data[index];

  const {
    gpsTokenLoading,
    gpsTokenData,
    gpsTokenStatus,
    gpsDeviceLoading,
    gpsDeviceData,
    gpsDeviceStatus,
  } = useSelector(state => {
    // console.log('profile Data', state.data);
    return state.data;
  });

  useEffect(() => {
    dispatch(fetchTokenRequest());
  }, [dispatch]);

  useEffect(() => {
    if (gpsTokenData) {
      dispatch(
        fetchGpsDevicesRequest(gpsTokenData.email, gpsTokenData.password),
      );
    }
  }, [dispatch, gpsTokenData]);

  return (
    <View style={styles.conatiner}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>GPS Purchases</Text>
      </View>
      {gpsDeviceLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size={'large'} color={backgroundColorNew} />
        </View>
      ) : (
        // <VirtualizedList
        //   data={gpsDeviceData}
        //   initialNumToRender={6}
        //   showsVerticalScrollIndicator={false}
        //   renderItem={({item}) => (
        //     <GpsItem item={item} icon={true} navigation={navigation} />
        //   )}
        //   keyExtractor={item => item.id.toString()}
        //   getItemCount={getItemCount}
        //   getItem={getItem}
        // />
        <FlatList
          data={gpsDeviceData}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <GpsItem item={item} icon={true} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <Button
        title={'Buy GPS'}
        onPress={() => navigation.navigate('BuyGPS')}
        // loading={statusChangeLoading}
        textStyle={styles.btnText}
        style={styles.btnStyle}
      />
    </View>
  );
};

export default GpsTrackings;

const styles = StyleSheet.create({
  conatiner: {paddingHorizontal: 10, flex: 1},
  headerContainer: {
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    paddingLeft: 10,
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  loadingStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
