import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {textColor, titleColor} from '../../Color/color';
import Button from '../../Components/Button';
import TextInputField from '../../Components/TextInputField';

const AddAddress = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      style={styles.fullScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.centeredView}
        showsVerticalScrollIndicator={false}>
        {/* <View>
          <Text style={styles.titleText}>Name</Text>
          <TextInputField
            hint={'Enter Full Address'}
            // value={}
            // onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
        </View> */}
        {/* <View>
          <Text style={styles.titleText}>To Location</Text>
          <TextInputField
            hint={'Enter Full Address'}
            // value={}
            // onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
        </View> */}
        <View>
          <Text style={styles.titleText}>Full Address</Text>
          <TextInputField
            hint={'Enter Full Address'}
            // value={}
            // onChangeText={e => onChangeEmail(e)}
            // placeholderTextColor={PrivacyPolicy}
          />
        </View>
        <View style={styles.multipleInputBox}>
          <View style={styles.multipleInputContainer}>
            <Text style={styles.titleText}>City</Text>
            <TextInputField
              hint={'Enter City Name'}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View>
          <View style={styles.multipleInputContainer}>
            <Text style={styles.titleText}>State</Text>
            <TextInputField
              hint={'Enter State Name'}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View>
        </View>
        <View style={styles.multipleInputBox}>
          <View style={styles.multipleInputContainer}>
            <Text style={styles.titleText}>PIN Code</Text>
            <TextInputField
              hint={'Enter PIN Code'}
              isPhone={true}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View>
          {/* <View style={styles.multipleInputContainer}>
            <Text style={styles.titleText}>State</Text>
            <TextInputField
              hint={'Enter State Name'}
              // value={}
              // onChangeText={e => onChangeEmail(e)}
              // placeholderTextColor={PrivacyPolicy}
            />
          </View> */}
        </View>
        <Button
          title={'Save Changes'}
          textStyle={styles.saveText}
          style={styles.saveButton}
          onPress={() => navigation.navigate('Inconvenience')}
          // loading={statusChangeLoading}
        />
      </ScrollView>
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
    // borderWidth: 1,
  },
  centeredView: {
    flex: 1,
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
  titleText: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  multipleInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //   borderWidth: 1,
  },
  multipleInputContainer: {minWidth: '48%'},
});
