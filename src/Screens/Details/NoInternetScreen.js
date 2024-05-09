import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternetIcon from '../../../assets/SVG/svg/NoInternetIcon';

const NoInternetScreen = ({navigation}) => {
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
        <SafeAreaView style={styles.container}>
          <View style={styles.subContainer}>
            <NoInternetIcon />
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'red',
  },
  subContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    width: '100%',
  },
  text: {color: '#FFFFFF'},
  bottomText: {
    opacity: 0.8,
    marginTop: 3,
    color: '#FFFFFF',
  },
});

export default NoInternetScreen;
