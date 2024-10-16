import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import MenuThreeDot from '../../assets/SVG/svg/MenuThreeDot';
import Share from 'react-native-share';
import styles from './style'

const HeaderMenuButton = ({
  navigation,
  latitude,
  longitude,
  deviceId,
  name,
}) => {
  // console.log(333333, latitude, longitude, deviceId);

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleShare = () => {
    const shareOptions = {
      title: 'Share Location',
      message: `Check out this location: https://maps.google.com/?q=${latitude},${longitude}`,
    };

    Share.open(shareOptions)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <MenuThreeDot size={20} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={toggleModal}>
        <Pressable style={styles.modalOverlay} onPress={toggleModal}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
              <Text style={styles.menuText}>Share</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('GpsSetting', {deviceId})}>
              <Text style={styles.menuText}>Setting</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.headermenuItem}
              onPress={() =>
                navigation.navigate('geofencing', {
                  deviceId,
                  lat: latitude,
                  long: longitude,
                  name: name,
                })
              }>
              <Text style={styles.menuText}>Geofencing</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     // backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     // justifyContent: 'flex-start',
//     // alignItems: 'flex-end',
//   },
//   menu: {
//     position: 'absolute',
//     top: 50,
//     right: 0,
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   menuItem: {
//     paddingVertical: 10,
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#000',
//   },
// });

export default HeaderMenuButton;
