import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import * as Constants from '../../Constants/Constant';
import Header from '../../Components/Header';
import PostItem from '../../Components/PostItem';
import Button from '../../Components/Button';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const LoadPostSuccessfull = ({navigation}) => {
  useTrackScreenTime('LoadPostSuccessfull');
  return (
    <View style={[styles.backgroundView, {backgroundColor: '#E7E7E7'}]}>
      <Header
        navigation={() => navigation.goBack()}
        title={Constants.POSTED_SUCCESS}
      />
      <View>
        <Text style={styles.label}>{Constants.POST_LOOK}</Text>
        <View style={styles.postItemView}>
          <PostItem />
        </View>
        <View style={[styles.rowDirection]}>
          <Button
            //loading={loading}
            onPress={() => {}} // navigation.navigate('VerifyOtp')}
            title={'Continue'}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
          <Button
            //loading={loading}
            onPress={() => {}} // navigation.navigate('VerifyOtp')}
            title={'Find Truck'}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};
export default LoadPostSuccessfull;
