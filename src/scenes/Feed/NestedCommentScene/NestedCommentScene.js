import React, { PropTypes } from 'react';
import { NestedCommentContainer } from 'AppContainers';

export function NestedCommentScene({ comment, onBack, routeScene, isModal, postId }) {
  return (
    <NestedCommentContainer
      comment={comment}
      routeBack={onBack}
      routeScene={routeScene}
      isModal={isModal}
      postId={postId}
    />
  );
}

NestedCommentScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  isModal: PropTypes.bool.isRequired
};
