/**
 * Created by nick on 10/06/16.
 */
import { StyleSheet } from 'react-native';
import { YELLOW, PRIMARY_TEXT, WHITE, BG_DARK_GRAY, BG_LIGHT_GRAY } from 'AppColors';
import { CONTAINER_DIMS } from './constants';
export const styles = StyleSheet.create({
  labelSortBy: {
    color: WHITE
  },
  navBarStyle: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  initRightArea: {
    width: 40
  },
  rightAreaContainer: {
    justifyContent: 'flex-end',
    marginRight: 10
  },
  labelActiveHeatMap: {
    color: YELLOW,
  },
  labelHeatMap: {
    color: PRIMARY_TEXT,
    lineHeight: 22,
    height: 30,
    textAlign: 'center',
  },
  labelDeActiveHeatMap: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: PRIMARY_TEXT,
    paddingHorizontal: 8,
  },
  iconMenu: {
    marginLeft: 12,
    tintColor: YELLOW,
    width: 20,
    height: 16
  },
  navBarCommentIcon: {
    marginLeft: 15,
    marginRight: 5,
    width: 20,
    height: 18,
    tintColor: PRIMARY_TEXT,
  },
  iconCheck: {
    fontSize: 23,
    color: PRIMARY_TEXT,
    marginRight: 5
  },
  rectContainer: {
    flexDirection: 'column',
    width: 30,
    height: 30,
  },
  rectRow: {
    flexDirection: 'row',
    flex: 1,
  },
  fillRect: {
    backgroundColor: PRIMARY_TEXT
  },
  rect: {
    flex: 1,
    borderColor: YELLOW,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1
  },

});
