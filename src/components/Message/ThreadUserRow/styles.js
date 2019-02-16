import { StyleSheet } from 'react-native';
import { LIGHT_TEXT } from 'AppColors';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingVertical: 5,
    borderBottomWidth: 1 / 2,
    borderColor: LIGHT_TEXT,
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 20
  },
});
