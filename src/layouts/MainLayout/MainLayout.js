import React, { Component, PropTypes } from 'react';
import { BottomNavBar } from './BottomNavBar';

export class MainLayout extends Component {
  static propTypes = {
    resetRouteStack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    activeScene: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.navigateTo = ::this.navigateTo;
  }

  navigateTo(scene) {
    if (scene === 'CameraScene') {
      return this.props.routeScene(scene);
    }
    let routeIndex = undefined;
    switch (scene) {
      case 'FeedScene':
        routeIndex = 3;
        break;
      case 'ProfileScene':
        routeIndex = 2;
        break;
      case 'ThreadScene':
        routeIndex = 1;
        break;
      case 'SearchScene':
        routeIndex = 0;
        break;
      default:
        routeIndex = undefined;
    }
    return this.props.resetRouteStack(routeIndex);
  }

  render() {
    return (
      <BottomNavBar
        activeScene={this.props.activeScene}
        routeFeed={() => this.navigateTo('FeedScene')}
        routeProfile={() => this.navigateTo('ProfileScene')}
        routePost={() => this.navigateTo('CameraScene')}
        routeThread={() => this.navigateTo('ThreadScene')}
        routeSearch={() => this.navigateTo('SearchScene')}
      />
    );
  }
}
