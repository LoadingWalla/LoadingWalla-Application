import {Image, View} from 'react-native';
import React from 'react';
import InnerButton from '../../Components/InnerButton';
import styles from './style';

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
