import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';

const ToggleIconText = ({
  IconComponent,
  text,
  iconSize,
  index,
  activeIndex,
  onPress,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: activeIndex === index ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, index, opacity]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <IconComponent size={iconSize} />
      {activeIndex === index && (
        <Animated.View style={{opacity}}>
          <Text style={styles.hiddenText}>{text}</Text>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenText: {
    marginLeft: 5,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});

export default ToggleIconText;
