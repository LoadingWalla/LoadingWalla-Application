import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {backgroundColorNew} from '../Color/color';
import RightArrow from '../../assets/SVG/svg/RightArrow';

const GpsItem = ({onPress, item, icon}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 20,
        elevation: 2,
      }}>
      <View style={styles.itemContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.modelText}>{item.model}</Text>
          <Text>Purchased date: {item.purchaseDate}</Text>
        </View>
        <View>
          <Text
            style={{
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 20,
              elevation: 2,
              backgroundColor: '#f7f7f7',
              color: backgroundColorNew,
              fontFamily: 'PlusJakartaSans-SemiBold',
              fontSize: 12,
              textAlign: 'center',
            }}>
            1 Year plan
          </Text>
        </View>
      </View>
      <View
        style={{
          // borderWidth: 1,
          backgroundColor: '#F7F7F7',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={
            item.status === 'Expired' ? styles.expiredText : styles.activeText
          }>
          Expire on Feb 20, 2025
        </Text>
        {icon ? (
          <RightArrow
            size={20}
            color={item.status === 'Expired' ? backgroundColorNew : '#000000'}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default GpsItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: '#ffffff',
    // borderWidth: 1,
    // borderColor: '#ccc',
    paddingBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
  },
  modelText: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  expiredText: {
    color: 'red',
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
  activeText: {
    color: '#000000',
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
});
