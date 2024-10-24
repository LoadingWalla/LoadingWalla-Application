import {Text, TouchableOpacity} from 'react-native';
import styles from './style'

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
    <Text style={styles.buttonText}>
      {label}
      <Text style={{color: dynamicTitleColor}}>{dynamicTitle}</Text>
    </Text>
  </TouchableOpacity>
);

export default ButtonComponent;