import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';

const ButtonComponent = ({
  icon: Icon,
  label,
  onPress,
  dynamicTitleColor,
  dynamicTitle,
  color = '#ff7753',
  size,
  bgcolor = 'white',
}) => (
  <TouchableOpacity style={styles.button(bgcolor)} onPress={onPress}>
    <Icon size={size} color={color} />
    {/* <View style={{marginTop: 2}}>
      <Text></Text>
    </View> */}
    <Text style={styles.buttonText}>
      {label}
      <Text style={{color: dynamicTitleColor}}>{dynamicTitle}</Text>
    </Text>
  </TouchableOpacity>
);

export default ButtonComponent;
