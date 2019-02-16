import { StyleSheet } from 'react-native';
import { AUX_TEXT } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
  },
  centerSelf: {
    alignSelf: 'center'
  },
  arrow: {
    top: 10,
    alignSelf: 'flex-start',
    width: WINDOW_WIDTH / 2,
    flex: 1,
    left: 1,
    borderRightWidth: 1,
    borderColor: AUX_TEXT,
  },
  settingsIcon: { height: 25, width: 25 },
  dashboardIcon: { height: 27, width: 50 },
  colonyIcon: { height: 30, width: 30 },
  groupsIcon: { height: 27, width: 50 },
  followedIcon: { height: 25, width: 28 },
  followIcon: { height: 25, width: 28 },
  messageIcon: { height: 27, width: 30 },
  alertIcon: { height: 30, width: 30 },
});
