import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Button from '../../Components/Button';
import {
  GradientColor2,
  GradientColor3,
  GradientColor4,
  PrivacyPolicy,
  textColor,
  titleColor,
  white,
} from '../../Color/color';
import FindLoadHeader from '../../Components/FindLoadHeader';
import RadioButton from '../../Components/RadioButton';
import InnerButton from '../../Components/InnerButton';
import CheckBox from '@react-native-community/checkbox';
import * as Constants from '../../Constants/Constant';
import {uriTermsCondition2, uriTermsCondition3} from '../../Utils/Url';

const CompleteBooking = ({navigation}) => {
  const [selectedDocument, setSelectedDocument] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const toggleTerms = () => setTermsAccepted(previousState => !previousState);

  const completeOrder = () => {
    if (!termsAccepted) {
      Alert.alert(
        'Terms Required',
        'You must accept the terms and conditions to complete the order.',
      );
      return;
    }
    // Proceed with the order completion
    Alert.alert(
      'Order Completed',
      'Your order has been successfully submitted.',
    );
  };

  return (
    <View style={styles.container}>
      <FindLoadHeader
        goBack={() => navigation.goBack()}
        from={'Goa'}
        to={'Goa'}
        // icon={require('../../../assets/placeholder.png')}
        // fullPrice={
        //   userType === '2'
        //     ? Owner?.vehicle_number
        //     : `₹ ${Owner?.price} / ${
        //         Owner?.price_type === '1' ? 'Per Truck' : 'Fixed'
        //       }`
        // }
        userType={1}
        // permit={Owner?.permit}
        // navigation={navigation}
        // material_name={Owner?.material_name}
        // qty={`${Owner?.qty} Ton`}
        // id={Owner?.truck_id}
      />
      <ScrollView contentContainerStyle={{padding: 20}}>
        <View>
          <Text style={styles.header}>Upload BILTY/POD</Text>
          <Text style={styles.subheader}>
            Confirm your delivery by uploading your BILTY / POD from load owner
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            elevation: 2,
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
          }}>
          <View style={styles.selectorContainer}>
            <Text style={styles.headerText}>Select document to Upload</Text>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                label="BILTY"
                onPress={() => setSelectedDocument(1)}
                selected={selectedDocument === 1}
                OuterCircleSize={18}
                InnerCircleSize={9}
                font={14}
              />
              <RadioButton
                label="POD"
                onPress={() => setSelectedDocument(0)}
                selected={selectedDocument === 0}
                OuterCircleSize={18}
                InnerCircleSize={9}
                font={14}
              />
            </View>
          </View>

          <View style={styles.documentContainer}>
            <Image
              source={require('../../../assets/placeholder.png')}
              style={styles.documentImage}
            />
            <Text style={styles.filename}>Uploadedfilename.png</Text>
          </View>

          <InnerButton
            enabledStyle={styles.findButtonContainer}
            textStyle={styles.findButtonText}
            title={'Upload'}
            navigation={() => {}}
          />
        </View>
        <View style={styles.centerItem}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={handleCheckBoxChange}
              tintColors={{true: GradientColor2, false: GradientColor4}}
              style={styles.checkBoxStyle}
            />
            <Text style={{color: PrivacyPolicy}}>
              {Constants.WHATSAPP_ALERT_CHECK}
            </Text>
          </View>
          <Text style={styles.policyTitle}>
            {Constants.TERMS_CONDITION_TITLE1}{' '}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Legal Policies', {
                  headerTitle: 'Terms and Conditions',
                  uri: uriTermsCondition3,
                });
              }}>
              <Text style={[styles.policyLinkTitle(true)]}>
                {Constants.TERMS_CONDITION_TITLE2}{' '}
              </Text>
            </TouchableOpacity>
            <Text> {' and '} </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Legal Policies', {
                  headerTitle: 'Terms and Conditions',
                  uri: uriTermsCondition2,
                });
              }}>
              <Text style={[styles.policyLinkTitle(true)]}>
                {Constants.TERMS_CONDITION_TITLE3}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* <View>
          <TouchableOpacity style={styles.termsContainer} onPress={toggleTerms}>
            <Text style={styles.termsText}>{termsAccepted ? '✓' : '○'}</Text>
            <Text style={styles.termsLabel}>
              I agree the terms & conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.completeOrderButton}
            onPress={completeOrder}>
            <Text style={styles.completeOrderButtonText}>Complete order</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

export default CompleteBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFD',
  },
  subheader: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
    fontFamily: 'PlusJakartaSans-Medium',
    textAlign: 'center',
  },
  selectorContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    // borderWidth: 1,
  },
  header: {
    flex: 1,
    fontSize: 14,
    color: titleColor,
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    paddingRight: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: titleColor,
    marginBottom: 8,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'left',
    paddingRight: 5,
  },
  radioButtonContainer: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginStart: 5,
  },
  documentContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  documentImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  filename: {
    fontSize: 16,
    color: 'black',
  },
  uploadButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    fontSize: 20,
    marginRight: 10,
  },
  termsLabel: {
    fontSize: 16,
  },
  completeOrderButton: {
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  completeOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  findButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
    width: 100,
    alignItems: 'center',
    alignSelf: 'center',
  },
  findButtonText: {
    fontSize: 13,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
