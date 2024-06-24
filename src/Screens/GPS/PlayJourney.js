import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MapView, {Polyline} from 'react-native-maps';
import {backgroundColorNew, titleColor} from '../../Color/color';
import PlayIcon from '../../../assets/SVG/svg/PlayIcon';
import Slider from '@react-native-community/slider';
import AlertsIcon from '../../../assets/SVG/svg/AlertsIcon';
import GpsIcon from '../../../assets/SVG/svg/GpsIcon';

export default function PlayJourney({navigation}) {
  const [sliderValue, setSliderValue] = useState(0);

  const truckRouteCoordinates = [
    {latitude: 25.0961, longitude: 85.3131},
    {latitude: 25.0971, longitude: 85.3201},
    {latitude: 25.0981, longitude: 85.3251},
  ];
  return (
    <View style={styles.conatiner}>
      <View style={styles.topContainer}>
        <View style={styles.stopBox}>
          <Text style={styles.stopText}>Stop</Text>
          <Text style={styles.stopCount}>02</Text>
        </View>
        <View style={styles.verticalLine} />
        <Text style={styles.addressText}>
          Road number - C/33, Gali number 03, new Ashok Nagar, demo address for
          length, Delhi - 110030
        </Text>
      </View>
      <View style={styles.mapContainer}>
        <View style={styles.mapView}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: 25.0961,
              longitude: 85.3131,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}>
            <Polyline
              coordinates={truckRouteCoordinates}
              strokeColor="#000"
              strokeWidth={6}
            />
          </MapView>
          <View style={styles.extraButtonBox}>
            <TouchableOpacity
              onPress={() => navigation.navigate('stops')}
              style={styles.stopsBtnStyle}>
              <AlertsIcon size={20} />
              <Text style={styles.alertButtonText}>Stops</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <GpsIcon size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlBtn}>
              <GpsIcon size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // borderWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 20,
              padding: 5,
              borderColor: backgroundColorNew,
            }}>
            <PlayIcon size={20} color={backgroundColorNew} />
          </TouchableOpacity>
          <View
            style={{
              //   borderWidth: 1,
              flex: 1,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={backgroundColorNew} // Coral red color
              maximumTrackTintColor="#FFDCD3" // Light gray for the remaining track
              thumbTintColor={backgroundColorNew} // Orange red color for the thumb
              value={sliderValue}
              onValueChange={setSliderValue}
              // thumbImage={}
              // trackImage={}
              // maximumTrackImage={}
              // minimumTrackImage={}
            />
          </View>
          <View
            style={{
              //   borderWidth: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor: '#E0E0E0',
                borderRadius: 5,
                marginRight: 5,
                borderColor: '#E0E0E0',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'PlusJakartaSans-ExtraBold',
                  color: backgroundColorNew,
                }}>
                1X
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor: '#E0E0E0',
                borderRadius: 5,
                borderColor: '#E0E0E0',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'PlusJakartaSans-ExtraBold',
                  color: backgroundColorNew,
                }}>
                2X
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.totalBox}>
          <View style={styles.stopBox}>
            <Text style={styles.stopText}>Total run: 307 KM</Text>
            <Text style={styles.stopCount}>06 : 37 : 42</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.stopBox}>
            <Text style={styles.stopText}>Total Stops: 12</Text>
            <Text style={styles.stopCount}>06 : 37 : 42</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.stopBox}>
            <Text style={styles.stopText}>Signal Losts: 2KM</Text>
            <Text style={styles.stopCount}>06 : 37 : 42</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {flex: 1},
  verticalLine: {
    backgroundColor: '#AFAFAF',
    width: 1,
    marginHorizontal: 5,
    height: '100%',
  },
  extraButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 130,
    right: 0,
    // borderWidth: 1,
    zIndex: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Italic',
    color: titleColor,
  },
  topContainer: {
    //   borderWidth: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 5,
    elevation: 2,
  },
  mapContainer: {flex: 1},
  mapView: {flex: 1, width: '100%', height: '100%'},
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  alertButtonText: {
    marginLeft: 10,
    textAlign: 'center',
    fontSize: 14,
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  stopBox: {
    paddingHorizontal: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopText: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 10,
    textAlign: 'center',
    // borderWidth: 1,
  },
  stopCount: {
    color: titleColor,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: -5,
    // borderWidth: 1,
  },
  totalBox: {
    flexDirection: 'row',
    // borderWidth: 1,
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 10,
  },
  stopsBtnStyle: {
    flexDirection: 'row',
    elevation: 3,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  ctrlBtn: {
    elevation: 3,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 40,
    marginRight: 10,
  },
  slider: {
    flex: 1,
    width: '100%',
    // borderWidth: 1,
  },
});
