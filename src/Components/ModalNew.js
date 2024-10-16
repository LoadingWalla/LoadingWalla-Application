import React, {useState, useRef} from 'react';
import {Dimensions, StyleSheet, View, Text, PanResponder} from 'react-native';
import Modal from 'react-native-modal';
import * as Constants from '../Constants/Constant';
import styles from './style';

const ModalNew = ({isVisible, onClose, onBackdropPress, item}) => {
  const screenHeight = Dimensions.get('window').height;
  const [isFullScreen, setIsFullScreen] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < -100) {
          // if swiped up more than 100 units
          setIsFullScreen(true);
        } else if (gestureState.dy > 100 && isFullScreen) {
          // if swiped down more than 100 units and isFullScreen
          setIsFullScreen(false);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 200 && !isFullScreen) {
          // if swiped down more than 200 units and not isFullScreen
          onCloseModal();
        }
      },
    }),
  ).current;

  const onCloseModal = () => {
    setIsFullScreen(false);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onBackdropPress}
      style={isFullScreen ? styles.fullScreenModal : styles.modal}
      backdropOpacity={0}
      {...panResponder.panHandlers}>
      <View
        style={[
          styles.modalContent,
          {
            height: isFullScreen ? screenHeight : (2 / 4) * screenHeight,
            top: isFullScreen ? screenHeight - (3.5 / 4) * screenHeight : 0,
            // borderTopRightRadius: isFullScreen ? 0 : 25,
            // borderTopLeftRadius: isFullScreen ? 0 : 25,
          },
        ]}>
        <View style={styles.modalTopLine} />
        <View style={{padding: 10}}>
          <View style={{marginVertical: 10}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={{minWidth: 50}}>{Constants.FROM}</Text>
              <View style={{flex: 1}}>
                <Text style={styles.modaltextStyle}>: {item.item.from}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{minWidth: 50}}>{Constants.TO}</Text>
              <View style={{flex: 1}}>
                <Text style={styles.modaltextStyle}>: {item.item.to}</Text>
              </View>
            </View>
          </View>

          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 16, color: '#352422', fontWeight: 'bold'}}>
              Lorry Detail
            </Text>
            <View
              style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
              <Text style={{minWidth: 120}}>Lorry Owner Name</Text>
              <View style={{flex: 1}}>
                <Text style={styles.modaltextStyle}>: {item.item.lorryOwner}</Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
              <Text style={{minWidth: 120}}>Lorry Number</Text>
              <View style={{flex: 1}}>
                <Text style={styles.modaltextStyle}>
                  : {item.item.vehicle_number}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 4}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{minWidth: 40}}>{Constants.CAPACITY}</Text>
                  <Text style={styles.modaltextStyle}>: 2000 Ton</Text>
                </View>
              </View>
              <View style={{flex: 3}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{minWidth: 40}}>Truck Type</Text>
                  <Text style={styles.modaltextStyle}>: 6 Tyer/Half</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 16, color: '#352422', fontWeight: 'bold'}}>
              Load Detail
            </Text>
            <View
              style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
              <Text style={{minWidth: 120}}>Load Owner Name</Text>
              <View style={{flex: 1}}>
                <Text style={styles.modaltextStyle}>: {item.item.name}</Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', marginTop: 10, flexWrap: 'wrap'}}>
              <Text style={{minWidth: 120}}>Load Name</Text>
              <View style={{flex: 1}}>
                <Text style={styles.modaltextStyle}>
                  : {item.item.material_name}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{flex: 4}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{minWidth: 40}}>{Constants.QUANTITY}</Text>
                  <Text style={styles.modaltextStyle}>: {item.item.qty} Ton</Text>
                </View>
              </View>
              <View style={{flex: 3}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{minWidth: 40}}>{Constants.PRICE}</Text>
                  <Text style={styles.modaltextStyle}>
                    : {item.item.price}
                    {'/'}
                    {item.item.price_type === 2 ? 'Fixed' : 'Per Truck'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   modal: {
//     position: 'absolute',
//     bottom: 0,
//     top: '50%',
//     width: '100%',
//     margin: 0,
//   },
//   fullScreenModal: {
//     flex: 1,
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     // justifyContent: "space-between",
//     // alignItems: "center",
//     borderTopRightRadius: 25,
//     borderTopLeftRadius: 25,
//   },
//   modalTopLine: {
//     height: 5,
//     backgroundColor: '#E2E2E2',
//     width: '30%',
//     position: 'absolute',
//     borderRadius: 50,
//     top: 0,
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
//   modalBottom: {
//     width: '100%',
//     position: 'absolute',
//     bottom: 10,
//   },
//   textStyle: {
//     color: '#352422',
//     fontSize: 14,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     // alignSelf: "center",
//     // flex: 1,
//   },
// });

export default ModalNew;
