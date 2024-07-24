import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGpsAddressFailure,
  fetchGpsAddressRequest,
} from '../Store/Actions/Actions';

const useAddress = positions => {
  const [address, setAddress] = useState('Show Address');
  const dispatch = useDispatch();

  const {gpsTokenData, gpsAddressData, gpsAddressLoading} = useSelector(
    state => state.data,
  );

  useEffect(() => {
    if (gpsAddressData && !gpsAddressLoading) {
      setAddress(gpsAddressData);
    }
  }, [gpsAddressData, gpsAddressLoading]);

  useEffect(() => {
    return () => {
      dispatch(fetchGpsAddressFailure());
    };
  }, [dispatch]);

  const fetchAddress = useCallback(() => {
    if (positions && positions.length > 0) {
      const {latitude, longitude} = positions[positions.length - 1];
      dispatch(
        fetchGpsAddressRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          latitude,
          longitude,
        ),
      );
    } else {
      console.log('No positions available');
    }
  }, [dispatch, gpsTokenData, positions]);

  return {address, fetchAddress, gpsAddressLoading};
};

export default useAddress;
