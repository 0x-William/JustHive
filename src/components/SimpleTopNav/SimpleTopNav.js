import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { GRAY, WHITE } from 'AppColors';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

const renderLeftRightSide = (label, action, sideFontSize, color, sideWidth) => (
  <TouchableOpacity onPress={action} style={[styles.button, { width: sideWidth }]}>
    {
      typeof label === 'object' ? label :
        <LabelText style={{ color }} fontSize={sideFontSize}>
          {label}
        </LabelText>
    }
  </TouchableOpacity>
);

const renderCenter = (centerLabel, centerFontSize, color) => (
  <View style={ styles.centerView }>
    {
      typeof centerLabel === 'object' ? centerLabel :
        <LabelText style={{ color }} fontWeight="bold" fontSize={centerFontSize}>
          {centerLabel}
        </LabelText>
    }
  </View>
);

const getLeftLabel = (leftLabel, tintColor) => {
  if (!leftLabel) {
    return (
      <Image
        source={require('img/icons/icon_back.png')}
        style={[styles.iconBack, { tintColor }]}
      />
    );
  }
  return leftLabel;
};

export function SimpleTopNav({
  leftLabel,
  rightLabel,
  centerLabel,
  leftAction,
  rightAction,
  backgroundColor,
  sideFontSize,
  centerFontSize,
  color,
  iconBack,
  wrapStyle,
  sideWidth
}) {
  return (
    <View style={[styles.container, { backgroundColor }, wrapStyle]}>
      {leftLabel || iconBack ?
        renderLeftRightSide(
          getLeftLabel(leftLabel, color), leftAction, sideFontSize, color, sideWidth
        ) :
        <View style={styles.button} />
      }
      {centerLabel ? renderCenter(centerLabel, centerFontSize, color) : <View /> }
      {rightLabel ?
        renderLeftRightSide(rightLabel, rightAction, sideFontSize, color, sideWidth) :
        <View style={styles.button} />
      }
    </View>
  );
}

SimpleTopNav.propTypes = {
  iconBack: PropTypes.bool,
  leftLabel: PropTypes.any,
  rightLabel: PropTypes.any,
  centerLabel: PropTypes.any,
  leftAction: PropTypes.func,
  rightAction: PropTypes.func,
  backgroundColor: PropTypes.string,
  sideFontSize: PropTypes.number,
  centerFontSize: PropTypes.number,
  color: PropTypes.string,
  wrapStyle: View.propTypes.style,
  sideWidth: PropTypes.number
};

SimpleTopNav.defaultProps = {
  iconBack: false,
  leftLabel: null,
  backgroundColor: GRAY,
  sideFontSize: 19,
  centerFontSize: 16,
  color: WHITE,
  sideWidth: 50,
};
