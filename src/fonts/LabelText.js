import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { GRAY } from 'AppColors';

const styles = StyleSheet.create({
  text: {
    color: GRAY,
    fontSize: 13,
    fontFamily: 'Panton-Semibold',
  }
});

export function LabelText({
  children,
  style,
  upperCase,
  fontWeight,
  fontSize,
  numberOfLines,
  placeholder
}) {
  const label = upperCase ? children.toUpperCase() : children;
  return (
    <Text
      style={[styles.text, style, { fontWeight, fontSize }]}
      numberOfLines={numberOfLines}
      placeholder={placeholder}
    >
      {label}
    </Text>
  );
}

LabelText.propTypes = {
  children: PropTypes.any.isRequired,
  style: Text.propTypes.style,
  upperCase: PropTypes.bool,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.number.isRequired,
  numberOfLines: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
};

LabelText.defaultProps = {
  upperCase: false,
  fontSize: 13,
  numberOfLines: 1
};
