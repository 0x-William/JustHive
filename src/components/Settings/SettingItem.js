import React, { PropTypes } from 'react';
import { View, TouchableHighlight, StyleSheet, Switch } from 'react-native';
import { LabelText } from 'AppFonts';
import { HorizontalRuler } from 'AppComponents';
import { YELLOW } from 'AppColors';

const height = 50;
const padding = height / 5;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding,
    height,
  },
  arrow: {
    fontSize: padding * 2.2,
    color: '#B1B1B1',
  },
});

export function SettingItem({ label, onPress, switchItem, onValueChange, switchValue }) {
  return (
    <View>
      {switchItem ? (
        <View style={styles.row}>
          <LabelText>{label}</LabelText>
          <Switch onValueChange={onValueChange} value={switchValue} />
        </View>
      ) : (
        <TouchableHighlight onPress={onPress} underlayColor={YELLOW}>
          <View style={styles.row}>
            <LabelText>{label}</LabelText>
            <LabelText style={styles.arrow}>></LabelText>
          </View>
        </TouchableHighlight>
      )}
      <HorizontalRuler />
    </View>
  );
}

SettingItem.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  onValueChange: PropTypes.func,
  switchItem: PropTypes.bool.isRequired,
  switchValue: PropTypes.bool,
};

SettingItem.defaultProps = {
  switchItem: false,
  switchValue: false,
};
