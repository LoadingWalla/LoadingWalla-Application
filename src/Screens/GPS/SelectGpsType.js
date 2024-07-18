import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  GradientColor2,
  pageBackground,
  textColor,
  titleColor,
} from '../../Color/color';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/Actions';
import Button from '../../Components/Button';
import PlusIcon from '../../../assets/SVG/svg/PlusIcon';
import MinusIcon from '../../../assets/SVG/svg/MinusIcon';

const SelectGpsType = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {gpsTokenData, gpsPlansData} = useSelector(state => state.data);
  const [gpsCount, setGpsCount] = useState(1);
  // console.log(33333, route);
  // const pricePerDevice =
  //   gpsPlansData[0].gps_price +
  //   gpsPlansData[0].recharge_price -
  //   gpsPlansData[0].discount; // Assuming 2000 is the price per device
  const pricePerDevice = route.params.sellingPrice;
  const plan_id = route.params.plan_id;

  useFocusEffect(
    React.useCallback(() => {
      // Disconnect WebSocket and call REST APIs
      dispatch(websocketDisconnect());
      return () => {
        dispatch(websocketConnect(gpsTokenData?.cookie));
      };
    }, [dispatch, gpsTokenData]),
  );

  const handleIncrement = () => {
    if (gpsCount < 5) {
      setGpsCount(gpsCount + 1);
    }
  };

  const handleDecrement = () => {
    if (gpsCount > 1) {
      setGpsCount(gpsCount - 1);
    }
  };

  const totalPrice = gpsCount * pricePerDevice;

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.overlay} />
      <View style={styles.screenModalView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Amount of devices you want to buy?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <CloseCircle size={40} color={GradientColor2} />
          </TouchableOpacity>
        </View>
        <View style={styles.centeredView}>
          <View style={styles.gpsCount}>
            <Text style={{fontSize: 14, fontFamily: 'PlusJakartaSans-Bold'}}>
              How many GPS you want?
            </Text>
            <View style={styles.gpsSelectionView}>
              <TouchableOpacity
                style={[
                  styles.iconBox,
                  gpsCount === 0 && styles.disabledButton,
                ]}
                onPress={handleDecrement}
                disabled={gpsCount === 0}>
                <MinusIcon size={30} />
              </TouchableOpacity>
              <View style={styles.inputBox}>
                <Text style={styles.gpsCountValue}>{gpsCount}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.iconBox,
                  gpsCount === 99 && styles.disabledButton,
                ]}
                onPress={handleIncrement}
                disabled={gpsCount === 99}>
                <PlusIcon size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomBox}>
          <View style={styles.amountBox}>
            <Text style={styles.totalAmountText}>Total Amount</Text>
            <Text style={styles.totalAmountValue}>₹ {totalPrice}/-</Text>
          </View>
          <View style={{width: '50%'}}>
            <Button
              // loading={loading}
              onPress={() => {
                navigation.goBack();
                navigation.navigate('DeliveryDetails', {
                  gpsCount,
                  pricePerDevice,
                  plan_id,
                });
              }}
              title={'Continue'}
              textStyle={styles.buttonTitile}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  screenModalView: {
    marginTop: '90%',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
    // borderWidth: 3,
    // borderColor: 'red',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
    color: titleColor,
    // borderWidth: 1,
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    // borderWidth: 1,
  },
  headerTitle: {
    color: titleColor,
    fontSize: 18,
    textAlign: 'left',
    justifyContent: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
    // borderWidth: 1,
    // flexWrap: 'wrap',
    maxWidth: 200,
    marginLeft: 10,
  },
  centeredView: {
    // borderWidth: 1,
    paddingHorizontal: 20,
  },
  buttonTitile: {
    fontWeight: 'bold',
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  button: {
    flexDirection: 'row',
    // borderRadius: 10,
    // height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  gpsCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gpsSelectionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#EFEFEF',
  },
  bottomBox: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 0,
    // borderWidth: 1,
    width: '100%',
  },
  amountBox: {
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#707070',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  totalAmountText: {
    fontSize: 12,
    color: '#4B4B4B',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  totalAmountValue: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
  },
  gpsCountValue: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: titleColor,
    textAlign: 'center',
  },
  iconBox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    width: 50,
    height: 40,
    backgroundColor: 'white',
    borderColor: '#707070',
    fontFamily: 'PlusJakartaSans-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
});

export default SelectGpsType;
