import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {backgroundColorNew, titleColor} from '../Color/color';
import EditIcon from '../../assets/SVG/svg/EditIcon';
import PercentageIcon from '../../assets/SVG/svg/PercentageIcon';
import {useTranslation} from 'react-i18next';
import * as Constants from '../Constants/Constant';
import styles from './style'

const PurchaseGpsHeader = ({
  icon,
  footertitle,
  onPress,
  edit,
  planName,
  planValidity,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.purchasecontainer}>
      <View style={styles.mainBox}>
        <View>
          <View style={styles.mainBoxHeader(edit)}>
            <Text style={styles.planText}>{planName}</Text>
            {edit && (
              <TouchableOpacity style={styles.purchaseeditButton} onPress={onPress}>
                <EditIcon size={13} color={backgroundColorNew} />
                <Text style={styles.purchaseeditButtonText}>{t(Constants.EDIT)}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.mainBoxBottom}>
          <Text style={styles.mainBoxBottomText}>
            {t(Constants.PLAN_VALID_DATE)} {planValidity} {t(Constants.DAYS)}
          </Text>
        </View>
      </View>
      <View style={styles.mainBoxFooter}>
        {icon && <PercentageIcon size={20} color={'#3BA700'} />}
        <Text style={styles.purchasefooterText}>
          {/* YAY! You saved ₹ 200 on this purchase */}
          {footertitle}
        </Text>
      </View>
    </View>
  );
};

export default PurchaseGpsHeader;

// const styles = StyleSheet.create({
//   container: {padding: 10},
//   mainBox: {
//     //   borderWidth: 1,
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 8,
//     zIndex: 10,
//     elevation: 2,
//   },
//   mainBoxHeader: edit => ({
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderBottomColor: '#00000029',
//     paddingBottom: edit ? 30 : 15,
//     paddingVertical: 10,
//   }),
//   planText: {
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//     fontSize: 16,
//     marginLeft: 10,
//     textTransform: 'capitalize',
//   },
//   editButton: {
//     flexDirection: 'row',
//     borderRadius: 20,
//     // borderWidth: 1,
//     paddingHorizontal: 15,
//     paddingVertical: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F7F7F7',
//   },
//   editButtonText: {
//     marginLeft: 10,
//     color: backgroundColorNew,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     fontSize: 14,
//   },
//   mainBoxBottom: {paddingHorizontal: 10, paddingVertical: 15},
//   mainBoxBottomText: {
//     textAlign: 'center',
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     fontSize: 14,
//   },
//   mainBoxFooter: {
//     flexDirection: 'row',
//     //   borderWidth: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     paddingTop: 20,
//     paddingBottom: 10,
//     marginTop: -10,
//     backgroundColor: '#EFFFE6',
//   },
//   footerText: {marginLeft: 5, color: '#3BA700'},
// });
