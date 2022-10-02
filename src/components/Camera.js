import {Camera, useCameraDevices} from 'react-native-vision-camera';
import LoadingView from 'react-native-loading-view';
export default function _Camera() {
  const devices = useCameraDevices();
  const device = devices.back;

  console.log(devices);

  if (device == null) return <LoadingView />;
  return <Camera device={device} isActive={true} />;
}
