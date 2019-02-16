import React, { PropTypes } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { UserAvatar } from 'AppComponents';
import { GrayHeader } from 'AppFonts';
import { styles } from './styles';

export function Colony({ avatarUrl, name, routeSettings }) {
  return (
    <View style={[styles.container, styles.row]}>
      <View style={styles.row}>
        <UserAvatar
          avatarUrl={avatarUrl}
          size={50}
          iconStyle={{ width: 22, height: 25 }}
        />
        <GrayHeader>{name}</GrayHeader>
      </View>
      <TouchableHighlight style={styles.button} onPress={routeSettings}>
        <Image source={require('img/icons/icon_profile_settings.png')} style={styles.settings} />
      </TouchableHighlight>
    </View>
  );
}

Colony.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  routeSettings: PropTypes.func.isRequired,
};
