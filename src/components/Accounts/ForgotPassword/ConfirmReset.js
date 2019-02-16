import React, { PropTypes } from 'react';
import { View } from 'react-native';

import { ActionButton } from 'AppButtons';
import { AuxText } from 'AppFonts';
import { styles } from '../styles';

export function ConfirmReset({ onBack }) {
  return (
    <View style={styles.container}>
      <View style={styles.adjustTop}>
        <View style={[styles.space, styles.alignMiddle]}>
          <AuxText upperCase={false} style={[styles.alertLabel, styles.space]}>
            Sent!
          </AuxText>
          <AuxText upperCase={false}>Check your email to recover your information.</AuxText>
        </View>
        <ActionButton
          label="BACK"
          isActive={true}
          onPress={onBack}
          style={styles.space}
        />
      </View>
    </View>
  );
}

ConfirmReset.propTypes = {
  onBack: PropTypes.func.isRequired,
};
