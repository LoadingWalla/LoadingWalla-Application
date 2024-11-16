import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Edit from '../../assets/SVG/svg/Edit';

const HeaderTitleComponent = ({text1, text2, onPress, isButton = false}) => {
  return (
    <View style={styles.box}>
      <View style={styles.boxChild1}>
        <Text style={styles.text1Style}>{text1}</Text>
        {isButton && (
          <TouchableOpacity onPress={onPress} style={styles.iconView}>
            <Edit size={15} />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.languageTitle}>{text2}</Text>
      </View>
    </View>
  );
};

export default HeaderTitleComponent;

const styles = StyleSheet.create({
  box: {
    flex: 0.6,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  languageTitle: {
    fontSize: 20,
    color: '#3F3F3F',
    fontFamily: 'PlusJakartaSans-Bold',
    width: '100%',
  },
  text1Style: {
    color: '#F50000',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  boxChild1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconView: {marginLeft: 10},
});
