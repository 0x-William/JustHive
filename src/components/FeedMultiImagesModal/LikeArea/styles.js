import { StyleSheet } from 'react-native';
import { AUX_TEXT, YELLOW, BG_LIGHT_GRAY } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: BG_LIGHT_GRAY,
  },
  button: {
    alignItems: 'center',
    marginRight: 15,
    flexDirection: 'row',
  },
  voteIcon: {
    width: 19,
    height: 20,
  },
  commentIcon: {
    width: 22,
    height: 20,
  },
  shareIcon: {
    width: 25,
    height: 20,
  },
  countIcon: {
    width: 19,
    height: 20.5,
    tintColor: YELLOW,
    marginRight: 5
  },
  label: {
    marginLeft: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: AUX_TEXT,
    textAlign: 'center',
    width: 20,
  },
  expires: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  expireText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: AUX_TEXT,
  },
});
