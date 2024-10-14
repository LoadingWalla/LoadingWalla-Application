import React from 'react';
import {Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import Button from '../../Components/Button';
import {useTranslation} from 'react-i18next';
import * as Constants from '../../Constants/Constant';
import styles from './style';

const PurchasingStatus = ({navigation, route}) => {
  const {statusCode} = route.params;
  const {t} = useTranslation();
  // const statusCode = 300;
  console.log('puchasingstatus', route);

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.overlay} />
      <View style={styles.purchaseStatusScreenModalView}>
        <View style={styles.header}>
          <Text style={styles.purchaseStatusHeaderText}>
            {statusCode === 200
              ? `🎉${t(Constants.PAYMENT_SUCESS)}🎉`
              : t(Constants.PAYMENT_FAILED)}
          </Text>
          <LottieView
            source={
              statusCode === 200
                ? require('../../../assets/GIFs/succesLottie.json')
                : require('../../../assets/GIFs/Wrong.json')
            }
            autoPlay
            loop
            resizeMode="contain"
            style={styles.splashImage(200,300)}
          />
        </View>
        <Button
          title={t(Constants.DONE)}
          onPress={() => navigation.navigate(route.params.navigation)}
          textStyle={styles.btnText}
          style={styles. purchaseStatusBtnStyle}
        />
      </View>
    </View>
  );
};

export default PurchasingStatus;

