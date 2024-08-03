import React, {useEffect, useCallback, useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {initGuide} from '../../../Store/Actions/Actions';
import {PrivacyPolicy} from '../../../Color/color';
import * as Constants from '../../../Constants/Constant';
import GuideShimmer from '../../../Components/Shimmer/GuideShimmer';
import UpArrow from '../../../../assets/SVG/svg/UpArrow';
import DownArrow from '../../../../assets/SVG/svg/DownArrow';
import PhoneCall from '../../../../assets/SVG/svg/PhoneCall';
import {DialCall} from '../../../Utils/DialCall';
import SearchIcon from '../../../../assets/SVG/svg/SearchIcon';
import BackArrow from '../../../../assets/SVG/svg/BackArrow';
import Close from '../../../../assets/SVG/Close';
import {useTranslation} from 'react-i18next';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Guide = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [selectedId, setSelectedId] = useState(null);
  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Memoize the selector to prevent unnecessary re-renders
  const {guideData, guideStatus, guideLoading} = useSelector(
    state => ({
      guideData: state.data.guideData,
      guideStatus: state.data.guideStatus,
      guideLoading: state.data.guideLoading,
    }),
    (prev, next) =>
      prev.guideData === next.guideData &&
      prev.guideStatus === next.guideStatus &&
      prev.guideLoading === next.guideLoading,
  );

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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: searchMode ? () => null : t(Constants.HELP_GUIDE),
      headerRight: () =>
        searchMode ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.headerSearchInput}
              autoFocus={true}
              onChangeText={setSearchText}
              value={searchText}
              placeholder="Search..."
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => {
                setSearchMode(false);
                setSearchText('');
              }}>
              <Close />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setSearchMode(true)}
            style={styles.searchButton}>
            <SearchIcon size={25} color={'#000000'} />
          </TouchableOpacity>
        ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
      ),
    });
  }, [navigation, searchMode, searchText, t]);

  const filteredData = useMemo(
    () =>
      guideStatus === 200
        ? guideData.filter(item =>
            item.title.toLowerCase().includes(searchText.toLowerCase()),
          )
        : [],
    [guideStatus, guideData, searchText],
  );

  const renderItem = useCallback(
    ({item}) => (
      <View key={item?.id}>
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
      {!searchMode && (
        <View style={styles.callBox}>
          <Text style={styles.header}>Facing trouble?</Text>
          <TouchableOpacity
            style={styles.callSection}
            onPress={() => DialCall('110-465833494')}>
            <PhoneCall size={20} color={'#EF4D23'} />
            <Text style={styles.phoneNo}>110-465833494</Text>
          </TouchableOpacity>
        </View>
      )}
      {guideLoading ? (
        <GuideShimmer />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item?.id.toString()}
          renderItem={renderItem}
          extraData={selectedId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    padding: 10,
    backgroundColor: '#FFFDFD',
    flex: 1,
  },
  header: {
    color: '#808080',
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    width: '90%',
    paddingHorizontal: 10,
    left: 15,
    borderRadius: 20,
    borderColor: PrivacyPolicy,
  },
  headerSearchInput: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    top: 2,
  },
});

export default React.memo(Guide);
