import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import Background from '../Components/BackgroundGradient';
import styleSheet from '../Screens/Details/style';
import CheckCircle from '../../assets/SVG/svg/CheckCircle';

const TruckItem = ({
  renderItem,
  click,
  backgroundStyle,
  checkIcon,
  unseleckBackground,
  horizontal,
  columns,
  imageRequire,
  multiple,
  isDone,
}) => {
  const [selected, setSelected] = useState('');

  const GridView = ({data, index}) => {
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

  const MultipleSelectGridView = ({data, index}) => {
    return (
      <TouchableOpacity onPress={() => click(data)}>
        {data?.isChecked ? (
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
        // <CheckIcon
        //   style={styleSheet.checkIconStyle}
        //   name="checkmark-circle"
        //   size={20}
        //   color="#fff"
        // />
        <CheckCircle style={styleSheet.checkIconStyle} size={20} color="#fff" />
      )}
      <View>
        {(data?.image || imageRequire) && (
          <Image
            source={imageRequire ? {uri: data?.icon} : data?.image}
            style={styleSheet.imageStyle}
          />
        )}
        {multiple ? (
          <Text
            style={
              data?.isChecked ? styleSheet.gridText : styleSheet.gridGreyText
            }>
            {data?.truck_tyre || data?.type || data?.permit_name || data?.label}
          </Text>
        ) : (
          <Text
            style={
              selected === index ? styleSheet.gridText : styleSheet.gridGreyText
            }>
            {data?.truck_tyre || data?.type || data?.permit_name || data?.label}
          </Text>
        )}
      </View>
    </>
  );

  return (
    <FlatList
      style={[styleSheet.flatListStyle, {maxHeight: isDone ? 400 : 120}]}
      horizontal={horizontal}
      numColumns={columns}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={renderItem}
      renderItem={({item, index}) => {
        return (
          <>
            {multiple ? (
              <MultipleSelectGridView data={item} index={index} />
            ) : (
              <GridView data={item} index={index} />
            )}
          </>
        );
      }}
    />
  );
};
export default TruckItem;
