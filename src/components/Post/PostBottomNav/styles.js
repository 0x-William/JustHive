import { StyleSheet } from 'react-native';
import { GRAY, WHITE } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: GRAY
  },
  icon: {
    fontSize: 30,
    color: WHITE,
  },
});
