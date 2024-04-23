import React, {useContext, useEffect, useCallback, useState} from 'react';
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
import {NetworkContext} from '../../../Context/NetworkContext';
import {initGuide} from '../../../Store/Actions/Actions';
import {GradientColor2, PrivacyPolicy, titleColor} from '../../../Color/color';
import NoInternetScreen from '../../Details/NoInternetScreen';
import GuideShimmer from '../../../Components/Shimmer/GuideShimmer';
import UpArrow from '../../../../assets/SVG/svg/UpArrow';
import DownArrow from '../../../../assets/SVG/svg/DownArrow';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Guide = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const {isConnected} = useContext(NetworkContext);
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
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handlePress(item.id.toString())}
        style={styles.itemContainer}>
        <Text style={styles.category}>{item.title}</Text>
        {selectedId === item.id.toString() ? (
          <UpArrow size={20} color={GradientColor2} style={styles.arrow} />
        ) : (
          <DownArrow size={20} color={GradientColor2} style={styles.arrow} />
        )}
        {selectedId === item.id.toString() && (
          <Text style={styles.topic}>{item.description}</Text>
        )}
      </TouchableOpacity>
    ),
    [selectedId, handlePress],
  );

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }

  if (guideLoading) {
    return <GuideShimmer />;
  }

  return (
    <View style={styles.backgroundView}>
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <FlatList
        data={guideStatus === 200 ? guideData : []}
        keyExtractor={item => item?.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    padding: 10,
    backgroundColor: '#FFFDFD',
    height: '100%',
  },
  header: {
    marginBottom: 20,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 26,
  },
  itemContainer: {
    backgroundColor: '#ededed',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    marginHorizontal: 1,
    borderBottomWidth: 1,
    borderColor: GradientColor2,
    padding: 10,
  },
  category: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans',
    marginRight: 15,
    color: GradientColor2,
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
});

export default React.memo(Guide);
