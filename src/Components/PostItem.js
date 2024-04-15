import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import * as Constants from "../Constants/Constant";
import style from "./style";
import Negotiative from "./Negotiative";
import CardHeader from "./CardHeader";
import InnerButton from "./InnerButton";

const PostItem = ({ navigate, call, item, owner, fromDashboard }) => {
  const [isStatus, setShowStatus] = useState(false);
  const { t } = useTranslation();

  const dismissModal = () => {
    setShowStatus(false);
  };

  const onClose = () => {
    setShowStatus(false);
  };

  console.log("PostItem IIIITTTEEEMMMSS", item);

  const statusModal = () => {
    return (
      <Negotiative
        navigation={navigate}
        showModal={(e) => setShowStatus(e)}
        dismissModal={() => dismissModal()}
        onClose={() => onClose()}
        isEdit={isStatus}
        item={item}
        owner={owner}
      />
    );
  };

  const openStatusModal = () => {
    setShowStatus(true);
  };

  return (
    <View style={style.card}>
      <CardHeader from={item?.from} to={item?.to} icon={item?.image} />
      <View style={style.horizontalLine} />
      <View>
        <View style={style.rowdirection}>
          <View style={style.point} />
          <Text style={style.smallImageHeaderTitle}>
            {item?.name || item?.truck_owner_name}
          </Text>
        </View>
        <View style={style.rowdirection}>
          <View style={style.point} />
          <Text style={style.smallImageHeaderTitle}>
            {item?.user_type
              ? `₹ ${item?.price} / ${
                  item?.price_type === 1 ? "Per Ton" : "Fixed"
                }`
              : item?.vehicle_number}
          </Text>
        </View>
      </View>
      <View style={style.horizontalLine} />
      <View style={[style.rowdirection, { justifyContent: "center" }]}>
        <Text style={style.textStyle}>
          {item?.loads || item?.truck_capacity}
        </Text>
        <View style={style.verticalLine} />
        <Text style={style.textStyle}>
          {item?.material_name || item?.wheel}
        </Text>
        {!item?.user_type ? (
          <>
            <View style={style.verticalLine} />
            <Text style={style.textStyle}>{`${item?.truck_type} Body`}</Text>
          </>
        ) : null}
      </View>
      <View style={style.horizontalLine} />
      <View style={style.btnContainer}>
        {fromDashboard ? (
          <></>
        ) : (
          <InnerButton
            enabledStyle={style.requestButtonContainer}
            textStyle={style.gradientButtonText}
            title={t(Constants.REQUEST)}
            navigation={() => openStatusModal()}
          />
        )}
        <InnerButton
          enabledStyle={style.findButtonContainer}
          textStyle={style.findButtonText}
          title={"Call"}
          navigation={() => call()}
        />
      </View>

      {isStatus && statusModal()}
    </View>
  );
};
export default PostItem;
