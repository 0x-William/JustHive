import React, { Component, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { getGridStyles, getDimensions } from '../styles';
import { HexagonIcon } from '../HexagonIcon';
import { HexagonImage } from '../HexagonImage';

export class HexagonGrid extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleResponderRelease = ::this.handleResponderRelease;
  }
  componentWillMount() {
    this.styles = getGridStyles(this.props);
    this.getDimensions();
  }

  getDimensions() {
    const {
      width: gridWidth,
      height: gridHeight,
      spacing: gridSpacing,
      hexagonSize,
    } = this.props;
    const {
      hexagonWidth,
      hexagonHeight,
      rectangleWidth,
      rectangleLeft,
    } = getDimensions({ size: hexagonSize });
    this.offsetX = hexagonHeight - (rectangleWidth / 2) + gridSpacing;
    this.offsetY = (rectangleWidth / 2) + rectangleLeft + (gridSpacing / 2);
    this.center = {
      x: (gridHeight - hexagonHeight) / 2,
      y: (gridWidth - hexagonWidth) / 2,
    };
  }

  getDirections(n) {
    const directions = [];
    const dx = [1, 1, 0, -1, -1, 0];
    const dy = [1, -1, -2, -1, 1, 2];
    let x = 0;
    let y = 0;
    let going = 0;
    for (let i = 0; i < n; i++) {
      directions.push({ x, y });
      x += dx[going];
      y += dy[going];
      const want = (i === 0 ? going + 2 : going + 1) % 6;
      if (!directions.find(dir => dir.x === dx[want] + x && dir.y === dy[want] + y)) {
        going = want;
      }
    }
    return directions.map(({ x, y }) => ({
      x: this.center.x + (this.offsetX * x),
      y: this.center.y + (this.offsetY * y),
    }));
  }

  handleResponderRelease(event) {
    const { locationX: x, locationY: y } = event.nativeEvent;
    this.scrollView.scrollTo({ x, y, animated: true });
  }

  renderHexagon(hexagon, x, y) {
    const { hexagonSize } = this.props;
    const { type: hexagonType, ...hexagonProps } = hexagon;
    return (
      <View key={`${x}${y}`} style={{ position: 'absolute', top: x, left: y }}>
        {(() => {
          if (hexagonType === 'image') {
            return <HexagonImage {...hexagonProps} size={hexagonSize} />;
          }
          return <HexagonIcon {...hexagonProps} size={hexagonSize} />;
        })()}
      </View>
    );
  }

  render() {
    const { hexagons, scrollEnabled, style } = this.props;
    return (
      <View style={style}>
        <ScrollView
          ref={scrollView => this.scrollView = scrollView}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={this.styles.hexagonGrid}
          onResponderRelease={this.handleResponderRelease}
        >
          {this.getDirections(hexagons.length).map(({ x, y }, hexagonIndex) => {
            return this.renderHexagon(hexagons[hexagonIndex], x, y);
          })}
        </ScrollView>
      </View>
    );
  }
}

HexagonGrid.defaultProps = {
  spacing: 0,
  scrollEnabled: false,
};

HexagonGrid.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  spacing: PropTypes.number,
  hexagons: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['icon', 'image']),
  })).isRequired,
  hexagonSize: PropTypes.number.isRequired,
  scrollEnabled: PropTypes.bool,
  style: View.propTypes.style,
};
