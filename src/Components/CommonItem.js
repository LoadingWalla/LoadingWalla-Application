import React from 'react';
import {View, Image, Text} from 'react-native';
import style from './style';

const CommonItem = ({title, desc}) => {
  return (
    <View style={style.notificationItemView}>
      <Image
        style={style.notificationIconView}
        source={require('../../assets/Notification.png')}
        resizeMode={'stretch'}
      />
      <View style={style.notificatioView}>
        <Text style={style.notificationTitle}>{title}</Text>
        <Text numberOfLines={1} style={style.notitficationDesc}>
          {desc}
        </Text>
      </View>
    </View>
  );
};
export default CommonItem;
