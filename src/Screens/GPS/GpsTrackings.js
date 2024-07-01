import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GpsItem from '../../Components/GpsItem';
import Button from '../../Components/Button';
import {backgroundColorNew, textColor} from '../../Color/color';
import {
  fetchGpsDevicesRequest,
  fetchTokenRequest,
  websocketConnect,
  websocketDisconnect,
} from '../../Store/Actions/Actions';
import {useDispatch, useSelector} from 'react-redux';

const GpsTrackings = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    gpsTokenLoading,
    gpsTokenData,
    gpsTokenStatus,
    gpsDeviceLoading,
    gpsDeviceData,
    gpsDeviceStatus,
  } = useSelector(state => {
    // console.log('profile Data', state.data);
    return state.data;
  });

  useEffect(() => {
    if (gpsTokenData === null) {
      dispatch(fetchTokenRequest());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(websocketConnect(gpsTokenData.cookie));

    return () => {
      dispatch(websocketDisconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    if (gpsTokenData) {
      dispatch(
        fetchGpsDevicesRequest(gpsTokenData.email, gpsTokenData.password),
      );
    }
  }, [dispatch, gpsTokenData]);

  return (
    <View style={styles.conatiner}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>GPS Purchases</Text>
      </View>
      {gpsDeviceLoading ? (
        <View style={styles.loadingStyle}>
          <ActivityIndicator size={'large'} color={backgroundColorNew} />
        </View>
      ) : (
        <FlatList
          data={gpsDeviceData}
          initialNumToRender={6}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <GpsItem item={item} icon={true} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <Button
        title={'Buy GPS'}
        onPress={() => navigation.navigate('BuyGPS')}
        // loading={statusChangeLoading}
        textStyle={styles.btnText}
        style={styles.btnStyle}
      />
    </View>
  );
};

export default GpsTrackings;

const styles = StyleSheet.create({
  conatiner: {paddingHorizontal: 10, flex: 1},
  headerContainer: {
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    paddingLeft: 10,
  },
  btnStyle: {
    flexDirection: 'row',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  btnText: {
    color: textColor,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  loadingStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

// import {StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';

// const GpsTrackings = () => {
//   const [message, setMessage] = useState(null);
//   const [attempts, setAttempts] = useState(0);
//   const wsUrl = 'ws://13.200.80.190:8082/api/socket';
//   const cookie = 'JSESSIONID=node01mzy5gr053w2o1xtfjhav16hwn1314.node0'; // Replace with your actual cookie

//   useEffect(() => {
//     if (attempts > 5) {
//       console.log('Max retry attempts reached');
//       return;
//     }

//     console.log(`Attempting to connect: attempt ${attempts + 1}`);
//     const ws = new WebSocket(wsUrl, null, {
//       headers: {
//         Cookie: cookie,
//       },
//     });

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     ws.onmessage = e => {
//       // Parse the incoming message
//       const data = JSON.parse(e.data);
//       setMessage(data);
//       console.log('Message received:', data);
//     };

//     ws.onerror = e => {
//       console.error('WebSocket error', e.message);
//     };

//     ws.onclose = e => {
//       console.log('WebSocket connection closed', e.code, e.reason);
//       if (e.code !== 1000) {
//         // Retry connection if it was not closed normally
//         console.log('Retrying connection...');
//         setTimeout(() => {
//           setAttempts(prev => prev + 1);
//         }, 5000); // Retry after 5 seconds
//       }
//     };

//     // Cleanup function to close the WebSocket when the component unmounts
//     return () => {
//       console.log('Cleaning up WebSocket connection');
//       ws.close();
//     };
//   }, [attempts]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>GpsTrackings</Text>
//       {message ? (
//         <Text style={styles.message}>Received: {JSON.stringify(message)}</Text>
//       ) : (
//         <Text style={styles.message}>Connecting to WebSocket...</Text>
//       )}
//     </View>
//   );
// };

// export default GpsTrackings;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   message: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });
