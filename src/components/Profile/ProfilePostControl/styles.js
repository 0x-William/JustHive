import { StyleSheet } from 'react-native';
import { AUX_TEXT, WHITE } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: AUX_TEXT,
    height: 75,
  },
  icon: {
    height: 35,
    width: 35,
  },
  iconWide: {
    height: 30,
  },
  bottomRow: {
    backgroundColor: WHITE,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  }
});
