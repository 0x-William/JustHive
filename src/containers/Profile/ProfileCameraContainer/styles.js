import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH, NAVBAR_HEIGHT } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: NAVBAR_HEIGHT,
    left: 0,
    height: WINDOW_WIDTH,
    width: WINDOW_WIDTH,
    opacity: 0.5,
  },
});
