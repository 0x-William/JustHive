import React, { PropTypes } from 'react';
import { SettingContainer } from 'AppContainers';

export function SettingScene({ routeScene, onBack }) {
  return (
    <SettingContainer
      routeBack={onBack}
      routeScene={routeScene}
    />
  );
}

SettingScene.propTypes = {
  onBack: PropTypes.func.isRequired,
  routeScene: PropTypes.func.isRequired,
};
