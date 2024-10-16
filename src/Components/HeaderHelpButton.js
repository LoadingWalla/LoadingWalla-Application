import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeadPhoneIcon from '../../assets/SVG/svg/HeadPhoneIcon';
import {backgroundColorNew} from '../Color/color';
import ShareIcon from '../../assets/SVG/svg/ShareIcon';
import {useTranslation} from 'react-i18next';
import * as Constants from '../Constants/Constant';
import Share from 'react-native-share';
import styles from './style'

const HeaderHelpButton = ({shareIcon, navigation, latitude, longitude}) => {
  const {t} = useTranslation();
  const handleShare = () => {
    const shareOptions = {
      title: 'Share Location',
      message: `Check out this location: https://maps.google.com/?q=${latitude},${longitude}`,
    };

    Share.open(shareOptions)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.headerHelpcontainer}>
      {shareIcon ? (
        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <ShareIcon size={18} color={'#000000'} />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.headerHelpbtnContainer}
        onPress={() => navigation.navigate('Contactus')}>
        <HeadPhoneIcon
          size={15}
          style={styles.iconStyle}
          color={backgroundColorNew}
        />
        <Text style={styles.headerHelpbtnText}>{t(Constants.HELP)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderHelpButton;

// const styles = StyleSheet.create({
//   container: {flexDirection: 'row'},
//   btnContainer: {
//     // borderWidth: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 20,
//     elevation: 3,
//     backgroundColor: '#F7F7F7',
//   },
//   iconStyle: {marginRight: 5},
//   btnText: {
//     color: backgroundColorNew,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   shareBtn: {
//     // borderWidth: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//     borderRadius: 20,
//     padding: 5,
//     elevation: 3,
//     backgroundColor: '#F7F7F7',
//   },
// });
