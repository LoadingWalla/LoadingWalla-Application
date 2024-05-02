import {Text, View} from 'react-native';
import React from 'react';
import {TabBar} from 'react-native-tab-view';
import {GradientColor2, pageBackground, titleColor} from '../../Color/color';

const RenderTabBar = props => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: GradientColor2,
        height: 3,
        borderRadius: 10,
        marginHorizontal: 3,
      }}
      style={{
        backgroundColor: pageBackground,
        borderColor: GradientColor2,
        borderRadius: 7,
        elevation: 2,
        margin: 10,
      }}
      pressColor={'#F7F7F7'}
      renderLabel={({route, focused, color}) => {
        let labelStyle = {
          color: titleColor,
          fontWeight: '700',
          fontFamily: 'PlusJakartaSans-Medium',
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

// const styles = StyleSheet.create({});
