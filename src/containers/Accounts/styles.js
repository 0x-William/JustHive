import { StyleSheet } from 'react-native';
import { BG_DARK_GRAY, WHITE } from 'AppColors';
import { WINDOW_HEIGHT } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: BG_DARK_GRAY,
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionIcon: {
    color: WHITE,
    marginRight: 10,
  },
  actionText: {
    color: WHITE
  },
  actionImage: {
    width: 10
  },
  wrapper: {
    flex: 1
  }
});
