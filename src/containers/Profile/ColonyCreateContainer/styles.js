import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
  },
  whiteBack: {
    backgroundColor: 'white'
  },
  label: {
    width: WINDOW_WIDTH / 3,
  },
  privateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WINDOW_WIDTH / 4,
    marginVertical: 20,
  },
  center: {
    alignSelf: 'center',
  }
});
