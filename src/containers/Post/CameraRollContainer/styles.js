import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH as width, STATUSBAR_HEIGHT } from 'AppConstants';
import { AUX_TEXT, WHITE, BG_MEDIUM_GRAY, BG_DARK_GRAY, LIGHT_TEXT } from 'AppColors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -STATUSBAR_HEIGHT,
    backgroundColor: WHITE
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emptyContainer: {
    backgroundColor: AUX_TEXT
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 3,
    height: width / 3,
    borderWidth: 1,
    borderColor: WHITE
  },
  imageSelected: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 20,
    height: 20,
    backgroundColor: BG_DARK_GRAY,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: WHITE
  },
  iconCameraRoll: {
    width: 40,
    height: 33,
    tintColor: BG_MEDIUM_GRAY
  },
  cameraRoll: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftLabelView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  leftLabelText: {
    fontSize: 12
  },
  rightLabelView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  rightLabelText: {
    fontSize: 12
  },
  centerLabelText: {
    color: LIGHT_TEXT
  }
});
