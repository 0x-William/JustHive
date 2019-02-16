import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT, SECONDARY_TEXT, AUX_TEXT, YELLOW } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowPrimary: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 18,
    color: PRIMARY_TEXT,
  },
  description: {
    color: SECONDARY_TEXT,
    fontSize: 15,
  },
  icon: {
    fontSize: 30,
    color: YELLOW,
  },
  username: {
    marginLeft: 15,
    color: PRIMARY_TEXT,
  },
  votes: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  voteText: {
    marginLeft: 5,
    color: PRIMARY_TEXT,
    fontWeight: 'bold',
  },
  ago: {
    paddingTop: 5,
    paddingBottom: 5,
    color: AUX_TEXT,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  metaContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  }
});
