import React, { PropTypes } from 'react';
import { Animated, View, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { GRAY } from 'AppColors';
import { LabelText } from 'AppFonts';

export function ProfileTopNav({
  leftLabel,
  leftAction,
  rightLabel,
  rightAction,
  centerLabel,
  expandNav,
  leftIconAction,
  leftIcon,
  rightIconAction,
  rightIcon,
  centerIconAction,
  centerIcon,
  height,
  top,
  scale,
  bottomViewable,
}) {
  return (
    <View>
      <View style={[styles.row, styles.topRow]}>
        <TouchableOpacity onPress={leftAction} style={styles.side}>
          {leftLabel}
        </TouchableOpacity>
        <TouchableOpacity onPress={expandNav}>
          <LabelText>{centerLabel}</LabelText>
        </TouchableOpacity>
        <TouchableOpacity onPress={rightAction} style={styles.side}>
          {rightLabel}
        </TouchableOpacity>
      </View>
      {bottomViewable &&
        <Animated.View
          style={[
            styles.row,
            styles.bottomRow,
            { height, transform: [{ translateY: top }, { scaleY: scale }] }
          ]}
        >
          <TouchableOpacity style={styles.iconButton} onPress={leftIconAction}>
            {leftIcon}
          </TouchableOpacity>
          {centerIcon ? <TouchableOpacity
            style={[styles.iconButton, styles.centerButton]}
            onPress={centerIconAction}
          >
            {centerIcon}
          </TouchableOpacity> :
          <View style={styles.centerButton} />}
          <TouchableOpacity style={styles.iconButton} onPress={rightIconAction}>
            {rightIcon}
          </TouchableOpacity>
        </Animated.View>
      }
    </View>
  );
}

ProfileTopNav.propTypes = {
  leftLabel: PropTypes.any.isRequired,
  rightLabel: PropTypes.any,
  leftAction: PropTypes.func.isRequired,
  rightAction: PropTypes.func,
  centerLabel: PropTypes.string.isRequired,
  expandNav: PropTypes.func,
  leftIconAction: PropTypes.func,
  leftIcon: PropTypes.any,
  rightIconAction: PropTypes.func,
  rightIcon: PropTypes.any,
  centerIconAction: PropTypes.func,
  centerIcon: PropTypes.any,
  height: PropTypes.object,
  top: PropTypes.number,
  scale: PropTypes.object,
  bottomViewable: PropTypes.bool.isRequired,
};

ProfileTopNav.defaultProps = {
  leftLabel: <Image
    source={require('img/icons/icon_back.png')}
    style={[styles.iconBack, { tintColor: GRAY }]}
  />,
  bottomViewable: true,
};
