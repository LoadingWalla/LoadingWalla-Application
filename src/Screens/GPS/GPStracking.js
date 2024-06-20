import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useEffect} from 'react';
import RightArrow from '../../../assets/SVG/svg/RightArrow';
import {backgroundColorNew, titleColor} from '../../Color/color';

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
  // Add more trucks as needed
];

const GPStracking = ({navigation}) => {
  const getItem = (data, index) => ({...data[index]});
  const getItemCount = data => data.length;

  return (
    <View style={{paddingHorizontal: 10}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>GPS Purchases</Text>
      </View>
      <VirtualizedList
        data={truckData}
        initialNumToRender={6}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              marginBottom: 20,
              elevation: 2,
            }}>
            <View style={styles.itemContainer}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.modelText}>{item.model}</Text>
                <Text>Purchased date: {item.purchaseDate}</Text>
              </View>
              <View>
                <Text
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 20,
                    elevation: 2,
                    backgroundColor: '#f7f7f7',
                    color: backgroundColorNew,
                    fontFamily: 'PlusJakartaSans-SemiBold',
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  1 Year plan
                </Text>
              </View>
            </View>
            <View
              style={{
                // borderWidth: 1,
                backgroundColor: '#F7F7F7',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={
                  item.status === 'Expired'
                    ? styles.expiredText
                    : styles.activeText
                }>
                Expire on Feb 20, 2025
              </Text>
              <RightArrow
                size={20}
                color={
                  item.status === 'Expired' ? backgroundColorNew : '#000000'
                }
              />
            </View>
          </TouchableOpacity>
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
  headerContainer: {
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    paddingLeft: 10,
  },
  viewContainer: {
    flex: 1,
    // borderWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: '#ffffff',
    // borderWidth: 1,
    // borderColor: '#ccc',
    paddingBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundColor: '#f7f7f7',
    borderRadius: 6,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 1,
  },
  modelText: {
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  expiredText: {
    color: 'red',
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
  activeText: {
    color: '#000000',
    fontFamily: 'PlusJakartaSans-Italic',
    fontSize: 12,
  },
});
