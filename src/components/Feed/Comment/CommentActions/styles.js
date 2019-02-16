import { StyleSheet } from 'react-native';
import { YELLOW, AUX_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    width: 45,
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginLeft: 5,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  voteImage: {
    marginLeft: 10,
    width: 18,
    height: 19
  },
  imageTintColor: {
    tintColor: YELLOW
  },
  colorWithType: {
    flex: 1,
    color: YELLOW,
    textAlign: 'right'
  },
  colorWithoutType: {
    flex: 1,
    color: AUX_TEXT,
    textAlign: 'right'
  }
});
