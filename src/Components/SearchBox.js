import React, {useState, useRef, useEffect, memo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Keyboard,
  ScrollView,
} from 'react-native';
import * as Constants from '../Constants/Constant'
import Close from '../../assets/SVG/Close';
import SearchIcon from '../../assets/SVG/svg/SearchIcon';
import {GradientColor1, titleColor} from '../Color/color';
import {useTranslation} from 'react-i18next';
import RefreshIcon from '../../assets/SVG/svg/RefreshIcon';
import styles from './style'

const SearchBox = ({
  onSearch,
  onToggle,
  onFilterChange,
  deviceCounts,
  onRefresh,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);
  const {t} = useTranslation();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (isExpanded) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const toggleSearch = () => {
    setIsExpanded(prev => !prev);
    onToggle && onToggle(!isExpanded);
    if (isExpanded) {
      Keyboard.dismiss();
    }
  };

  const handleSearchTextChange = text => {
    setSearchText(text);
    onSearch && onSearch(text);
  };

  const handleFilterChange = value => {
    setFilterOption(value);
    onFilterChange && onFilterChange(value);
  };

  const inputWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const inputOpacity = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0.2, 1],
  });

  const FilterButton = ({label, value, count}) => (
    <TouchableOpacity
      style={[styles.searchbutton, filterOption === value && styles.activeButton]}
      onPress={() => handleFilterChange(value)}>
      <Text
        style={[
          styles.searchbuttonText,
          filterOption === value && styles.activeButtonText,
        ]}>
        {label} ({count || 0})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.searchcontainer}>
      {!isExpanded && (
        <View style={styles.defaultContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonsContainer}>
              <FilterButton
                label={t(Constants.ALL)}
                value="All"
                count={deviceCounts.all}
              />
              <FilterButton
                label={t(Constants.ACTIVE)}
                value="Active"
                count={deviceCounts.active}
              />
              <FilterButton
                label={t(Constants.INACTIVE)}
                value="Inactive"
                count={deviceCounts.inactive}
              />
              <FilterButton
                label={t(Constants.RUNNING)}
                value="Running"
                count={deviceCounts.running}
              />
            </View>
          </ScrollView>
          <View style={styles.refreshBtnBox}>
            <TouchableOpacity onPress={onRefresh} style={styles.refreshIcon}>
              <RefreshIcon size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSearch} style={styles.searchIcon}>
              <SearchIcon size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {isExpanded && (
        <Animated.View
          style={[
            styles.searchBox,
            {width: inputWidth, opacity: inputOpacity},
          ]}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search truck number: eg., AB00CD1122"
            value={searchText}
            onChangeText={handleSearchTextChange}
            autoFocus={isExpanded}
          />
          <TouchableOpacity onPress={toggleSearch}>
            <Close size={25} color="#000" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 10,
//     flexDirection: 'row',
//   },
//   defaultContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   searchIcon: {
//     marginLeft: 10,
//     backgroundColor: '#E9E9E9',
//     borderRadius: 5,
//     padding: 5,
//   },
//   refreshIcon: {
//     backgroundColor: '#E9E9E9',
//     borderRadius: 5,
//     padding: 5,
//   },
//   searchBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     backgroundColor: '#E9E9E9',
//     // borderWidth: 1,
//   },
//   input: {
//     flex: 1,
//     padding: 3,
//     color: '#000',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // borderWidth: 1,
//   },
//   refreshBtnBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // borderWidth: 1,
//     marginLeft: 5,
//   },
//   button: {
//     paddingVertical: 6,
//     paddingHorizontal: 15,
//     backgroundColor: '#E9E9E9',
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   activeButton: {
//     backgroundColor: GradientColor1,
//   },
//   buttonText: {
//     fontSize: 12,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     color: titleColor,
//   },
//   activeButtonText: {
//     fontSize: 12,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     color: '#FFFFFF',
//   },
// });

export default memo(SearchBox);
