import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT, SECONDARY_TEXT, AUX_TEXT } from 'AppColors';
import { HEX_SIZE } from './constants';
export const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFF',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    marginLeft: 5,
    flex: 1,
    flexWrap: 'wrap'
  },
  namesRow: {
    alignItems: 'center'
  },
  actionRow: {
    alignItems: 'center',
    marginTop: 5,
    marginLeft: HEX_SIZE + 10
  },
  username: {
    color: PRIMARY_TEXT,
  },
  voteColumn: {
    alignItems: 'center',
  },
  green: {
    color: 'green',
    fontSize: 18,
    marginTop: 10,
  },
  red: {
    color: 'red',
    fontSize: 18,
    marginTop: 10,
  },
  replyContainer: {
    marginRight: 45,
    flex: 1,
    alignSelf: 'stretch',
  },
  reply: {
    color: PRIMARY_TEXT,
  },
  ago: {
    color: AUX_TEXT,
    flex: 1,
    marginLeft: 10,
    textAlign: 'right'
  },
  seperator: {
    color: AUX_TEXT,
    marginTop: -1,
    marginLeft: 8,
    marginRight: 8,
  },
});
