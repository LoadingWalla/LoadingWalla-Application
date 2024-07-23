import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyC_QRJv6btTEpYsBdlsf075Ppdd6Vh-MJE';

export const getNearbyPlaces = async (lat, long, type) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=5000&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    throw error;
  }
};

export const getNearestPetrolPump = (lat, long) => {
  return getNearbyPlaces(lat, long, 'gas_station');
};

export const getNearestPoliceStation = (lat, long) => {
  return getNearbyPlaces(lat, long, 'police');
};
