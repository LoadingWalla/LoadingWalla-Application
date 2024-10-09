import React from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import LocationIcon from '../../../../assets/SVG/svg/LocationIcon';
import {PrivacyPolicy} from '../../../Color/color';
import EditIcon from '../../../../assets/SVG/svg/EditIcon';
import DeleteIcon from '../../../../assets/SVG/svg/DeleteIcon';
import Button from '../../../Components/Button';
import {useTranslation} from 'react-i18next';
import styles from './style'
import * as Constants from '../../../Constants/Constant';

const data = [
  // {
  //   id: '1',
  //   address:
  //     'Plot No 1, 262, Westend Marg, Saiyad ul Ajaib, Sainik Farm New Delhi, Delhi 110030',
  // },
  // {
  //   id: '2',
  //   address:
  //     'Plot No 1, 262, Westend Marg, Saiyad ul Ajaib, Sainik Farm New Delhi, Delhi 110030',
  // },
  // Add more addresses as needed
];

const Address = ({navigation}) => {
  const {t} = useTranslation();

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <LocationIcon size={25} color={PrivacyPolicy} />
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Inconvenience')}
            style={styles.actionBtns}>
            <EditIcon size={10} color={'green'} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Inconvenience')}
            style={styles.actionBtns}>
            <DeleteIcon size={15} color={'red'} />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noAddressContainer}>
          <Text style={styles.noAddressText}>{t(Constants.NO_ADDR_FOUND)}</Text>
        </View>
      )}
      <Button
        title={t(Constants.ADD_NEW_ADDR)}
        textStyle={styles.buttonTextStyle}
        style={styles.buttonStyle}
        touchStyle={styles.touchStyle}
        onPress={() => navigation.navigate('addAddress')}
      />
    </View>
  );
};

export default Address;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FDFDFD',
//   },
//   flatListContainer: {
//     padding: 10,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 5,
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     elevation: 2,
//     flexDirection: 'row',
//   },
//   addressContainer: {
//     flex: 1,
//     paddingStart: 10,
//   },
//   address: {
//     fontSize: 12,
//     color: titleColor,
//     marginTop: 4,
//     fontFamily: 'PlusJakartaSans-Medium',
//     lineHeight: 18,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
//   editText: {
//     fontSize: 12,
//     color: 'green',
//     marginLeft: 10,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   actionText: {
//     fontSize: 12,
//     color: 'red',
//     marginLeft: 5,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   touchStyle: {
//     marginVertical: 20,
//     width: '60%',
//     alignSelf: 'center',
//   },
//   buttonStyle: {
//     flexDirection: 'row',
//     borderRadius: 8,
//     padding: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonTextStyle: {
//     color: textColor,
//     fontWeight: '700',
//     fontSize: 16,
//     textAlign: 'center',
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   iconBox: {
//     borderRightWidth: 2,
//     paddingEnd: 5,
//     paddingTop: 10,
//     borderColor: '#707070',
//     justifyContent: 'flex-start',
//   },
//   actionBtns: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//     justifyContent: 'center',
//   },
//   noAddressContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noAddressText: {
//     fontSize: 16,
//     color: titleColor,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   flexContainer: {
//     flex: 1,
//   },
// });
