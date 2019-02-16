/**
 * Created by simply on 7/21/16.
 */
import { StyleSheet } from 'react-native';
import { WHITE, BORDER_LIGHT_GRAY, BG_LIGHT_GRAY, BLACK } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE
  },
  actionButtonsContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionFacebook: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionButtons: {
    backgroundColor: BORDER_LIGHT_GRAY,
    borderColor: BG_LIGHT_GRAY,
    marginBottom: 10,
    width: WINDOW_WIDTH - 30
  },
  actionButtonLabel: {
    color: BLACK
  },
  connectFacebook: {
    marginLeft: 5
  }
});
