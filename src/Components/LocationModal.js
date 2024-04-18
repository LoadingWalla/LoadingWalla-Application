import React from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import style from './style';

const ItemSeperatorView = () => {
  return <View style={style.seperatorView} />;
};

const LocationModal = ({data, styles, click}) => {
  const ItemView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => click(item)}>
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
