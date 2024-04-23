import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import {NetworkContext} from '../../../Context/NetworkContext';
import NoInternetScreen from '../../Details/NoInternetScreen';
import {
  GradientColor2,
  PrivacyPolicy,
  pageBackground,
} from '../../../Color/color';
import style from './style';
import LocationModal from '../../../Components/LocationModal';
import {useDispatch, useSelector} from 'react-redux';
import {initLocation, locationFailure} from '../../../Store/Actions/Actions';
import SearchIcon from '../../../../assets/SVG/svg/SearchIcon';
import CloseCircle from '../../../../assets/SVG/svg/CloseCircle';

const Search = forwardRef(({navigation, route}, ref) => {
  const [value, setValue] = useState(null);
  const txtInput = useRef('');
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();

  const locationData = useSelector(state => state.data.locationData);

  const goBack = item => {
    route.params.onReturn(item);
    navigation.goBack();
    dispatch(locationFailure());
  };

  const searchItem = item => {
    setValue(item);
    dispatch(initLocation(item));
  };

  const clearItem = () => {
    setValue(null);
    dispatch(locationFailure());
  };
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      txtInput.current?.focus();
    });
  }, []);

  if (!isConnected) {
    return <NoInternetScreen navigation={navigation} />;
  }
  return (
    <View
      style={{
        backgroundColor: pageBackground,
        height: '100%',
      }}>
      <View style={{padding: 20}}>
        <View style={style.searchFilter}>
          <SearchIcon
            size={20}
            color={GradientColor2}
            style={style.locationIcon}
          />
          <TextInput
            ref={txtInput}
            value={value}
            placeholder={'Search Location...'}
            placeholderTextColor={PrivacyPolicy}
            style={style.searchInput}
            autoFocus={true}
            onChangeText={text => searchItem(text)}
          />
          {/* <Location
            style={[style.locationIcon, {marginRight: 10}]}
            onPress={() => !!value && clearItem()}
            name={!!value && 'close'}
            size={20}
            color={GradientColor2}
          /> */}
          {!!value && (
            <TouchableOpacity
              onPress={() => !!value && clearItem()}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <CloseCircle size={20} color={GradientColor2} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <LocationModal
        data={locationData}
        styles={style.loactionModalStyle}
        // extraItem={{place_name:"Anywhere"}}
        // click={(e) => goBack(e.place_name)}
        click={e => goBack({place_name: e?.place_name, id: e?.id})}
      />
    </View>
  );
});

export default Search;
