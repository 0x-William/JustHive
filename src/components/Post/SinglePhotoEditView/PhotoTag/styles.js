import { StyleSheet } from 'react-native';
import { WHITE } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 200,
    left: 80,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: WHITE,
    borderRadius: 5,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    borderWidth: 0
  },
  triangle: {
    flexDirection: 'column',
    justifyContent: 'center',
    top: 2,
  },
  removeIcon: {
    top: -7,
    right: 12,
    color: WHITE,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});
