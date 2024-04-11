import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={styles.customFont}>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  customFont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
  },
});
