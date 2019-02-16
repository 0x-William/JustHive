import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { styles } from './styles';

export function CameraBottomBar({
  onHoldTakePictureButton,
  handlePressOut,
  routeCameraRoll,
  cameraIcon,
  isReviewMode,
  onDone,
  onRetake
}) {
  return !isReviewMode ? (
    <View style={styles.container}>
      <TouchableOpacity
        style={ styles.btnCameraRoll }
        onPress={routeCameraRoll}
      >
        <Image source={require('img/icons/icon_camera_roll.png')} style={styles.iconCameraRoll} />
      </TouchableOpacity>
      <TouchableOpacity
        style={ styles.btnTakePicture }
        onPressIn={onHoldTakePictureButton}
        onPressOut={handlePressOut}
      >
        <Image source={cameraIcon} style={styles.takePicture} />
      </TouchableOpacity>
      <View style={ styles.siblingView } />
    </View>
  ) : (
    <View style={[styles.container, { backgroundColor: 'rgb(0, 0, 0)' }]}>
      <TouchableOpacity onPress={onRetake} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Text style={styles.textButton}> Retake </Text>
      </TouchableOpacity>
      <TouchableOpacity style={ styles.btnTakePicture }>
        <Image source={cameraIcon} style={styles.takePicture} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDone} style={ styles.btnDone }>
        <Text style={styles.textButton}> Done </Text>
      </TouchableOpacity>
    </View>
  );
}

CameraBottomBar.propTypes = {
  routeCameraRoll: PropTypes.func.isRequired,
  cameraIcon: PropTypes.any,
  onHoldTakePictureButton: PropTypes.func.isRequired,
  handlePressOut: PropTypes.func.isRequired,
  isReviewMode: PropTypes.bool.isRequired,
  onDone: PropTypes.func.isRequired,
  onRetake: PropTypes.func.isRequired
};

CameraBottomBar.defaultProps = {
  isReviewMode: false
};
