import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CloseCircle from '../../../assets/SVG/svg/CloseCircle';
import {
  GradientColor2,
  pageBackground,
  textColor,
  titleColor,
} from '../../Color/color';
import * as Constants from '../../Constants/Constant';
import Button from '../../Components/Button';
import TextInputField from '../../Components/TextInputField';

const AddAddress = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      style={styles.fullScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.screenModalView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add New Address</Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}>
            <CloseCircle size={30} color={GradientColor2} />
          </TouchableOpacity>
        </View>
        <View style={styles.centeredView}>
          <TextInputField
            // value={}
            hint={'Enter Full Address'}
            // onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
          <Button
            title={'Save Changes'}
            textStyle={styles.saveText}
            style={styles.saveButton}
            // onPress={() => saveChanges()}
            // loading={statusChangeLoading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  screenModalView: {
    marginTop: '25%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: pageBackground,
    padding: 10,
    // borderWidth: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: titleColor,
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    color: titleColor,
  },
  centeredView: {
    flex: 1,
    marginTop: '15%',
    width: '100%',
    padding: 10,
  },
  activeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  activeText: {fontSize: 18, fontWeight: '700', color: '#352422'},
  saveText: {
    color: textColor,
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  saveButton: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center',
  },
});
