/**
 * Created by nick on 10/06/16.
 */
import { StyleSheet } from 'react-native';
import { SECONDARY_TEXT, BG_LIGHT_GRAY, BG_DARK_GRAY, WHITE } from 'AppColors';

export const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: SECONDARY_TEXT,
    height: 38,
    borderColor: BG_LIGHT_GRAY
  },
  topBorder: {
    borderTopWidth: 1 / 2
  },
  activeItemContainer: {
    backgroundColor: BG_DARK_GRAY
  },
  label: {
    color: WHITE
  }
});
