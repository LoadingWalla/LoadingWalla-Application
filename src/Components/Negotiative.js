import React, {useState, useEffect} from 'react';
import {Modal, View, Text, TextInput, StyleSheet} from 'react-native';
import * as Constants from '../Constants/Constant';
import CommonToolbar from './CommonToolbar';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {initMyLorry, initRequestBooking} from '../Store/Actions/Actions';
import {GradientColor3, PrivacyPolicy, titleColor, white} from '../Color/color';
import CardHeader from './CardHeader';
import InnerButton from './InnerButton';

const Negotiative = ({
  navigation,
  isEdit,
  dismissModal,
  onClose,
  item,
  owner,
}) => {
  const [offered_price, setOffered_price] = useState(
    item?.user_type === 2 ? owner?.price : item?.price,
  );
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {myLorryTruckData, myLoadTruckData, findLorryData} = useSelector(
    state => {
      // console.log("profile Data", state.data);
      return state.data;
    },
  );

  useEffect(() => {
    dispatch(initMyLorry(1));
  }, [dispatch]);

  const saveChanges = () => {
    console.log('working');
    dispatch(
      initRequestBooking(
        item?.user_type === '2' ? item?.truck_id : item?.load_id,
        item?.user_type === '2' ? owner?.load_id : owner?.truck_id,
        offered_price,
        item?.user_type === 1 ? item?.price_type : owner?.price_type,
      ),
    );
    dismissModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      visible={isEdit}
      onDismiss={() => dismissModal()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CommonToolbar
            title={t(Constants.NEGOTITATED_PRICE)}
            goBack={() => onClose()}
            isBack={true}
            isClose={true}
            modal={true}
          />
          <View style={styles.container}>
            <View style={styles.locationCard}>
              <CardHeader from={item?.from} to={item?.to} icon={item?.image} />
              <View style={styles.horizontalLine} />
              <View style={styles.rowdirection}>
                <Text style={styles.textStyle}>{item?.loads}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>{item?.material_name}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.textStyle}>{`₹ ${item?.price}`}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.priceText}>
                {t(Constants.MY_NEGOTITATON)}
              </Text>
              <View style={styles.priceInputContainer}>
                <View style={styles.priceInput}>
                  <Text style={styles.rupeeText}>{'Price (₹) |'}</Text>
                  <TextInput
                    defaultValue={offered_price}
                    onChangeText={text => setOffered_price(text)}
                    style={styles.inputStyle}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.priceType}>
                  <Text style={styles.rupeeText}>
                    {item?.price_type === '1'
                      ? t(Constants.FIXED)
                      : t(Constants.PER_TON)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.btnBoxStyle}>
              <InnerButton
                enabledStyle={styles.requestButtonContainer}
                textStyle={styles.gradientButtonText}
                title={'Cancel'}
                navigation={() => dismissModal()}
              />
              <InnerButton
                enabledStyle={styles.findButtonContainer}
                textStyle={styles.findButtonText}
                title={'Send'}
                navigation={() => saveChanges()}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Negotiative;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginVertical: 10},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 2,
    marginHorizontal: 15,
    height: '100%',
  },
  rowdirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: PrivacyPolicy,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  container: {
    marginTop: 10,
  },
  locationCard: {
    borderWidth: 1,
    borderColor: '#DBD7D7',
    padding: 10,
    borderRadius: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: titleColor,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DBD7D7',
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 10,
    width: '70%',
  },
  rupeeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: titleColor,
    marginEnd: 5,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  inputStyle: {
    fontSize: 16,
    textAlign: 'left',
    padding: 5,
    color: '#000',
    width: '75%',
  },
  priceType: {
    padding: 10,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  btnBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  requestButtonContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: GradientColor3,
  },
  gradientButtonText: {
    fontSize: 13,
    color: GradientColor3,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
  findButtonContainer: {
    marginLeft: 20,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: GradientColor3,
    borderColor: GradientColor3,
  },
  findButtonText: {
    fontSize: 13,
    color: white,
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
  },
});
