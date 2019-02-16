import React, { PropTypes } from 'react';
import { ThreadCreateContainer } from 'AppContainers';

export const ThreadCreateScene = ({ onBack, routeScene }) => (
  <ThreadCreateContainer
    routeBack={onBack}
    routeScene={routeScene}
  />
);

ThreadCreateScene.propTypes = {
  onBack: PropTypes.func.isRequired,
  routeScene: PropTypes.func.isRequired,
};
