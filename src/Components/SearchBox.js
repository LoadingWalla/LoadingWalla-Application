import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Close from '../../assets/SVG/Close';
import SearchIcon from '../../assets/SVG/svg/SearchIcon';
import {backgroundColorNew, GradientColor1, titleColor} from '../Color/color';

const SearchBox = ({onSearch, onToggle, onFilterChange, deviceCounts}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterOption, setFilterOption] = useState('All');
  const animation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef(null);

  const toggleSearch = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) {
      onToggle(newState);
    }
    if (!newState) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (isExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isExpanded, animation]);

  const inputWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const iconOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const inputOpacity = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0.2, 1],
  });

  const handleSearchTextChange = text => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  const handleFilterChange = value => {
    setFilterOption(value);
    if (onFilterChange) {
      onFilterChange(value);
    }
  };

  return (
    <View style={styles.container}>
      {!isExpanded && (
        // <View style={styles.defaultContainer}>
        //   <Text style={styles.gpsPurchaseText}>GPS Purchase</Text>
        //   <View style={styles.rightContainer}>
        //     <View style={styles.pickerContainer}>
        //       <Picker
        //         selectedValue={filterOption}
        //         onValueChange={itemValue => handleFilterChange(itemValue)}
        //         style={styles.picker}
        //         dropdownIconColor="#000000"
        //         dropdownIconRippleColor={GradientColor1}
        //         itemStyle={styles.pickerItem}
        //         mode="dropdown">
        //         <Picker.Item label="All" value="All" />
        //         <Picker.Item label="Active" value="Active" />
        //         <Picker.Item label="Inactive" value="Inactive" />
        //       </Picker>
        //     </View>
        //     <TouchableOpacity onPress={toggleSearch} style={styles.searchIcon}>
        //       <SearchIcon size={20} color="#000" />
        //     </TouchableOpacity>
        //   </View>
        // </View>
        <View style={styles.defaultContainer}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                filterOption === 'All' && styles.activeButton,
              ]}
              onPress={() => handleFilterChange('All')}>
              <Text
                style={[
                  styles.buttonText,
                  filterOption === 'All' && styles.activeButtonText,
                ]}>
                All ({deviceCounts.all || 0})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                filterOption === 'Active' && styles.activeButton,
              ]}
              onPress={() => handleFilterChange('Active')}>
              <Text
                style={[
                  styles.buttonText,
                  filterOption === 'Active' && styles.activeButtonText,
                ]}>
                Active ({deviceCounts.active || 0})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                filterOption === 'Inactive' && styles.activeButton,
              ]}
              onPress={() => handleFilterChange('Inactive')}>
              <Text
                style={[
                  styles.buttonText,
                  filterOption === 'Inactive' && styles.activeButtonText,
                ]}>
                Inactive ({deviceCounts.inactive || 0})
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleSearch} style={styles.searchIcon}>
            <SearchIcon size={20} color="#000" />
          </TouchableOpacity>
        </View>
      )}
      <Animated.View
        style={[styles.searchBox, {width: inputWidth, opacity: inputOpacity}]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  defaultContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gpsPurchaseText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 150,
    height: 30,
    backgroundColor: '#E9E9E9',
  },
  searchIcon: {
    marginLeft: 15,
    backgroundColor: '#E9E9E9',
    borderRadius: 5,
    padding: 5,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E9E9E9',
  },
  input: {
    flex: 1,
    padding: 5,
    color: '#000',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
  pickerItem: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: titleColor,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#E9E9E9',
    borderRadius: 5,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: backgroundColorNew,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: titleColor,
  },
  activeButtonText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: '#FFFFFF',
  },
});

export default SearchBox;
