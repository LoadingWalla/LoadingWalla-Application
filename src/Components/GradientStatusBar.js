import React from 'react';
import {View, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientStatusBar = ({colors}) => {
  return (
    <View style={{height: StatusBar.currentHeight, width: '100%'}}>
      <LinearGradient
        // colors={[GradientColor1, GradientColor2, GradientColor3]}
        colors={colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{flex: 1}}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </View>
  );
};

export default GradientStatusBar;
