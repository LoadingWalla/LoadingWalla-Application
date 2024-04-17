import {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const useHandleBackButton = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const onBackPress = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to close the app?', [
          {
            text: 'NO',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, [navigation]);
};

export default useHandleBackButton;
