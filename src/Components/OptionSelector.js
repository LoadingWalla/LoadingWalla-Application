import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OkSvg from '../../assets/SVG/svg/OkSvg';
import {titleColor} from '../Color/color';

const OptionSelector = ({data, index, selected, onPress}) => (
  <TouchableOpacity onPress={() => onPress(data, index)}>
    {selected === data?.id ? (
      <View style={styles.gridbox}>
        <OkSvg style={styles.checkIconStyle} />
        <View style={styles.languageIconContainer}>
          <View style={styles.languageIconBox}>
            <Text style={[styles.gridText]}>{data?.languageName}</Text>
          </View>
          <View style={styles.languageNameContainer}>
            <Text style={styles.gridText}>{data?.language}</Text>
          </View>
        </View>
      </View>
    ) : (
      <View style={styles.gridGreyBox}>
        <View style={styles.unselectedContainer}>
          <View style={styles.unselectedIconContainer}>
            <Text style={[styles.gridGreyText]}>{data?.languageName}</Text>
          </View>
          <View style={styles.unselectedNameContainer}>
            <Text style={styles.gridGreyText}>{data?.language}</Text>
          </View>
        </View>
      </View>
    )}
  </TouchableOpacity>
);

export default OptionSelector;

const styles = StyleSheet.create({
  gridbox: {
    height: 140,
    width: 140,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 5,
    elevation: 3,
  },
  gridGreyBox: {
    height: 140,
    width: 140,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
  },
  checkIconStyle: {top: 10, left: 5},
  gridText: {
    fontSize: 16,
    color: '#3F3F3F',
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  gridGreyText: {
    fontSize: 16,
    color: titleColor,
    // marginTop: 5,
    // paddingBottom: 5,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  languageIconBox: {
    justifyContent: 'center',
    height: '70%',
    width: '100%',
  },
  languageIconContainer: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageNameContainer: {
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    height: '30%',
    width: '98%',
  },
  unselectedContainer: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unselectedIconContainer: {
    justifyContent: 'center',
    height: '70%',
    width: '100%',
  },
  unselectedNameContainer: {
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    height: '30%',
    width: '100%',
  },
});
