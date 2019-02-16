import React, { PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import moment from 'moment/src/moment';
import { HexagonImage } from 'AppComponents';
import { LabelText, AuxText } from 'AppFonts';
import { AutoLinkTextView } from './AutoLinkTextView';
import { styles } from './styles';

const renderDate = (time) => (
  <View style={styles.dateContainer}>
    <LabelText fontSize={12} style={styles.labelDate}>
      {moment(time).format('LL')}
    </LabelText>
  </View>
);

const renderSenderMessage = (message) => (
  <View style={styles.container}>
    <View style={styles.senderMessageContainer}>
      <View style={styles.senderMessageArea}>
        <AutoLinkTextView style={styles.message} text={message.message}/>
      </View>
      <View>
        <View style={styles.senderUpTriangle} />
        <View style={[styles.senderUpTriangle, styles.senderUpTriangleBorder]} />
        <View style={styles.senderDownTriangle} />
        <View style={[styles.senderDownTriangle, styles.senderDownTriangleBorder]} />
        <View style={styles.senderExtraArea} />
      </View>
    </View>
    <TouchableOpacity>
      <HexagonImage
        imageWidth={35}
        imageHeight={35}
        border={true}
        isHorizontal={true}
        size={30}
        imageSource={{ uri: message.createdBy.avatarUrl }}
      />
    </TouchableOpacity>
  </View>
);

const renderReceiverMessage = (message) => (
  <View style={styles.container}>
    <TouchableOpacity >
      <HexagonImage
        imageWidth={35}
        imageHeight={35}
        border={true}
        isHorizontal={true}
        size={30}
        imageSource={{ uri: message.createdBy.avatarUrl }}
      />
    </TouchableOpacity>
    <View style={styles.receiverMessageContainer}>
      <View>
        <View style={styles.receiverTopTriangle} />
        <View style={[styles.receiverTopTriangle, styles.receiverTopTriangleBorder]} />
        <View style={styles.receiverDownTriangle} />
        <View style={[styles.receiverDownTriangle, styles.receiverDownTriangleBorder]} />
        <View style={styles.receiverExtraArea} />
      </View>
      <View style={styles.receiveMessageArea}>
        <AutoLinkTextView style={styles.message} text={message.message}/>
      </View>
    </View>
  </View>
);

const renderTime = (time, isSender) => {
  const style = isSender ? styles.currentUserSendTime : styles.otherUserSendTime;
  const formattedTime = moment(time).format('LT');
  return (
    <View style={[styles.timeContainer, style]}>
      <AuxText style={ styles.timeText }>{formattedTime}</AuxText>
    </View>
  );
}

export const Message = ({ userId, routeLink, current, before, after }) => {
  const { createdBy, updatedAt } = current;
  let flagShowDate = false;
  if (!before || !moment(before.updatedAt).isSame(moment(updatedAt), 'day')) {
    flagShowDate = true;
  }

  let flagShowTime = false;
  if (after && after.createdBy._id === current.createdBy._id) {
    const afterDiff = moment(after.updatedAt).diff(moment(updatedAt), 'minutes');
    if (afterDiff > 3) {
      flagShowTime = true;
    }
  } else {
    flagShowTime = true;
  }

  return (
    <View style={ styles.messageContainer }>
      {flagShowDate && renderDate(updatedAt)}
      {createdBy._id === userId && renderSenderMessage(current)}
      {createdBy._id !== userId && renderReceiverMessage(current)}
      {flagShowTime && renderTime(updatedAt, createdBy._id === userId)}
    </View>
  );
};

Message.propTypes = {
  userId: PropTypes.string.isRequired,
  routeLink: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
  before: PropTypes.object,
  after: PropTypes.object,
};
