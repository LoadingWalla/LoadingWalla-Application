import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, Image, Text} from 'react-native';
import Background from '../Components/BackgroundGradient';
import styleSheet from '../Screens/Details/style';
import CheckCircle from '../../assets/SVG/svg/CheckCircle';
const LoadItem = ({
  renderItem,
  click,
  backgroundStyle,
  checkIcon,
  unseleckBackground,
  horizontal,
  columns,
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

  const selectOwnerLorry = (data, index) => (
    <>
      {selected === index && checkIcon && (
        <CheckCircle size={20} color="#fff" />
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: data?.icon || 'https://via.placeholder.com/150'}}
          style={{height: 30, width: 30, marginRight: 8}}
        />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#DBD7D7', marginRight: 10}}>{'\u2B24'}</Text>
            <Text
              style={
                selected === index
                  ? styleSheet.gridText
                  : styleSheet.gridGreyText
              }>
              {data?.material_name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#DBD7D7', marginRight: 10}}>{'\u2B24'}</Text>
            <Text
              style={
                selected === index
                  ? styleSheet.gridText
                  : styleSheet.gridGreyText
              }>
              {data?.qty} Ton
            </Text>
          </View>
        </View>
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
            <GridView data={item} index={index} />
          </>
        );
      }}
    />
  );
};
export default LoadItem;
