import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000',
    flexDirection: 'column',
  },
  topBarContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  likeAreaContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
  },
  arrowContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 38,
  },
  modalClose: {
    marginRight: 10,
    marginVertical: 3
  }
});
