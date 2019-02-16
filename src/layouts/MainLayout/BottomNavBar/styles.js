import { StyleSheet } from 'react-native';
import { GRAY, YELLOW, WHITE } from 'AppColors';
import { NAVBAR_HEIGHT, WINDOW_WIDTH } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: NAVBAR_HEIGHT,
    backgroundColor: GRAY,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: NAVBAR_HEIGHT,
    width: WINDOW_WIDTH / 5,
  },
  iconNavFeed: {
    width: 25,
    height: 25,
    tintColor: WHITE,
  },
  iconNavFeedActive: {
    width: 25,
    height: 25,
    tintColor: YELLOW,
  },
  iconProfile: {
    width: 21,
    height: 25,
    tintColor: WHITE,
  },
  iconProfileActive: {
    width: 21,
    height: 25,
    tintColor: YELLOW,
  },
  iconNavPost: {
    width: 40,
    height: 33,
    tintColor: YELLOW,
  },
  iconMessage: {
    width: 26,
    height: 25,
    tintColor: WHITE,
  },
  iconMessageActive: {
    width: 26,
    height: 25,
    tintColor: YELLOW,
  },
  iconSearch: {
    width: 25,
    height: 25,
    tintColor: WHITE,
  },
  iconSearchActive: {
    width: 25,
    height: 25,
    tintColor: YELLOW,
  }

});
