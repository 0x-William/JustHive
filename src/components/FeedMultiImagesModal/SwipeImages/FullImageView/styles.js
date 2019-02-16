import { StyleSheet } from 'react-native';
import { WHITE, YELLOW } from 'AppColors';
import { CONTAINER_DIMS, VOTED_ICON_CONTAINER_WIDTH } from './constants';
import { WINDOW_WIDTH } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  flex: {
    flex: 1,
  },
  top: {
    height: WINDOW_WIDTH / 3,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: WHITE,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  topText: {
    width: WINDOW_WIDTH - 30,
    left: -21,
  },
  bottom: {
    height: WINDOW_WIDTH / 3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  middle: {
    width: WINDOW_WIDTH,
    flex: 1,
  },
  imgProfileContainer: {
    position: 'absolute',
    bottom: 5,
    left: 5
  },
  imgProfile: {
    width: 15,
    height: 17,
    marginLeft: 5,
    tintColor: YELLOW,
  },
  imgLocation: {
    width: 11,
    height: 17,
    marginRight: 10,
    tintColor: WHITE
  },
  checkedIconContainer: {
    position: 'absolute',
    width: VOTED_ICON_CONTAINER_WIDTH,
    height: VOTED_ICON_CONTAINER_WIDTH,
    borderRadius: VOTED_ICON_CONTAINER_WIDTH,
    backgroundColor: YELLOW,
    left: (CONTAINER_DIMS - VOTED_ICON_CONTAINER_WIDTH) / 2,
    top: (CONTAINER_DIMS - VOTED_ICON_CONTAINER_WIDTH) / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgCheckIcon: {
    width: 36,
    height: 30,
    tintColor: WHITE
  },
});
