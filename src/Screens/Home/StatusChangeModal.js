import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  GradientColor2,
  pageBackground,
  seperator,
  titleColor,
  textColor,
} from "../../../Color/color";
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
  initMyLoadById,
  initMyLorryById,
} from "../../../Store/Actions/Actions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import * as Constants from "../../../Constants/Constant";
import SearchFilter from "../../../Components/SearchFilter";
import Switch from "toggle-switch-react-native";
import AlertBox from "../../../Components/AlertBox";
import Toast from "react-native-simple-toast";
import ShowPermitModal from "../../../Components/ShowPermitModal";
import Button from "../../../Components/Button";
import { connect, useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";

const StatusChangeModal = ({ navigation, route }) => {
  const { userType, data } = route?.params;
  // console.log(9898989, route.params);
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
  } = useSelector((state) => {
    return state.data;
  });

  const navigateToSeach = (val) => {
    navigation.navigate("Search", {
      onReturn: (item) => {
        if (val === "from") {
          setSearchFrom(item?.place_name);
          setSearchFromId(item?.id);
          setSearchTo(userType == "2" ? "Anywhere" : "");
          return;
        }
        setSearchTo(item?.place_name);
        setSearchToId(item?.id);
      },
    });
  };

  useEffect(() => {
    if (deleteLorryStatus != null) {
      navigation.navigate("Confirmation", {
        status: deleteLorryStatus,
        userType: userType,
        messages: deleteLorryMessage,
        deleteLogistic: true,
      });
    }
    dispatch(deleteLorryFailure());
  }, [deleteLorryStatus, navigation]);

  useEffect(() => {
    if (statusChange_Status != null) {
      userType === "1"
        ? navigation.navigate("My Load")
        : navigation.navigate("My Truck");
    }
    dispatch(statusChangeFailure());
  }, [statusChange_Status, navigation]);

  const deleteLorry = () => {
    dispatch(
      initDeleteLorry(userType === "1" ? data?.id : data?.truck_id, userType)
    );
  };

  const closeIconClick = (closeStatus) => {
    if (closeStatus === "from") {
      setSearchFrom("");
    } else {
      setSearchTo("");
    }
  };

  // console.log(`OutFrom: ${searchFromId} /n To: ${searchToId}`);

  const saveChanges = () => {
    if (searchFrom === "") {
      Toast.show("Enter Location", Toast.LONG);
      return;
    }
    if (searchTo === "") {
      Toast.show("Enter Location", Toast.LONG);
      return;
    }
    // console.log(`From: ${searchFromId} /n To: ${searchToId}`);
    dispatch(
      initStatusChange(
        userType == "1" ? data?.id : data?.truck_id,
        searchFromId,
        searchToId,
        isEnabled ? 1 : 0,
        userType
      )
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.fullScreenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.screenModalView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {userType == 1 ? t(Constants.LOAD) : t(Constants.LORRY)} Status
          </Text>
          <Icon
            name="close"
            size={35}
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.centeredView}>
          <View style={styles.activeContainer}>
            <Text style={styles.activeText}>{t(Constants.ACTIVE)}</Text>
            <Switch
              isOn={isEnabled}
              onColor={GradientColor2}
              offColor={seperator}
              size="medium"
              onToggle={(isOn) => setIsEnabled(isOn)}
            />
          </View>
          <View style={styles.activeContainer}>
            <Text style={styles.activeText}>Enable GPS Activity</Text>
            <Switch
              isOn={isGPS}
              onColor={GradientColor2}
              offColor={seperator}
              size="medium"
              onToggle={(isOn) => setIsGPS(isOn)}
            />
          </View>
          <SearchFilter
            defaultValue={searchFrom}
            leftTitle={t(Constants.FROM)}
            closeIconClick={() => closeIconClick("from")}
            onSearchPress={() => navigateToSeach("from")}
            placeholder={t(Constants.SELECT_LOCATION_TITLE)}
          />
          <SearchFilter
            defaultValue={searchTo}
            leftTitle={t(Constants.TO)}
            closeIconClick={() => closeIconClick("to")}
            onSearchPress={() => navigateToSeach()}
            placeholder={t(Constants.SELECT_LOCATION_TITLE)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
              paddingHorizontal: 5,
            }}
          >
            <TouchableOpacity //searchLoad()
              disabled={deletelorryLoading ? true : false}
              onPress={deleteLorry}
              style={styles.removeButton}
            >
              <Text style={styles.removeText}>
                {t(Constants.REMOVE)}{" "}
                {userType == 1 ? t(Constants.LOAD) : t(Constants.LORRY)}
              </Text>
              {deletelorryLoading && (
                <ActivityIndicator size="small" color={GradientColor2} />
              )}
            </TouchableOpacity>
            {userType === "1" ? (
              <></>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.permitText}>Permit :</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  disabled={!(data?.permit.length > 1)}
                >
                  <Text
                    style={[
                      styles.permitCountText,
                      data?.permit.length > 1
                        ? { color: "#0076FF", textDecorationLine: "underline" }
                        : { color: titleColor, textDecorationLine: "none" },
                    ]}
                  >
                    {" "}
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
            title={"Save Changes"}
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

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  screenModalView: {
    marginTop: "25%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: titleColor,
    fontSize: 22,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "PlusJakartaSans-Bold",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    color: titleColor,
  },
  centeredView: {
    flex: 1,
    marginTop: "15%",
    // width: "100%",
    paddingVertical: 10,
  },
  body: { marginTop: 30 },
  activeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  activeText: { fontSize: 18, fontWeight: "700", color: "#352422" },
  permitText: { fontSize: 16, fontWeight: "700", color: "#352422" },
  permitCountText: { fontSize: 16, fontWeight: "700", color: "#0089DE" },
  saveText: {
    color: textColor,
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
  },
  saveButton: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "50%",
    alignSelf: "center",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: {
    marginRight: 20,
    color: GradientColor2,
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
  },
  noteText: {
    textAlign: "center",
    marginHorizontal: 30,
    fontSize: 14,
    marginBottom: 15,
    color: titleColor,
    fontFamily: "PlusJakartaSans-SemiBold",
  },
});
