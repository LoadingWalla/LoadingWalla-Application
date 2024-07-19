import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  backgroundColorNew,
  pageBackground,
  textColor,
  titleColor,
} from '../../Color/color';
import Button from '../../Components/Button';
import PurchaseGpsHeader from '../../Components/PurchaseGpsHeader';
import {useDispatch, useSelector} from 'react-redux';
import EditIcon from '../../../assets/SVG/svg/EditIcon';
import {
  createOrderFailure,
  fetchGpsOrderDetailRequest,
  initCreateOrder,
  initVerifyPaymentRequest,
} from '../../Store/Actions/Actions';
import AnimatedText from '../../Components/AnimatedText';
import RazorpayCheckout from 'react-native-razorpay';
import AlertBox from '../../Components/AlertBox';
import Toast from 'react-native-simple-toast';

const ReusableSummaryItem = ({title, value}) => (
  <View style={styles.reusableItemContainer}>
    <AnimatedText text={title} style={styles.reusableItemContainerText} />
    <AnimatedText text={value} style={styles.reusableItemContainerText} />
  </View>
);

const ReusableItem = ({title, value, isTax}) => {
  return (
    <View style={styles.reusableItemContainer}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.reusableItemContainerText}>{title}</Text>
        {isTax && (
          <Text
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              fontSize: 12,
              textAlign: 'center',
              marginTop: 5,
            }}>
            {'  (Inc. of taxes)'}
          </Text>
        )}
      </View>
      <Text style={styles.reusableItemContainerText}>{value}</Text>
    </View>
  );
};

const PaymentGPS = ({navigation, route}) => {
  const {plan_id, gpsCount, gpsOrderId, totalAmount} = route.params;
  console.log(22222, route);
  const {
    gpsPlansData,
    gpsOrderDetailsData,
    gpsPriceDetailsData,
    Userdata,
    orderData,
    verifyPaymentLoading,
    verifyPaymentData,
    verifyPaymentStatus,
  } = useSelector(state => state.data);
  const filteredPlanData = gpsPlansData?.find(plan => plan.id === plan_id);
  const markedPrice =
    Math.ceil(filteredPlanData.gps_price * 1.18) +
    Math.ceil(filteredPlanData.recharge_price * 1.18);
  const sellingPrice = markedPrice - filteredPlanData.discount;
  // const percentageDiscount = Math.ceil(
  //   ((markedPrice - sellingPrice) / markedPrice) * 100,
  // );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGpsOrderDetailRequest(gpsOrderId));
  }, [dispatch]);

  useEffect(() => {
    if (Userdata === null) {
      navigation.navigate('Menu');
    }
  }, [Userdata]);

  useEffect(() => {
    if (verifyPaymentData !== null) {
      if (verifyPaymentData.status === 'success') {
        Toast.show(verifyPaymentData.message);
        // redirection
        navigation.navigate('purchasingStatus');
      } else {
        // console.log('Payment Verification Failed');
        Toast.show('Payment Verification Failed');
        // redirection
        navigation.navigate('purchasingStatus');
      }
    }
  }, [verifyPaymentStatus]);

  const payNow = () => {
    dispatch(
      initCreateOrder(
        parseInt(totalAmount, 10),
        Userdata.id,
        gpsOrderDetailsData.id,
      ),
    );
  };

  const proceedWithPayment = async () => {
    var options = {
      description: 'Loading Walla GPS',
      image: Userdata.profile_img,
      currency: 'INR',
      key: 'rzp_live_SuyP4BXtpLkIzS',
      amount: orderData.amount, // amount should be in the smallest currency unit
      name: Userdata.name,
      order_id: orderData.id, // this is important, it links the payment to the order created on the server
      prefill: {
        email: Userdata.email,
        contact: Userdata.mobile,
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
          console.log('not success');
          AlertBox('Transaction not successful');
        }
      })
      .catch(error => {
        console.log('Payment Error:', error);
        dispatch(createOrderFailure());
        AlertBox('Transaction not successful');
      });
  };

  useEffect(() => {
    if (orderData && orderData.id) {
      proceedWithPayment();
    }
  }, [orderData]);

  // useEffect(() => {
  //   if (walletStatus !== null) {
  //     if (walletStatus === 200) {
  //       Toast.show(`${wallletData}`, Toast.LONG);
  //       // AlertBox(wallletData);
  //       dispatch(initGetWallet());
  //       setAmount(0);
  //       dispatch(walletFailure());
  //     }
  //     if (verifyPaymentStatus === 'success') {
  //       Toast.show('Payment Successful');
  //       dispatch(initWallet(amount));
  //     } else {
  //       console.log('Payment Verification Failed');
  //       Toast.show('Payment Verification Failed');
  //     }
  //   }
  // }, [dispatch, walletStatus, wallletData, verifyPaymentStatus]);

  return (
    <View style={styles.container}>
      <PurchaseGpsHeader
        icon={true}
        edit={false}
        planName={filteredPlanData?.plan_name}
        planValidity={filteredPlanData?.validity}
        footertitle={`YAY! You saved ₹ ${
          filteredPlanData?.discount * gpsCount
        } on this purchase`}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={styles.scrollContainer}>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentDetailView}>
              <Text style={styles.paymentDetailText}>Purchase summary</Text>
              <TouchableOpacity style={styles.editButton} onPress={''}>
                <EditIcon size={13} color={backgroundColorNew} />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <ReusableSummaryItem
              title={'Full name'}
              value={gpsOrderDetailsData?.name}
            />
            <ReusableSummaryItem
              title={'Alternate Phone'}
              value={gpsOrderDetailsData?.mobile}
            />
            <ReusableSummaryItem
              title={'Full address'}
              value={gpsOrderDetailsData?.address}
            />
            <ReusableSummaryItem
              title={'RC number #1'}
              value={gpsOrderDetailsData?.rc_numbers}
            />
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentDetailView}>
              <Text style={styles.paymentDetailText}>Payment Details</Text>
            </View>
            <View style={styles.totalAmountContainer}>
              <View style={styles.totalAmountTextContainer}>
                <Text
                  style={{fontFamily: 'PlusJakartaSans-Bold', fontSize: 16}}>
                  Total Amount{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: 'PlusJakartaSans-Regular',
                    fontSize: 12,
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  (Inc. of taxes)
                </Text>
              </View>
              <Text style={{fontFamily: 'PlusJakartaSans-Bold', fontSize: 16}}>
                ₹ {markedPrice}
              </Text>
            </View>
            <View style={{backgroundColor: '#FAFAFA'}}>
              <ReusableItem title={'GPS'} value={'₹ 99'} isTax={true} />
              <View style={{paddingHorizontal: 10, marginTop: -10}}>
                <ReusableItem title={'GPS Charges'} value={'₹ 0'} />
              </View>
              <View style={{paddingHorizontal: 10, marginTop: -10}}>
                <ReusableItem
                  title={'GPS GST Charges'}
                  value={'₹ 0'}
                  isTax={true}
                />
              </View>
            </View>
            <View style={{backgroundColor: '#FAFAFA'}}>
              <ReusableItem
                title={'Recharge + Services'}
                value={'₹ 99'}
                isTax={true}
              />
              <View style={{paddingHorizontal: 10, marginTop: -10}}>
                <ReusableItem
                  title={'Recharge + Services Charges'}
                  value={'₹ 0'}
                />
              </View>
              <View style={{paddingHorizontal: 10, marginTop: -10}}>
                <ReusableItem
                  title={'Recharge + Services GST'}
                  value={'₹ 0'}
                  isTax={true}
                />
              </View>
            </View>
            <View style={styles.discountView}>
              <Text style={styles.discountText}>Loading Walla discount</Text>
              <Text style={styles.discountText}>
                ₹ {filteredPlanData?.discount * gpsCount}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.amountText}>Amount to be paid</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text style={styles.markedPriceText}>₹ {markedPrice}</Text>
            <Text style={styles.sellingPriceText}>₹ {totalAmount}</Text>
          </View>
        </View>
        <Button
          title={'Pay Now'}
          textStyle={styles.btnText}
          style={styles.btnStyle}
          onPress={() => payNow()}
        />
      </View>
    </View>
  );
};

export default PaymentGPS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  paymentContainer: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  reusableItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  totalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
    // borderBottomWidth: 1,
    borderColor: '#00000029',
  },
  totalAmountTextContainer: {
    flexDirection: 'row',
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: textColor,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  paymentDetailView: {
    flexDirection: 'row',
    backgroundColor: '#FFF3F0',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  discountView: {
    flexDirection: 'row',
    backgroundColor: '#FFF3F0',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  paymentDetailText: {
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  discountText: {
    fontSize: 14,
    color: '#3BA700',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
  },
  footerTextContainer: {
    paddingLeft: 10,
  },
  amountText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
  },
  amountValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
  },
  markedPriceText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 12,
    color: '#EF4D23',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  sellingPriceText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#3BA700',
  },
  editButton: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    marginLeft: 10,
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  reusableItemContainerText: {
    color: '#4B4B4B',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
});
