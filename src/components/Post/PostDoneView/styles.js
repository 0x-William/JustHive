import { StyleSheet } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'AppConstants';
import { WHITE, YELLOW, BLACK, BG_DARK_GRAY } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
    flex: 1,
  },
  hexagonGrid: {
    position: 'absolute',
    backgroundColor: BG_DARK_GRAY

  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: WINDOW_HEIGHT
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: -5,
  },
  title: {
    textAlign: 'center',
    color: WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  separator: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '200'
  },
  button: {
    borderRadius: 5,
    padding: 7,
    borderWidth: 1,
    borderColor: YELLOW
  },
  buttonText: {
    color: WHITE,
    fontWeight: 'bold'
  },
  pressed: {
    backgroundColor: YELLOW
  },
  beeIcon: {
    position: 'absolute',
    width: 50,
    left: WINDOW_WIDTH / 2 - 25
  },
  wonderfull: {
    position: 'absolute',
    marginTop: 3000,
    flexDirection: 'column',
    justifyContent: 'center',
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
  wonder_full_post: {
    color: BLACK,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
