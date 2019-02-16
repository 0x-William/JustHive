/**
 * Created by nick on 19/07/16.
 */
import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from 'AppConstants';
import { WHITE, YELLOW } from 'AppColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: WINDOW_WIDTH,
  },
  blackSpacer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  textInput: {
    height: 100,
    fontSize: 40,
    color: WHITE,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  peoplePlaceholder: {
    color: WHITE
  },
  closeIcon: {
    position: 'absolute',
    top: -110,
    right: -10,
    color: WHITE,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10
  },
  googlePlacesContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 110,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  currentLocationIcon: {
    marginRight: 10,
    color: YELLOW
  },
  currentLocationText: {
    color: WHITE
  },
  currentLocationView: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightToIcon: {
    color: WHITE
  },
  focusedInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    color: WHITE,
    borderStyle: 'dashed',
    borderColor: WHITE
  },
  panView: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
    backgroundColor: 'white'
  }
});

export const googlePlacesStyles = {
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
  },
  textInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderBottomWidth: 0
  },
  description: {
    color: WHITE
  },
  row: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  listView: {
    top: 50
  }
};
