/**
 * Created by nick on 21/06/16.
 */
import { StyleSheet } from 'react-native';
import { WHITE, BG_OFF_GRAY, AUX_TEXT, PRIMARY_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignSelf: 'stretch',
    opacity: 0.6
  },
  dimBackground: {
    backgroundColor: BG_OFF_GRAY,
  },
  viewContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    backgroundColor: WHITE
  },
  searchContainer: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1 / 2,
    borderColor: AUX_TEXT,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: PRIMARY_TEXT
  },
  userListContainer: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: 10,
  },
  userContainer: {
    paddingTop: 5,
    flex: 1,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userLabel: {
    marginTop: 10,
    fontSize: 13,
    color: PRIMARY_TEXT,
    fontWeight: 'bold'
  },
  modalTouchable: {
    flex: 1
  },
  modalSearchImage: {
    width: 20,
    height: 20
  }
});
