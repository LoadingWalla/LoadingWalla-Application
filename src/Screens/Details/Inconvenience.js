import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {backgroundColorNew} from '../../Color/color';

const Inconvenience = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerChild1}>
        <Image
          source={require('../../../assets/GIFs/Nothing.gif')}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}>
        <Text style={styles.txt}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Inconvenience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerChild1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: backgroundColorNew,
    borderRadius: 5,
    bottom: 20,
    width: '90%',
  },
  txt: {
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
});
