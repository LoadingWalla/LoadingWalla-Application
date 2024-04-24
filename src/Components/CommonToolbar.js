import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {titleColor} from '../Color/color';
import styles from './style';
const CommonToolbar = ({title, goBack, isBack, color, isClose, modal}) => {
  return (
    <View style={styles.toolbarContainer(modal, color)}>
      {isBack ? (
        <TouchableOpacity style={styles.backIconView}>
          <Icon
            onPress={() => goBack()}
            name={isClose ? 'close-sharp' : 'arrow-back-sharp'}
            size={30}
            color={titleColor}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyBackIconView} />
      )}

      <Text style={[styles.title, {color: color || titleColor}]}>{title}</Text>
    </View>
  );
};
export default CommonToolbar;
