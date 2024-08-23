import React, {useEffect} from 'react';
import {
  View,
  BackHandler,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import * as Constants from '../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  fetchTokenRequest,
  initDashboard,
  websocketDisconnect,
} from '../../Store/Actions/Actions';
import DashboardHeader from '../../Components/DashboardHeader';
import {textColor, titleColor, white} from '../../Color/color';
import InnerButton from '../../Components/InnerButton';

const GPSHomePage = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {DashboardUser, dashboardLoading, wsConnected, gpsTokenData} = useSelector(state => {
    return state.data;
  });

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
    <View style={{flex: 1}}>
      <View style={styles.DashboardHeaderView}>
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
          <Text
            style={{
              color: '#707070',
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 28,
            }}>
            No GPS available!
          </Text>
          <Text
            style={{
              color: titleColor,
              fontFamily: 'PlusJakartaSans-Bold',
              fontSize: 14,
              marginTop: 15,
            }}>
            Get a GPS Plan for your vehicle
          </Text>
        </View>
        <View style={styles.getNowView}>
          <Text style={styles.offerText}>Buy and save up to 50%</Text>
          <InnerButton
            navigation={() => navigation.navigate('BuyGPS')}
            title={'Get Now'}
            enabledStyle={styles.btnStyle}
            textStyle={styles.btnText}
          />
        </View>
      </View>
    </View>
  );
};

export default GPSHomePage;

const styles = StyleSheet.create({
  DashboardHeaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    maxHeight: 60,
    padding: 10,
    backgroundColor: white,
    zIndex: 9999,
  },
  btnStyle: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#3CA604',
    borderColor: '#3CA604',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  btnText: {
    fontSize: 16,
    color: textColor,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  homeView: {
    // borderWidth: 1,
    flex: 1,
    marginVertical: 60,
    justifyContent: 'center',
  },
  notFoundView: {
    // borderWidth: 1,
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getNowView: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
  },
  offerText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#3BA700',
    textAlign: 'center',
    paddingVertical: 10,
  },
  splashImage: (height, width) => ({
    height: height,
    width: width,
  }),
});
