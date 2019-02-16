import React, { PropTypes } from 'react';
import { FeedItemContainer } from 'AppContainers';

export function FeedItemScene({ routeScene, onBack, post }) {
  return (
    <FeedItemContainer
      routeScene={routeScene}
      routeBack={onBack}
      post={post}
    />
  );
}

FeedItemScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
