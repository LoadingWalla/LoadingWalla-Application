import React from 'react';
import {View, Text} from 'react-native';
import * as Constants from '../Constants/Constant';
import style from './style';
import CardHeader from './CardHeader';
import InnerButton from './InnerButton';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const PostItem = ({navigate, call, item, owner, userType}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  // console.log(444444, item);

  return (
    <View style={style.card}>
      <CardHeader
        from={item?.from}
        to={item?.to}
        icon={
          item?.image || item.user_type === '1'
            ? 'https://loadingwalla.com/public/loado.png'
            : 'https://loadingwalla.com/public/truck_tyre/18%20Tyre.png'
        }
        t={t}
      />
      <View style={style.horizontalLine} />
      <View style={style.rowdirection}>
        <View style={style.point} />
        <Text style={style.smallImageHeaderTitle}>
          {userType === '2' ? item?.name : item?.truck_owner_name}
        </Text>
      </View>
      <View style={style.rowdirection}>
        <View style={style.point} />
        <Text style={style.smallImageHeaderTitle}>
          {item?.user_type
            ? `₹ ${item?.price} / ${
                item?.price_type === 1 ? 'Per Truck' : 'Fixed'
              }`
            : item?.vehicle_number}
        </Text>
      </View>
      <View style={style.horizontalLine} />
      <View style={[style.rowdirection, {justifyContent: 'center'}]}>
        <Text style={style.textStyle}>
          {userType === '2' ? item?.loads : item?.truck_capacity}
        </Text>
        <View style={style.verticalLine} />
        <Text style={style.textStyle}>
          {userType === '2' ? item?.material_name : item?.wheel}
        </Text>
        <View style={style.verticalLine} />
        <Text style={style.textStyle}>
          {userType === '1' ? `${item?.truck_type} Body` : `${item?.distance}`}
        </Text>
      </View>
      <View style={style.horizontalLine} />
      <View style={style.btnContainer}>
        <InnerButton
          enabledStyle={style.requestButtonContainer}
          textStyle={style.gradientButtonText}
          title={t(Constants.REQUEST)}
          navigation={() =>
            navigation.navigate('Negotiation', {
              item: item,
              owner: owner,
              userType: userType,
            })
          }
        />
        <InnerButton
          enabledStyle={style.findButtonContainer}
          textStyle={style.findButtonText}
          title={t(Constants.CALL)}
          navigation={() => call()}
        />
      </View>
    </View>
  );
};
export default PostItem;
