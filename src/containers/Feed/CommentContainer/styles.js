import { StyleSheet } from 'react-native';
import { NAVBAR_HEIGHT } from 'AppConstants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: NAVBAR_HEIGHT,
  },
  absolute: {
    position: 'absolute',
  },
  white: {
    backgroundColor: '#FFF',
  },
  arrowContainer: {
    position: 'absolute',
    marginLeft: 65,
  }
});
