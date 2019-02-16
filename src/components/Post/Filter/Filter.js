import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { Blur } from 'gl-react-blur';
import { AnimatedSurface } from 'gl-react-native';
import { Saturation, Hue } from 'AppShaders';

export class Filter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    style: View.propTypes.style,
    height: PropTypes.any.isRequired,
    width: PropTypes.any.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.getSurfaceRef = ::this.getSurfaceRef;
    this.filterType = ::this.filterType;
    this.myFilter = null;
  }

  getSurfaceRef() {
    return this.myFilter;
  }

  filterType() {
    const { filter, children, width, height } = this.props;
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
          <Blur factor={2} passes={2} width={width} height={height}>
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
    const { width, height, style } = this.props;
    return (
      <AnimatedSurface
        ref={surface => this.myFilter = surface}
        style={style}
        width={width}
        height={height}
      >
        {this.filterType()}
      </AnimatedSurface>
    );
  }
}
