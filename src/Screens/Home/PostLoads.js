/* eslint-disable no-extra-boolean-cast */
/* eslint-disable curly */

import React, { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  initLocation,
  initMyPostLoad,
  initLoadTrucks,
  myPostLoadFailure,
} from "../../../Store/Actions/Actions";
import * as Constants from "../../../Constants/Constant";
import styles from "./style";
import TextInputField from "../../../Components/TextInputField";
import Button from "../../../Components/Button";
import styleSheet from "../../Details/style";
import { connect } from "react-redux";
import TruckItem from "../../../Components/TruckItem";
import SearchFilter from "../../../Components/SearchFilter";
import Header from "../../../Components/Header";
import { useTranslation } from "react-i18next";
import LocationModal from "../../../Components/LocationModal";
import { useEffect } from "react";
import AlertBox from "../../../Components/AlertBox";
import { inputColor } from "../../../Color/color";
import Toast from "react-native-simple-toast";
import { NetworkContext } from "../../../Context/NetworkContext";
import NoInternetScreen from "../../Details/NoInternetScreen";

const PostLoads = ({
  navigation,
  loadTruckData,
  locationSearch,
  locationData,
  postLoad,
  DashboardData,
  truckRequest,
  myPostLoadLoading,
  myPostLoadStatus,
  myPostLoadData,
  clearPostData,
  route,
}) => {
  const [searchFrom, setSearchFrom] = useState(
    !!route?.params?.from ? route?.params?.from : ""
  );
  const [searchTo, setSearchTo] = useState(
    !!route?.params?.to ? route?.params?.to : ""
  );

  const [searchFromId, setSearchFromId] = useState(
    !!route?.params?.fromId ? route?.params?.fromId : ""
  );
  const [searchToId, setSearchToId] = useState(
    !!route?.params?.toId ? route?.params?.toId : ""
  );
  const [allLocation, setAllLocation] = useState([]);
  const [showLocationFrom, setLocationFrom] = useState(false);
  const [showLocationTo, setLocationTo] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [truckItem, setTruckItem] = useState("");
  const { isConnected } = useContext(NetworkContext);

  useEffect(() => {
    setAllLocation(locationData);
  }, [locationData]);

  useEffect(() => {
    truckRequest();
  }, []);

  useEffect(() => {
    if (myPostLoadStatus === 200) {
      Toast.show(`${myPostLoadData?.data?.message}`, Toast.LONG);
      // AlertBox(myPostLoadData?.data?.message);
      clearPostData();
      navigation.goBack();
      return;
    }
  }, [myPostLoadStatus]);

  const { t } = useTranslation();
  const truckLoadCapacity = [
    {
      id: 1,
      label: t(Constants.FIXED),
    },
    {
      id: 2,
      label: t(Constants.PER_TON),
    },
  ];
  const postLoadSubmit = () => {
    if (searchFrom === "") {
      Toast.show("Enter Location", Toast.LONG);
      return;
    }
    if (searchTo === "") {
      Toast.show("Enter Location", Toast.LONG);
      return;
    }
    if (quantity === "") {
      Toast.show("Enter quantity", Toast.LONG);
      return;
    }
    if (materialName === "") {
      Toast.show("Enter material name", Toast.LONG);
      return;
    }
    if (truckItem === "") {
      Toast.show("Select truck", Toast.LONG);
      return;
    }
    if (price === "") {
      Toast.show("Enter price", Toast.LONG);
      return;
    }
    if (weight === "") {
      Toast.show("Select price type", Toast.LONG);
      return;
    }
    postLoad(
      searchFromId,
      searchToId,
      quantity,
      materialName,
      truckItem,
      price,
      weight?.id
    );
  };

  const closeIconClick = (closeStatus) => {
    if (closeStatus === "from") {
      setSearchFrom("");
      setLocationFrom(false);
    } else {
      setSearchTo("");
      setLocationTo(false);
    }
  };

  const navigateToSeach = (val) => {
    navigation.navigate("Search", {
      allLocation,
      onReturn: (item) => {
        if (val === "from") {
          setSearchFrom(item?.place_name);
          setSearchFromId(item?.id);
          return;
        }
        setSearchTo(item?.place_name);
        setSearchToId(item?.id);
      },
    });
  };

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.backgroundViewContainer}>
        {/* <FindLoadShimmer /> */}
        {/* <Header
          navigation={() => navigation.goBack()}
          title={t(Constants.POST_LOADS)}
        /> */}
        <SearchFilter
          defaultValue={searchFrom}
          leftTitle={t(Constants.FROM)}
          closeIconClick={() => closeIconClick("from")}
          placeholder={t(Constants.SELECT_LOCATION_TITLE)}
          onSearchPress={() => navigateToSeach("from")}
        />
        <SearchFilter
          defaultValue={searchTo}
          leftTitle={t(Constants.TO)}
          closeIconClick={() => closeIconClick("to")}
          placeholder={t(Constants.SELECT_LOCATION_TITLE)}
          onSearchPress={() => navigateToSeach()}
        />
        <View style={styleSheet.ItemView}>
          <Text style={styleSheet.label}>{`${t(
            Constants.QUANTITY
          )} (Ton)`}</Text>
          <TextInputField
            isPhone
            value={quantity}
            // onChangeText={(e) => setQuantity(e)}
            onChangeText={(e) => {
              const sanitizedInput = e.replace(/\s+/g, "");
              setQuantity(sanitizedInput);
            }}
          />
          <Text style={styleSheet.label}>{t(Constants.MATERIAL_NAME)}</Text>
          <TextInputField
            value={materialName}
            // onChangeText={(e) => setMaterialName(e)}
            onChangeText={(e) => {
              const sanitizedInput = e.replace(/\s+/g, "");
              setMaterialName(sanitizedInput);
            }}
          />
          <Text style={styleSheet.label}>{t(Constants.SELECT_TRUCK)}</Text>
          <TruckItem
            click={(e) => setTruckItem(e?.id)}
            backgroundStyle={{
              padding: 20,
              marginRight: 10,
              marginBottom: 10,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            imageRequire={true}
            horizontal={true}
            checkIcon={true}
            unseleckBackground={{
              padding: 20,
              backgroundColor: inputColor,
              borderRadius: 8,
              marginRight: 10,
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            renderItem={DashboardData}
          />
          <Text style={styleSheet.label}>{t(Constants.PRICE)}</Text>
          <TextInputField
            isPhone={true}
            value={price}
            // onChangeText={(e) => setPrice(e)}
            onChangeText={(e) => {
              const sanitizedInput = e.replace(/\s+/g, "");
              setPrice(sanitizedInput);
            }}
          />
          <Text style={styleSheet.label}>{Constants.SELECT_PRICE_TYPE}</Text>
          <TruckItem
            backgroundStyle={styleSheet.truckTypeItem}
            unseleckBackground={styleSheet.TyuckTypeUnSelectItem}
            horizontal={true}
            checkIcon={false}
            renderItem={truckLoadCapacity}
            click={(e) => setWeight(e)}
          />
          <Button
            loading={myPostLoadLoading}
            onPress={() => postLoadSubmit()}
            title={t(Constants.POST_LOADS)}
            textStyle={styleSheet.buttonTitile}
            style={[styleSheet.button, { marginTop: 20 }]}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => ({
  locationSearch: (location) => dispatch(initLocation(location)),
  postLoad: (afrom, ato, qty, material_name, truck_type, price, price_type) =>
    dispatch(
      initMyPostLoad(
        afrom,
        ato,
        qty,
        material_name,
        truck_type,
        price,
        price_type
      )
    ),
  clearPostData: () => dispatch(myPostLoadFailure()),
  truckRequest: () => dispatch(initLoadTrucks()),
});

const mapStateToProps = (state) => {
  return {
    locationData: state.data.locationData,
    DashboardData: state.data.DashboardData,
    loadTruckData: state.data.loadTruckData,
    myPostLoadLoading: state.data.myPostLoadLoading,
    myPostLoadStatus: state.data.myPostLoadStatus,
    myPostLoadData: state.data.myPostLoadData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostLoads);
