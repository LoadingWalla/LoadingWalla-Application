import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import style from "./style";

const LocationModal = ({ data, styles, click }) => {
  const ItemSeperatorView = () => {
    return <View style={style.seperatorView} />;
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => click(item)}
        // onPress={()=>click({ place_name: item?.place_name, id: item?.id })}}
      >
        <Text style={style.searchLocationText}>{item?.place_name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={data}
      nestedScrollEnabled
      style={styles}
      initialNumToRender={5}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={ItemSeperatorView}
      renderItem={ItemView}
    />
  );
};
export default LocationModal;
