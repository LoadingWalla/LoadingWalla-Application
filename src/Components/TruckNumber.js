import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import Background from "../Components/BackgroundGradient";
import styleSheet from "../Screens/Details/style";
import CheckIcon from "react-native-vector-icons/Ionicons";

const TruckNumber = ({
  renderItem,
  click,
  backgroundStyle,
  checkIcon,
  unseleckBackground,
  horizontal,
  columns,
  isDone,
}) => {
  const [selected, setSelected] = useState("");

  const GridView = ({ data, index }) => {
    return (
      <TouchableOpacity onPress={() => click(data) || setSelected(index)}>
        {selected === index ? (
          <Background style={backgroundStyle}>
            {selectOwnerLorry(data, index)}
          </Background>
        ) : (
          <View style={unseleckBackground}>
            {selectOwnerLorry(data, index)}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const selectOwnerLorry = (data, index) => (
    <>
      {selected === index && checkIcon && (
        <CheckIcon
          style={styleSheet.checkIconStyle}
          name="checkmark-circle"
          size={20}
          color="#fff"
        />
      )}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: data?.icon }}
          style={{ height: 30, width: 30, marginRight: 8 }}
        />
        <Text
          style={
            selected === index ? styleSheet.gridText : styleSheet.gridGreyText
          }
        >
          {data?.vehicle_number}
        </Text>
      </View>
    </>
  );

  return (
    <FlatList
      style={[styleSheet.flatListStyle, { maxHeight: isDone ? 400 : 120 }]}
      horizontal={horizontal}
      numColumns={columns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={renderItem}
      renderItem={({ item, index }) => {
        return (
          <>
            <GridView data={item} index={index} />
          </>
        );
      }}
    />
  );
};
export default TruckNumber;
