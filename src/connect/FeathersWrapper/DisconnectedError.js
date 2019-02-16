import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const DisconnectedError = () => (
  <View style={styles.disconnectedContainer}>
    <Text style={[styles.disconnectedText, styles.disconnectedTitle]}>An error occurred.</Text>
    <Text style={styles.disconnectedText}>
      Please check your internet connection and try again.
    </Text>
  </View>
);
