import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TabBarComponent from './TabBarComponent';

const TabBar = ({state, navigation, descriptors}) => {
  return (
    <View style={styles.tabBarStyle}>
      <TabBarComponent
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBarStyle: {
    flex: 1,
    width: '100%',
    height: 60,
    backgroundColor: 'pink',
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    bottom: 0, // here you can use the bottom inset for more flexbility
    // left: 20,
    // right: 20,
    // elevation: 0,
    // borderRadius: 15,
    // shadowColor: '#000000',
    // shadowOpacity: 0.05,
    // shadowOffset: {
    //   width: 10,
    //   height: 10,
    // },
    borderWidth: 1,
  },
});
