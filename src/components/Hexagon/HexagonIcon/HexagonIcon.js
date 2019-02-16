import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { getStyles } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function HexagonIcon(props) {
  const { icon, text, color, style, onPress, imageStyle, textStyle, iconStyle } = props;
  const styles = getStyles(props);
  return (
    <View style={style}>
      <View style={styles.hexagon}>
        {[1, 2, 3].map(rectangleNumber => (
          <TouchableOpacity
            key={rectangleNumber}
            style={[
              styles.rectangle,
              styles[`rectangle${rectangleNumber}`]
            ]}
            onPress={onPress}
          />
        ))}
        {icon && (
          <TouchableOpacity onPress={onPress}>
            {typeof icon !== 'string' ? (
              <Image
                resizeMode="contain"
                source={icon}
                style={[styles.image, imageStyle]}
              />
            ) : (
              <Icon
                name={icon}
                size={styles.icon.width}
                color={color}
                style={[styles.icon, iconStyle]}
              />
            )}
          </TouchableOpacity>
        )}
        {text && (
          <TouchableOpacity style={styles.textContainer} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

HexagonIcon.defaultProps = {
  borderWidth: 2,
};

HexagonIcon.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.any,
  size: PropTypes.number.isRequired,
  isHorizontal: PropTypes.bool,
  borderWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  textWeight: PropTypes.string,
  textSize: PropTypes.number,
  opacity: PropTypes.number,
  style: View.propTypes.style,
  imageStyle: Image.propTypes.style,
  textStyle: Text.propTypes.style,
  iconStyle: PropTypes.object,
  onPress: PropTypes.func,
};
