/**
 * Created by nick on 11/06/16.
 */
import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT, WHITE, BG_OFF_GRAY } from 'AppColors';
import { NAVBAR_HEIGHT } from 'AppConstants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignSelf: 'stretch',
    flexDirection: 'column'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: WHITE,
    alignSelf: 'stretch',
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: NAVBAR_HEIGHT,
  },
  headerStyle: {
    height: 15,
    flexDirection: 'row'
  },
  headerLabel: {
    marginLeft: 10,
    color: BG_OFF_GRAY
  },
  headerImage: {
    width: 12,
    height: 9,
    marginLeft: 5
  },
  inputContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: WHITE,
    borderRadius: 5,
    padding: 5
  },
  inputStyle: {
    flex: 1,
    marginHorizontal: 5,
    fontSize: 15,
    fontFamily: 'Panton-Semibold'
  },
  bottomArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    height: 30,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: WHITE
  },
  bottomAreaView: {
    flex: 1,
    marginLeft: 10,
    paddingTop: 5
  },
  buttonStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'transparent'
  },
  buttonLabel: {
    paddingHorizontal: 13,
    margin: 1,
    height: 24,
    lineHeight: 20,
    color: WHITE,
    backgroundColor: PRIMARY_TEXT,
    borderColor: PRIMARY_TEXT,
    borderRadius: 5,
  },
  imageStyle: {
    width: 23,
    height: 19
  },
});
