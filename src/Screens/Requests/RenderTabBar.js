import {Text, View} from 'react-native';
import React from 'react';
import {TabBar} from 'react-native-tab-view';
import {GradientColor2, titleColor} from '../../Color/color';
import styles from './style';

const RenderTabBar = props => {
  return (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      pressColor={'#F7F7F7'}
      renderLabel={({route, focused, color}) => {
        let labelStyle = {
          color: titleColor,
          fontFamily: 'PlusJakartaSans-Bold',
          fontSize: 16,
        };

        if (focused) {
          labelStyle.color = GradientColor2;
        }

        return (
          <View>
            <Text style={labelStyle}>{route.title}</Text>
          </View>
        );
      }}
    />
  );
};

export default RenderTabBar;
