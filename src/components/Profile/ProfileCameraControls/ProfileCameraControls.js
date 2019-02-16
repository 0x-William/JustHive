import React, { PropTypes } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { styles } from './styles';

function RenderFlashIcon({ flashIcon }) {
  switch (flashIcon) {
    case 'on':
      return <Image source={require('img/icons/icon_camera_flash_on.png')} style={styles.on} />;
    case 'off':
      return <Image source={require('img/icons/icon_camera_flash_off.png')} style={styles.off} />;
    default:
      return <Image source={require('img/icons/icon_camera_flash_auto.png')} style={styles.auto} />;
  }
}

RenderFlashIcon.propTypes = {
  flashIcon: PropTypes.string,
};

export function ProfileCameraControls({ toggleFlash, flipPicture, flashIcon }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={flipPicture} style={styles.button}>
        <Image source={require('img/icons/icon_camera_flip.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={require('img/icons/icon_camera_roll.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleFlash} style={styles.button}>
        <RenderFlashIcon flashIcon={flashIcon} />
      </TouchableOpacity>
    </View>
  );
}

ProfileCameraControls.propTypes = {
  toggleFlash: PropTypes.func.isRequired,
  flipPicture: PropTypes.func.isRequired,
  flashIcon: PropTypes.string.isRequired,
};
