import { StyleSheet } from 'react-native';
import { WHITE, BG_LIGHT_GRAY, GRAY, AUX_TEXT } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_LIGHT_GRAY,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingLeft: 10,
    paddingTop: 8,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: GRAY,
    fontFamily: 'Panton-Semibold',
  },
  iconUser: {
    marginLeft: 10,
    width: 21,
    height: 25,
    marginRight: 10,
    tintColor: AUX_TEXT
  },
  imgLocation: {
    marginLeft: 10,
    width: 17,
    height: 25,
    marginRight: 10,
    tintColor: AUX_TEXT
  },
});
