import React, { PropTypes } from 'react';
import { ColonyCreateContainer } from 'AppContainers';

export function ColonyCreateScene({ onBack, routeScene }) {
  return (
    <ColonyCreateContainer
      routeBack={onBack}
      routeScene={routeScene}
    />
  );
}

ColonyCreateScene.propTypes = {
  onBack: PropTypes.func.isRequired,
  routeScene: PropTypes.func.isRequired,
};
