import React, { PropTypes } from 'react';
import { ProfileCameraContainer } from 'AppContainers';

export function ProfileCameraScene({ onBack }) {
  return (
    <ProfileCameraContainer routeBack={onBack} />
  );
}

ProfileCameraScene.propTypes = {
  onBack: PropTypes.func.isRequired,
};
