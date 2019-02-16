import { StyleSheet } from 'react-native';
import { SECONDARY_TEXT, YELLOW } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    color: 'white',
    fontSize: 10,
    backgroundColor: SECONDARY_TEXT,
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 5
  },
  icon: {
    color: SECONDARY_TEXT
  },
  iconYellow: {
    color: YELLOW
  },
  timer: {
    alignSelf: 'center'
  },
  voting: {
    color: SECONDARY_TEXT,
    fontWeight: 'bold',
    fontSize: 10
  },
  iconWaiting: {
    tintColor: SECONDARY_TEXT,
    width: 15,
    height: 25,
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20
  },
  buttonView: {
    flex: 1.3
  },
  remainedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
