import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, FlatList} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-simple-toast';
import * as Constants from '../../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrderFailure,
  initCreateOrder,
  initGetWallet,
  initTranscationDetails,
  initVerifyPaymentRequest,
  initWallet,
  walletFailure,
} from '../../../Store/Actions/Actions';
import {PrivacyPolicy, backgroundColorNew} from '../../../Color/color';
import Button from '../../../Components/Button';
import {SceneMap, TabView} from 'react-native-tab-view';
import RenderTabBar from '../../Requests/RenderTabBar';
import {useTranslation} from 'react-i18next';
import NotFound from '../../../Components/NotFound';
import styles from './style';
import useTrackScreenTime from '../../../hooks/useTrackScreenTime';
import { formatDate } from '../../../Utils/dateUtils';

const Wallet = ({navigation}) => {
  useTrackScreenTime('Wallet');
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
    transcationLoading,
    transcationData,
    transcationStatus,
  } = useSelector(state => {
    console.log('My Wallet', state.data);
    return state.data;
  });

  useEffect(() => {
    dispatch(initGetWallet());
    dispatch(initTranscationDetails());
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
        // Toast.show('Payment Successful');
        navigation.navigate('purchasingStatus', {
          statusCode: 200,
          navigation: 'Menu',
        });
        dispatch(initWallet(amount));
      } else {
        console.log('Payment Verification Failed');
        // Toast.show('Payment Verification Failed');
        navigation.navigate('purchasingStatus', {
          statusCode: 400,
          navigation: 'Menu',
        });
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
    dispatch(initCreateOrder(parseInt(amount, 10), getWallletData.id, 0));
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
        // console.log(7777, data);
        if (data?.razorpay_payment_id) {
          dispatch(
            initVerifyPaymentRequest(
              data.razorpay_payment_id,
              data.razorpay_order_id,
            ),
          );
        } else {
          // AlertBox('Transaction not successful');
          navigation.navigate('purchasingStatus', {
            statusCode: 400,
            navigation: 'Menu',
          });
        }
      })
      .catch(error => {
        // console.log('Payment Error:', error);
        dispatch(createOrderFailure());
        navigation.navigate('purchasingStatus', {
          statusCode: 400,
          navigation: 'Menu',
        });
        // AlertBox('Transaction not successful');
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

  const rechargeRenderItem = ({item}) => {
    // console.log(44444, item);
    return (
      <View style={styles.repeatView}>
        <View>
          <Text style={styles.paymentText}>
            ₹ {item?.amount} Payment successful
          </Text>
          <Text style={styles.dateText}>{formatDate(item?.created_at)}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setAmount(item?.amount)}
          style={styles.requestButtonContainer}>
          <Text style={styles.gradientButtonText}>Repeat</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
    <View style={styles.rechargeRouteView}>
      {transcationData && transcationData.length > 0 ? (
        <FlatList
          data={transcationData.slice().reverse()}
          keyExtractor={item => item.id}
          renderItem={rechargeRenderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NotFound
          imageName="noBookings"
          title={t(Constants.NO_TRANSCATION_FOUND)}
          height={150}
          width={300}
        />
      )}
    </View>
  );

  // const DeductionsRoute = () => (
  //   <View style={{flex: 1, backgroundColor: '#fff', marginTop: 20}}>
  //     {transcationData?.length === 0 ? (
  //       <NotFound
  //         imageName="noBookings"
  //         title={'No Transcation Found'}
  //         height={150}
  //         width={300}
  //       />
  //     ) : (
  //       <FlatList
  //         data={transcationData}
  //         keyExtractor={item => item.id}
  //         renderItem={deductionRenderItem}
  //         showsVerticalScrollIndicator={false}
  //       />
  //     )}
  //   </View>
  // );
  const DeductionsRoute = () => (
    <View style={styles.rechargeRouteView}>
      <NotFound
        imageName="noBookings"
        title={t(Constants.NO_TRANSCATION_FOUND)}
        height={150}
        width={300}
      />
    </View>
  );

  return (
    <View style={styles.walletContainer}>
      <View style={styles.box}>
        <View style={styles.walletTextsView}>
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
        <View style={styles.walletHorizontalLine} />
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
            textStyle={styles.walletTextStyle}
            style={styles.walletButtonStyle}
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
