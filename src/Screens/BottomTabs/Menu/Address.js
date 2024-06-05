import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import LocationIcon from '../../../../assets/SVG/svg/LocationIcon';
import {PrivacyPolicy, textColor, titleColor} from '../../../Color/color';
import EditIcon from '../../../../assets/SVG/svg/EditIcon';
import DeleteIcon from '../../../../assets/SVG/svg/DeleteIcon';
import Button from '../../../Components/Button';

const data = [
  {
    id: '1',
    address:
      'Plot No 1, 262, Westend Marg, Saiyad ul Ajaib, Sainik Farm New Delhi, Delhi 110030',
  },
  // Add more addresses as needed
];

const Address = ({navigation}) => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={{flexDirection: 'row'}}>
        <View style={{borderRightWidth: 1, paddingEnd: 5, paddingTop: 10}}>
          <LocationIcon size={25} color={PrivacyPolicy} />
        </View>
        <View>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{item.address}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Inconvenience')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <EditIcon size={12} color={'green'} />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Inconvenience')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <DeleteIcon size={20} color={'red'} />
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatlistContainer}
        showsVerticalScrollIndicator={false}
      />
      <View>
        <Button
          title={'Add New Address'}
          textStyle={styles.buttonTextStyle}
          style={styles.buttonstyle}
          touchStyle={styles.touchStyle}
          onPress={() => navigation.navigate('addAddress')}
        />
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  flatlistContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressContainer: {
    flex: 1,
    paddingStart: 10,
  },
  address: {
    fontSize: 16,
    color: titleColor,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editText: {
    fontSize: 14,
    color: 'green',
    marginLeft: 10,
  },
  actionText: {
    fontSize: 14,
    color: 'red',
    marginLeft: 5,
  },
  touchStyle: {
    marginVertical: 20,
    width: '60%',
    alignSelf: 'center',
  },
  buttonstyle: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: textColor,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
