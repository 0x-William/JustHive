import React, { Component, PropTypes } from 'react';
import { CameraContainer } from 'AppContainers';
import container from '../container';
class _CameraScene extends Component {
  static propTypes = {
    postingImages: PropTypes.array,
    routeScene: PropTypes.func.isRequired,
    resetRouteStack: PropTypes.func.isRequired,
    updatePostingImages: PropTypes.func.isRequired,
    fromPhotoEdit: PropTypes.bool,
    avatar: PropTypes.bool,
  };

  static defaultProps = {
    avatar: false,
  };

  constructor(props, context) {
    super(props, context);
    this.routePhotoEdit = ::this.routePhotoEdit;
    this.routeCameraRoll = ::this.routeCameraRoll;
  }

  routePhotoEdit(imageUri) {
    const {
      postingImages,
      updatePostingImages,
      routeScene,
      onBack,
      fromPhotoEdit
    } = this.props;
    let newImages = [];
    if (!fromPhotoEdit) {
      routeScene('PhotoEditScene', {}, 'PhotoEditScene');
    } else {
      onBack();
      newImages = postingImages.slice();
    }
    newImages.push({
      uri: imageUri,
      title: `Test Image${postingImages.length + 1}`
    });
    updatePostingImages(newImages);
  }

  routeCameraRoll() {
    const { fromPhotoEdit } = this.props;
    this.props.routeScene('CameraRollScene', { fromPhotoEdit });
  }

  render() {
    return (
      <CameraContainer
        routePhotoEdit={this.routePhotoEdit}
        routeBack={() => this.props.resetRouteStack(3)}
        routeCameraRoll={this.routeCameraRoll}
        images={this.props.postingImages}
      />
    );
  }
}
export const CameraScene = container(_CameraScene);
