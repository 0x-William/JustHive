import { StyleSheet } from 'react-native';
import { AUX_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  row: {
    flexDirection: 'row',
  },
  marginBottom: {
    marginBottom: 20,
  },
  center: {
    alignSelf: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: AUX_TEXT
  },
  boxLeft: {
    paddingRight: 20,
    borderRightWidth: 1,
  },
  boxRight: {
    paddingLeft: 20,
  },
  bio: {
    fontSize: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
