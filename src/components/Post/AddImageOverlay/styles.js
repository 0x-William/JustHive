/**
 * Created by nick on 19/07/16.
 */
import { StyleSheet } from 'react-native';
import { YELLOW, WHITE } from 'AppColors';
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressed: {
    backgroundColor: YELLOW
  },
  button: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: YELLOW,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: WHITE,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
