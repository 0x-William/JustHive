import React, { Component, PropTypes } from 'react';
import { SearchContactsContainer } from 'AppContainers';

export class SearchContactsScene extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.navigateToTopics = ::this.navigateToTopics;
  }

  navigateToTopics() {
    const { routeScene } = this.props;
    return routeScene('TopicsScene');
  }

  render() {
    const { onBack } = this.props;
    return (
      <SearchContactsContainer
        onDone={this.navigateToTopics}
        onBack={onBack}
      />
    );
  }
}
