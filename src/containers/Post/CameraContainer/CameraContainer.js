import React, { Component, PropTypes } from 'react';
import {
  View,
  Animated,
  InteractionManager,
  Image,
  LayoutAnimation,
  StatusBar
} from 'react-native';
import Camera from 'react-native-camera';
import { CameraTopBar, CameraBottomBar } from 'AppComponents';
import { CAPTURE_VIDEO, CAPTURE_PICTURE } from 'AppConstants';
import { toggle } from 'AppUtilities';
import { styles } from './styles';

const cameraFlashModeIcons = {
  [Camera.constants.FlashMode.off]: 'flash-off',
  [Camera.constants.FlashMode.auto]: 'flash-auto',
  [Camera.constants.FlashMode.on]: 'flash-on',
};

export class CameraContainer extends Component {
  static propTypes = {
    images: PropTypes.array,
    routePhotoEdit: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
    routeCameraRoll: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      cameraOptions: {
        audio: false,
        type: Camera.constants.Type.back,
        flashMode: Camera.constants.FlashMode.off
      },
      picture: '',
      cameraOpacity: new Animated.Value(1),
      cameraBtnPressed: false,
      cameraBtnPressAction: new Animated.Value(0),
      isReviewMode: false
    };
    this.setCameraOptions = ::this.setCameraOptions;
    this.flipPicture = ::this.flipPicture;
    this.toggleFlash = ::this.toggleFlash;
    this.onHoldTakePictureButton = ::this.onHoldTakePictureButton;
    this.handlePressOut = ::this.handlePressOut;
    this.capture = ::this.capture;
    this.toggleCaptureButtonState = ::this.toggleCaptureButtonState;
    this._clearTimeout = ::this._clearTimeout;
    this.onRetake = ::this.onRetake;
    this.doneCapturing = ::this.doneCapturing;
    this.camera = null;
    this._capturePressed = false;
    this._captureMode = CAPTURE_PICTURE;
    this._timeout = null;
  }

  componentDidMount() {
    // THIS IS A HACK TO MAKE RESET CAMERA FLASH SETTING TO AUTO
    StatusBar.setHidden(true);
    this.setCameraOptions({
      flashMode: Camera.constants.FlashMode.auto
    });
  }

  componentWillUnmount() {
    this._clearTimeout();
    StatusBar.setHidden(false);
  }

  onHoldTakePictureButton() {
    this._capturePressed = true;

    this._timeout = setTimeout(() => {
      // if Still pressed
      if (this._capturePressed) {
        // Start record Video
        this._captureMode = CAPTURE_VIDEO;
        this.toggleCaptureButtonState(true);
      } else {
        // Capture Only Picture
        this._captureMode = CAPTURE_PICTURE;
      }

      this.capture();
    }, 800);
  }

  onRetake() {
    LayoutAnimation.spring();
    this.setState({ isReviewMode: false });
  }

  setCameraOptions(options) {
    this.setState({
      cameraOptions: {
        ...this.state.cameraOptions,
        ...options
      }
    });
  }

  doneCapturing() {
    this.props.routePhotoEdit(this.state.picture);
  }

  _clearTimeout() {
    if (!this._timeout) {
      return;
    }
    clearTimeout(this._timeout);
  }

  flipPicture() {
    Animated.sequence([
      Animated.timing(
        this.state.cameraOpacity, {
          toValue: 0.7,
          duration: 350
        }
      ),
      Animated.timing(
        this.state.cameraOpacity, {
          toValue: 1,
          duration: 350
        }
      )
    ]).start();

    const type = toggle(this.state.cameraOptions.type, [
      Camera.constants.Type.front,
      Camera.constants.Type.back
    ]);
    this.setCameraOptions({ type });
  }

  handlePressOut() {
    this._capturePressed = false;
    this._clearTimeout();

    InteractionManager.runAfterInteractions(() => {
      if (this._captureMode === CAPTURE_VIDEO) {
        this.toggleCaptureButtonState(false);
        this._captureMode = CAPTURE_PICTURE;
        return this.camera.stopCapture();
      }
      return this.capture();
    });
  }

  capture(options = {}) {
    const _finalCaptureOptions = Object.assign({}, options);

    if (!_finalCaptureOptions.hasOwnProperty('mode')) {
      _finalCaptureOptions.mode = this._captureMode;
    }

    this.camera.capture(_finalCaptureOptions)
      .then(data => this.setState({ picture: data.path, isReviewMode: true }));
  }

  toggleFlash() {
    const flashMode = toggle(this.state.cameraOptions.flashMode, [
      Camera.constants.FlashMode.off,
      Camera.constants.FlashMode.auto,
      Camera.constants.FlashMode.on
    ]);
    this.setCameraOptions({ flashMode });
  }

  toggleCaptureButtonState(state) {
    this.setState(...this.state, {
      cameraBtnPressed: state || !this.state.cameraBtnPressed
    });
  }

  renderCameraContent(isReviewMode) {
    const { cameraOptions, picture } = this.state;
    const flashIcon = cameraFlashModeIcons[cameraOptions.flashMode];
    if (!isReviewMode) {
      return (
        <Camera
          captureAudio={false}
          ref={cam => this.camera = cam}
          orientation={Camera.constants.Orientation.portrait}
          style={[styles.container, { marginTop: 0 }]}
          captureTarget={Camera.constants.CaptureTarget.disk}
          {...cameraOptions}
        >
          <CameraTopBar
            flipIcon="repeat"
            flashIcon={flashIcon}
            cancelIcon="clear"
            cancel={this.props.routeBack}
            toggleFlash={this.toggleFlash}
            flipPicture={this.flipPicture}
          />
        </Camera>
      );
    }
    return (
      <Image
        style={ styles.cameraContentReview }
        source={{ uri: picture }}
        resizeMode="cover"
      />
    );
  }

  render() {
    const {
      cameraOpacity,
      cameraBtnPressed,
      isReviewMode
    } = this.state;
    const takePicIcon = cameraBtnPressed ?
      require('img/images/take_pic_pressed.png') :
      require('img/images/take_pic.png');
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.container, { opacity: cameraOpacity, marginTop: 0 }]}>
          {this.renderCameraContent(isReviewMode)}
        </Animated.View>
        <CameraBottomBar
          routeCameraRoll={this.props.routeCameraRoll}
          cameraIcon={takePicIcon}
          isReviewMode={isReviewMode}
          onDone={this.doneCapturing}
          onRetake={this.onRetake}
          onHoldTakePictureButton={this.onHoldTakePictureButton}
          handlePressOut={this.handlePressOut}
        />
      </View>
    );
  }
}
