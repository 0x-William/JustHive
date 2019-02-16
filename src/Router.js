import React, { Component } from 'react';
import { NavigationExperimental } from 'react-native';
import { RoutingContainer } from './RoutingContainer';
const {
  StateUtils: NavigationStateUtils
} = NavigationExperimental;

export class Router extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      navigationState: {
        index: 0,
        routes: [{ key: `Route-${Date.now()}`, name: 'LoginScene' }],
      }
    };
    this.onNavChange = ::this.onNavChange;
  }

  onNavChange(type, routeProps) {
    let { navigationState } = this.state;
    switch (type) {
      case 'push': {
        const route = {
          key: routeProps.key ? routeProps.key : `Route-${Date.now()}`,
          name: routeProps.name,
          passProps: routeProps.passProps
        };
        const routes = navigationState.routes.slice(0, navigationState.index + 1)
          .concat(route)
          .concat(navigationState.routes.slice(navigationState.index + 1));
        navigationState = {
          ...navigationState,
          index: navigationState.index + 1,
          routes,
        };
        break;
      }
      case 'pop': {
        const routes = navigationState.routes.slice(0, navigationState.index)
          .concat(navigationState.routes.slice(navigationState.index + 1));
        navigationState = {
          ...navigationState,
          index: navigationState.index - 1,
          routes,
        };
        break;
      }
      case 'jumpTo': {
        const newRoute = navigationState.routes.filter(route => route.name === routeProps.scene)[0];
        navigationState = NavigationStateUtils.jumpTo(navigationState, newRoute.key);
        break;
      }
      case 'resetRouteStack': {
        // reset to the tabs
        const routeStack = [
          { key: 'SearchScene', name: 'SearchScene' },
          { key: 'ThreadScene', name: 'ThreadScene' },
          { key: 'ProfileScene', name: 'ProfileScene' },
          { key: 'FeedScene', name: 'FeedScene' },
        ];
        const index = routeProps && routeProps.routeIndex;
        navigationState = NavigationStateUtils.reset(navigationState, routeStack, index);
        break;
      }
      default:
        break;
    }
    if (this.state.navigationState !== navigationState) {
      this.setState({ navigationState });
    }
  }

  render() {
    return (
      <RoutingContainer
        navigationState={this.state.navigationState}
        onNavChange={this.onNavChange}
      />
    );
  }
}
