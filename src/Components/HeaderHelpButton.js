import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeadPhoneIcon from '../../assets/SVG/svg/HeadPhoneIcon';
import {backgroundColorNew} from '../Color/color';
import ShareIcon from '../../assets/SVG/svg/ShareIcon';

const HeaderHelpButton = ({shareIcon, navigation}) => {
  return (
    <View style={styles.container}>
      {shareIcon ? (
        <TouchableOpacity style={styles.shareBtn}>
          <ShareIcon size={18} color={'#000000'} />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigation.navigate('Contactus')}>
        <HeadPhoneIcon
          size={15}
          style={styles.iconStyle}
          color={backgroundColorNew}
        />
        <Text style={styles.btnText}>Help?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderHelpButton;

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  btnContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#F7F7F7',
  },
  iconStyle: {marginRight: 5},
  btnText: {
    color: backgroundColorNew,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    textAlign: 'center',
  },
  shareBtn: {
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 20,
    padding: 5,
    elevation: 3,
    backgroundColor: '#F7F7F7',
  },
});
