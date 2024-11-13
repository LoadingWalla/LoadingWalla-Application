import AsyncStorage from '@react-native-async-storage/async-storage';

export const printAllAsyncStorageData = async () => {
  try {
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length > 0) {
      // Fetch all values for the keys
      const result = await AsyncStorage.multiGet(keys);
      // Create an object to store key-value pairs
      const storageData = {};
      result.forEach(([key, value]) => {
        storageData[key] = value; // Add key-value pair to the object
      });
      // Print the object containing all keys and values
      console.log(1111111, 'All stored data in AsyncStorage:', storageData);
    } else {
      console.log('No keys found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Failed to retrieve data from AsyncStorage', error);
  }
};
