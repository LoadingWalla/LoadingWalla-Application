import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import * as Constants from '../../Constants/Constant';
import Button from '../../Components/Button';
import Background from '../../Components/BackgroundGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initLanguage} from '../../Store/Actions/Actions';
import styles from './style';
import {useTranslation} from 'react-i18next';
import useTrackScreenTime from '../../hooks/useTrackScreenTime';
import EnglishIcon from '../../../assets/SVG/svg/EnglishIcon';
import HindiIcon from '../../../assets/SVG/svg/HindiIcon';
import OkSvg from '../../../assets/SVG/svg/OkSvg';
import HeaderWithLogo from '../../Components/HeaderWithLogo';

const GridView = ({data, index, selected, onPress}) => (
  <TouchableOpacity onPress={() => onPress(data, index)}>
    {selected === data?.id ? (
      <Background style={styles.gridbox} bgcolors={['white', 'white']}>
        <OkSvg style={styles.checkIconStyle} />
        <View
          style={{
            // paddingBottom: 2,
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'red',
            height: '90%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
              // borderWidth: 1,
              // borderColor: 'blue',
              height: '70%',
              width: '100%',
            }}>
            <Text style={[styles.gridText]}>{data?.languageName}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: '#FAFAFA',
              // backgroundColor: 'red',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              height: '30%',
              // borderWidth: 1,
              width: '98%',
            }}>
            <Text style={styles.gridText}>{data?.language}</Text>
          </View>
        </View>
      </Background>
    ) : (
      <View style={styles.gridGreyBox}>
        <View
          style={{
            // paddingVertical: 2,
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'red',
            height: '90%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              justifyContent: 'center',
              // borderWidth: 1,
              // borderColor: 'blue',
              height: '70%',
              width: '100%',
            }}>
            <Text style={[styles.gridGreyText]}>{data?.languageName}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              // backgroundColor: 'red',
              backgroundColor: '#FAFAFA',
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              height: '30%',
              // borderWidth: 1,
              width: '100%',
            }}>
            <Text style={styles.gridGreyText}>{data?.language}</Text>
          </View>
        </View>
      </View>
    )}
  </TouchableOpacity>
);

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
    // {
    //   id: 3,
    //   languageName: <HindiIcon />,
    //   language: 'हिन्दी',
    //   code: 'hi',
    //   langId: 1,
    // },
    // {
    //   id: 4,
    //   languageName: <EnglishIcon />,
    //   language: 'English',
    //   code: 'en',
    //   langId: 2,
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

  // const navigate = () => {
  //   if (params?.fromMenu) {
  //     navigation.goBack();
  //     // navigation.navigate('Menu');
  //   } else {
  //     navigation.replace('Signup');
  //   }
  // };

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
      <View style={{flex: 1, zIndex: 1}}>
        <HeaderWithLogo />
      </View>
      <View style={{flex: 2}}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'pink',
            width: '85%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View style={styles.part1}>
            <View>
              <Text
                style={{
                  color: '#F50000',
                  fontSize: 16,
                  fontFamily: 'PlusJakartaSans-SemiBold',
                  // borderWidth: 1,
                }}>
                नमस्ते | Hello
              </Text>
            </View>
            <View>
              <Text style={styles.languageTitle}>
                {t(Constants.SELECT_LANGUAGE_TITLE)}
              </Text>
            </View>
          </View>
          <View style={styles.part2}>
            <FlatList
              data={languages}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{
                justifyContent: 'space-around',
                alignItems: 'center',
                // borderWidth: 1,
                width: '100%',
                marginBottom: 30,
              }}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <GridView
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
