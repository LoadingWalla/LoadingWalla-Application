import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Constants from '../../Constants/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import DashboardHeader from '../../Components/DashboardHeader';
import GpsTrackings from './GpsTrackings';

const MyGpsScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {DashboardUser, dashboardLoading} = useSelector(state => {
    // console.log('MyGpsScreen Truck', state.data);
    return state.data;
  });

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
      <View style={{flex: 1, marginVertical: 60}}>
        <GpsTrackings navigation={navigation} />
      </View>
    </View>
  );
};

export default MyGpsScreen;

const styles = StyleSheet.create({
  DashboardHeaderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    maxHeight: 60,
    padding: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 9999,
  },
});
