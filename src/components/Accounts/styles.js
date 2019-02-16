import { StyleSheet } from 'react-native';
import {
  YELLOW,
  WHITE,
  AUX_TEXT,
  PRIMARY_TEXT,
  SECONDARY_TEXT,
  LIGHT_TEXT,
  GRAY,
} from 'AppColors';

import {
  WINDOW_WIDTH as width,
  WINDOW_HEIGHT as height,
} from 'AppConstants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  space: {
    marginBottom: height / 30,
  },
  adjustTop: {
    top: height / 24,
  },
  alignMiddle: {
    alignItems: 'center',
  },
  goldButton: {
    backgroundColor: YELLOW,
    width,
    height: height / 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    justifyContent: 'center',
  },
  twoInputs: {
    width: width * 3 / 4,
    justifyContent: 'space-between'
  },
  icon: {
    color: AUX_TEXT,
    fontSize: 20,
    marginRight: 10,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: height / 12
  },
  terms: {
    borderTopWidth: 1,
    borderColor: AUX_TEXT,
    paddingTop: height / 24,
    paddingBottom: height / 24,
    width: width * 5 / 6,
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderColor: SECONDARY_TEXT
  },
  input: {
    width: width * 3 / 4,
    height: height / 20,
    color: WHITE,
    fontSize: 15,
    fontFamily: 'Panton-Semibold',
  },
  inputHalf: {
    width: width * 3 / 8 - 10,
  },
  inputTextCenter: {
    textAlign: 'center',
  },
  errorText: {
    color: SECONDARY_TEXT,
    top: height / 20 + 3
  },
  picker: {
    height: height / 3,
  },
  lightText: {
    color: LIGHT_TEXT
  },
  primaryText: {
    color: PRIMARY_TEXT
  },
  fitLabel: {
    textAlign: 'center',
    width: width * 3 / 4
  },
  containerLabel: {
    color: WHITE,
    fontSize: 19
  },
  alertLabel: {
    color: WHITE,
    fontSize: 28
  },
  signupHeaderLabel: {
    color: AUX_TEXT,
    fontSize: 25,
  },
  noteLabel: {
    fontSize: 11
  },
  innerSpacing: {
    paddingVertical: 10
  },
  innerSpacingHoriz: {
    paddingHorizontal: 10
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 20
  },
  phoneCode: {
    fontSize: 30,
    letterSpacing: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
    textDecorationColor: WHITE
  },
  floatRight: {
    position: 'absolute',
    right: 0
  },
  noPadding: {
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  topics: {
    width,
  },
  topicsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'center'
  },
  loading: {
    flex: 1
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteText: {
    color: 'white',
    fontSize: 20
  },
  whiteNormal: {
    color: WHITE
  }
});

export const topicStateStyles = {
  selected: {
    borderWidth: 1,
    borderColor: YELLOW,
    opacity: 0.5,
    textColor: YELLOW
  },
  default: {
    borderWidth: 1,
    borderColor: SECONDARY_TEXT,
    textColor: WHITE,
  },
};

export const googlePlacesStyles = {
  container: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 0
  },
  textInputContainer: {
    borderTopWidth: 0,
    borderBottomColor: SECONDARY_TEXT,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: width * 3 / 4,
    height: height / 20,
    color: WHITE,
    fontSize: 15,
    fontFamily: 'Panton-Semibold',
    marginRight: 0,
    marginTop: 0,
    marginLeft: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  description: {
    color: WHITE
  },
  listView: {
    width: width * 3 / 4,
  },
  row: {
    width: width * 3 / 4,
  }
};
