import React, { Component, PropTypes } from 'react';
import { View, Image, WebView, TouchableWithoutFeedback } from 'react-native';
import { getStyles } from './styles';

export class Heatmap extends Component {
  static propTypes = {
    imageSource: PropTypes.object,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    max: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      value: PropTypes.number,
      radius: PropTypes.number,
    })).isRequired,
    style: View.propTypes.style,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    max: 5,
  };

  constructor(props, context) {
    super(props, context);
    this.styles = getStyles(props);
    this.handlePress = this.handlePress.bind(this);
  }

  getData() {
    const { data } = this.props;
    return data.map(point => ({
      x: point.left,
      y: point.top,
      value: 1,
      radius: 20
    }));
  }

  getHTML() {
    const { width, height, max } = this.props;
    return `
      <style>* { margin: 0; padding: 0; }</style>
      <div id="heatmap" style="width: ${width}px; height: ${height}px;"></div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/heatmap.js/2.0.2/heatmap.min.js"></script>
      <script>
        var heatmap = h337.create({
          container: document.getElementById('heatmap'),
        });
        heatmap.setData({
          max: ${max},
          data: ${JSON.stringify(this.getData())},
        });
      </script>
    `;
  }

  handlePress(event) {
    const { onPress } = this.props;
    if (!onPress) {
      return;
    }
    const { locationX: x, locationY: y } = event.nativeEvent;
    onPress(x, y);
  }

  render() {
    const { imageSource, style } = this.props;
    return (
      <View style={style}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={this.styles.container}>
            {imageSource && (
              <Image
                source={imageSource}
                resizeMode="contain"
                style={this.styles.image}
              />
            )}
            <WebView
              source={{ html: this.getHTML() }}
              scrollEnabled={false}
              style={this.styles.webView}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
