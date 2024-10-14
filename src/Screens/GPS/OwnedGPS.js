import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../Components/Button';
import CopyIcon from '../../../assets/SVG/svg/CopyIcon';
import Clipboard from '@react-native-clipboard/clipboard';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/WebSocketActions';
import styles from './style';

const truck = {
  id: '1',
  model: 'DEL 00122 87DP',
  purchaseDate: 'Feb 20, 2024',
  expiryDate: 'Feb 20, 2025',
  planType: '1 Year plan',
  status: 'Active',
  image: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
};

const paymentData = [
  // {
  //   id: '1',
  //   transactionNumber: '#002861626121',
  //   totalAmount: '₹99',
  //   orderDate: 'June 16, 2024',
  // },
  // {
  //   id: '2',
  //   transactionNumber: '#002861626121',
  //   totalAmount: '₹99',
  //   orderDate: 'June 16, 2023',
  // },
  // {
  //   id: '3',
  //   transactionNumber: '#002861626121',
  //   totalAmount: '₹99',
  //   orderDate: 'June 16, 2023',
  // },
  // {
  //   id: '4',
  //   transactionNumber: '#002861626121',
  //   totalAmount: '₹99',
  //   orderDate: 'June 16, 2023',
  // },
];

const OwnedGPS = ({navigation, route}) => {
  const {deviceId} = route.params;
  // console.log(4444, route.params);
  const dispatch = useDispatch();

  const {gpsTokenData, gpsDeviceData} = useSelector(state => state.data);

  const deviceData = gpsDeviceData?.find(device => device.id === deviceId);
  console.log(4444, deviceData);

  const handleNavigationPress = () => {
    dispatch(websocketConnect(gpsTokenData?.cookie));
    navigation.navigate('trackingtruck', {deviceId});
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(websocketDisconnect());
      return () => {};
    }, [dispatch, gpsTokenData]),
  );

  const copyToClipboard = text => {
    Clipboard.setString(text);
  };

  const renderItem = ({item}) => (
    <View style={styles.paymentDetailBox}>
      <View style={styles.paymentHeader}>
        <Text style={styles.paymentDetailText}>Payment Details</Text>
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionText}>
            Trn no: {item.transactionNumber}
          </Text>
          <TouchableOpacity
            onPress={() => copyToClipboard(item.transactionNumber)}>
            <CopyIcon size={14} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.paymentRow}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountValue}>Total Amount</Text>
          <Text style={styles.taxText}>(Inc. of taxes)</Text>
        </View>
        <Text style={styles.amountValue}>{item.totalAmount}</Text>
      </View>
      <View style={styles.orderContainer}>
        <View style={styles.orderDateContainer}>
          <Text style={styles.orderDateText}>Ordered On : </Text>
          <Text style={styles.orderDateText}>{item.orderDate}</Text>
        </View>
        {/* <TouchableOpacity style={styles.downloadButton}>
          <DownloadIcon size={18} />
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <View style={styles.gpsTrackContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.itemBox}>
          <View style={styles.imageBox}>
            <Image
              source={{
                uri: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.textBox}>
            <View style={styles.textContainer}>
              <Text style={styles.modelText}>{deviceData?.name}</Text>
              <Text style={styles.ownedGpsPlanText}>{truck.planType}</Text>
            </View>
            <View style={styles.dateBox}>
              <View style={styles.dateChild}>
                <Text style={styles.dateHeaderText}>Purchased date: </Text>
                <Text style={styles.dateValue}>{truck.purchaseDate}</Text>
              </View>
              <View style={styles.dateChild}>
                <Text style={styles.dateHeaderText}>Phone Number : </Text>
                <Text style={styles.dateValue}>{deviceData?.phone}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomBox}>
          <Text style={styles.bottomText}>
            GPS plan will get expire on {truck.expiryDate}
          </Text>
        </View>
      </View>
      <View style={styles.getNowBox}>
        <View>
          <Text style={styles.modelText}>Extend the GPS Plan?</Text>
          <Text style={styles.ownedGpsDiscountText}>Extend and save up to 40%</Text>
        </View>
        <TouchableOpacity
          style={styles.getNowButton}
          onPress={() => navigation.navigate('BuyGPS')}>
          <Text style={styles.getNowButtonText}>Get Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyBox}>
        <Text style={styles.modelText}>Payment history</Text>
        <FlatList
          data={paymentData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          style={styles.flatlistStyle}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.noGpsContainer}>
              <Text style={styles.noGpsText}>No GPS found</Text>
            </View>
          }
        />
      </View>
      <Button
        title={'Track this truck'}
        onPress={handleNavigationPress}
        textStyle={styles.btnText}
        style={styles.ownedGpsBtnStyle}
      />
    </View>
  );
};

export default OwnedGPS;
