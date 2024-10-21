import React from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {GradientColor2} from '../Color/color';
import CloseCircle from '../../assets/SVG/svg/CloseCircle';
import styles from './style'

const Webview = ({showWebView, closeModal, uri}) => {
  return (
    <View style={styles.webView}>
      <Modal transparent={true} visible={showWebView}>
        <View style={styles.webmodal}>
          <View style={styles.modalContainer}>
            <View style={styles.alignItem}>
              <TouchableOpacity onPress={() => closeModal()}>
                <CloseCircle color={GradientColor2} size={30} />
              </TouchableOpacity>
            </View>
            <WebView style={styles.flex} source={{uri: uri}} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// const styles = StyleSheet.create({
//   modal: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContainer: {
//     backgroundColor: 'white',
//     width: '92%',
//     height: '92%',
//   },
//   flex: {flex: 1},
//   alignItem: {alignItems: 'flex-end'},
//   webView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
// });
export default Webview;
