import React from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import styles from './style';
import * as Constants from '../../Constants/Constant';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {initDocumentVerification} from '../../Store/Actions/Actions';
import Button from '../../Components/Button';
import CheckCircle from '../../../assets/SVG/svg/CheckCircle';
import UploadIcon from '../../../assets/SVG/svg/UploadIcon';
import {useTranslation} from 'react-i18next';

const Verification = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

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
      title: t(Constants.AADHAAR_CARD),
      onPress: 'Card Details',
      status: getStatus('aadhar'),
    },
    {
      id: '2',
      title: t(Constants.PAN_CARD),
      onPress: 'Card Details',
      status: getStatus('pan'),
    },
    {
      id: '3',
      title: t(Constants.BUSSINESS_DETAILS),
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
            <View style={styles.circle(item.status)} />
            <Text style={styles.itemTitleTxt}>{item.title}</Text>
          </View>
          {item.status === 'Verified' ? (
            <CheckCircle size={30} color="green" strokeColor="#FFFFFF" />
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
                      : 'business',
                })
              }>
              <Text style={styles.uploadButtonText(item.status)}>
                {item.status === 'Rejected'
                  ? t(Constants.REUPLOAD)
                  : t(Constants.UPLOAD)}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={steps}
        renderItem={renderStep}
        keyExtractor={item => item.id}
      />

      <Button
        title={t(Constants.CONTINUE)}
        textStyle={styles.buttonTextStyle}
        style={styles.buttonstyle}
        onPress={() => navigation.navigate(t(Constants.MENU))}
      />
    </View>
  );
};

export default Verification;
