import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH, NAVBAR_HEIGHT } from 'AppConstants';
import { YELLOW } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    width: WINDOW_WIDTH,
    height: NAVBAR_HEIGHT,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerText: {
    color: YELLOW,
    fontFamily: 'Panton-Semibold',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
