import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAddressFailure,
  fetchAddressRequest,
} from '../Store/Actions/Actions';

const useFullAddress = positions => {
  const [address, setAddress] = useState('Show Address');
  const dispatch = useDispatch();

  const {fullAddressLoading, fullAddressData} = useSelector(
    state => state.data,
  );

  useEffect(() => {
    if (fullAddressData && !fullAddressLoading) {
      setAddress(fullAddressData.display_name);
    }
  }, [fullAddressData, fullAddressLoading]);

  useEffect(() => {
    return () => {
      dispatch(fetchAddressFailure());
    };
  }, [dispatch]);

  const fetchAddress = useCallback(() => {
    if (positions && positions.length > 0) {
      const {latitude, longitude} = positions[positions.length - 1];
      dispatch(fetchAddressRequest(latitude, longitude));
    } else {
      console.log('No positions available');
    }
  }, [dispatch, positions]);

  //   console.log(1111111, address.display_name);
  return {address, fetchAddress, fullAddressLoading};
};

export default useFullAddress;
