import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {titleColor} from '../Color/color';
import styles from './style';
import CloseCircle from '../../assets/SVG/svg/CloseCircle';
import GoBackIcon from '../../assets/SVG/svg/GoBackIcon';

const CommonToolbar = ({title, goBack, isBack, color, isClose, modal}) => {
  return (
    <View style={styles.toolbarContainer(modal, color)}>
      {isBack ? (
        <TouchableOpacity style={styles.backIconView} onPress={() => goBack()}>
          {isClose ? (
            <CloseCircle size={30} color={titleColor} />
          ) : (
            <GoBackIcon size={30} color={titleColor} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyBackIconView} />
      )}

      <Text style={[styles.title, {color: color || titleColor}]}>{title}</Text>
    </View>
  );
};

export default CommonToolbar;
