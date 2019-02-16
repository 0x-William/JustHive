import { StyleSheet } from 'react-native';
import { PRIMARY_TEXT, YELLOW, BG_LIGHT_GRAY, LIGHT_TEXT, LIGHT_YELLOW } from 'AppColors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  dateContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelDate: {
    color: PRIMARY_TEXT
  },
  senderMessageContainer: {
    flex: 1,
    marginRight: -5,
    flexDirection: 'row'
  },
  receiverMessageContainer: {
    flex: 1,
    marginLeft: -5,
    flexDirection: 'row'
  },
  receiveMessageArea: {
    flex: 1,
    paddingHorizontal: 10,
    marginRight: 20,
    alignSelf: 'stretch',
    backgroundColor: BG_LIGHT_GRAY,
    borderColor: LIGHT_TEXT,
    borderWidth: 1,
    borderLeftWidth: 0,
    justifyContent: 'center',
  },
  senderMessageArea: {
    flex: 1,
    paddingHorizontal: 10,
    marginLeft: 20,
    alignSelf: 'stretch',
    backgroundColor: LIGHT_YELLOW,
    borderColor: YELLOW,
    borderWidth: 1,
    borderRightWidth: 0,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  message: {
    marginVertical: 5,
    color: PRIMARY_TEXT,
    fontFamily: 'Panton-Semibold',
    lineHeight: 20,
  },
  senderUpTriangle: {
    borderWidth: 0,
    borderColor: 'transparent',
    borderLeftWidth: 0,
    borderTopColor: YELLOW,
    borderTopWidth: 15,
    borderRightWidth: 10,
  },
  senderUpTriangleBorder: {
    position: 'absolute',
    left: -2,
    top: 1,
    borderTopColor: LIGHT_YELLOW,
  },
  senderDownTriangle: {
    position: 'absolute',
    left: 0,
    top: 13,
    borderWidth: 0,
    borderColor: 'transparent',
    borderTopWidth: 16,
    borderLeftWidth: 10,
    borderLeftColor: YELLOW,
  },
  senderDownTriangleBorder: {
    left: -1,
    top: 14,
    borderTopWidth: 15,
    borderLeftWidth: 10,
    borderLeftColor: LIGHT_YELLOW,
  },
  senderExtraArea: {
    position: 'absolute',
    left: -1,
    top: 29,
    bottom: 0,
    width: 11,
    backgroundColor: LIGHT_YELLOW,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderColor: YELLOW,
  },

  receiverTopTriangle: {
    borderWidth: 0,
    borderColor: 'transparent',
    borderBottomWidth: 15,
    borderRightWidth: 10,
    borderRightColor: LIGHT_TEXT,
  },
  receiverTopTriangleBorder: {
    position: 'absolute',
    right: -2,
    top: 1,
    borderRightColor: BG_LIGHT_GRAY,
  },
  receiverDownTriangle: {
    position: 'absolute',
    right: 0,
    top: 13,
    borderWidth: 0,
    borderColor: 'transparent',
    borderBottomWidth: 16,
    borderLeftWidth: 10,
    borderBottomColor: LIGHT_TEXT,
  },
  receiverDownTriangleBorder: {
    right: -1,
    top: 14,
    borderBottomWidth: 15,
    borderLeftWidth: 10,
    borderBottomColor: BG_LIGHT_GRAY,
  },
  receiverExtraArea: {
    position: 'absolute',
    right: -1,
    top: 29,
    bottom: 0,
    width: 11,
    backgroundColor: BG_LIGHT_GRAY,
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: LIGHT_TEXT,
  },
  timeContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  currentUserSendTime: {
    alignItems: 'flex-end'
  },
  otherUserSendTime: {
    alignItems: 'flex-start'
  },
  timeText: {
    fontSize: 10
  },
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 5
  }
});
