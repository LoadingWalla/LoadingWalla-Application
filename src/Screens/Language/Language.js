import React, {useEffect, useState} from 'react';
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
import styles from './style';
import CheckCircle from '../../../assets/SVG/svg/CheckCircle';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';

const GridView = ({data, index, selected, onPress}) => (
  <TouchableOpacity onPress={() => onPress(data, index)}>
    {selected === data?.id ? (
      <Background style={styles.gridbox}>
        <CheckCircle style={styles.checkIconStyle} size={25} color="white" />
        <View>
          <Text style={[styles.gridText]}>{data?.languageName}</Text>
        </View>
        <Text style={styles.gridText}>{data?.language}</Text>
      </Background>
    ) : (
      <View style={styles.gridGreyBox}>
        <View>
          <Text style={[styles.gridGreyText]}>{data?.languageName}</Text>
        </View>
        <Text style={styles.gridGreyText}>{data?.language}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const Language = ({navigation, route}) => {
  useTrackScreenTime('Language');

  const {params} = route;
  console.log('Language Screen ', route);

  const {t, i18n} = useTranslation();
  const [selected, setSelected] = useState(1);
  const dispatch = useDispatch();

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
    // {
    //   id: 3,
    //   languageName: 'Punjabi',
    //   language: 'ਪੰਜਾਬੀ',
    //   code: 'pn',
    //   langId: 3,
    // },
    // {
    //   id: 4,
    //   languageName: 'Gujrati',
    //   language: 'ગુજરાતી',
    //   code: 'gj',
    //   langId: 4,
    // },
  ];

  const getLanguageId = async () => {
    let langId = await AsyncStorage.getItem('languageID');
    // console.log(8888, JSON.parse(langId), langId);
    setSelected(JSON.parse(langId));
  };

  useEffect(() => {
    getLanguageId();
  }, []);

  const selectLanguage = async data => {
    setSelected(data?.langId);
    i18n.changeLanguage(data.code);
    if (route?.params?.fromMenu) {
      dispatch(initLanguage(data?.code, data?.langId));
    }
    await AsyncStorage.setItem('languageID', JSON.stringify(data?.langId));
    await AsyncStorage.setItem('language', data?.code);
  };

  const navigate = () => {
    if (params?.fromMenu) {
      navigation.goBack();
      // navigation.navigate('Menu');
    } else {
      navigation.replace('Signup');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.part1}>
        <Text style={styles.languageTitle}>
          {t(Constants.SELECT_LANGUAGE_TITLE)}
        </Text>
      </View>
      <View style={styles.part2}>
        <FlatList
          data={languages}
          renderItem={({item, index}) => (
            <GridView
              data={item}
              index={index}
              selected={selected}
              onPress={selectLanguage}
            />
          )}
          numColumns={2}
        />
      </View>
      {params?.fromMenu ? null : (
        <View style={styles.part3}>
          <Button
            onPress={() => navigate()}
            title={t(Constants.CONTINUE)}
            textStyle={styles.buttonTitile}
            style={styles.button}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Language;
