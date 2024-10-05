import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {backgroundColorNew, textColor} from '../../Color/color';
import InnerButton from '../../Components/InnerButton';
import styles from './style'

const Inconvenience = ({navigation}) => {
  return (
    <View style={styles.inconvContainer}>
      <View style={styles.containerChild1}>
        <Image
          source={require('../../../assets/GIFs/Nothing.gif')}
          resizeMode="contain"
          style={styles.setFlex}
        />
        {/* <NotFound imageName="nothing" /> */}
        <InnerButton
          navigation={() => navigation.goBack()}
          title={'Go Back'}
          enabledStyle={styles.btnStyle}
          textStyle={styles.btnText}
        />
      </View>
    </View>
  );
};

export default Inconvenience;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFDFD',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // borderWidth: 1,
//     // marginTop: 60,
//   },
//   containerChild1: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     width: '100%',
//     // borderWidth: 1,
//     paddingBottom: 30,
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: backgroundColorNew,
//     borderRadius: 5,
//     bottom: 20,
//     width: '90%',
//     // borderWidth: 1,
//   },
//   txt: {
//     color: '#FFFFFF',
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     fontSize: 16,
//     textAlign: 'center',
//     // borderWidth: 1,
//   },
//   btnStyle: {
//     borderWidth: 2,
//     borderRadius: 8,
//     backgroundColor: backgroundColorNew,
//     borderColor: backgroundColorNew,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '80%',
//     alignSelf: 'center',
//   },
//   btnText: {
//     fontSize: 16,
//     color: textColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//     textAlign: 'center',
//   },
// });
