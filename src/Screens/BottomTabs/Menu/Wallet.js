import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-simple-toast';
import * as Constants from '../../../Constants/Constant';
import {NetworkContext} from '../../../Context/NetworkContext';
import {useDispatch, useSelector} from 'react-redux';
import {
  initGetWallet,
  initWallet,
  walletFailure,
} from '../../../Store/Actions/Actions';
import {
  GradientColor3,
  PrivacyPolicy,
  pageBackground,
  textColor,
  titleColor,
} from '../../../Color/color';
import Button from '../../../Components/Button';
import NoInternetScreen from '../../Details/NoInternetScreen';

const Wallet = ({navigation}) => {
  const [amount, setAmount] = useState(0);
  const {t} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const {wallletData, walletStatus, walletLoading, getWallletData} =
    useSelector(state => {
      // console.log("My Lorry/Load", state.data);
      return state.data;
    });

  useEffect(() => {
    dispatch(initGetWallet());
  }, [dispatch]);

  useEffect(() => {
    if (walletStatus === 200) {
      Toast.show(`${wallletData}`, Toast.LONG);
      // AlertBox(wallletData);
      dispatch(initGetWallet());
      setAmount(0);
      dispatch(walletFailure());
    }
  }, [dispatch, walletStatus, wallletData]);

  const handleAmountChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAmount(numericValue);
  };

  const addAmount = () => {
    if (amount === 0) {
      Toast.show('Add amount', Toast.LONG);
      return;
    }
    if (amount < 1) {
      Toast.show('Enter minimum amount 100', Toast.LONG);
      return;
    }
    if (amount > 100000) {
      Toast.show('Enter maximum amount 1,00,000', Toast.LONG);
      return;
    }

    var options = {
      description: 'Credits towards consultation',
      image: getWallletData?.profile_img,
      currency: 'INR',
      // key: 'rzp_test_saNeTWFs98DyuF',
      key: 'rzp_live_ryn4MzwhQI4eE3',
      amount: amount * 100,
      name: getWallletData?.name,
      prefill: {
        email: getWallletData?.email,
        contact: getWallletData?.mobile,
        name: 'Razorpay Software',
      },
      theme: {color: '#F37254'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        if (data?.razorpay_payment_id) {
          dispatch(initWallet(amount));
        } else {
          alert('Trancation not success');
        }
      })
      .catch(error => {
        // handle failure
        alert('Trancation not success');
      });

    // dispatch(initWallet(amount))
  };

  const quickAmount = ['100', '200', '500', '1000', '5000'];
  const onSetAmount = amt => {
    let newamt;
    if (amount === '') {
      newamt = parseInt(amt);
    } else {
      newamt = parseInt(amount) + parseInt(amt);
    }
    setAmount(newamt);
  };

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.texts}>{t(Constants.BALANCE)}</Text>
        <Text style={styles.walletText}>₹ {getWallletData?.wallet}</Text>
        <View style={styles.horizontalLine} />
        <Text style={styles.topupWallet}>{t(Constants.TOPUP_WALLET)}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.rupeeSymbol}>₹</Text>
          <TextInput
            value={'' + amount + ''}
            onChangeText={handleAmountChange}
            placeholder="Enter amount"
            style={styles.textInput}
            keyboardType="numeric"
            placeholderTextColor={PrivacyPolicy}
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

        <Button
          onPress={() => addAmount()}
          title={t(Constants.PROCEED_TO_TOPUP)}
          loading={walletLoading}
          textStyle={styles.textStyle}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: pageBackground,
    flex: 1,
  },
  box: {
    backgroundColor: 'white',
    padding: 15,
    elevation: 2,
    borderRadius: 8,
    marginTop: 20,
  },
  texts: {
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
  },
  walletText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: titleColor,
    fontSize: 30,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginTop: 10,
    marginBottom: 10,
  },
  topupWallet: {
    color: PrivacyPolicy,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  inputContainer: {
    height: 50,
    borderRadius: 4,
    borderColor: '#E7E7E7',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 15,
    width: '100%',
    color: PrivacyPolicy,
  },
  rupeeSymbol: {
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
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
    borderRadius: 28,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  textStyle: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
