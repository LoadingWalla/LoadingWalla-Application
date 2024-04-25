import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  GradientColor1,
  GradientColor2,
  backgroundColorNew,
} from '../../Color/color';

const Inconvenience = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerChild1}>
        <Image
          source={require('../../../assets/inconvience.png')}
          style={styles.images}
        />
        <Text style={styles.oops}>OOPS !</Text>
      </View>
      <View style={styles.containerChild2}>
        <Text style={styles.text1}>Sorry for the inconvenience!</Text>
        <Text style={styles.text2}>See you here after sometimes.</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text style={styles.txt}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Inconvenience;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFDFD'},
  containerChild1: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerChild2: {flex: 0.5, alignItems: 'center'},
  oops: {
    fontSize: 35,
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginVertical: 10,
  },
  text1: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
    marginVertical: 5,
  },
  text2: {fontSize: 14, fontFamily: 'PlusJakartaSans-Regular'},
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: backgroundColorNew,
    borderRadius: 5,
  },
  images: {width: '100%'},
  txt: {color: '#FFFFFF', fontFamily: 'PlusJakartaSans-Bold'},
});
