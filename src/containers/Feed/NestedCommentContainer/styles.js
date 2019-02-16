import { StyleSheet } from 'react-native';
import { WHITE } from 'AppColors';
import { NAVBAR_HEIGHT } from 'AppConstants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: WHITE
  },
  modalContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: WHITE,
    marginTop: 20,
    marginBottom: NAVBAR_HEIGHT,
  },
  iconCommentPlaceholder: {
    width: 15,
    height: 13
  },
  arrowContainer: {
    position: 'absolute',
    marginLeft: 65,
  }
});
