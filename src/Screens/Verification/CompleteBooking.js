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
  backgroundColorNew,
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
import UploadDocument from '../../../assets/SVG/svg/UploadDocument';
import CardHeader from '../../Components/CardHeader';

const CompleteBooking = ({navigation, route}) => {
  const {
    from,
    to,
    name,
    icon,
    material_name,
    qty,
    vehicle_number,
    price,
    price_type,
  } = route.params.item;
  const userType = route.params.userType;
  console.log(88888, route);
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
      <View
        style={{
          padding: 10,
          backgroundColor: '#FFFFFF',
          elevation: 2,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        <CardHeader from={from} to={to} icon={icon} />
        <View style={styles.horizontalLine} />
        <View style={styles.rowdirection}>
          <View style={styles.point} />
          <Text style={styles.smallImageHeaderTitle}>{name}</Text>
        </View>
        <View style={styles.rowdirection}>
          <View style={styles.point} />
          <Text style={styles.smallImageHeaderTitle}>
            {`₹ ${price} / ${price_type === 2 ? 'Fixed' : 'Per Truck'}`}
          </Text>
        </View>
        <View style={styles.horizontalLine} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textStyle}>Weight</Text>
            <Text style={styles.textStyle}>{`: ${qty} Ton`}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textStyle}>Type</Text>
            <Text style={styles.textStyle}>
              {`: ${userType === 2 ? vehicle_number : material_name}`}
            </Text>
          </View>
        </View>
      </View>
      <View
        // contentContainerStyle={{padding: 20, borderWidth: 1, flex: 1}}
        style={{padding: 20, flex: 1}}>
        <View style={{flex: 0.2}}>
          <Text style={styles.header}>Upload BILTY/POD</Text>
          <Text style={styles.subheader}>
            Confirm your delivery by uploading your BILTY / POD from load owner
          </Text>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              elevation: 2,
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 20,
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
            <TouchableOpacity style={styles.documentContainer}>
              <UploadDocument />
              <Text style={styles.filename}>Uploadedfilename.png</Text>
            </TouchableOpacity>
            <InnerButton
              enabledStyle={styles.findButtonContainer}
              textStyle={styles.findButtonText}
              title={'Upload'}
              navigation={() => {}}
            />
          </View>
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
              I agree the{' '}
              <Text
                style={{
                  color: backgroundColorNew,
                  textDecorationLine: 'underline',
                }}>
                terms & conditions
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={styles.completeOrderButton}
            onPress={completeOrder}>
            <Text style={styles.completeOrderButtonText}>Complete order</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  completeOrderButtonText: {
    color: 'white',
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
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
  centerItem: {
    // alignItems: 'center',
    justifyContent: 'center',
    flex: 0.2,
    // borderWidth: 1,
    bottom: 0,
  },
  checkBoxContainer: {flexDirection: 'row', alignItems: 'center'},
  checkBoxStyle: {marginRight: 10},
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  rowdirection: {flexDirection: 'row', alignItems: 'center'},
  point: {
    height: 8,
    width: 8,
    backgroundColor: PrivacyPolicy,
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  smallImageHeaderTitle: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  textStyle: {
    color: '#352422',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
