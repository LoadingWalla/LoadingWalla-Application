/**
 * In iOS use "import RNFetchBlob from 'react-native-blob-util';"
 *  insted of "import RNFetchBlob from 'rn-fetch-blob'"
 * and no need to install rn-fetch-blob library in iOS it will show error.
 */
import {PermissionsAndroid, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';

const Camera = async () => {
  let options = {
    mediaType: 'photo',
    quality: 0.5,
    skipBackup: true,
    path: 'images',
    saveToPhotos: Platform.OS === 'android' ? false : true,
    waitUntilSaved: true,
    cameraRoll: true,
  };

  // Request for camera permissions on runtime in android
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else {
      return true;
    }
  };

  // Request for read and write permissions on runtime in android
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        return false;
      }
    } else {
      return true;
    }
  };

  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();

  // This is used for move image on custom folder
  //   const moveImage = async source => {
  //     const pictureFolder = RNFetchBlob.fs.dirs.PictureDir + '/PermitExpress/';
  //     let filename =
  //       source.assets[0].uri.split('/')[
  //         source.assets[0].uri.split('/').length - 1
  //       ];
  //     //we can copy it or move it
  //     let _copy = await RNFetchBlob.fs.cp(
  //       source.assets[0].uri,
  //       pictureFolder + filename,
  //     );
  //     return _copy;
  //   };

  // This is used for check permission and launch Camera.
  try {
    if (isCameraPermitted && isStoragePermitted) {
      const data = launchCamera(options, res => {
        if (res.didCancel) {
        } else if (res.error) {
        } else if (res.customButton) {
        } else {
          try {
            let source = res;
            // moveImage(source);
            return source;
          } catch (err) {
            console.error(err);
          }
        }
      });
      return data;
    }
  } catch (err) {}
};

// This is used for launch gallery
export const launchLibrary = async () => {
  let options = {
    storageOptions: {
      skipBackup: true,
    },
  };
  try {
    const data = launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        try {
          const source = {uri: response.uri};
          return source;
        } catch (err) {}
      }
    });
    return data;
  } catch (err) {}
};

export default Camera;
