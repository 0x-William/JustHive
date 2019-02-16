import React, { PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { LabelText } from 'AppFonts';
import moment from 'moment/src/moment';
import { SECONDARY_TEXT, YELLOW } from 'AppColors';
import { styles } from './styles';

export const PostTimerBlock = ({ onPress, timer }) => {
  const fields = ['days', 'weeks', 'hours', 'min'];
  // all fields have to undefined or 0 if NO timer
  const isTimerAvailable = fields.every(field => !timer[field]);

  let endDate;
  let remainedTime;
  let tintColor = SECONDARY_TEXT;
  if (!isTimerAvailable) {
    const { weeks, days, hours, min } = timer;
    endDate = moment().add(weeks, 'w').add(days, 'd').add(hours, 'h').add(min, 'm');
    remainedTime = moment(endDate).fromNow().toString();
    tintColor = YELLOW;
  }
  return (
    <View style={styles.container}>
      <View style={ styles.buttonView }>
        <TouchableOpacity onPress={onPress}>
          <LabelText style={styles.content}>
            POST TIMER
          </LabelText>
        </TouchableOpacity>
      </View>
      <View style={ styles.remainedView }>
        {
          !isTimerAvailable &&
            <LabelText style={styles.timer}>
              - {remainedTime}
            </LabelText>
        }
      </View>
      <View style={styles.iconContainer}>
        <Image
          source={require('img/icons/icon_waiting.png')}
          style={[styles.iconWaiting, { tintColor }]}
        />
      </View>
    </View>
  );
};

PostTimerBlock.propTypes = {
  onPress: PropTypes.func.isRequired,
  timer: PropTypes.shape({
    days: PropTypes.number,
    weeks: PropTypes.number,
    hours: PropTypes.number,
    min: PropTypes.number
  })
};
