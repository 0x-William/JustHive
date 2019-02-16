import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH, STATUSBAR_HEIGHT } from 'AppConstants';
import { AUX_TEXT, LIGHT_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: WINDOW_WIDTH,
    marginTop: -STATUSBAR_HEIGHT
  },
  iconForward: {
    width: 9,
    height: 15,
    tintColor: AUX_TEXT,
    transform: [{ rotate: '180deg' }],
  },
  iconBackward: {
    width: 9,
    height: 15,
    tintColor: AUX_TEXT,
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  navLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  navRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 30
  },
  navRightPhotoView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  navCenterLabel: {
    color: LIGHT_TEXT
  }
});
