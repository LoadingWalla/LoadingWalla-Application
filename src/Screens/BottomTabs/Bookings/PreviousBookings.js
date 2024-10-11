import React, {useCallback, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../../Constants/Constant';
import {initBooking} from '../../../Store/Actions/Actions';
import CardHeader from '../../../Components/CardHeader';
import styles from './style'
import BookingShimmer from '../../../Components/Shimmer/BookingShimmer';
import {PrivacyPolicy} from '../../../Color/color';
import NotFound from '../../../Components/NotFound';
import {useTranslation} from 'react-i18next';

const PreviousBookings = ({navigation, route}) => {
  const {Owner} = route?.params;
  // console.log(989898, Owner);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const {BookingData, BookingLoading} = useSelector(state => state.data);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(initBooking(3));
    setRefreshing(false);
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(initBooking(3));
    }, [dispatch]),
  );

  const renderBookingItem = ({item}) => {
    // console.log("Baigan", item);
    const date = new Date(item?.created_at);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      // weekday: "long",
    });
    return (
      <View style={styles.prevBookingCard}>
        <CardHeader
          from={item?.from}
          to={item?.to}
          icon={'https://loadingwalla.com/public/truck_tyre/14%20Tyre.png'}
          t={t}
        />
        <View style={styles.prevBookingHorizontalLine} />
        <View style={styles.infoContainer}>
          <Text style={styles.textStyle}>{t(Constants.COMPLETED_ON)} </Text>
          <Text style={styles.textStyle}>{formattedDate}</Text>
        </View>
        <View style={styles.prevBookingHorizontalLine} />
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() =>
            navigation.navigate('viewDetail', {item, Owner: Owner})
          }>
          <Text style={styles.viewDetail}>{t(Constants.VIEW_DETAILS)}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.prevBookingContainer}>
      {BookingLoading ? (
        <BookingShimmer />
      ) : BookingData?.length > 0 ? (
        <FlatList
          keyExtractor={item => item?.id.toString()}
          data={BookingData}
          renderItem={renderBookingItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <NotFound
            imageName="noPreviousBookings"
            height={200}
            width={300}
            title={t(Constants.NO_PREV_BOOKINGS)}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default PreviousBookings;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFDFD',
//   },
//   card: {
//     borderRadius: 8,
//     elevation: 2,
//     backgroundColor: '#FFFFFF',
//     padding: 10,
//     marginBottom: 10,
//     marginTop: 10,
//     marginLeft: 5,
//     marginRight: 5,
//   },
//   horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
//   infoContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textStyle: {
//     fontWeight: '700',
//     fontSize: 16,
//     color: 'green',
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   viewDetail: {
//     fontSize: 15,
//     fontFamily: 'PlusJakartaSans-Bold',
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
//   scrollViewContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   notFoundText: {
//     fontSize: 18,
//     color: PrivacyPolicy,
//     fontFamily: 'PlusJakartaSans-Medium',
//   },
//   lottieStyle: {height: 250, width: 250},
//   detailsButton: {
//     alignItems: 'center',
//   },
// });
