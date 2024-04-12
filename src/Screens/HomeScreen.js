import React, {useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProductsRequest} from '../Store/Actions';

function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.data.products);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productContainer}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text>Price: ${item.price}</Text>
            <Button
              title="Go to Details"
              onPress={() =>
                navigation.navigate('Details', {productId: item.id})
              }
            />
          </View>
        )}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    marginBottom: 20,
  },
  productContainer: {
    alignItems: 'center',
    margin: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
