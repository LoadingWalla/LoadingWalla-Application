import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {GradientColor1, titleColor} from '../Color/color';
import RightArrow from '../../assets/SVG/svg/RightArrow';
import {useTranslation} from 'react-i18next';
import * as Constants from '../Constants/Constant';
import CheckCircle from '../../assets/SVG/svg/CheckCircle';

const PercentageBar = ({
  navigation,
  percentage,
  verify,
  height = 48,
  backgroundColor = '#fffaed',
  completedColor = '#F7FFF5',
  // incompleteColor = '#ff5353',
  incompleteColor = '#ddd',
  midColor = '#F0C200',
  highColor = '#F7FFF5',
}) => {
  let barColor;
  if (percentage < 30) {
    barColor = incompleteColor;
  } else if (percentage < 60) {
    barColor = midColor;
  } else if (percentage < 90) {
    barColor = highColor;
  } else {
    barColor = completedColor;
  }

  const {t} = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.barContainer, {height, borderColor: '#ddd'}]}
      onPress={() => navigation.navigate('KYC')}
      disabled={verify === 1}>
      <View style={[styles.backgroundBar, {backgroundColor, height}]} />
      <View
        style={[
          styles.completedBar,
          {width: `${percentage}%`, backgroundColor: barColor, height},
        ]}
      />
      {percentage === 100 ? (
        <View style={styles.completeView}>
          <CheckCircle size={20} color={'#109500'} strokeColor={'#FFFFFF'} />
          <Text style={styles.completeText}>{t(Constants.VERIFIED)}</Text>
        </View>
      ) : (
        <Text style={styles.barText}>{`${percentage}%  ${t(
          Constants.COMPLETE,
        )}`}</Text>
      )}
      {verify !== 1 && (
        <View style={styles.arrowView}>
          <RightArrow size={20} color={GradientColor1} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    width: '48%',
    justifyContent: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#00000057',
  },
  backgroundBar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  completedBar: {
    position: 'absolute',
    left: 0,
    height: '100%',
    borderRadius: 5,
  },
  barText: {
    fontSize: 16,
    position: 'absolute',
    textAlign: 'center',
    color: titleColor,
    fontWeight: '700',
    fontFamily: 'PlusJakartaSans-Bold',
    zIndex: 1,
    marginStart: 15,
  },
  arrowView: {
    marginLeft: 'auto',
    elevation: 1,
    // borderWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    right: 10,
  },
  completeView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeText: {
    fontSize: 14,
    textAlign: 'center',
    color: titleColor,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    marginStart: 15,
  },
});

export default PercentageBar;
