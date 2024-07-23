import React, {useEffect, useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import GoToIcon from '../../../assets/SVG/svg/GoToIcon';
import {PrivacyPolicy} from '../../Color/color';

const API_KEY = 'AIzaSyC_QRJv6btTEpYsBdlsf075Ppdd6Vh-MJE';
const BASE_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const fetchData = async (latitude, longitude, type) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: `${latitude},${longitude}`,
        radius: 5000, // 5km radius
        type: type,
        key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const FuelPumpItem = ({name, distance, latitude, longitude, item}) => {
  // console.log(111111, item);
  const handleNavigate = () => {
    const url = `google.navigation:q=${latitude},${longitude}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening Google Maps', err),
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.headerTextValue}>{distance} KM away</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={handleNavigate}>
        <View style={{transform: [{rotate: '-45deg'}]}}>
          <GoToIcon size={25} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FuelPump = ({navigation, route}) => {
  const {theft} = route.params;
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const latitude = 25.829027; // Replace with actual latitude
        const longitude = 84.980179; // Replace with actual longitude
        const type = theft ? 'police' : 'gas_station';
        const data = await fetchData(latitude, longitude, type);
        console.log(77777, data);
        setLocations(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [theft]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {locations.map((location, index) => (
        <FuelPumpItem
          key={index}
          name={location.name}
          distance={(location.distance / 1000).toFixed(2)}
          item={location}
        />
      ))}
    </ScrollView>
  );
};

export default FuelPump;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    padding: 3,
    elevation: 2,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    transform: [{rotate: '45deg'}],
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  headerTextValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: PrivacyPolicy,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
