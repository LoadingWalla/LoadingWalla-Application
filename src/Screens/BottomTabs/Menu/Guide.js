import React, {useEffect, useCallback, useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  UIManager,
  Platform,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {initGuide} from '../../../Store/Actions/Actions';
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
import styles from './style'

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
        <View style={styles.guideHorizontalLine} />
      </View>
    ),
    [selectedId, handlePress],
  );

  return (
    <View style={styles.guideBackgroundView}>
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

export default React.memo(Guide);
