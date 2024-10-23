import React, {useEffect} from 'react';
import {
  View,
  BackHandler,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
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
import MenuItem from '../../Components/MenuItem';
import ContactUsIcon from '../../../assets/SVG/svg/ContactUsIcon';
import {GradientColor1, pageBackground} from '../../Color/color';
import DrivingLicense from '../../../assets/SVG/svg/DrivingLicense';
import Pollution from '../../../assets/SVG/svg/Pollution';
import Insurance from '../../../assets/SVG/svg/Insurance';
import RegistrationCert from '../../../assets/SVG/svg/RegistrationCert';
import FitnessCert from '../../../assets/SVG/svg/FitnessCert';
import OtherDocs from '../../../assets/SVG/svg/OtherDocs';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
        <View style={stylesg.parent}>
          <ImageBackground
            source={require('./../../../assets/redBG.png')}
            style={stylesg.headerBackground}>
            <View style={stylesg.headerContantContainer}>
              <View>
                <Text style={stylesg.headerText1}>Upload your vehicle</Text>
                <Text style={stylesg.headerText2}>Documents</Text>
              </View>
              <View>
                <ImageBackground
                  source={require('./../../../assets/bike.png')}
                  style={{width: 97, height: 97}} // Add width and height to the inner ImageBackground
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={stylesg.scroll}>
          <ScrollView
            contentContainerStyle={{paddingVertical: 10}}
            horizontal={false}
            showsVerticalScrollIndicator={false}>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Driving License'}
                onPress={() => {}}
                Icon={<DrivingLicense size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Pollution'}
                onPress={() => {}}
                Icon={<Pollution size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Insurance'}
                onPress={() => {}}
                Icon={<Insurance size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Registration Certificate'}
                onPress={() => {}}
                Icon={<RegistrationCert size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Fitness Certificate'}
                onPress={() => {}}
                Icon={<FitnessCert size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Other Documents'}
                onPress={() => {}}
                Icon={<OtherDocs size={30} />}
                arrowColor={'black'}
              />
            </View>
          </ScrollView>
        </View>
        {/* <View style={styles.notFoundView}>
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
        </View> */}
      </View>
    </View>
  );
};

const stylesg = StyleSheet.create({
  parent: {
    flex: 0.3,
  },
  headerBackground: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire view
    justifyContent: 'center', // Vertically centers the text
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerContantContainer: {
    alignItems: 'center', // Horizontally centers the text
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerText1: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  headerText2: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  scroll: {
    flex: 1
  },
  vDocMenu: {
    marginHorizontal: 10,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: pageBackground,
    padding: 4,
  },
});

export default GPSHomePage;
