import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CommonToolbar from "./CommonToolbar";
import { PrivacyPolicy } from "../Color/color";
import CardHeader from "./CardHeader";

const PreviousBookings = ({ navigation }) => {
  const bookings = [
    { id: "1", title: "Booking 1" },
    { id: "2", title: "Booking 2" },
  ];

  const renderBookingItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <CardHeader from={item?.from} to={item?.to} icon={item?.icon} />
        <View style={styles.horizontalLine} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.textStyle}>Completed on </Text>
          <Text style={styles.textStyle}>21 November 2023</Text>
        </View>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={[
            styles.rowdirection,
            {
              justifyContent: "center",
              alignSelf: "center",
              paddingHorizontal: 15,
              paddingVertical: 8,
              // borderWidth: 1,
            },
          ]}
          onPress={() => navigation.navigate("viewDetail", { item })}
        >
          <Text style={styles.viewDetail}>View Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.DashboardHeaderView}>
        <CommonToolbar
          title={"Previous Bookings"}
          goBack={() => navigation.goBack()}
          isBack={true}
        />
      </View>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default PreviousBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  DashboardHeaderView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 5,
    maxHeight: 60,
    padding: 10,
    backgroundColor: "white",
    zIndex: 9999,
  },
  card: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  horizontalLine: { backgroundColor: "#AFAFAF", height: 1, marginVertical: 10 },
  textStyle: {
    fontWeight: "700",
    fontSize: 16,
    color: "green",
    fontFamily: "PlusJakartaSans-Bold",
  },
  viewDetail: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans-Bold",
    color: "blue",
    textDecorationLine: "underline",
  },
});
