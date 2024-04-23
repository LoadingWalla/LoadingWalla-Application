import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import * as Constants from '../../Constants/Constant';
import Button from '../../Components/Button';
import Background from '../../Components/BackgroundGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initLanguage} from '../../Store/Actions/Actions';
import {NetworkContext} from '../../Context/NetworkContext';
import NoInternetScreen from '../Details/NoInternetScreen';
import styles from './style';
import CheckCircle from '../../../assets/SVG/svg/CheckCircle';

const Language = ({navigation, route}) => {
  const [selected, setSelected] = useState(1);
  const {isConnected} = useContext(NetworkContext);
  const {params} = route;
  const dispatch = useDispatch();
  // const language = useSelector(state => state.language);

  const languages = [
    {
      id: 1,
      languageName: 'English',
      language: 'English',
      code: 'en',
      langId: 1,
    },
    {
      id: 2,
      languageName: 'Hindi',
      language: 'हिन्दी',
      code: 'hi',
      langId: 2,
    },
    {
      id: 3,
      languageName: 'Punjabi',
      language: 'ਪੰਜਾਬੀ',
      code: 'pn',
      langId: 3,
    },
    {
      id: 4,
      languageName: 'Gujrati',
      language: 'ગુજરાતી',
      code: 'gj',
      langId: 4,
    },
  ];

  useEffect(() => {
    const getLanguageId = async () => {
      let langId = await AsyncStorage.getItem('languageID');
      setSelected(langId || 1);
    };
    getLanguageId();
  }, []);

  const selectLanguage = async (data, index) => {
    setSelected(data?.langId);
    dispatch(initLanguage(data?.code, data?.langId));
    await AsyncStorage.setItem('languageID', JSON.stringify(data?.langId));
    await AsyncStorage.setItem('language', data?.code);
  };

  const languageData = data => (
    <>
      {selected === data?.id && (
        <CheckCircle style={styles.checkIconStyle} size={25} color="white" />
      )}

      <View>
        <Text
          style={[
            selected === data?.id ? styles.gridText : styles.gridGreyText,
            {fontSize: 16},
          ]}>
          {data?.languageName}
        </Text>
      </View>

      <Text
        style={selected === data?.id ? styles.gridText : styles.gridGreyText}>
        {data?.language}
      </Text>
    </>
  );

  const navigate = () => {
    if (params?.fromMenu) {
      navigation.goBack();
    } else {
      navigation.replace('Signup');
    }
  };

  const GridView = ({data, index}) => (
    <TouchableOpacity onPress={() => selectLanguage(data, index)}>
      {selected === data?.id ? (
        <Background style={styles.gridbox}>{languageData(data)}</Background>
      ) : (
        <View style={styles.gridGreyBox}>{languageData(data)}</View>
      )}
    </TouchableOpacity>
  );

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.part1}>
        <Text style={styles.languageTitle}>
          {Constants.SELECT_LANGUAGE_TITLE}
        </Text>
      </View>
      <View style={styles.part2}>
        <FlatList
          data={languages}
          renderItem={({item, index}) => <GridView data={item} index={index} />}
          numColumns={2}
        />
      </View>
      <View style={styles.part3}>
        <Button
          onPress={() => navigate()}
          title={Constants.CONTINUE}
          textStyle={styles.buttonTitile}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default Language;
