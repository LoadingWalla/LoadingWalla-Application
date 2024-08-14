import React, {useRef, useEffect, useState} from 'react';
import {Animated, View, StyleSheet, Dimensions} from 'react-native';
import TextTicker from 'react-native-text-ticker';

const AnimatedText = ({text, style, showAnimation}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textWidth > screenWidth) {
      const startAnimation = () => {
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -textWidth,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: screenWidth,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start(() => startAnimation());
      };

      startAnimation();
    }
  }, [animatedValue, screenWidth, textWidth]);

  return (
    <View style={styles.container}>
      {showAnimation ? (
        <TextTicker
          style={[style]}
          duration={5000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}>
          {text}
        </TextTicker>
      ) : (
        <Animated.Text
          onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
          style={[style, {transform: [{translateX: animatedValue}]}]}
          numberOfLines={1}>
          {text}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    // maxWidth: 200,
    // borderWidth: 1,
  },
});

export default AnimatedText;
