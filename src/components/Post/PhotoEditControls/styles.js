import { StyleSheet } from 'react-native';
import { GRAY, YELLOW } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: GRAY
  },
  iconFilterText: {
    width: 30,
    height: 29,
  },
  iconFilterImage: {
    width: 30,
    height: 30,
  },
  iconPost: {
    width: 35,
    height: 30
  },
  iconImageLayout: {
    height: 30,
    width: 30,
    tintColor: YELLOW
  }
});
