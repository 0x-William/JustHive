import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { TopicsContainer } from 'AppContainers';

export class TopicsScene extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.toSuggestionsScene = ::this.toSuggestionsScene;
  }
  toSuggestionsScene() {
    const { routeScene }  = this.props;
    return routeScene('SuggestionsScene');
  }
  render() {
    const { onBack } = this.props;
    return (
      <TopicsContainer
        onBack={onBack}
        next={this.toSuggestionsScene}
      />
    );
  }
}
