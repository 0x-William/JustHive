import React, { Component, PropTypes } from 'react';
import { CameraRollContainer } from 'AppContainers';
import container from '../container';

class _CameraRollScene extends Component {
  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    jumpTo: PropTypes.func.isRequired,
    updatePostingImages: PropTypes.func.isRequired,
    mask: PropTypes.bool,
    fromPhotoEdit: PropTypes.bool,
    postingImages: PropTypes.array,
  }

  static defaultProps = {
    mask: false,
  }

  constructor(props, context) {
    super(props, context);
    this.routeImage = ::this.routeImage;
  }

  routeImage(imageUri) {
    const {
      postingImages,
      updatePostingImages,
      routeScene,
      jumpTo,
      fromPhotoEdit
    } = this.props;
    let newImages = [];
    if (!fromPhotoEdit) {
      routeScene('PhotoEditScene', {}, 'PhotoEditScene');
    } else {
      newImages = postingImages.slice();
      jumpTo('PhotoEditScene');
    }
    newImages.push({
      uri: imageUri,
      title: `Test Image${postingImages.length + 1}`
    });
    updatePostingImages(newImages);
  }

  render() {
    return (
      <CameraRollContainer
        routeImage={this.routeImage}
        routeBack={this.props.onBack}
        mask={this.props.mask}
      />
    );
  }
}
export const CameraRollScene = container(_CameraRollScene);
