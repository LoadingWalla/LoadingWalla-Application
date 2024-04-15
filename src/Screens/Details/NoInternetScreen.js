import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const NoInternetScreen = ({navigation}) => {
  // console.log("Navigation ", navigation);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Internet Connection</Text>
      <TouchableOpacity
        style={styles.retryButton}
        // onPress={() => navigation.navigate("Game")}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
  },
});

export default NoInternetScreen;
