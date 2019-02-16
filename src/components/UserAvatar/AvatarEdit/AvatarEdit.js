import React, { PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { UserAvatar } from 'AppComponents';
import { AuxText } from 'AppFonts';
import { styles } from './styles';

export function AvatarEdit({ style, avatarUrl, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
    >
      <UserAvatar avatarUrl={avatarUrl} onPress={onPress} />
      <Image
        style={styles.icon}
        source={require('img/icons/icon_insert_image.png')}
      />
      <AuxText style={styles.margin}>Change Photo</AuxText>
    </TouchableOpacity>
  );
}

AvatarEdit.propTypes = {
  style: View.propTypes.style,
  avatarUrl: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
