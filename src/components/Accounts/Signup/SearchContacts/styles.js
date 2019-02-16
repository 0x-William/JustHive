import { StyleSheet } from 'react-native';
import {
  WHITE,
  SEMI_OPAQUE_BG,
  BORDER_GRAY,
  GRAY,
  YELLOW
} from 'AppColors';
import { WINDOW_HEIGHT } from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    height: WINDOW_HEIGHT
  },
  followAll: {
    width: 100,
    height: 30
  },
  followText: {
    color: GRAY,
    fontWeight: 'bold'
  },
  loader: {
    marginTop: 50
  },
  followLabel: {
    fontSize: 12,
    color: SEMI_OPAQUE_BG,
    fontWeight: 'bold'
  },
  header: {
    marginTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: BORDER_GRAY
  },
  listView: {
    height: WINDOW_HEIGHT,
  },
  rowContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    alignItems: 'center',
    borderBottomColor: BORDER_GRAY
  },
  rowTextContent: {
    flexDirection: 'column'
  },
  rowSecondaryText: {
    color: SEMI_OPAQUE_BG,
    fontSize: 10
  },
  rowAddIcon: {
    width: 20,
    height: 20
  },
  rowAddButtonContainer: {
    borderColor: BORDER_GRAY
  },
  rowActionButton: {
    borderColor: SEMI_OPAQUE_BG,
    width: 70,
    height: 30,
    borderWidth: 0.4
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  following: {
    backgroundColor: YELLOW
  },
  hexagonImageMarginRight: {
    marginRight: 10
  }
});
