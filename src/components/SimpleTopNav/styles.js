import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'space-between'
  },
  button: {
    width: 50,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBack: {
    height: 20,
    width: 12
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
