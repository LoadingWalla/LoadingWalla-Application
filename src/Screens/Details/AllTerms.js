import {View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import styles from './style'

const AllTerms = ({navigation, route}) => {
  //   console.log("Route", route);
  const {headerTitle, uri} = route?.params;
  //   const INJECTED_JAVASCRIPT = `document.body.style.zoom = "1.0"; true;`;
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: uri}}
        style={styles.webview}
        // injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </View>
  );
};

export default AllTerms;
