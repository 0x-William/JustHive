import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SECONDARY_TEXT } from 'AppColors';

const lineHeight = 18;
const fontSize = 12;
const styles = StyleSheet.create({
  comment: {
    fontSize,
    lineHeight,
    color: SECONDARY_TEXT,
    fontFamily: 'Panton-Semibold',
  },
});

export function CommentText({ children, style, maxLine, showMore }) {
  return (
    <Text
      style={[styles.comment, style]}
      numberOfLines={maxLine}
      onPress={showMore}
    >
      {children}
    </Text>
  );
}

CommentText.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.number,
  showMore: PropTypes.func.isRequired,
  maxLine: PropTypes.number,
  maxLength: PropTypes.number
};

CommentText.defaultProps = {
  showMore: () => console.log('showing more'),
};
