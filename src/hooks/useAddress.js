import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchGpsAddressFailure,
  fetchGpsAddressRequest,
} from '../Store/Actions/Actions';

const useAddress = positions => {
  const [address, setAddress] = useState('Show Address');
  const dispatch = useDispatch();
  // console.log(99999, positions);

  const {gpsTokenData, gpsAddressData, gpsAddressLoading} = useSelector(
    state => {
      // console.log('fetchAddressHook', state.data);
      return state.data;
    },
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
      dispatch(
        fetchGpsAddressRequest(
          gpsTokenData.email,
          gpsTokenData.password,
          positions[positions.length - 1].latitude,
          positions[positions.length - 1].longitude,
        ),
      );
    } else {
      console.log('No positions available');
    }
  }, [dispatch, gpsTokenData, positions]);

  return {address, fetchAddress};
};

export default useAddress;
