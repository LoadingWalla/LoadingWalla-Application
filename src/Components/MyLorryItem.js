import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import * as Constants from '../Constants/Constant';
import InnerButton from './InnerButton';
import {
  GradientColor2,
  GradientColor3,
  PrivacyPolicy,
  titleColor,
  white,
} from '../Color/color';
import EditIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckIcon from 'react-native-vector-icons/SimpleLineIcons';
import CardHeader from './CardHeader';
import ShowPermitModal from './ShowPermitModal';

const MyLorryItem = ({item, userType, t, openStatusModal, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const priceType =
    item?.price_type === 1 ? t(Constants.FIXED) : t(Constants.PER_TON);
  const ac_time = userType === '2' ? item?.updated : false;

  return (
    <View style={styles.card}>
      <CardHeader from={item?.from} to={item?.to} icon={item?.icon} />
      <View style={styles.horizontalLine} />
      <View>
        <View style={styles.rowdirection}>
          <View style={styles.point} />
          <Text style={styles.smallImageHeaderTitle}>
            {userType === '1' ? 'Name from Api' : item?.vehicle_number}
          </Text>
        </View>
        <View style={styles.locationInfo}>
          <View style={styles.rowdirection}>
            <View style={styles.point} />
            {userType === '2' ? (
              <TouchableOpacity
                style={styles.rowdirection}
                onPress={() => setModalVisible(true)}>
                <Text
                  style={[
                    styles.smallImageHeaderTitle,
                    {color: '#0076FF', textDecorationLine: 'underline'},
                  ]}>
                  {`${item?.permit.length} Permit Location`}
                </Text>
                <EditIcon name="chevron-right" size={15} color={'#0076FF'} />
                <ShowPermitModal
                  permit={item?.permit}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              </TouchableOpacity>
            ) : (
              <Text style={styles.smallImageHeaderTitle}>
                {`₹ ${item?.price} / ${priceType}`}
              </Text>
            )}
          </View>
          {userType === '2' ? (
            <TouchableOpacity
              style={styles.verifyTruck}
              onPress={() => navigation.navigate('RC', {title: 'RC Number'})}>
              <CheckIcon name="shield" size={15} color={GradientColor2} />
              <Text style={styles.dashboardHeaderVerifiedTitle}>
                Verify Truck
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={[styles.rowdirection, {justifyContent: 'center'}]}>
        <Text style={styles.textStyle}>
          {userType === '1' ? item?.qty + 'Ton' : item?.truck_capacity}
        </Text>
        <View style={styles.verticalLine} />
        <Text style={styles.textStyle}>
          {userType === '1' ? `${item?.material_name}` : item?.wheel}
        </Text>
        {userType === '1' ? (
          ''
        ) : (
          <>
            <View style={styles.verticalLine} />
            <Text style={styles.textStyle}>{`${item?.truck_type} Body`}</Text>
          </>
        )}
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.locationInfo}>
        <TouchableOpacity
          style={[
            styles.editButtonStyle,
            {borderColor: item.status === 1 ? '#56CA6F' : '#d73b29'},
          ]}
          onPress={() => openStatusModal(item)}>
          <Text
            style={[
              styles.editButtonText,
              {color: item.status === 1 ? '#56CA6F' : '#d73b29'},
            ]}>
            {t(Constants.EDIT)}
          </Text>
          <EditIcon
            name="pencil"
            size={15}
            color={item.status === 1 ? '#56CA6F' : '#d73b29'}
          />
        </TouchableOpacity>
        <View style={styles.rowdirection}>
          <InnerButton
            enabledStyle={styles.requestButtonContainer}
            disabledStyle={styles.requestButtonContainerDisabled}
            textStyle={styles.gradientButtonText}
            disableTextStyle={styles.disabledText}
            title={t(Constants.REQUEST)}
            count={item?.total_request}
            disabled={item.status === 0 ? true : false}
            navigation={() =>
              navigation.navigate('Request', {
                userType: userType,
                Owner: item,
                [userType === '1' ? 'load_id' : 'truck_id']:
                  userType === '1' ? item.id : item.truck_id,
              })
            }
          />
          <InnerButton
            enabledStyle={styles.findButtonContainer}
            disabledStyle={styles.findButtonContainerDisabled}
            textStyle={styles.findButtonText}
            disableTextStyle={styles.findDisabledText}
            title={
              userType === '2'
                ? t(Constants.FIND_LOADS)
                : t(Constants.FIND_LORRY)
            }
            disabled={item.status === 0 ? true : false}
            navigation={() =>
              navigation.navigate('FindLoads', {
                Owner: item,
                userType: userType,
              })
            }
          />
        </View>
      </View>
      {ac_time && <Text style={styles.ac_time}>Updated at: {ac_time}</Text>}
    </View>
  );
};

export default MyLorryItem;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  headerView: {flexDirection: 'row'},
  image: {height: 50, width: 60, borderRadius: 5},
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'green',
  },
  square: {
    width: 7,
    height: 7,
    borderRadius: 1,
    backgroundColor: 'red',
  },
  routeInfo: {
    flex: 1,
    marginLeft: 20,
  },
  routeTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeading: {
    minWidth: 45,
    marginLeft: 10,
    color: PrivacyPolicy,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  routeText: {
    flex: 1,
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 15,
    height: '100%',
  },

  smallImageHeaderTitle: {
    fontSize: 15,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  point: {
    height: 8,
    width: 8,
    backgroundColor: PrivacyPolicy,
    borderRadius: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  verifyTruck: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginRight: 10,
    elevation: 2,
    backgroundColor: white,
  },
  dashboardHeaderVerifiedTitle: {
    fontSize: 12,
    color: GradientColor2,
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 5,
  },
  rowdirection: {flexDirection: 'row', alignItems: 'center'},
  ac_time: {
    marginTop: 5,
    fontSize: 12,
    color: PrivacyPolicy,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
    marginRight: 10,
  },
  editButtonStyle: {
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor3,
  },
  requestButtonContainerDisabled: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: PrivacyPolicy,
  },
  findButtonContainer: {
    marginLeft: 20,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
  },
  findButtonContainerDisabled: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: PrivacyPolicy,
    backgroundColor: PrivacyPolicy,
  },
  gradientButtonText: {
    fontSize: 13,
    color: GradientColor3,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  disabledText: {
    color: PrivacyPolicy,
  },
  findButtonText: {
    fontSize: 13,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  findDisabledText: {
    color: white,
  },
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
