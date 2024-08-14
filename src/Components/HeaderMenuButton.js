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

const HeaderMenuButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionPress = option => {
    console.log(option);
    setModalVisible(false);
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
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleOptionPress('Option 1')}>
              <Text style={styles.menuText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              // onPress={() => navigation.navigate('GpsSetting', {deviceId})}
            >
              <Text style={styles.menuText}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleOptionPress('Option 3')}>
              <Text style={styles.menuText}>Geofencing</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-end',
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
});

export default HeaderMenuButton;
