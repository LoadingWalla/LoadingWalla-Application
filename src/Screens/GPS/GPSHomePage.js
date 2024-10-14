import React, {useEffect} from 'react';
import {View, BackHandler, Text, Image} from 'react-native';
import * as Constants from '../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {fetchTokenRequest, initDashboard} from '../../Store/Actions/Actions';
import DashboardHeader from '../../Components/DashboardHeader';
import InnerButton from '../../Components/InnerButton';
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const GPSHomePage = ({navigation}) => {
  useTrackScreenTime('GPSHomePage');
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {DashboardUser, dashboardLoading, gpsTokenData} = useSelector(state => {
    return state.data;
  });
  const {wsConnected} = useSelector(state => state.wsData);

  useEffect(() => {
    if (gpsTokenData === null) {
      dispatch(fetchTokenRequest());
    }
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (wsConnected) {
      dispatch(websocketDisconnect());
    }
  }, [wsConnected]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(initDashboard());
    }, [dispatch]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.dashboardHeaderView}>
        <DashboardHeader
          img={DashboardUser?.profile_img}
          navigatiopnWallet={() => navigation.navigate('Wallet')}
          notification={() => navigation.navigate('Notification')}
          isDashboard={true}
          title={DashboardUser?.name}
          gotoProfile={() => navigation.navigate(t(Constants.MENU))}
          navigate={() => navigation?.navigate('Contactus')}
          loading={dashboardLoading}
          wallet={DashboardUser?.wallet}
          verify={DashboardUser?.verify}
          t={t}
        />
      </View>
      <View style={styles.homeView}>
        <View style={styles.notFoundView}>
          <Image
            source={require('../../../assets/noGps.png')}
            resizeMode="contain"
            style={styles.splashImage(250, 250)}
          />
          <Text style={styles.noGpsAvailTxt}>
            {t(Constants.NO_GPS_AVAILABLE)}
          </Text>
          <Text style={styles.getGpsPlanTxt}>
            {t(Constants.GET_GPS_FOR_YOUR_VEHICLE)}
          </Text>
        </View>
        <View style={styles.getNowView}>
          <Text style={styles.offerText}>{t(Constants.BUY_AND_SAVE)}</Text>
          <InnerButton
            navigation={() => navigation.navigate('BuyGPS')}
            title={t(Constants.GET_NOW)}
            enabledStyle={styles.btnStyle}
            textStyle={styles.btnText}
          />
        </View>
      </View>
    </View>
  );
};

export default GPSHomePage;
