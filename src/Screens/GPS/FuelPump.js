import React, {useEffect, useState} from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GoToIcon from '../../../assets/SVG/svg/GoToIcon';
import FetchGoogleApi from '../../Utils/FetchGoogleApi';
import styles from './style'

const fetchData = async (latitude, longitude, type) => {
  try {
    const response = await FetchGoogleApi().get('/place/nearbysearch/json', {
      params: {
        location: `${latitude},${longitude}`,
        radius: 10000, // 10km radius
        type: type,
      },
    });
    // console.log(4444, response.data.results);

    return response.data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchDistances = async (origins, destinations) => {
  try {
    const response = await FetchGoogleApi().get('/distancematrix/json', {
      params: {
        origins: origins,
        destinations: destinations,
      },
    });
    return response.data.rows[0].elements;
  } catch (error) {
    console.error('Error fetching distances:', error);
    throw error;
  }
};

const FuelPumpItem = ({item, distance}) => {
  console.log(44444, item, distance);

  const handleNavigate = () => {
    const url = `google.navigation:q=${item?.geometry?.location?.lat},${item?.geometry?.location?.lng}`;
    Linking.openURL(url).catch(err =>
      console.error('Error opening Google Maps', err),
    );
  };

  return (
    <View style={styles.fuelPumpContainer}>
      <View style={styles.detailBox}>
        <Text style={styles.headerText}>{item.name}</Text>
        <Text style={styles.headerTextValue}>{item?.vicinity}</Text>
        <Text style={styles.headerTextValue}>{distance} away</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={handleNavigate}>
        <View style={styles.goToIconView}>
          <GoToIcon size={25} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const FuelPump = ({navigation, route}) => {
  const {theft, latitude, longitude} = route.params;
  const [locations, setLocations] = useState([]);
  const [distances, setDistances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(55555555, route);

  useEffect(() => {
    const fetchLocationsAndDistances = async () => {
      try {
        const type = theft ? 'police' : 'gas_station';
        const data = await fetchData(latitude, longitude, type);

        setLocations(data);

        const origins = `${latitude},${longitude}`;
        const destinations = data
          .map(
            place =>
              `${place.geometry.location.lat},${place.geometry.location.lng}`,
          )
          .join('|');

        const distanceData = await fetchDistances(origins, destinations);

        setDistances(distanceData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationsAndDistances();
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
          item={location}
          distance={
            distances[index]?.distance?.text || 'Distance not available'
          }
        />
      ))}
    </ScrollView>
  );
};

export default FuelPump;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 10,
//     marginVertical: 5,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: 8,
//     elevation: 2,
//   },
//   iconContainer: {
//     padding: 3,
//     elevation: 2,
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     transform: [{rotate: '45deg'}],
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontSize: 16,
//     fontFamily: 'PlusJakartaSans-Bold',
//   },
//   headerTextValue: {
//     fontSize: 14,
//     fontFamily: 'PlusJakartaSans-SemiBold',
//     color: PrivacyPolicy,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   detailBox: {maxWidth: '73%'},
// });
