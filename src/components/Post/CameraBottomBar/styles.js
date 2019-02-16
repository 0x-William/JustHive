import { StyleSheet } from 'react-native';
import { WHITE } from 'AppColors';
import { WINDOW_WIDTH as width, WINDOW_HEIGHT as height } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height / 6,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-between',
  },
  iconCameraRoll: {
    width: 40,
    height: 33
  },
  takePicture: {
    width: 100,
    height: 100
  },
  textButton: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 20
  },
  cameraRoll: {
    fontSize: 30,
    color: WHITE
  },
  btnCameraRoll: {
    flex: 1
  },
  btnTakePicture: {
    flex: 1
  },
  siblingView: {
    flex: 1
  },
  btnDone: {
    flex: 1,
    alignItems: 'flex-end'
  }
});
