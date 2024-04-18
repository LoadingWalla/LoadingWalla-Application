import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import CardHeader from "../../../Components/CardHeader";
import * as Constants from "../../../Constants/Constant";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import InnerButton from "../../../Components/InnerButton";
import {
  RequestBookingFailure,
  initMyLorry,
  initRequestBooking,
} from "../../../Store/Actions/Actions";
import {
  GradientColor3,
  PrivacyPolicy,
  pageBackground,
  titleColor,
} from "../../../Color/color";
import Icon from "react-native-vector-icons/MaterialIcons";

const Negotiation = ({
  navigation,
  myLorryRequest,
  requestBooking,
  requestSendStatus,
  requestLorrydata,
  clearState,
  route,
}) => {
  console.log("negotiation screen", route);
  const { item, owner, userType } = route?.params; // this should be on top
  const { t } = useTranslation();
  const [offered_price, setOffered_price] = useState(
    userType == "1" ? owner?.price : item?.price
  );

  useEffect(() => {
    myLorryRequest(1);
  }, []);

  const saveChanges = () => {
    requestBooking(
      userType === "2" ? item?.load_id : owner?.id,
      userType === "2" ? owner?.truck_id : item?.truck_id,
      offered_price,
      userType === "2" ? item?.price_type : owner?.price_type
    );
  };

  useEffect(() => {
    if (requestSendStatus != null) {
      navigation.navigate("Booking Status", {
        status: requestSendStatus,
        Owner: owner,
        userType: userType,
        messages: requestLorrydata.message,
        renter: item,
      });
    }
    clearState();
  }, [requestSendStatus, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.fullScreenContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.screenModalView}>
        <Icon
          name="close"
          size={30}
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.centeredView}>
          <View style={styles.container}>
            <View style={styles.locationCard}>
              <CardHeader from={item?.from} to={item?.to} icon={item?.image} />
              <View style={styles.horizontalLine} />
              <View style={styles.rowdirection}>
                <Text style={styles.textStyle}>
                  {userType === "1" ? item?.wheel : item?.loads}
                </Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>
                  {userType === "1"
                    ? item?.truck_capacity
                    : item?.material_name}
                </Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>
                  {userType === "1"
                    ? item?.truck_type
                    : `₹ ${item?.price} / ${
                        item?.price_type === "1"
                          ? t(Constants.FIXED)
                          : t(Constants.PER_TON)
                      }`}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.priceText}>
                {t(Constants.MY_NEGOTITATON)}
              </Text>
              <View style={styles.priceInputContainer}>
                <View style={styles.priceInput}>
                  <Text style={styles.rupeeText}>{"Price (₹) |"}</Text>
                  <TextInput
                    defaultValue={offered_price}
                    placeholder={item?.price}
                    onChangeText={(text) => setOffered_price(text)}
                    style={styles.inputStyle}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.priceType}>
                  <Text style={styles.rupeeText}>
                    {item?.price_type === "1"
                      ? t(Constants.FIXED)
                      : t(Constants.PER_TON)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.btnBoxStyle}>
              <InnerButton
                enabledStyle={styles.requestButtonContainer}
                textStyle={styles.gradientButtonText}
                title={"Cancel"}
                navigation={() => navigation.goBack()}
              />
              <InnerButton
                enabledStyle={styles.findButtonContainer}
                textStyle={styles.findButtonText}
                title={"Send"}
                navigation={() => saveChanges()}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapDispatchToProps = (dispatch) => ({
  myLorryRequest: (stat) => dispatch(initMyLorry(stat)),
  requestBooking: (loid, trid, offered_price, price_type) =>
    dispatch(initRequestBooking(loid, trid, offered_price, price_type)),
  clearState: () => dispatch(RequestBookingFailure()),
});

const mapStateToProps = (state) => {
  // console.log("Negotiation Screen", state.data);
  return {
    myLorryTruckData: state.data.myLorryTruckData,
    myLoadTruckData: state.data.myLoadTruckData,
    findLorryData: state.data.findLorryData,
    requestSendStatus: state.data.requestSendStatus,
    requestLorrydata: state.data.requestLorrydata,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Negotiation);

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  screenModalView: {
    marginTop: "30%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  horizontalLine: { backgroundColor: "#AFAFAF", height: 1, marginVertical: 10 },
  verticalLine: {
    backgroundColor: "#AFAFAF",
    width: 2,
    marginHorizontal: 15,
    height: "100%",
  },
  rowdirection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: "PlusJakartaSans-Bold",
  },
  container: {
    // marginTop: 10,
    // borderWidth: 1,
  },
  locationCard: {
    borderWidth: 1,
    borderColor: "#DBD7D7",
    padding: 10,
    borderRadius: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "700",
    color: titleColor,
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "PlusJakartaSans-Bold",
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DBD7D7",
  },
  priceInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: "70%",
  },
  rupeeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: titleColor,
    marginEnd: 5,
    fontFamily: "PlusJakartaSans-Bold",
  },
  inputStyle: {
    fontSize: 16,
    textAlign: "left",
    padding: 5,
    color: "#000",
    width: "75%",
  },
  priceType: {
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  btnBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  requestButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor3,
  },
  gradientButtonText: {
    fontSize: 13,
    color: GradientColor3,
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
  },
  findButtonContainer: {
    marginLeft: 20,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
  },
  findButtonText: {
    fontSize: 13,
    color: "white",
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 10,
    color: titleColor,
  },
});
