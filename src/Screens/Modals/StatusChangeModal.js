import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Switch from 'toggle-switch-react-native';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import * as Constants from '../../Constants/Constant';
import {
  deleteLorryFailure,
  initDeleteLorry,
  initStatusChange,
  statusChangeFailure,
} from '../../Store/Actions/Actions';
import {
  GradientColor2,
  seperator,
  titleColor,
} from '../../Color/color';
import SearchFilter from '../../Components/SearchFilter';
import ShowPermitModal from '../../Components/ShowPermitModal';
import Button from '../../Components/Button';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import {useTranslation} from 'react-i18next';
import styles from './style'

const StatusChangeModal = ({navigation, route}) => {
  const {userType, data} = route?.params;
  // console.log(9898989, route.params);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [searchFrom, setSearchFrom] = useState(data?.from);
  const [searchFromId, setSearchFromId] = useState(data?.from_id);
  const [searchTo, setSearchTo] = useState(data?.to);
  const [searchToId, setSearchToId] = useState(data?.to_id);
  const [isEnabled, setIsEnabled] = useState(data?.status === 1 ? true : false);
  const [isGPS, setIsGPS] = useState(data?.status === 1 ? false : true);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    deletelorryLoading,
    statusChangeLoading,
    deleteLorryStatus,
    deleteLorryMessage,
    statusChange_Status,
  } = useSelector(state => {
    return state.data;
  });

  const navigateToSeach = val => {
    navigation.navigate('Search', {
      locId: val === 'from' ? searchToId : searchFromId,
      onReturn: item => {
        // console.log(8888888888, item);
        if (val === 'from') {
          setSearchFrom(item?.place_name);
          setSearchFromId(item?.id);
          setSearchTo(userType === '2' ? 'Anywhere' : 0);
          return;
        }
        setSearchTo(item?.place_name);
        setSearchToId(item?.id);
      },
    });
  };

  useEffect(() => {
    if (deleteLorryStatus != null) {
      navigation.navigate('Confirmation', {
        status: deleteLorryStatus,
        userType: userType,
        messages: deleteLorryMessage,
        deleteLogistic: true,
      });
    }
    dispatch(deleteLorryFailure());
  }, [deleteLorryMessage, deleteLorryStatus, dispatch, navigation, userType]);

  useEffect(() => {
    if (statusChange_Status != null) {
      userType === '1'
        ? navigation.navigate(t(Constants.NAV_MY_LOAD))
        : navigation.navigate(t(Constants.NAV_MY_LORRY));
    }
    dispatch(statusChangeFailure());
  }, [statusChange_Status, navigation, dispatch, userType]);

  const deleteLorry = () => {
    dispatch(
      initDeleteLorry(userType === '1' ? data?.id : data?.truck_id, userType),
    );
  };

  const closeIconClick = closeStatus => {
    if (closeStatus === 'from') {
      setSearchFrom('');
    } else {
      setSearchTo('');
    }
  };

  // console.log(`OutFrom: ${searchFromId} /n To: ${searchToId}`);

  const saveChanges = () => {
    // console.log(`OutFrom: ${searchFrom} /n To: ${searchTo}`);
    if (searchFrom === '' || searchFrom === null) {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }

    if (searchTo === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    // console.log(`From: ${searchFromId} /n To: ${searchToId}`);
    dispatch(
      initStatusChange(
        userType === '1' ? data?.id : data?.truck_id,
        searchFromId,
        searchToId,
        isEnabled ? 1 : 0,
        userType,
      ),
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.negoFullScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.statusChangeScreenModalView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {userType === '1' ? t(Constants.LOAD) : t(Constants.LORRY)}{' '}
            {t(Constants.STATUS)}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.statusChangeCloseButton}>
            <CloseCircle size={30} color={GradientColor2} />
          </TouchableOpacity>
        </View>
        <View style={styles.statusChangeCenteredView}>
          <View style={styles.activeContainer}>
            <Text style={styles.activeText}>{t(Constants.ACTIVE)}</Text>
            <Switch
              isOn={isEnabled}
              onColor={GradientColor2}
              offColor={seperator}
              size="medium"
              onToggle={isOn => setIsEnabled(isOn)}
            />
          </View>
          {/* <View style={styles.activeContainer}>
            <Text style={styles.activeText}>Enable GPS Activity</Text>
            <Switch
              isOn={isGPS}
              onColor={GradientColor2}
              offColor={seperator}
              size="medium"
              onToggle={isOn => setIsGPS(isOn)}
            />
          </View> */}
          <SearchFilter
            defaultValue={searchFrom}
            leftTitle={t(Constants.FROM)}
            closeIconClick={() => closeIconClick('from')}
            onSearchPress={() => navigateToSeach('from')}
            placeholder={t(Constants.SELECT_LOCATION_TITLE)}
          />
          <SearchFilter
            defaultValue={searchTo}
            leftTitle={t(Constants.TO)}
            closeIconClick={() => closeIconClick('to')}
            onSearchPress={() => navigateToSeach()}
            placeholder={t(Constants.SELECT_LOCATION_TITLE)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
              paddingHorizontal: 5,
            }}>
            <TouchableOpacity //searchLoad()
              disabled={deletelorryLoading ? true : false}
              onPress={deleteLorry}
              style={styles.removeButton}>
              <Text style={styles.removeText}>
                {userType === '1'
                  ? t(Constants.REMOVE_LOAD)
                  : t(Constants.REMOVE_LORRY)}
              </Text>
              {deletelorryLoading && (
                <ActivityIndicator size="small" color={GradientColor2} />
              )}
            </TouchableOpacity>
            {userType === '1' ? (
              <></>
            ) : (
              <View
                style={styles.statusChangeView}>
                <Text style={styles.permitText}>{t(Constants.PERMIT)} :</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  disabled={!(data?.permit.length > 1)}>
                  <Text
                    style={[
                      styles.permitCountText,
                      data?.permit.length > 1
                        ? {color: '#0076FF', textDecorationLine: 'underline'}
                        : {color: titleColor, textDecorationLine: 'none'},
                    ]}>
                    {' '}
                    {data?.permit.length === 1
                      ? data?.permit[0].permit_name
                      : `${data?.permit.length} Permit Location`}
                  </Text>
                  <ShowPermitModal
                    permit={data?.permit}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Button
            onPress={() => saveChanges()}
            title={t(Constants.SAVE)}
            loading={statusChangeLoading}
            textStyle={styles.saveText}
            style={styles.saveButton}
          />
          <Text style={styles.noteText}>{t(Constants.NOTE)}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default StatusChangeModal;

