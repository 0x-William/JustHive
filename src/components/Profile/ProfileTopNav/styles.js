import { StyleSheet } from 'react-native';
import { WHITE, GRAY } from 'AppColors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: WHITE,
  },
  topRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
  },
  bottomRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 75,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GRAY,
  },
  centerButton: {
    marginLeft: 20,
    marginRight: 20,
  },
  side: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBack: {
    height: 20,
    width: 12
  }
});
