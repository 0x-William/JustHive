import React, { PropTypes } from 'react';
import { View, TextInput, Text } from 'react-native';
import { styles } from './styles';

export const PostInput = ({ onChangeText }) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      enter your description or question
    </Text>
    <TextInput
      style={styles.input}
      multiline={true}
      height={100}
      placeholder="Description..."
      onChangeText={onChangeText}
    />
  </View>
);

PostInput.propTypes = {
  onChangeText: PropTypes.func.isRequired
};
