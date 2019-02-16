import { StyleSheet } from 'react-native';
import { GRAY, WHITE, BLACK } from 'AppColors';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  subContainer: {
    marginTop: WINDOW_HEIGHT / 5,
    marginLeft: WINDOW_WIDTH / 4,
    width: WINDOW_WIDTH / 2,
    backgroundColor: 'black',
    borderRadius: 2,
    padding: 10,
    borderWidth: 1 / 2,
    borderColor: WHITE
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 30
  },
  queryInput: {
    fontSize: 15,
    padding: 4,
    color: WHITE,
    borderRadius: 2,
    backgroundColor: GRAY,
    height: 25,
    marginBottom: 20
  },
  listViewContainer: {
    height: WINDOW_HEIGHT / 5
  },
  listView: {
    height: WINDOW_HEIGHT / 5
  },
  personName: {
    color: WHITE,
    fontWeight: 'bold',
  },
  personAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10
  },
  closeIconContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  closeButton: {
    color: WHITE,
  },
});
