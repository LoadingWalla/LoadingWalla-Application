import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HeaderTitleComponent = ({text1, text2}) => {
  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.text1Style}>{text1}</Text>
      </View>
      <View>
        <Text style={styles.languageTitle}>{text2}</Text>
      </View>
    </View>
  );
};

export default HeaderTitleComponent;

const styles = StyleSheet.create({
  box: {
    flex: 0.6,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  languageTitle: {
    fontSize: 20,
    color: '#3F3F3F',
    fontFamily: 'PlusJakartaSans-Bold',
    width: '100%',
  },
  text1Style: {
    color: '#F50000',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
    width: '100%',
  },
});
