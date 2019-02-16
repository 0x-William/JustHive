import React, { PropTypes, Component } from 'react';
import { PhotoEditContainer } from 'AppContainers';
import container from '../container';

class _PhotoEditScene extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    postingImages: PropTypes.array,
    updateImageValue: PropTypes.func.isRequired,
    updatePostingImages: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.routeScene = ::this.routeScene;
    this.onDeleteImage = ::this.onDeleteImage;
    this.onUpdateImageValue = ::this.onUpdateImageValue;
  }

  onDeleteImage(index) {

  }

  onUpdateImageValue(index, key, value) {
    this.props.updateImageValue(index, key, value);
  }

  routeScene(scene, passProps) {
    this.props.routeScene(scene, passProps);
  }

  render() {
    return (
      <PhotoEditContainer
        routeBack={this.props.onBack}
        routeScene={this.routeScene}
        onUpdateImageValue={this.onUpdateImageValue}
        onDeleteImage={this.onDeleteImage}
        images={this.props.postingImages}
      />
    );
  }
}
export const PhotoEditScene = container(_PhotoEditScene);
