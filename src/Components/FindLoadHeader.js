import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  GradientColor2,
  PrivacyPolicy,
  pageBackground,
  titleColor,
  white,
} from "../Color/color";
import CommonToolbar from "./CommonToolbar";
import CardHeader from "./CardHeader";
import ShowPermitModal from "./ShowPermitModal";
import CheckIcon from "react-native-vector-icons/SimpleLineIcons";
import EditIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const FindLoadHeader = ({
  title,
  goBack,
  from,
  to,
  icon,
  fullPrice,
  userType,
  permit,
  navigation,
  material_name,
  qty,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <CommonToolbar title={title} goBack={goBack} isBack={true} />
        {/* <View style={styles.horizontalLine} /> */}
        <View style={styles.cardHeaderView}>
          <CardHeader from={from} to={to} icon={icon} />
        </View>
        <View style={styles.horizontalLine} />
        <View>
          <View style={styles.rowdirection}>
            <View style={styles.point} />
            <Text style={styles.smallImageHeaderTitle}>{fullPrice}</Text>
          </View>
          {userType === "2" ? (
            <View style={styles.locationInfo}>
              <View style={styles.rowdirection}>
                <View style={styles.point} />
                <TouchableOpacity
                  style={styles.rowdirection}
                  onPress={() => setModalVisible(true)}
                >
                  <Text
                    style={[
                      styles.smallImageHeaderTitle,
                      { color: "#0076FF", textDecorationLine: "underline" },
                    ]}
                  >
                    {`${permit?.length} Permit Location`}
                  </Text>
                  <EditIcon name="chevron-right" size={15} color={"#0076FF"} />
                  <ShowPermitModal
                    permit={permit}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.verifyTruck}
                onPress={() =>
                  navigation.navigate("RC", { title: "RC Number" })
                }
              >
                <CheckIcon name="shield" size={13} color={GradientColor2} />
                <Text style={styles.dashboardHeaderVerifiedTitle}>
                  Verify Truck
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.horizontalLine} />
              <View style={[styles.rowdirection, { justifyContent: "center" }]}>
                <Text style={styles.textStyle}>{material_name}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>{qty}</Text>
              </View>
            </>
          )}
        </View>
      </View>

      {userType === "2" ? (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            Verifying your truck will help in faster load booking
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default FindLoadHeader;

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    backgroundColor: pageBackground,
  },
  cardTop: { padding: 10, paddingTop: 20, backgroundColor: white },
  cardHeaderView: { marginTop: 10 },
  horizontalLine: { backgroundColor: "#AFAFAF", height: 1, marginVertical: 10 },
  verticalLine: {
    backgroundColor: "#AFAFAF",
    width: 2,
    marginHorizontal: 15,
    height: "100%",
  },
  rowdirection: { flexDirection: "row", alignItems: "center" },
  smallImageHeaderTitle: {
    fontSize: 15,
    color: titleColor,
    fontFamily: "PlusJakartaSans-Bold",
  },
  point: {
    height: 8,
    width: 8,
    backgroundColor: PrivacyPolicy,
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verifyTruck: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ccc",
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 2,
    backgroundColor: white,
  },
  warning: {
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  warningText: {
    color: titleColor,
    fontSize: 12,
    fontFamily: "PlusJakartaSans-Bold",
  },
  dashboardHeaderVerifiedTitle: {
    fontSize: 12,
    color: GradientColor2,
    fontFamily: "PlusJakartaSans-SemiBold",
    marginLeft: 5,
  },
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: "PlusJakartaSans-Bold",
  },
});
