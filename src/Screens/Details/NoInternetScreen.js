import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternetIcon from '../../../assets/SVG/svg/NoInternetIcon';
import styles from './style';

const NoInternetScreen = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup the event listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      {!isConnected && (
        <SafeAreaView style={styles.noInternetContainer}>
          <View style={styles.subContainer}>
            <NoInternetIcon size={30} />
            <View>
              <Text style={styles.text}>No Internet</Text>
              <Text style={styles.bottomText}>
                Check your network connection
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default NoInternetScreen;
