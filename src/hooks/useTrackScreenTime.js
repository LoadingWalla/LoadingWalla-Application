import {useEffect, useRef} from 'react';
import analytics from '@react-native-firebase/analytics';

const useTrackScreenTime = screenName => {
  const startTime = useRef(Date.now());

  useEffect(() => {
    return () => {
      const duration = (Date.now() - startTime.current) / 1000; // in seconds
      analytics().logEvent('screen_time', {
        screen_name: screenName,
        time_spent: duration,
      });
    };
  }, [screenName]);
};

export default useTrackScreenTime;
