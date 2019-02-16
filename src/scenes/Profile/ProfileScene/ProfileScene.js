import React, { PropTypes } from 'react';
import { ProfileContainer } from 'AppContainers';

export function ProfileScene({ routeScene, onBack, userPass }) {
  return (
    <ProfileContainer
      routeScene={routeScene}
      routeBack={onBack}
      userPass={userPass}
    />
  );
}

ProfileScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  userPass: PropTypes.object,
};

ProfileScene.defaultProps = {
  userPass: null,
};
