import { StyleSheet } from 'react-native';
import { BG_LIGHT_GRAY } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_LIGHT_GRAY,
    overflow: 'visible'
  },
  surface: {
    marginBottom: 10,
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  }
});
