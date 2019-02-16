/**
 * Created by nick on 12/07/16.
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  PanResponder,
  Animated,
} from 'react-native';
import { Surface } from 'gl-react-native';
import RNFS from 'react-native-fs';
import GLImageView from './GLImageView';
import { Saturation, Hue } from 'AppShaders';
import { Blur } from 'gl-react-blur';
import { WINDOW_WIDTH } from 'AppConstants';

function toDeg(rad) {
  return rad * 180 / Math.PI;
}

function angle(touches) {
  const a = touches[0];
  const b = touches[1];
  let deg = toDeg(Math.atan2(a.pageX - b.pageX, a.pageY - b.pageY));
  if (deg < 0) {
    deg += 360;
  }
  return deg;
}

export class PhotoEditView extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    filter: PropTypes.string,
    cropWidth: PropTypes.number.isRequired,
    cropHeight: PropTypes.number.isRequired,
    panToMove: PropTypes.bool.isRequired,
    pinchToZoom: PropTypes.bool.isRequired,
    pinchRotate: PropTypes.bool.isRequired,
    type: PropTypes.string,
    zoomFactor: PropTypes.number,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    quality: PropTypes.number,
    format: PropTypes.string,
    zoom: PropTypes.number,
  };

  static defaultProps = {
    image: '',
    filter: PropTypes.string,
    cropWidth: 300,
    cropHeight: 300,
    zoomFactor: 0,
    minZoom: 0,
    maxZoom: 5,
    quality: 1,
    type: 'png',
    format: 'file',
    panToMove: true,
    pinchToZoom: true,
    pinchRotate: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      imageHeight: 300,
      imageWidth: 300,
      currentCapture: '',
      pan: new Animated.ValueXY(),
      angle: new Animated.Value(0),
      zoom: new Animated.Value(0),
      transX: new Animated.Value(0),
      transY: new Animated.Value(0),
      currentTransX: 0,
      currentTransY: 0,
      currentAngle: 0,
      currentZoom: 0
    };
    this._onPanResponderGrant = ::this._onPanResponderGrant;
    this._onPanResponderMove = ::this._onPanResponderMove;
    this._onPanResponderEnd = ::this._onPanResponderEnd;
    this.glSurface = null;
    this._panResponder = null;
    this._previousAngle = 0;
    this._angle = 0;
    this.surfaceWidth = 0;
    this.surfaceHeight = 0;
  }

  componentWillMount() {
    const currentZoom = (100 - this.props.zoom) / 100;
    this.setState({ currentZoom });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => true,
      onPanResponderGrant: this._onPanResponderGrant,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderEnd,
      onPanResponderTerminate: this._onPanResponderEnd,
    });
    this.getImageSize(this.props);
    this._angle = 0;
  }

  componentDidMount() {
    this.angleListener = this.state.angle.addListener((value) => this.currentAngle = value.value);
    this.zoomListener = this.state.zoom.addListener((value) => {
      this.setState({ currentZoom: value.value });
    });
    this.transXListener = this.state.transX.addListener((value) => {
      this.setState({ currentTransX: value.value });
    });
    this.transYListener = this.state.transY.addListener((value) => {
      this.setState({ currentTransY: value.value });
    });
  }

  componentWillUnmount() {
    this.state.angle.removeListener(this.angleListener);
    this.state.zoom.removeListener(this.zoomListener);
    this.state.transX.removeListener(this.transXListener);
    this.state.transY.removeListener(this.transYListener);
  }

  getImageSize(props) {
    if (props.image) {
      Image.getSize(props.image, (width, height) => {
        this.setState({
          imageHeight: height,
          imageWidth: width,
        });
      });
    }
  }

  _onPanResponderGrant() {
    this.offsetX = -this.state.currentTransX;
    this.offsetY = -this.state.currentTransY;
    // zoom variables
    this.zoomLastDistance = 0;
  }

  _onPanResponderMove(evt, gestureState) {
    // We are moving the image
    const { panToMove, pinchToZoom, pinchRotate } = this.props;
    if (evt.nativeEvent.changedTouches.length <= 1) {
      if (panToMove) {
        const newPosX = (Number(this.offsetX) - Number(gestureState.dx));
        const newPosY = (Number(this.offsetY) - Number(gestureState.dy));
        this.setState({ currentTransX: -newPosX });
        this.setState({ currentTransY: -newPosY });
      }
    } else {
      // We are zooming the image
      if (pinchToZoom) {
        // Pinch activated
        const { changedTouches } = evt.nativeEvent;
        const diffX = changedTouches[0].locationX - changedTouches[1].locationX;
        const diffY = changedTouches[0].locationY - changedTouches[1].locationY;
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);
        const zoomLastDistance = distance.toFixed(1);

        if (this.zoomLastDistance === 0) {
          this.zoomLastDistance = zoomLastDistance;
        } else {
          // what is the zoom level
          const screenDistance = (this.zoomLastDistance - zoomLastDistance) / 400;
          let newZoom = this.state.currentZoom - screenDistance;

          if (newZoom < 0.3) {
            newZoom = 0.3;
          }
          if (newZoom > 3) {
            newZoom = 3;
          }
          this.setState({ currentZoom: newZoom });
          // Set last distance..
          this.zoomLastDistance = zoomLastDistance;
        }
      }

      if (pinchRotate) {
        this._previousAngle = this._previousAngle === 0 ?
          angle(evt.nativeEvent.touches) : this._previousAngle;

        const angleChange = this._previousAngle - angle(evt.nativeEvent.touches);
        this.setState({ currentAngle: this._angle + angleChange });
      }
    }
  }

  _checkZoomLevel() {
    const { currentZoom } = this.state;
    if (currentZoom < 1) {
      this.state.zoom.setValue(currentZoom);
      Animated.timing(
        this.state.zoom,
        { toValue: 1 }
      ).start();
    }
  }

  _checkPosition() {
    const { currentZoom, currentTransX, currentTransY } = this.state;
    const { cropWidth, cropHeight } = this.props;
    let transXValue = undefined;
    let transYValue = undefined;
    const imageWidth = currentZoom * this.surfaceWidth;
    const imageHeight = currentZoom * this.surfaceHeight;

    if (currentTransX > 0) {
      transXValue = 0;
    }
    if (currentTransX < cropWidth - imageWidth) {
      transXValue = cropWidth - imageWidth;
    }

    if (currentTransY < cropHeight - imageHeight) {
      transYValue = cropHeight - imageHeight;
    }
    if (currentTransY > 0) {
      transYValue = 0;
    }

    if (transXValue !== undefined) {
      this.state.transX.setValue(currentTransX);
      Animated.timing(          // Uses easing functions
        this.state.transX,    // The value to drive
        { toValue: transXValue }            // Configuration
      ).start();
    }
    if (transYValue !== undefined) {
      this.state.transY.setValue(currentTransY);
      Animated.timing(          // Uses easing functions
        this.state.transY,    // The value to drive
        { toValue: transYValue }            // Configuration
      ).start();
    }
  }

  _onPanResponderEnd() {
    const { currentAngle } = this.state;
    this._angle = currentAngle;
    this._previousAngle = 0;
    this._checkZoomLevel();
    this._checkPosition();
  }

  removeTempDirectory(dirPath) {
    return new Promise((resolve) => {
      RNFS.exists(dirPath).then((flagExist) => {
        if (flagExist) {
          RNFS.unlink(dirPath).then(() => resolve());
        } else {
          resolve();
        }
      });
    });
  }

  createTempDirectory(dirPath) {
    return new Promise((resolve) => {
      this.removeTempDirectory(dirPath)
        .then(() => {
          RNFS.mkdir(dirPath).then(() => resolve());
        });
    });
  }

  capture() {
    const { quality, type, format } = this.props;
    const dirPath = `${RNFS.DocumentDirectoryPath}/temp`;
    const filePath = `${RNFS.DocumentDirectoryPath}/${new Date().getTime()}.png`;
    return new Promise((resolve) => {
      this.createTempDirectory(dirPath)
        .then(() => {
          this.glSurface.captureFrame({ quality, type, format, filePath })
            .then((captured) => resolve(captured));
        });
    });
  }

  applyImageFilter(children) {
    const { filter, cropWidth, cropHeight } = this.props;
    switch (filter) {
      case 'FILTER 1':
        return (
          <Saturation factor={2.5}>
            {children}
          </Saturation>
        );
      case 'FILTER 2':
        return (
          <Hue factor={10}>
            {children}
          </Hue>
        );
      case 'FILTER 3':
        return (
          <Saturation factor={0}>
            {children}
          </Saturation>
        );
      case 'FILTER 4':
        return (
          <Blur factor={2} passes={2} width={cropWidth} height={cropHeight}>
            {children}
          </Blur>
        );
      default:
        return (
          <Saturation factor={1}>
            {children}
          </Saturation>
        );
    }
  }

  render() {
    const { cropWidth, cropHeight, image } = this.props;
    const {
      currentTransX,
      currentTransY,
      currentZoom,
      currentAngle,
      imageWidth,
      imageHeight
    } = this.state;
    this.surfaceWidth = WINDOW_WIDTH;
    this.surfaceHeight = WINDOW_WIDTH;
    if (imageWidth < imageHeight) {
      this.surfaceHeight = WINDOW_WIDTH * (imageHeight / imageWidth);
    } else {
      this.surfaceWidth = WINDOW_WIDTH * (imageWidth / imageHeight);
    }

    const imageView = (
      <GLImageView
        source={{ uri: image.uri, height: imageHeight, width: imageWidth }}
        scale={currentZoom}
        translate={[currentTransX, currentTransY]}
        rotate={3.14 / 180 * (currentAngle) }
        width={this.surfaceWidth}
        height={this.surfaceHeight}
      />
    );
    return (
      <View
        {...this._panResponder.panHandlers}
        style={{ backgroundColor: 'white', width: cropWidth, height: cropHeight }}
      >
        <Surface
          width={this.surfaceWidth}
          height={this.surfaceHeight}
          ref={(ref) => this.glSurface = ref}
        >
          {this.applyImageFilter(imageView)}
        </Surface>
      </View>
    );
  }
}
