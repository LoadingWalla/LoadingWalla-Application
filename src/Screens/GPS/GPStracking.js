import {StyleSheet, Text, View, VirtualizedList} from 'react-native';
import React, {useEffect} from 'react';
import GpsItem from '../../Components/GpsItem';

const truckData = [
  {
    id: '1',
    model: 'DEL 00122 87DP',
    purchaseDate: 'Feb 20, 2024',
    expiryDate: 'Feb 20, 2025',
    planType: '1 Year plan',
    status: 'Active',
    image: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
  },
  {
    id: '2',
    model: 'DEL 00122 87DP',
    purchaseDate: 'Feb 20, 2024',
    expiryDate: 'Feb 20, 2023',
    planType: 'Expired',
    status: 'Expired',
    image: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
  },
  {
    id: '3',
    model: 'DEL 00122 87DP',
    purchaseDate: 'Feb 20, 2024',
    expiryDate: 'Feb 20, 2023',
    planType: 'Expired',
    status: 'Expired',
    image: 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png',
  },
];

const GPStracking = ({navigation}) => {
  const getItem = (data, index) => ({...data[index]});
  const getItemCount = data => data.length;

  return (
    <View style={styles.conatiner}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>GPS Purchases</Text>
      </View>
      <VirtualizedList
        data={truckData}
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <GpsItem
            item={item}
            icon={true}
            onPress={() => navigation.navigate('OwnedGPS', {item: item})}
          />
        )}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
};

export default GPStracking;

const styles = StyleSheet.create({
  conatiner: {paddingHorizontal: 10, flex: 1},
  headerContainer: {
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    paddingLeft: 10,
  },
});
