import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import * as Constants from '../../Constants/Constant';
import Button from '../../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initLanguage} from '../../Store/Actions/Actions';
import styles from './style';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import EnglishIcon from '../../../assets/SVG/svg/EnglishIcon';
import HindiIcon from '../../../assets/SVG/svg/HindiIcon';
import HeaderWithLogo from '../../Components/HeaderWithLogo';
import GradientStatusBar from '../../Components/GradientStatusBar';
import OptionSelector from '../../Components/OptionSelector';
import HeaderTitleComponent from '../../Components/HeaderTitleComponent';

const Language = ({navigation, route}) => {
  useTrackScreenTime('Language');
  const {params} = route;
  const {t, i18n} = useTranslation();
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const languages = [
    {
      id: 1,
      languageName: <HindiIcon />,
      language: 'हिन्दी',
      code: 'hi',
      langId: 1,
    },
    {
      id: 2,
      languageName: <EnglishIcon />,
      language: 'English',
      code: 'en',
      langId: 2,
    },
  ];

  const getLanguageId = async () => {
    let langId = await AsyncStorage.getItem('languageID');
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
    if (!selected) {
      Toast.show(t('Please select a language before continuing.'), Toast.LONG);
    } else {
      if (params?.fromMenu) {
        navigation.goBack();
      } else {
        navigation.replace('Signup');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GradientStatusBar
        colors={[
          '#F7F7F7',
          '#F5F5F5',
          '#F4F4F4',
          '#F5F5F5',
          '#F3F3F3',
          '#F4F4F4',
          '#F5F5F5',
          '#F3F3F3',
          '#F4F4F4',
          '#F6F6F6',
          '#F7F7F7',
          '#FAFAFA',
          '#FBFBFB',
          '#FEFEFE',
        ]}
      />
      <View style={{flex: 1, zIndex: 1}}>
        <HeaderWithLogo
          path={require('../../../assets/newAssets/Header.json')}
        />
      </View>
      <View style={{flex: 2}}>
        <View
          style={{
            flex: 1,
            width: '85%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <HeaderTitleComponent
            text1={'नमस्ते | Hello'}
            text2={t(Constants.SELECT_LANGUAGE_TITLE)}
          />
          <View style={styles.part2}>
            <FlatList
              data={languages}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.columnWrapperStyle}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <OptionSelector
                  data={item}
                  index={index}
                  selected={selected}
                  onPress={selectLanguage}
                />
              )}
            />
          </View>
          {params?.fromMenu ? null : (
            <View style={styles.part3}>
              <Button
                onPress={() => navigate()}
                title={t(Constants.CONTINUE)}
                textStyle={styles.buttonTitile}
                style={styles.button}
                touchStyle={selected ? {opacity: 1} : {opacity: 0.5}}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Language;
