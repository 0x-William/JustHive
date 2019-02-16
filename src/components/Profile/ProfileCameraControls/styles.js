import { StyleSheet } from 'react-native';
import { GRAY } from 'AppColors';
import { WINDOW_HEIGHT, WINDOW_WIDTH, NAVBAR_HEIGHT, STATUSBAR_HEIGHT } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT - WINDOW_WIDTH - NAVBAR_HEIGHT * 2 - STATUSBAR_HEIGHT,
    backgroundColor: GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 50,
    paddingRight: 50,
  },
  button: {
    width: 50,
    height: 50,
  },
  on: {
    height: 43,
    width: 27,
  },
  auto: {
    height: 43,
    width: 36,
  },
  off: {
    height: 43,
    width: 34,
  },
});
