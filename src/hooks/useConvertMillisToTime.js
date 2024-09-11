import {useCallback} from 'react';

const useConvertMillisToTime = () => {
  const convertMillisToTime = useCallback(millis => {
    const hours = Math.floor(millis / (1000 * 60 * 60));
    const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }, []);

  return {convertMillisToTime};
};

export default useConvertMillisToTime;
