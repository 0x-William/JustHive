import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import { HorizontalRuler } from 'AppComponents';
import { AuxText } from 'AppFonts';

const height = 50;
const padding = height / 5;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding,
    height,
    marginTop: padding * 2,
  }
});

export function SettingHeader({ label }) {
  return (
    <View>
      <View style={styles.row}>
        <AuxText>{label.toUpperCase()}</AuxText>
      </View>
      <HorizontalRuler />
    </View>
  );
}

SettingHeader.propTypes = {
  label: PropTypes.string.isRequired,
};
