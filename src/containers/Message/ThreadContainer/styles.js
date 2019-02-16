import { StyleSheet } from 'react-native';
import {
  AUX_TEXT,
  SECONDARY_TEXT,
  LIGHT_TEXT,
  BG_MEDIUM_GRAY,
  PRIMARY_TEXT,
  WHITE
} from 'AppColors';

export const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  iconNewThread: {
    width: 23,
    height: 21,
    tintColor: AUX_TEXT,
  },
  toggleMessageIcon: {
    width: 17,
    height: 16,
    tintColor: SECONDARY_TEXT,
    marginRight: 20,
  },
  toggleAlertIcon: {
    width: 17,
    height: 16,
    tintColor: SECONDARY_TEXT,
    marginRight: 20,
  },
  deletePanelContainer: {
    position: 'absolute',
    height: 40,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: LIGHT_TEXT,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row'
  },
  bottomButton: {
    width: 100,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1 / 2,
    borderColor: BG_MEDIUM_GRAY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnSelectAll: {
    backgroundColor: WHITE
  },
  btnDelete: {
    borderColor: PRIMARY_TEXT,
    backgroundColor: PRIMARY_TEXT
  },
  btnDeleteLabel: {
    color: WHITE
  },
  deletePanelSelectAllView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  deletePanelDeleteView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  leftLabelView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  leftLabelText: {
    fontSize: 12
  },
  rightLabelView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80
  },
  centerLabelText: {
    color: LIGHT_TEXT
  },
  loadingText: {
    textAlign: 'center'
  }
});
