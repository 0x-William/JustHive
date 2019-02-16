import { StyleSheet } from 'react-native';
import { YELLOW, PRIMARY_TEXT, AUX_TEXT } from 'AppColors';
export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    fontSize: 30,
  },
  iconPressed: {
    color: 'tomato',
  },
  container: {
    backgroundColor: '#FFF',
  },
  optionContainer: {
    marginLeft: 10,
    width: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionSelect: {
    width: 18,
    height: 18,
    borderColor: AUX_TEXT,
    borderWidth: 1 / 2,
    borderRadius: 18
  },
  threadContainer: {
    borderBottomWidth: 1 / 2,
    borderBottomColor: AUX_TEXT,
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  participants: {
    flex: 1,
    color: PRIMARY_TEXT,
    flexWrap: 'wrap',
  },
  updatedAt: {
    width: 75,
    fontSize: 12,
    color: AUX_TEXT,
    textAlign: 'right',
  },
  nextIconContainer: {
    width: 45,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  lastMessage: {
    color: PRIMARY_TEXT,
    fontSize: 10,
    lineHeight: 18,
    marginBottom: 5,
  },
  readIndicator: {
    width: 5,
    alignSelf: 'stretch',
    backgroundColor: YELLOW
  },
  readIndicatorView: {
    width: 3,
    flexDirection: 'row'
  },
  iconForward: {
    width: 9,
    height: 15,
    tintColor: AUX_TEXT,
    transform: [{ rotate: '180deg' }],
  },
  lastMessageView: {
    flex: 1
  }
});
