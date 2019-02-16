import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';
import { SimpleTopNav, Camera, ProfileCameraControls } from 'AppComponents';
import { styles } from './styles';

export class ProfileCameraContainer extends Component {
  static propTypes = {
    routeBack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      flashIcon: 'auto'
    };
    this.toggleFlash = ::this.toggleFlash;
    this.flipPicture = ::this.flipPicture;
    this.camera = null;
    this.cameraComponent = null;
  }

  componentDidMount() {
    this.camera = this.cameraComponent.getCamera();
  }

  toggleFlash() {
    const flashIcon = this.cameraComponent.toggleFlash();
    this.setState({ flashIcon });
  }

  flipPicture() {
    this.cameraComponent.flipPicture();
  }

  render() {
    const { flashIcon } = this.state;
    return (
      <View style={styles.container}>
        <SimpleTopNav
          centerLabel="TAKE A PHOTO"
          leftAction={this.props.routeBack}
        />
        <Camera ref={camera => this.cameraComponent = camera} />
        <Image source={require('img/images/profile_mask.png')} style={styles.image} />
        <ProfileCameraControls
          toggleFlash={this.toggleFlash}
          flipPicture={this.flipPicture}
          flashIcon={flashIcon}
        />
      </View>
    );
  }
}
