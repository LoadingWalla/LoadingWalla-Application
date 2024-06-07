import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-simple-toast';
import * as Constants from '../../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrderFailure,
  initCreateOrder,
  initGetWallet,
  initVerifyPaymentRequest,
  initWallet,
  walletFailure,
} from '../../../Store/Actions/Actions';
import {
  GradientColor3,
  PrivacyPolicy,
  backgroundColorNew,
  pageBackground,
  textColor,
  titleColor,
} from '../../../Color/color';
import Button from '../../../Components/Button';
import AlertBox from '../../../Components/AlertBox';
import {SceneMap, TabView} from 'react-native-tab-view';
import RenderTabBar from '../../Requests/RenderTabBar';
import RightArrow2 from '../../../../assets/SVG/svg/RightArrow2';
import {useTranslation} from 'react-i18next';

const Wallet = ({navigation}) => {
  const [amount, setAmount] = useState(100);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {
    wallletData,
    walletStatus,
    walletLoading,
    getWallletData,
    orderData,
    orderLoading,
    orderStatus,
    verifyPaymentLoading,
    verifyPaymentData,
    verifyPaymentStatus,
  } = useSelector(state => {
    console.log('My Wallet', state.data);
    return state.data;
  });

  useEffect(() => {
    dispatch(initGetWallet());
  }, [dispatch]);

  useEffect(() => {
    if (orderData && orderData.id) {
      proceedWithPayment();
    }
  }, [orderData]);

  useEffect(() => {
    if (walletStatus !== null) {
      if (walletStatus === 200) {
        Toast.show(`${wallletData}`, Toast.LONG);
        // AlertBox(wallletData);
        dispatch(initGetWallet());
        setAmount(0);
        dispatch(walletFailure());
      }
      if (verifyPaymentStatus === 'success') {
        Toast.show('Payment Successful');
        dispatch(initWallet(amount));
      } else {
        console.log('Payment Verification Failed');
        Toast.show('Payment Verification Failed');
      }
    }
  }, [dispatch, walletStatus, wallletData, verifyPaymentStatus]);

  const handleAmountChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAmount(numericValue);
  };

  const addAmount = () => {
    if (
      parseInt(amount, 10) === 0 ||
      parseInt(amount, 10) < 100 ||
      parseInt(amount, 10) > 100000
    ) {
      Toast.show('Please enter an amount between 100 and 1,00,000', Toast.LONG);
      return;
    }
    dispatch(initCreateOrder(parseInt(amount, 10), getWallletData.id));
    // for testing only
    // dispatch(
    //   initVerifyPaymentRequest('pay_OGF2UeAA6Yjryd', 'order_OGF1mJCNaa6lpk'),
    // );
  };

  const proceedWithPayment = async () => {
    var options = {
      description: 'Loading Walla',
      image: getWallletData?.profile_img,
      currency: 'INR',
      key: 'rzp_live_SuyP4BXtpLkIzS',
      amount: orderData.amount, // amount should be in the smallest currency unit
      name: getWallletData?.name,
      order_id: orderData.id, // this is important, it links the payment to the order created on the server
      prefill: {
        email: getWallletData?.email,
        contact: getWallletData?.mobile,
        name: 'Loading Walla',
      },
      theme: {color: backgroundColorNew},
    };

    // console.log(9999999, options);

    RazorpayCheckout.open(options)
      .then(data => {
        console.log(7777, data);
        if (data?.razorpay_payment_id) {
          dispatch(
            initVerifyPaymentRequest(
              data.razorpay_payment_id,
              data.razorpay_order_id,
            ),
          );
        } else {
          AlertBox('Transaction not successful');
        }
      })
      .catch(error => {
        // console.log('Payment Error:', error);
        dispatch(createOrderFailure());
        AlertBox('Transaction not successful');
      });
  };

  const quickAmount = ['100', '200', '500', '1000', '5000'];
  const onSetAmount = amt => {
    let newamt;
    if (amount === '') {
      newamt = parseInt(amt, 10);
    } else {
      newamt = parseInt(amount, 10) + parseInt(amt, 10);
    }
    setAmount(newamt);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'recharge', title: t(Constants.RECHARGE)},
    {key: 'deductions', title: t(Constants.DEDUCTION)},
  ]);

  const data = Array.from({length: 10}, (_, index) => ({
    id: index.toString(),
    amount: '5000',
    date: '31 Dec 2023, 03:08 PM',
  }));

  const rechargeRenderItem = ({item}) => (
    <View style={styles.repeatView}>
      <View>
        <Text style={styles.paymentText}>
          ₹ {item.amount} Payment successful
        </Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <TouchableOpacity
        onPress={() => setAmount(5000)}
        style={styles.requestButtonContainer}>
        <Text style={styles.gradientButtonText}>Repeat</Text>
      </TouchableOpacity>
    </View>
  );

  // const deductionRenderItem = ({item}) => (
  //   <View style={styles.deductionCard}>
  //     <View style={styles.rowdirection}>
  //       <Text style={styles.textDetailStyle}>BR 01 FF 7867</Text>
  //       <View style={styles.verticalLine} />
  //       <Text style={styles.textDetailStyle}>15 Ton</Text>
  //       <View style={styles.verticalLine} />
  //       <Text style={styles.textDetailStyle}>22 Tyre</Text>
  //       <View style={styles.verticalLine} />
  //       <Text style={styles.textDetailStyle}>Half Body</Text>
  //     </View>
  //     <View style={styles.horizontalLine} />
  //     <View style={styles.loacationBox}>
  //       <View style={styles.loactionTextView}>
  //         <View style={styles.circleDot} />
  //         <Text style={styles.locationText}>Jamshedpur, Jharkhand</Text>
  //       </View>
  //       <RightArrow2 />
  //       <View style={styles.loactionTextView}>
  //         <View style={styles.squareDot} />
  //         <Text style={styles.locationText}>New Delhi, Delhi</Text>
  //       </View>
  //     </View>
  //     <View style={styles.horizontalLine} />
  //     <View style={styles.rowdirection}>
  //       <Text style={styles.textDetailStyle}>200 Ton</Text>
  //       <View style={styles.verticalLine} />
  //       <Text style={styles.textDetailStyle}>RICE BAGS</Text>
  //       <View style={styles.verticalLine} />
  //       <Text style={styles.textDetailStyle}>₹ 120000 / Fixed</Text>
  //     </View>
  //     <View>
  //       <Text>31 Dec 2023, 03:08 PM</Text>
  //       <View>
  //         <Text>₹ 1000</Text>
  //       </View>
  //     </View>
  //   </View>
  // );

  const RechargeRoute = () => (
    <View style={{flex: 1, backgroundColor: '#fff', marginTop: 20}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={rechargeRenderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const DeductionsRoute = () => (
    <View style={{flex: 1, backgroundColor: '#fff', marginTop: 20}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={rechargeRenderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.texts}>{t(Constants.TOTAL_TOPUP_AMOUNT)}</Text>
            <Text style={styles.walletText}>
              {t(Constants.ACCOUNT_BALANCE)}
            </Text>
          </View>
          <View>
            <Text style={styles.texts}>{t(Constants.BALANCE)}</Text>
            <Text style={styles.walletText}>
              {`₹ ${getWallletData?.wallet || '0'}`}
            </Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <Text style={styles.topupWallet}>{t(Constants.ENTER_AMOUNT)}</Text>
        <View style={styles.inputContainerBox}>
          <View style={styles.inputContainer}>
            <TextInput
              value={'' + amount + ''}
              onChangeText={handleAmountChange}
              placeholder="Enter amount"
              style={styles.textInput}
              keyboardType="numeric"
              placeholderTextColor={PrivacyPolicy}
            />
          </View>
          <Button
            onPress={() => addAmount()}
            title={t(Constants.TOPUP)}
            loading={orderLoading}
            textStyle={styles.textStyle}
            style={styles.buttonStyle}
          />
        </View>

        <FlatList
          data={quickAmount}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onSetAmount(item)}
              activeOpacity={0.5}
              style={styles.renderItemStyle}>
              <Text style={styles.suggest}>+ ₹{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.tabView}>
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            recharge: RechargeRoute,
            deductions: DeductionsRoute,
          })}
          onIndexChange={setIndex}
          initialLayout={{width: '100%'}}
          renderTabBar={RenderTabBar}
        />
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    backgroundColor: pageBackground,
    flex: 1,
  },
  box: {
    backgroundColor: 'white',
    padding: 15,
    elevation: 2,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 10,
  },
  texts: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
  },
  walletText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: titleColor,
    fontSize: 20,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginVertical: 10,
  },
  topupWallet: {
    color: PrivacyPolicy,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  dateText: {
    color: PrivacyPolicy,
    fontSize: 12,
    marginTop: 5,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  inputContainer: {
    height: 50,
    borderRadius: 4,
    borderColor: '#E7E7E7',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    // marginBottom: 10,
    minWidth: 150,
  },
  textInput: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    width: '100%',
    color: PrivacyPolicy,
  },
  renderItemStyle: {
    flexShrink: 1,
    backgroundColor: '#fffffa',
    shadowColor: GradientColor3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    width: 100,
    padding: 8,
    margin: 5,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggest: {
    fontFamily: 'PlusJakartaSans-Medium',
    color: titleColor,
  },
  buttonStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  requestButtonContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GradientColor3,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  gradientButtonText: {
    fontSize: 12,
    color: GradientColor3,
    fontFamily: 'PlusJakartaSans-SemiBold',
    textAlign: 'center',
  },
  repeatView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    elevation: 2,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  deductionCard: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    elevation: 2,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  tabView: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#FFFDFD',
  },
  paymentText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: 'green',
  },
  rowdirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textDetailStyle: {
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  verticalLine: {
    backgroundColor: PrivacyPolicy,
    width: 2,
    marginHorizontal: 10,
    height: '100%',
  },
  loacationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'green',
    marginRight: 5,
  },
  squareDot: {
    width: 8,
    height: 8,
    backgroundColor: 'red',
    marginRight: 5,
  },
  loactionTextView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  locationText: {
    // borderWidth: 1,
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  inputContainerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
