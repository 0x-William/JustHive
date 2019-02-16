import { StyleSheet } from 'react-native';
import { GRAY, BG_LIGHT_GRAY } from 'AppColors';
import { WINDOW_WIDTH as width, WINDOW_HEIGHT as height, STATUSBAR_HEIGHT } from 'AppConstants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -STATUSBAR_HEIGHT
  },
  gray: {
    height: height / 12,
    backgroundColor: GRAY,
    width,
  },
  bigGray: {
    height: height / 6,
  },
  button: {
    backgroundColor: BG_LIGHT_GRAY,
    height: height / 15,
  },
  label: {
    color: GRAY,
  },
  cameraContentReview: {
    flex: 1
  }
});
