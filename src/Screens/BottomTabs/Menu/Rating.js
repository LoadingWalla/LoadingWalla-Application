import {Text, View} from 'react-native';
import React from 'react';
import styles from './style';
import useTrackScreenTime from '../../../hooks/useTrackScreenTime';

const Rating = () => {
  useTrackScreenTime('Rating');
  return (
    <View>
      <Text style={styles.colotss}>Rating</Text>
    </View>
  );
};

export default Rating;
