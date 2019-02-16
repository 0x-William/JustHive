import React, { PropTypes } from 'react';
import { HexagonIcon, HexagonImage } from 'AppComponents';
import { YELLOW } from 'AppColors';

export function UserAvatar({ avatarUrl, size, iconStyle, borderWidth, borderColor, onPress }) {
  if (avatarUrl) {
    return (
      <HexagonImage
        size={size}
        imageSource={{ uri: avatarUrl }}
        imageHeight={size * 1.1}
        imageWidth={size * 1.1}
        borderWidth={borderWidth}
        borderColor={borderColor}
        isHorizontal={true}
        onPress={onPress}
      />
    );
  }
  return (
    <HexagonIcon
      size={size}
      imageStyle={iconStyle}
      icon={require('img/icons/icon_logo.png')}
      borderWidth={borderWidth}
      borderColor={borderColor}
      isHorizontal={true}
      onPress={onPress}
    />
  );
}

UserAvatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  iconStyle: PropTypes.object.isRequired,
  borderWidth: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

UserAvatar.defaultProps = {
  size: 100,
  iconStyle: { width: 43, height: 50 },
  borderWidth: 2,
  borderColor: YELLOW,
};
