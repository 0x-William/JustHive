/**
 * Created by nick on 14/06/16.
 */
import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT, WHITE, BG_OFF_GRAY, SECONDARY_TEXT, AUX_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: BG_OFF_GRAY,
    alignSelf: 'stretch',
    opacity: 0.6
  },
  viewContainer: {
    position: 'absolute',
    left: 30,
    right: 30,
    top: 80,
    bottom: 80,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: WHITE,
    borderColor: WHITE,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 5,
  },
  title: {
    color: PRIMARY_TEXT,
    marginTop: 5
  },
  subtitle: {
    color: AUX_TEXT,
    marginTop: 5
  },
  comment: {
    color: SECONDARY_TEXT,
    marginTop: 5
  },
  touchable: {
    flex: 1
  },
  rowView: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  columnView: {
    flexDirection: 'column'
  },
  closeView: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-end'
  },
  close: {
    marginLeft: 5
  }
});
