import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  backgroundColorNew,
  PrivacyPolicy,
  textColor,
  titleColor,
} from '../../Color/color';
import Button from '../../Components/Button';
import CopyIcon from '../../../assets/SVG/svg/CopyIcon';
import Clipboard from '@react-native-clipboard/clipboard';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/WebSocketActions';

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
    <View style={styles.container}>
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
              <Text style={styles.planText}>{truck.planType}</Text>
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
          <Text style={styles.discountText}>Extend and save up to 40%</Text>
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
        style={styles.btnStyle}
      />
    </View>
  );
};

export default OwnedGPS;

const styles = StyleSheet.create({
  container: {padding: 10, flex: 1},
  headerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  imageBox: {
    paddingBottom: 30,
    width: '25%',
  },
  image: {
    width: 60,
    height: 50,
    marginRight: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
  },
  itemBox: {
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  modelText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  bottomText: {
    color: '#000000',
    fontFamily: 'PlusJakartaSans-MediumItalic',
    fontSize: 12,
    textAlign: 'center',
  },
  discountText: {
    color: '#3BA700',
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    textAlign: 'left',
  },
  planText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#EFFFE6',
    color: '#108B00',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  dateValue: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  bottomBox: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  textBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '75%',
    alignItems: 'flex-start',
  },
  dateBox: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  dateChild: {flexDirection: 'row', marginTop: 5, alignItems: 'center'},
  dateHeaderText: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  getNowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  getNowButton: {
    backgroundColor: '#3BA700',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  getNowButtonText: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
  },
  historyBox: {
    marginVertical: 10,
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
  },
  paymentDetailBox: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3F0',
    padding: 10,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  paymentDetailText: {
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
    marginRight: 5,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  amountValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  taxText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
    marginLeft: 5,
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  orderDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  orderDateText: {
    fontSize: 14,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  downloadButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  flatlistStyle: {
    marginTop: 10,
  },
  noGpsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  noGpsText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: backgroundColorNew,
  },
});
