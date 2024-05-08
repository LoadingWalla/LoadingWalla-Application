import React, {useContext} from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import styles from './style';
import * as Constants from '../../Constants/Constant';
import {useFocusEffect} from '@react-navigation/native';
import {NetworkContext} from '../../Context/NetworkContext';
import {useDispatch, useSelector} from 'react-redux';
import {initDocumentVerification} from '../../Store/Actions/Actions';
import {titleColor} from '../../Color/color';
import NoInternetScreen from '../Details/NoInternetScreen';
import Button from '../../Components/Button';
import CheckCircle from '../../../assets/SVG/svg/CheckCircle';
import UploadIcon from '../../../assets/SVG/svg/UploadIcon';

const Verification = ({navigation, route}) => {
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const {getDocumentData, getDocumentLoading, getDocumentStatus} = useSelector(
    state => {
      // console.log("confirmation987", state.data);
      return state.data;
    },
  );

  const getStatus = documentType => {
    const document = getDocumentData.find(
      doc => doc.document_type === documentType,
    );
    switch (document?.status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Verified';
      case 2:
        return 'Rejected';
      default:
        return 'Not Verified';
    }
  };

  const steps = [
    {
      id: '1',
      title: 'Aadhaar Card',
      onPress: 'Card Details',
      status: getStatus('adhaar_card'),
    },
    {
      id: '2',
      title: 'PAN Card',
      onPress: 'Card Details',
      status: getStatus('pan_card'),
    },
    {
      id: '3',
      title: 'GSTIN Details',
      onPress: 'Card Details',
      status: getStatus('gst'),
    },
  ];

  const navigateToStep = (stepScreen, title, from) => {
    navigation.navigate(stepScreen, {title, from});
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(initDocumentVerification());
    }, [dispatch]),
  );

  const renderStep = ({item, index}) => {
    return (
      <View>
        <View style={styles.stepContainer}>
          <View style={styles.circleContainer}>
            <View style={styles.circle(item.status)}></View>
            <Text style={{color: titleColor, fontSize: 18, marginLeft: 8}}>
              {item.title}
            </Text>
          </View>
          {item.status === 'Verified' ? (
            <CheckCircle size={30} color="green" />
          ) : (
            <TouchableOpacity
              style={styles.uploadButton(item.status)}
              disabled={item.status === 'Pending'}
              onPress={() =>
                navigateToStep(item.onPress, item.title, {
                  from:
                    item.id === '1'
                      ? 'fromAadhar'
                      : item.id === '2'
                      ? 'fromPan'
                      : 'fromGst',
                })
              }>
              <Text style={styles.uploadButtonText(item.status)}>
                {item.status === 'Rejected' ? 'Re Upload' : 'Upload'}
              </Text>
              <UploadIcon
                size={20}
                color={item?.status === 'Pending' ? '#ccc' : '#d73b29'}
              />
            </TouchableOpacity>
          )}
        </View>
        {index !== steps.length - 1 && (
          <View style={styles.line(item.status)} />
        )}
      </View>
    );
  };

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        renderItem={renderStep}
        keyExtractor={item => item.id}
      />

      <Button
        title="Done"
        textStyle={styles.buttonTextStyle}
        style={styles.buttonstyle}
        onPress={() => navigation.navigate(Constants.PROFILE)}
      />
    </View>
  );
};

export default Verification;
