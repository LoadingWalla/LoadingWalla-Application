import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Button from '../../Components/Button';
import TextInputField from '../../Components/TextInputField';
import styles from './style';

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
