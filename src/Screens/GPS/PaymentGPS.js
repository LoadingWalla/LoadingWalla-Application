import React, {useEffect, useMemo} from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import {backgroundColorNew} from '../../Color/color';
import Button from '../../Components/Button';
import PurchaseGpsHeader from '../../Components/PurchaseGpsHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  createOrderFailure,
  fetchGpsOrderDetailRequest,
  initCreateOrder,
  initProfile,
  initVerifyPaymentRequest,
} from '../../Store/Actions/Actions';
import AnimatedText from '../../Components/AnimatedText';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-simple-toast';
import {useTranslation} from 'react-i18next';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const createFullAddressArray = data => {
  const fullAddress = `${data.address}, ${data.landmark}, ${data.city}, ${data.state}, ${data.pincode}`;
  return fullAddress;
};

const ReusableSummaryItem = React.memo(({title, value}) => (
  <View style={styles.reusableItemContainer}>
    <AnimatedText
      text={title}
      style={styles.reusableItemContainerText}
      showAnimation={false}
    />
    <AnimatedText
      text={value}
      style={styles.reusableItemContainerText}
      showAnimation={true}
    />
  </View>
));

const ReusableItem = React.memo(({title, value, isTax, isTaxValue}) => (
  <View style={styles.reusableItemContainer}>
    <View style={styles.row}>
      <Text style={styles.reusableItemContainerText}>{title}</Text>
      {isTax && <Text style={styles.paymentGpsTaxText}>{isTaxValue}</Text>}
    </View>
    <Text style={styles.reusableItemContainerText}>{value}</Text>
  </View>
));

const PaymentGPS = ({navigation, route}) => {
  useTrackScreenTime('PaymentGps');
  const {plan_id, gpsCount, gpsOrderId, totalAmount} = route.params;
  const {t} = useTranslation();
  // console.log(77777, 'paymentGPS', route);

  const {
    gpsPlansData,
    gpsOrderDetailsData,
    Userdata,
    orderData,
    orderLoading,
    verifyPaymentData,
    gpsOrderData,
    verifyPaymentStatus,
  } = useSelector(state => state.data);

  const dispatch = useDispatch();

  const fullAddressArray = useMemo(
    () => createFullAddressArray(gpsOrderData),
    [gpsOrderData],
  );
  // console.log(44444, fullAddressArray);

  const filteredPlanData = useMemo(
    () => gpsPlansData?.find(plan => plan.id === plan_id),
    [gpsPlansData, plan_id],
  );

  const markedPrice = useMemo(() => {
    const gpsPriceWithGst = Math.ceil(filteredPlanData.gps_price * 1.18);
    const rechargePriceWithGst = Math.ceil(
      filteredPlanData.recharge_price * 1.18,
    );
    return gpsPriceWithGst + rechargePriceWithGst;
  }, [filteredPlanData]);

  const sellingPrice = useMemo(
    () => markedPrice - filteredPlanData.discount,
    [markedPrice, filteredPlanData.discount],
  );

  const gpsGst = useMemo(
    () => 0.18 * filteredPlanData.gps_price,
    [filteredPlanData.gps_price],
  );
  const totalGps = useMemo(
    () => filteredPlanData.gps_price + gpsGst,
    [filteredPlanData.gps_price, gpsGst],
  );
  const rechargeGst = useMemo(
    () => 0.18 * filteredPlanData.recharge_price,
    [filteredPlanData.recharge_price],
  );
  const totalRecharge = useMemo(
    () => filteredPlanData.recharge_price + rechargeGst,
    [filteredPlanData.recharge_price, rechargeGst],
  );

  useEffect(() => {
    dispatch(fetchGpsOrderDetailRequest(gpsOrderId));
  }, [dispatch, gpsOrderId]);

  useEffect(() => {
    if (Userdata === null) {
      dispatch(initProfile());
    }
  }, [Userdata]);

  useEffect(() => {
    if (verifyPaymentData && verifyPaymentStatus) {
      Toast.show(verifyPaymentData.message);
      navigation.navigate('purchasingStatus', {
        statusCode: verifyPaymentStatus,
        navigation: 'GPS',
      });
    }
  }, [verifyPaymentData, verifyPaymentStatus, navigation]);

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
    const options = {
      description: 'Loading Walla GPS',
      image: Userdata.profile_img,
      currency: 'INR',
      key: 'rzp_live_SuyP4BXtpLkIzS',
      amount: orderData.amount,
      name: Userdata.name,
      order_id: orderData.id,
      prefill: {
        email: Userdata.email,
        contact: Userdata.mobile,
        name: 'Loading Walla',
      },
      theme: {color: backgroundColorNew},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        if (data?.razorpay_payment_id) {
          dispatch(
            initVerifyPaymentRequest(
              data.razorpay_payment_id,
              data.razorpay_order_id,
            ),
          );
        } else {
          navigation.navigate('purchasingStatus', {
            statusCode: 400,
            navigation: 'GPS',
          });
        }
      })
      .catch(() => {
        dispatch(createOrderFailure());
        navigation.navigate('purchasingStatus', {
          statusCode: 400,
          navigation: 'GPS',
        });
      });
  };

  useEffect(() => {
    if (orderData?.id) {
      proceedWithPayment();
    }
  }, [orderData]);

  return (
    <View style={styles.container}>
      <PurchaseGpsHeader
        icon={true}
        edit={false}
        planName={filteredPlanData?.plan_name}
        planValidity={filteredPlanData?.validity}
        footertitle={`${t(Constants.YAY_SAVED)} ₹ ${
          filteredPlanData?.discount * gpsCount
        } ${t(Constants.ON_PURCHASE)}`}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.scrollContainer}>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentDetailView}>
              <Text style={styles.paymentDetailText}>
                {t(Constants.PURCHASE_SUM)}
              </Text>
              {/* <TouchableOpacity
                style={styles.editButton}
                // onPress={() => navigation.navigate('purchasingStatus')}
                // onPress={navigation.navigate('DeliveryDetails', {
                //   editDetails: true,
                //   gpsCount,
                //   pricePerDevice,
                //   plan_id,
                // })}
              >
                <EditIcon size={13} color={backgroundColorNew} />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity> */}
            </View>
            <ReusableSummaryItem
              title={t(Constants.FULL_NAME)}
              value={gpsOrderDetailsData?.name}
            />
            <ReusableSummaryItem
              title={t(Constants.ALT_PHONE_NUMBER)}
              value={gpsOrderDetailsData?.mobile}
            />
            <ReusableSummaryItem
              title={t(Constants.FULL_ADDR)}
              value={fullAddressArray}
            />
            <ReusableSummaryItem
              title={`${t(Constants.RC_NUMBER)} #1`}
              value={gpsOrderDetailsData?.rc_numbers}
            />
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentDetailView}>
              <Text style={styles.paymentDetailText}>
                {t(Constants.PAYMENT_DETAILS)}
              </Text>
            </View>
            <View style={styles.totalAmountContainer}>
              <View style={styles.totalAmountTextContainer}>
                <Text style={styles.boldText}>
                  {t(Constants.TOTAL_AMOUNT)}{' '}
                </Text>
                <Text style={styles.paymentGpsTaxText}>(Inc. of taxes)</Text>
              </View>
              <Text style={styles.boldText}>₹ {markedPrice}</Text>
            </View>
            <View style={styles.sectionBackground}>
              <ReusableItem
                title={'GPS'}
                value={`₹ ${totalGps.toFixed(2)}`}
                isTax={true}
                isTaxValue={'  (Inc. of taxes)'}
              />
              <View style={styles.sectionPadding}>
                <ReusableItem
                  title={'GPS Charges'}
                  value={`₹ ${filteredPlanData.gps_price.toFixed(2)}`}
                />
              </View>
              <View style={styles.sectionPadding}>
                <ReusableItem
                  title={'GPS GST Charges'}
                  value={`₹ ${gpsGst.toFixed(2)}`}
                  isTax={true}
                  isTaxValue={'  (18%)'}
                />
              </View>
            </View>
            <View style={styles.sectionBackground}>
              <ReusableItem
                title={'Recharge + Services'}
                value={`₹ ${totalRecharge.toFixed(2)}`}
                isTax={true}
                isTaxValue={'  (Inc. of taxes)'}
              />
              <View style={styles.sectionPadding}>
                <ReusableItem
                  title={'Recharge + Services Charges'}
                  value={`₹ ${filteredPlanData.recharge_price.toFixed(2)}`}
                />
              </View>
              <View style={styles.sectionPadding}>
                <ReusableItem
                  title={'Recharge + Services GST'}
                  value={`₹ ${rechargeGst.toFixed(2)}`}
                  isTax={true}
                  isTaxValue={'  (18%)'}
                />
              </View>
            </View>
            <View style={styles.discountView}>
              <Text style={styles.paymentGpsDiscountText}>
                Loading Walla Discount
              </Text>
              <Text style={styles.paymentGpsDiscountText}>
                ₹ {filteredPlanData?.discount * gpsCount}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.amountText}>{t(Constants.AMOUNT_PAID)}</Text>
          <View style={styles.paymentGpsPriceContainer}>
            <Text style={styles.markedPriceText}>
              ₹ {markedPrice * gpsCount}
            </Text>
            <Text style={styles.sellingPriceText}>
              ₹ {sellingPrice * gpsCount}
            </Text>
          </View>
        </View>
        <Button
          title={t(Constants.PAY_NOW)}
          textStyle={styles.paymentGpsBtnText}
          style={styles.paymentGpsBtnStyle}
          loading={orderLoading}
          onPress={payNow}
        />
      </View>
    </View>
  );
};

export default PaymentGPS;

