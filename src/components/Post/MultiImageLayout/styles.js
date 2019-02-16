/**
 * Created by nick on 20/07/16.
 */
import { StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from 'AppConstants';
import { WHITE, PRIMARY_TEXT, LIGHT_TEXT, AUX_TEXT } from 'AppColors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH,
  },
  labelOrientation: {
    color: WHITE
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  rightBorder: {
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: WHITE,
  },
  bottomBorder: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: WHITE,
  },
  bottomLabel: {
    color: WHITE,
    marginTop: 5
  },
  imageDeleteArea: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    backgroundColor: PRIMARY_TEXT,
    borderRadius: 20,
    borderColor: WHITE,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageBottomArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  labelImageTitle: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center'
  },
  iconEditImage: {
    marginHorizontal: 10,
    justifyContent: 'center'
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    width: WINDOW_WIDTH / 2 - 0.5,
    height: WINDOW_WIDTH / 2 - 0.5
  },
  emptyImageContainer: {
    backgroundColor: LIGHT_TEXT,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyImage: {
    width: WINDOW_WIDTH / 5,
    height: WINDOW_WIDTH / 5,
    tintColor: AUX_TEXT
  },
  orientationChange: {
    marginLeft: 20
  },
  imageLayout: {
    flex: 1
  },
  iconCancel: {
    width: 10,
    height: 10,
    tintColor: WHITE
  },
  imageTitle: {
    color: WHITE
  },
  iconEdit: {
    width: 16,
    height: 13,
    tintColor: WHITE
  }
});
