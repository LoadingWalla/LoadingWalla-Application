import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {initGuide} from '../../../Store/Actions/Actions';
import {GradientColor2, PrivacyPolicy, titleColor} from '../../../Color/color';

import GuideShimmer from '../../../Components/Shimmer/GuideShimmer';
import UpArrow from '../../../../assets/SVG/svg/UpArrow';
import DownArrow from '../../../../assets/SVG/svg/DownArrow';
import PhoneCall from '../../../../assets/SVG/svg/PhoneCall';
import {DialCall} from '../../../Utils/DialCall';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Guide = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  const {guideData, guideStatus, guideLoading} = useSelector(state => ({
    guideData: state.data.guideData,
    guideStatus: state.data.guideStatus,
    guideLoading: state.data.guideLoading,
  }));

  useEffect(() => {
    dispatch(initGuide());
  }, [dispatch]);

  useEffect(() => {
    if (guideStatus === 200 && guideData.length > 0) {
      setSelectedId(guideData[0].id.toString());
    }
  }, [guideStatus, guideData]);

  const handlePress = useCallback(id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedId(currentId => (currentId === id ? '' : id));
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handlePress(item.id.toString())}
          style={styles.itemContainer}>
          <Text style={styles.category}>{item.title}</Text>
          {selectedId === item.id.toString() ? (
            <UpArrow size={15} color={'#808080'} style={styles.arrow} />
          ) : (
            <DownArrow size={15} color={'#808080'} style={styles.arrow} />
          )}
          {selectedId === item.id.toString() && (
            <Text style={styles.topic}>{item.description}</Text>
          )}
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    ),
    [selectedId, handlePress],
  );

  return (
    <View style={styles.backgroundView}>
      <View style={styles.callBox}>
        <Text style={styles.header}>Facing trouble?</Text>
        <TouchableOpacity
          style={styles.callSection}
          onPress={() => DialCall('110-465833494')}>
          <PhoneCall size={20} color={'#EF4D23'} />
          <Text style={styles.phoneNo}>110-465833494</Text>
        </TouchableOpacity>
      </View>
      {guideLoading ? (
        <GuideShimmer />
      ) : (
        <FlatList
          data={guideStatus === 200 ? guideData : []}
          keyExtractor={item => item?.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    padding: 10,
    backgroundColor: '#FFFDFD',
    height: '100%',
    flex: 1,
  },
  header: {
    color: '#808080',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
  },
  callSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    backgroundColor: '#FFF5F2',
    borderColor: '#EF4D23',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  phoneNo: {
    color: '#808080',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    marginLeft: 10,
  },
  callBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    marginBottom: 10,
    marginHorizontal: 1,
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 10,
  },
  itemContainer: {
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 1,
    padding: 10,
  },
  category: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    marginRight: 15,
    color: '#808080',
  },
  topic: {
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'PlusJakartaSans-Medium',
    lineHeight: 18 * 1.2,
    marginTop: 10,
    color: PrivacyPolicy,
  },
  arrow: {
    position: 'absolute',
    top: 15,
    right: 5,
  },
  horizontalLine: {backgroundColor: '#AFAFAF', height: 1, marginBottom: 10},
});

export default React.memo(Guide);
