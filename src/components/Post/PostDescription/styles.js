import { StyleSheet } from 'react-native';
import { WHITE, SECONDARY_TEXT, GRAY } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
export const styles = StyleSheet.create({
  postDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  postImage: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3
  },
  description: {
    flex: 1,
    marginLeft: 20,
    fontSize: 13,
    lineHeight: 15,
    color: GRAY,
    fontFamily: 'Panton-Semibold',
    padding: 10,
    backgroundColor: 'white'
  },
  typeContainer: {
    marginTop: 10,
    padding: 7,
    backgroundColor: SECONDARY_TEXT,
    flexDirection: 'row',
    borderRadius: 2,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  type: {
    color: WHITE
  },
  iconEdit: {
    tintColor: WHITE,
    width: 16,
    height: 13,
  }
});
