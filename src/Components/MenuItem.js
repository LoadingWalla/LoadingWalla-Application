import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {GradientColor1, titleColor} from '../Color/color';
import RightArrow from '../../assets/SVG/svg/RightArrow';
import styles from './style'

const MenuItem = ({title, onPress, Icon}) => {
  return (
    <View>
      <TouchableOpacity style={styles.detailItem} onPress={() => onPress()}>
        <View style={styles.menuiconView}>
          <View>{Icon}</View>
          <Text style={styles.detailText}>{title}</Text>
        </View>
        <View style={styles.arrowView}>
          <RightArrow size={20} color={GradientColor1} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default MenuItem;

// const styles = StyleSheet.create({
//   detailItem: {
//     padding: 10,
//     marginBottom: 2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   detailText: {
//     fontSize: 16,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     marginLeft: 10,
//   },
//   iconView: {flexDirection: 'row', alignItems: 'center'},
//   arrowView: {
//     elevation: 1,
//     borderWidth: 0,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//   },
// });
