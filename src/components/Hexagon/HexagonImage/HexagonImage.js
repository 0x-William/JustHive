import React, { Component, PropTypes } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { getStyles, getDimensions } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class HexagonImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imageWidth: null,
      imageHeight: null,
      isLoading: true,
      error: null,
    };
    this.styles = getStyles(props);
  }

  async componentWillMount() {
    try {
      await this.prefetchImage();
      const { width: imageWidth, height: imageHeight } = await this.getImageSize();
      if (!this.willUnmount) {
        this.setState({ imageWidth, imageHeight, isLoading: false });
      }
    } catch (error) {
      if (!this.willUnmount) {
        this.setState({ error, isLoading: false });
      }
    }
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }

  getImageSize() {
    return new Promise((resolve, reject) => {
      const { imageSource, imageWidth, imageHeight } = this.props;
      if (!imageSource || !imageSource.uri) {
        return resolve({ width: null, height: null });
      }
      if (imageWidth && imageHeight) {
        return resolve({ width: imageWidth, height: imageHeight });
      }
      return Image.getSize(imageSource.uri, (width, height) => {
        const ratio = this.getImageRatio(height);
        resolve({ width: width * ratio, height: height * ratio });
      }, error => {
        reject(error);
      });
    });
  }

  getImageRatio(imageHeight) {
    const { hexagonHeight } = getDimensions(this.props);
    return hexagonHeight / imageHeight;
  }

  prefetchImage() {
    const { imageSource } = this.props;
    if (!imageSource || !imageSource.uri) {
      return Promise.resolve();
    }
    return Image.prefetch(imageSource.uri);
  }

  renderLoading() {
    return (
      <View style={this.props.style}>
        <View style={this.styles.hexagon}>
          <View style={this.styles.textContainer}>
            <Text style={[this.styles.text, this.styles.loading]}>
              <Icon name="image" size={this.styles.textContainer.height} />
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderError() {
    return (
      <View style={this.props.style}>
        <View style={this.styles.hexagon}>
          <View style={this.styles.textContainer}>
            <Text style={[this.styles.text, this.styles.error]}>
              <Icon name="broken-image" size={this.styles.textContainer.height} />
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderHexagon() {
    const {
      imageSource,
      imageWidth,
      imageHeight,
      imagePadding,
      text,
      textColor,
      opacity,
      style,
      borderColor,
      onImageLoad,
      onPress
    } = this.props;
    return (
      <View style={style}>
        <View
          style={[
            this.styles.hexagon,
            opacity ? { opacity } : {},
          ]}
        >
          {[1, 2, 3].map(rectangleNumber => (
            <View
              key={rectangleNumber}
              style={[
                this.styles.rectangle,
                this.styles[`rectangle${rectangleNumber}`],
              ]}
            >
              {imageSource && (
                <Image
                  source={imageSource}
                  resizeMode="contain"
                  style={[
                    this.styles[`rectangle${rectangleNumber}Content`],
                    {
                      width: imageWidth || this.state.imageWidth,
                      height: imageHeight || this.state.imageHeight,
                      padding: imagePadding,
                    },
                  ]}
                  onLoad={onImageLoad}
                />
              )}
            </View>
          ))}
          {/* To be able to support borders, we'll need to draw the rectangles again */}
          {[1, 2, 3].map(rectangleNumber => (
            <TouchableOpacity
              key={rectangleNumber}
              style={[
                this.styles.rectangle,
                this.styles[`rectangle${rectangleNumber}`],
                borderColor ? { borderColor } : {},
              ]}
              onPress={onPress}
            />
          ))}
          {text && (
            <TouchableOpacity style={this.styles.textContainer} onPress={onPress}>
              <Text
                style={[
                  this.styles.text,
                  textColor ? { color: textColor } : {}
                ]}
              >
                {text}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  render() {
    const { isLoading, error } = this.state;
    if (isLoading) {
      return this.renderLoading();
    }
    if (error) {
      return this.renderError();
    }
    return this.renderHexagon();
  }
}

HexagonImage.defaultProps = {
  textWeight: '500',
};

HexagonImage.propTypes = {
  imageSource: PropTypes.any,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  imagePadding: PropTypes.number,
  text: PropTypes.string,
  textWeight: PropTypes.string,
  textSize: PropTypes.number,
  textColor: PropTypes.string,
  size: PropTypes.number.isRequired,
  isHorizontal: PropTypes.bool,
  borderWidth: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  opacity: PropTypes.number,
  style: View.propTypes.style,
  onImageLoad: PropTypes.func,
  onPress: PropTypes.func,
};
