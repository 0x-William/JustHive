import React, { PropTypes, Component } from 'react';
import { FindFriendsMethodContainer } from 'AppContainers';

export class FindFriendsMethodScene extends Component {
  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.handleSearchContacts = ::this.handleSearchContacts;
    this.handleConnectToFacebook = ::this.handleConnectToFacebook;
    this.handleSkip = ::this.handleSkip;
  }
  handleSearchContacts() {
    const { routeScene } = this.props;
    return routeScene('SearchContactsScene');
  }
  handleConnectToFacebook() {
    // @TODO
  }
  handleSkip() {
    const { routeScene } = this.props;
    return routeScene('TopicsScene');
  }
  render() {
    return (
      <FindFriendsMethodContainer
        skip={this.handleSkip}
        connectToFacebook={this.handleConnectToFacebook}
        searchContacts={this.handleSearchContacts}
      />
    );
  }
}
