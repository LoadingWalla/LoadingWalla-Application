import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {GradientColor2, PrivacyPolicy, titleColor, white} from '../Color/color';
import CardHeader from './CardHeader';
import ShowPermitModal from './ShowPermitModal';
import * as Constants from '../Constants/Constant';
import RightArrow from '../../assets/SVG/svg/RightArrow';
import Shield from '../../assets/SVG/svg/Shield';

const FindLoadHeader = ({
  title,
  goBack,
  from,
  to,
  icon,
  fullPrice,
  userType,
  permit,
  navigation,
  material_name,
  qty,
  verified,
  id,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardHeaderView}>
          <CardHeader from={from} to={to} icon={icon} />
        </View>
        <View style={styles.horizontalLine} />
        <View>
          <View style={styles.rowdirection}>
            <View style={styles.point} />
            <Text style={styles.smallImageHeaderTitle}>{fullPrice}</Text>
          </View>
          {userType === '2' ? (
            <View style={styles.locationInfo}>
              <View style={styles.rowdirection}>
                <View style={styles.point} />
                <TouchableOpacity
                  style={styles.rowdirection}
                  onPress={() => setModalVisible(true)}
                  disabled={!(permit?.length > 1)}>
                  <Text
                    style={[
                      styles.smallImageHeaderTitle,
                      permit?.length > 1
                        ? {color: '#0076FF', textDecorationLine: 'underline'}
                        : {color: titleColor, textDecorationLine: 'none'},
                    ]}>
                    {permit?.length === 1
                      ? permit[0].permit_name
                      : `${permit?.length} Permit Location`}
                  </Text>

                  {permit?.length > 1 && (
                    <RightArrow size={15} color={'#0076FF'} />
                  )}
                  <ShowPermitModal
                    permit={permit}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.verifyTruck}
                disabled={verified === 0 ? true : false}
                onPress={() =>
                  navigation.navigate('RC Verification', {
                    title: 'RC',
                    RC: fullPrice,
                    truck_id: id,
                  })
                }>
                <Shield
                  color={verified ? 'green' : GradientColor2}
                  size={15}
                  verified={verified}
                />
                <Text style={styles.dashboardHeaderVerifiedTitle(verified)}>
                  {verified ? `${Constants.VERIFY}` : Constants.NOT_VERIFIED}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.horizontalLine} />
              <View style={[styles.rowdirection, {justifyContent: 'center'}]}>
                <Text style={styles.textStyle}>{material_name}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>{qty}</Text>
              </View>
            </>
          )}
        </View>
      </View>

      {userType === '2' ? (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            Verifying your truck will help in faster load booking
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default FindLoadHeader;

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    backgroundColor: '#FFFDFD',
  },
  cardTop: {padding: 10, backgroundColor: white},
  cardHeaderView: {
    // marginTop: 10
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 15,
    height: '100%',
  },
  rowdirection: {flexDirection: 'row', alignItems: 'center'},
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
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  warning: {
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  warningText: {
    color: titleColor,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  dashboardHeaderVerifiedTitle: color => ({
    fontSize: 12,
    color: color ? 'green' : GradientColor2,
    fontFamily: 'PlusJakartaSans-Bold',
    marginLeft: 5,
  }),
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
