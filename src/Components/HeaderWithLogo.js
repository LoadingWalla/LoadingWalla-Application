import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React from 'react';
import BackImage from '../../assets/newAssets/BackgroundImage2.png';
import LottieView from 'lottie-react-native';
import HeaderLogo from '../../assets/newAssets/HeaderLogo';

const {width, height} = Dimensions.get('window');

const HeaderWithLogo = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ImageBackground
        source={BackImage}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.logoContainer}>
          <View style={{flex: 0.2}} />
          <HeaderLogo height={60} width={300} />
        </View>
        <View style={styles.roadContainer}>
          <LottieView
            source={require('../../assets/newAssets/Header.json')}
            autoPlay
            loop={false}
            resizeMode="contain"
            style={styles.truckAnimation}
          />
        </View>
        <View style={{flex: 0.6}} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  subtitleText: {
    fontSize: 16,
    color: '#333',
  },
  roadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  truckAnimation: {
    width: width * 1,
    height: height * 0.4,
    position: 'absolute',
    bottom: -110,
  },
  bottomSectionPink: {
    flex: 1.5,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderWithLogo;
