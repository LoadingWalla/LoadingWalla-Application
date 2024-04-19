import React, {useState, useEffect, useCallback} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as Constants from '../../../Constants/Constant';
import CommonToolbar from '../../../Components/CommonToolbar';
import SearchFilter from '../../../Components/SearchFilter';
import LocationModal from '../../../Components/LocationModal';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {
  initLocation,
  initStatusChange,
  statusChangeFailure,
  initlocationChange,
  initsearchFromId,
  initsearchToId,
  initlocationToChange,
  locationChangeToClear,
  locationChangeFromClear,
  initDeleteLorry,
  deleteLorryFailure,
  modalCloseLocation,
} from '../../../Store/Actions/Actions';
import Button from '../../../Components/Button';
import {
  GradientColor2,
  PrivacyPolicy,
  seperator,
  textColor,
  titleColor,
} from '../../../Color/color';
import Switch from 'toggle-switch-react-native';
import Toast from 'react-native-simple-toast';
import ShowPermitModal from '../../../Components/ShowPermitModal';

const StatusModal = ({
  navigation,
  isEdit,
  dismissModal,
  locationSearch,
  locationData,
  data,
  clearState,
  statusChange,
  statusChangeData,
  statusChangeLoading,
  statusChange_Status,
  onClose,
  showModal,
  setModalocationFrom,
  setModalocationTo,
  modalLocation,
  modalLocationTo,
  setSearchFromId,
  setSearchToId,
  searchFromId,
  searchToId,
  clearLocationFrom,
  clearLocationTo,
  deleteLorryRequest,
  deleteLorryStatus,
  deleteLorryMessage,
  clearDeleteLorry,
  deletelorryLoading,
  modalLocationClose,
  userType,
}) => {
  const {t} = useTranslation();
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [showLocationFrom, setLocationFrom] = useState(false);
  const [showLocationTo, setLocationTo] = useState(false);
  const [allLocation, setAllLocation] = useState([]);
  const [isEnabled, setIsEnabled] = useState(data?.status === 1 ? true : false);
  const [isGPS, setIsGPS] = useState(data?.status === 1 ? false : true);
  const [modalVisible, setModalVisible] = useState(false);

  // console.log("USERTYPE", userType);

  useEffect(() => {
    if (statusChange_Status === 200) {
      Toast.show(`${statusChangeData}`, Toast.LONG);
      // AlertBox(statusChangeData);
      clearState();
      clearLocationFrom();
      clearLocationTo();
      dismissModal();
      return;
    }
  }, [
    clearLocationFrom,
    clearLocationTo,
    clearState,
    dismissModal,
    statusChangeData,
    statusChange_Status,
  ]);

  useEffect(() => {
    if (deleteLorryStatus === 200) {
      Toast.show(`${deleteLorryMessage}`, Toast.LONG);
      // AlertBox(deleteLorryMessage);
      dismissModal();
      clearDeleteLorry();
    }
  }, [clearDeleteLorry, deleteLorryMessage, deleteLorryStatus, dismissModal]);

  useEffect(() => {
    setAllLocation(locationData);
  }, [locationData]);

  useEffect(() => {
    setSearchFrom(modalLocation ? modalLocation : data?.from);
    setSearchTo(modalLocationTo ? modalLocationTo : data?.to);
  }, [data?.from, data?.to, modalLocation, modalLocationTo]);

  useEffect(() => {
    setSearchFromId(searchFromId ? searchFromId : data?.from_id);
    setSearchToId(searchToId ? searchToId : data?.to_id);
  }, [
    data?.from_id,
    data?.to_id,
    searchFromId,
    searchToId,
    setSearchFromId,
    setSearchToId,
  ]);

  const closeIconClick = closeStatus => {
    if (closeStatus === 'from') {
      setSearchFrom('');
      setLocationFrom(false);
    } else {
      setSearchTo('');
      setLocationTo(false);
    }
  };

  const saveChanges = () => {
    if (searchFrom === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    if (searchTo === '') {
      Toast.show('Enter Location', Toast.LONG);
      return;
    }
    // console.log(`From: ${searchFromId} /n To: ${searchToId}`);
    statusChange(
      userType == '1' ? data?.id : data?.truck_id,
      searchFromId,
      searchToId,
      isEnabled ? 1 : 0,
      userType,
    );
    // dismissModal();
  };

  const navigateToSeach = val => {
    dismissModal();
    navigation.navigate('Search', {
      onReturn: item => {
        showModal(true);
        if (val === 'from') {
          setModalocationFrom(item?.place_name);
          setSearchFromId(item?.id);
          if (modalLocationTo === 'Anywhere' || modalLocationTo === null) {
            setModalocationTo(userType === '2' ? 'Anywhere' : '');
          }
          return;
        }
        setModalocationTo(item?.place_name);
        setSearchToId(item?.id);
      },
    });
  };

  const deleteLorry = () => {
    deleteLorryRequest(userType === '1' ? data.id : data.truck_id, userType);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isEdit}
      statusBarTranslucent={true}
      onRequestClose={() => {
        modalLocationClose();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CommonToolbar
            title={t(Constants.STATUS)}
            goBack={() => {
              onClose();
              modalLocationClose();
            }}
            isBack={true}
            isClose={true}
            modal={true}
          />
          <View style={styles.body}>
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
            <View style={styles.activeContainer}>
              <Text style={styles.activeText}>Enable GPS Activity</Text>
              <Switch
                isOn={isGPS}
                onColor={GradientColor2}
                offColor={seperator}
                size="medium"
                onToggle={isOn => setIsGPS(isOn)}
              />
            </View>
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
              }}>
              <TouchableOpacity //searchLoad()
                disabled={deletelorryLoading ? true : false}
                onPress={() => deleteLorry()}
                style={styles.removeButton}>
                <Text style={styles.removeText}>
                  {t(Constants.REMOVE)}{' '}
                  {userType === 1 ? t(Constants.LOAD) : t(Constants.LORRY)}
                </Text>
                {deletelorryLoading && (
                  <ActivityIndicator size="small" color={GradientColor2} />
                )}
              </TouchableOpacity>
              {userType === '1' ? (
                <></>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.permitText}>Permit :</Text>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.permitCountText}>
                      {` ${data?.permit?.length} Location`}
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
              title={'Save Changes'}
              loading={statusChangeLoading}
              textStyle={styles.saveText}
              style={styles.saveButton}
            />
            <Text style={styles.noteText}>{t(Constants.NOTE)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// const mapDispatchToProps = dispatch => ({
//   locationSearch: location => dispatch(initLocation(location)),
//   statusChange: (trid, location1, location2, status, userType) =>
//     dispatch(initStatusChange(trid, location1, location2, status, userType)),
//   clearState: () => dispatch(statusChangeFailure()),
//   setModalocationFrom: location => {
//     dispatch(initlocationChange(location));
//   },
//   setSearchFromId: location => {
//     dispatch(initsearchFromId(location));
//   },
//   setSearchToId: location => {
//     dispatch(initsearchToId(location));
//   },
//   modalLocationClose: () => {
//     dispatch(modalCloseLocation());
//   },
//   clearLocationFrom: () => dispatch(locationChangeFromClear()),
//   clearLocationTo: () => dispatch(locationChangeToClear()),
//   deleteLorryRequest: (lorry_id, userType) =>
//     dispatch(initDeleteLorry(lorry_id, userType)),
//   clearDeleteLorry: () => dispatch(deleteLorryFailure()),
//   setModalocationTo: location => dispatch(initlocationToChange(location)),
// });

// const mapStateToProps = state => {
//   // console.log("StatusModal fetching Data ----->", state.data);
//   return {
//     locationData: state.data.locationData,
//     statusChangeData: state.data.statusChangeData,
//     statusChangeLoading: state.data.statusChangeLoading,
//     statusChange_Status: state.data.statusChange_Status,
//     modalLocation: state.data.modalLocation,
//     searchFromId: state.data.searchFromId,
//     searchToId: state.data.searchToId,
//     modalLocationTo: state.data.modalLocationTo,
//     deleteLorryMessage: state.data.deleteLorryMessage,
//     deleteLorryStatus: state.data.deleteLorryStatus,
//     deletelorryLoading: state.data.deletelorryLoading,
//   };
// };
export default StatusModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  body: {marginTop: 30},
  modalTextView: {
    borderWidth: 1,
    borderColor: PrivacyPolicy,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#FFC5B5',
    margin: 5,
  },
  modaTtext: {
    color: titleColor,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  button: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  activeText: {fontSize: 18, fontWeight: '700', color: '#352422'},
  permitText: {fontSize: 16, fontWeight: '700', color: '#352422'},
  permitCountText: {fontSize: 16, fontWeight: '700', color: '#0089DE'},
  saveText: {
    color: textColor,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  saveButton: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    marginRight: 20,
    color: GradientColor2,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  noteText: {
    textAlign: 'center',
    marginHorizontal: 30,
    fontSize: 14,
    marginBottom: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
