import { StyleSheet } from 'react-native';
import { BG_LIGHT_GRAY, GRAY, YELLOW } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_LIGHT_GRAY,
    overflow: 'visible',
  },
  option: {
    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  text: {
    fontSize: 30,
  },
  selectedFilter: {
    borderColor: YELLOW,
    borderWidth: 2,
  }
});
