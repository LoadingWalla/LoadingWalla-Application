import {StyleSheet, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';
import {pageBackground} from '../../../Color/color';

const AllTerms = ({navigation, route}) => {
  //   console.log("Route", route);
  const {uri} = route?.params;
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: pageBackground,
    flex: 1,
    padding: 10,
  },
  webview: {
    flex: 1,
    marginTop: 10,
  },
});
