import { StyleSheet } from 'react-native';
import { GRAY, WHITE } from 'AppColors';
import { WINDOW_HEIGHT as height } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    height: height / 12,
    backgroundColor: "rgba(0, 0, 0, 0)",
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 30,
    color: WHITE
  },
  actionRightButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  marginLeft: {
    marginLeft: 10
  }
});
