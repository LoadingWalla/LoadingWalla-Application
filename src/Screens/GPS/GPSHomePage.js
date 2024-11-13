import React, {useEffect} from 'react';
import {
  View,
  BackHandler,
  Text,
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
import {websocketDisconnect} from '../../Store/Actions/WebSocketActions';
import styles from './style';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import MenuItem from '../../Components/MenuItem';
import DrivingLicense from '../../../assets/SVG/svg/DrivingLicense';
import Pollution from '../../../assets/SVG/svg/Pollution';
import Insurance from '../../../assets/SVG/svg/Insurance';
import RegistrationCert from '../../../assets/SVG/svg/RegistrationCert';
import FitnessCert from '../../../assets/SVG/svg/FitnessCert';
import OtherDocs from '../../../assets/SVG/svg/OtherDocs';
import {pageBackground} from '../../Color/color';

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
                  source={require('./../../../assets/art.png')}
                  style={{width: 170, height: 80}} // Add width and height to the inner ImageBackground
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
                onPress={() => navigation.navigate('Inconvenience')}
                Icon={<DrivingLicense size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Pollution'}
                onPress={() => navigation.navigate('Inconvenience')}
                Icon={<Pollution size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Insurance'}
                onPress={() => navigation.navigate('Inconvenience')}
                Icon={<Insurance size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Registration Certificate'}
                onPress={() => navigation.navigate('Inconvenience')}
                Icon={<RegistrationCert size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Fitness Certificate'}
                onPress={() => navigation.navigate('Inconvenience')}
                Icon={<FitnessCert size={30} />}
                arrowColor={'black'}
              />
            </View>
            <View style={stylesg.vDocMenu}>
              <MenuItem
                title={'Other Documents'}
                onPress={() => navigation.navigate('Inconvenience')}
                Icon={<OtherDocs size={30} />}
                arrowColor={'black'}
              />
            </View>
          </ScrollView>
        </View>
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
    flex: 1,
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
