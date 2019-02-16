import { StyleSheet } from 'react-native';
import { STATUSBAR_HEIGHT } from 'AppConstants';
import { WHITE, BG_GRAY_NORMAL, AUX_TEXT, SECONDARY_TEXT, LIGHT_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_GRAY_NORMAL,
    marginTop: -STATUSBAR_HEIGHT
  },
  content: {
    padding: 10
  },
  topRightIcon: {
    color: WHITE
  },
  titleContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
  title: {
    color: SECONDARY_TEXT,
    fontFamily: 'Panton-Semibold',
  },
  complete: {
    backgroundColor: SECONDARY_TEXT,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  completeText: {
    color: WHITE,
    fontSize: 15
  },
  iconBackward: {
    width: 9,
    height: 15,
    tintColor: AUX_TEXT,
  },
  navBarLeftLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  navBarCenterLabel: {
    color: LIGHT_TEXT
  }
});
