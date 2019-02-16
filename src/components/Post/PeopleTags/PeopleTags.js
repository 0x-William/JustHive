import React, { PropTypes } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const PeopleTags = ({
  tag,
  onRemove,
  left,
  top
}) => (
  <View style={[styles.container, { left, top }]}>
    <Text style={styles.tag}>
      {tag}
    </Text>
    <TouchableWithoutFeedback onPress={onRemove}>
      <Icon name="highlight-off" size={20} style={styles.removeIcon} />
    </TouchableWithoutFeedback>
  </View>
);

PeopleTags.propTypes = {
  tag: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired
};
