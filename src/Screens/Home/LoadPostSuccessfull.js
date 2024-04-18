import React, { useContext } from "react";
import { View, Text } from "react-native";
import Header from "../../../Components/Header";
import * as Constants from "../../../Constants/Constant";
import styles from "./style";
import styleSheet from "../../Details/style";
import PostItem from "../../../Components/PostItem";
import Button from "../../../Components/Button";
import { useTranslation } from "react-i18next";
import NoInternetScreen from "../../Details/NoInternetScreen";
import { NetworkContext } from "../../../Context/NetworkContext";

const LoadPostSuccessfull = ({ navigation }) => {
  const { t } = useTranslation();
  const { isConnected } = useContext(NetworkContext);

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View style={[styles.backgroundView, { backgroundColor: "#E7E7E7" }]}>
      <Header
        navigation={() => navigation.goBack()}
        title={t(Constants.POSTED_SUCCESS)}
      />
      <View style={styleSheet.flexStyle}>
        <Text style={styleSheet.label}>{t(Constants.POST_LOOK)}</Text>
        <View style={{ marginTop: 18 }}>
          <PostItem />
        </View>
        <View style={[styles.rowDirection]}>
          <Button
            //loading={loading}
            onPress={() => {}} // navigation.navigate('VerifyOtp')}
            title={"Continue"}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
          <Button
            //loading={loading}
            onPress={() => {}} // navigation.navigate('VerifyOtp')}
            title={"Find Truck"}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};
export default LoadPostSuccessfull;
