import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {backgroundColorNew, titleColor} from '../Color/color';
import EditIcon from '../../assets/SVG/svg/EditIcon';
import PercentageIcon from '../../assets/SVG/svg/PercentageIcon';

const PurchaseGpsHeader = ({icon, footertitle}) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainBox}>
        <View>
          <View style={styles.mainBoxHeader}>
            <Text style={styles.planText}>1 Year GPS plan</Text>
            <View style={styles.editButton}>
              <EditIcon size={13} color={backgroundColorNew} />
              <Text style={styles.editButtonText}>Edit</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainBoxBottom}>
          <Text style={styles.mainBoxBottomText}>
            The plan will be valid till JUNE 20, 2025
          </Text>
        </View>
      </View>
      <View style={styles.mainBoxFooter}>
        {icon && <PercentageIcon size={20} color={'#3BA700'} />}
        <Text style={styles.footerText}>
          {/* YAY! You saved ₹ 200 on this purchase */}
          {footertitle}
        </Text>
      </View>
    </View>
  );
};

export default PurchaseGpsHeader;

const styles = StyleSheet.create({
  container: {padding: 10},
  mainBox: {
    //   borderWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
    elevation: 2,
  },
  mainBoxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#00000029',
    paddingBottom: 30,
    paddingVertical: 10,
  },
  planText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    marginLeft: 10,
  },
  editButton: {
    flexDirection: 'row',
    borderRadius: 20,
    // borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  editButtonText: {
    marginLeft: 10,
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  mainBoxBottom: {paddingHorizontal: 10, paddingVertical: 15},
  mainBoxBottomText: {
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
  },
  mainBoxFooter: {
    flexDirection: 'row',
    //   borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: -10,
    backgroundColor: '#EFFFE6',
  },
  footerText: {marginLeft: 5, color: '#3BA700'},
});
