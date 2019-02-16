import React, { PropTypes } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WHITE } from 'AppColors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    backgroundColor: 'transparent',
    width: 14,
    height: 14,
    borderColor: WHITE,
    borderWidth: 2,
    borderRadius: 7,
    marginRight: 5,
  },
  label: {
    color: WHITE,
    fontSize: 15,
    fontFamily: 'Panton-Semibold',
  },
  image: {
    tintColor: WHITE,
    height: 30,
    marginRight: 3,
  },
  icon: {
    marginRight: 3,
  }
});

export function IconRadioButton({ isActive, style, icon, label, labelStyle, iconStyle, onPress }) {
  const opacityStyle = !isActive ? { opacity: 0.5 } : {};
  const activeCircleStyle = isActive ? { backgroundColor: WHITE } : {};
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      underlayColor="transparent"
    >
      <View style={[styles.container, style, opacityStyle]}>
        <View style={[styles.circle, activeCircleStyle]} />
        {typeof icon !== 'string' ? (
          <Image
            resizeMode="contain"
            source={icon}
            style={[styles.image, iconStyle]}
          />
        ) : (
          <Icon
            name={icon}
            size={20}
            color={WHITE}
            style={[styles.icon, iconStyle]}
          />
      )}
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}


IconRadioButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.any.isRequired,
  isActive: PropTypes.bool.isRequired,
  style: View.propTypes.style,
  label: PropTypes.any.isRequired,
  labelStyle: Text.propTypes.style,
  iconStyle: PropTypes.object,
};

IconRadioButton.defaultProps = {
  icon: null,
  isActive: false,
};
