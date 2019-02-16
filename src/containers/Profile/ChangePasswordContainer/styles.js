import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from 'AppConstants';
import { GRAY, YELLOW, SECONDARY_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  form: {
    borderTopWidth: 0,
  },
  label: {
    fontSize: 12,
    width: WINDOW_WIDTH * 0.35,
  },
  inputIcon: {
    padding: 5,
  },
  submit: {
    borderColor: YELLOW,
    backgroundColor: 'white',
    margin: 20,
    marginBottom: 0,
  },
  submitLabel: {
    color: GRAY
  },
  forgotPassword: {
    margin: 20,
  },
});
