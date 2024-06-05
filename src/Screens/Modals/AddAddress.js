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
      <View style={styles.centeredView}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            Name
          </Text>
          <TextInputField
            // value={}
            hint={'Enter Full Address'}
            // onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            To Location
          </Text>
          <TextInputField
            // value={}
            hint={'Enter Full Address'}
            // onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: 'black',
              fontFamily: 'PlusJakartaSans-Bold',
            }}>
            Full Address
          </Text>
          <TextInputField
            // value={}
            hint={'Enter Full Address'}
            // onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //   borderWidth: 1,
          }}>
          <View style={{minWidth: '48%'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'PlusJakartaSans-Bold',
              }}>
              City
            </Text>
            <TextInputField
              hint={'Enter City Name'}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View>
          <View style={{minWidth: '48%'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'PlusJakartaSans-Bold',
              }}>
              State
            </Text>
            <TextInputField
              hint={'Enter State Name'}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            //   borderWidth: 1,
          }}>
          <View style={{minWidth: '48%'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'PlusJakartaSans-Bold',
              }}>
              City
            </Text>
            <TextInputField
              hint={'Enter City Name'}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View>
          <View style={{minWidth: '48%'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontFamily: 'PlusJakartaSans-Bold',
              }}>
              State
            </Text>
            <TextInputField
              hint={'Enter State Name'}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View>
        </View>
        <Button
          title={'Save Changes'}
          textStyle={styles.saveText}
          style={styles.saveButton}
          onPress={() => navigation.navigate('Inconvenience')}
          // loading={statusChangeLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  centeredView: {
    // flex: 1,
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
