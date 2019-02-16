import { StyleSheet } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'AppConstants';
import { WHITE, GRAY, BG_MEDIUM_GRAY, YELLOW, PRIMARY_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(63, 70, 76, 0.8)',
    height: WINDOW_HEIGHT
  },
  label: {
    textAlign: 'center',
    color: WHITE,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30
  },
  rowInput: {
    backgroundColor: 'rgba(217 ,217 ,217 , 0.9)',
    height: 50,
    fontSize: 20,
    width: WINDOW_WIDTH - (WINDOW_WIDTH / 8),
    borderRadius: 5,
    color: BG_MEDIUM_GRAY,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  focused: {
    borderWidth: 2,
    borderColor: WHITE,
    backgroundColor: GRAY,
    color: YELLOW
  },
  leftLabelView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  leftLabelText: {
    color: PRIMARY_TEXT
  },
  rightLabelView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80
  },
  rightLabelText: {
    color: PRIMARY_TEXT
  },
  centerLabelText: {
    color: PRIMARY_TEXT
  }
});
