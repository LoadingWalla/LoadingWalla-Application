import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  GradientColor2,
} from '../../Color/color';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Button';
import PlusIcon from '../../../assets/SVG/svg/PlusIcon';
import MinusIcon from '../../../assets/SVG/svg/MinusIcon';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import {useTranslation} from 'react-i18next';
import * as Constants from '../../Constants/Constant';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const SelectGpsType = ({navigation, route}) => {
  useTrackScreenTime('SelectGpsType');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {gpsTokenData, gpsPlansData} = useSelector(state => state.data);
  const [gpsCount, setGpsCount] = useState(1);
  // console.log(33333, route);
  const pricePerDevice = route.params.sellingPrice;
  const plan_id = route.params.plan_id;

  useFocusEffect(
    React.useCallback(() => {
      // Disconnect WebSocket and call REST APIs
      dispatch(websocketDisconnect());
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
      <View style={styles.selectGpsTypeScreenModalView}>
        <View style={styles.selectGpsTypeHeader}>
          <Text style={styles.headerTitle}>
            {t(Constants.AMOUNT_DEVICES_TO_BUY)}  
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <CloseCircle size={40} color={GradientColor2} />
          </TouchableOpacity>
        </View>
        <View style={styles.centeredView}>
          <View style={styles.gpsCount}>
            <Text style={styles.numOfGps}>
              {t(Constants.NUM_OF_GPS)}
            </Text>
            <View style={styles.gpsSelectionView}>
              <TouchableOpacity
                style={[
                  styles.selectGpsTypeIconBox,
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
                  styles.selectGpsTypeIconBox,
                  gpsCount === 99 && styles.disabledButton,
                ]}
                onPress={handleIncrement}
                disabled={gpsCount === 99}>
                <PlusIcon size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.selectGpsTypeBottomBox}>
          <View style={styles.amountBox}>
            <Text style={styles.totalAmountText}>{t(Constants.TOTAL_AMOUNT)}</Text>
            <Text style={styles.totalAmountValue}>₹ {totalPrice}/-</Text>
          </View>
          <View style={styles.continueBtnWidth}>
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
              title={t(Constants.CONTINUE)}
              textStyle={styles.buttonTitile}
              style={styles.selectGpsTypeButton}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelectGpsType;
