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
// import NetInfo from '@react-native-community/netinfo';
// import axios from 'axios';

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
  const {params} = route;
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

  // useEffect(() => {
  //   const unsubscribe = NetInfo.addEventListener(state => {
  //     console.log(4444, state);
  //     // setIsConnected(state.isConnected);
  //   });

  //   // Clean up the subscription
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await fetch('https://loadingwalla.com/api/gps-plans');
  //       const response = await fetch('https://fakestoreapi.com/products');
  //       const json = await response.json();
  //       console.log(9999999, json);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://loadingwalla.com/api/gps-plans', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const json = await response.json();
  //       console.log('Data:', json);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       console.log('Error details:', {
  //         message: error.message,
  //         stack: error.stack,
  //         name: error.name,
  //       });
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://loadingwalla.com/api/login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({mobile: '+918800899875'}),
  //       });
  //       const json = await response.json();
  //       console.log(555555, json);
  //     } catch (error) {
  //       console.error('Error fetching data2222:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
