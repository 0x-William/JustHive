import React, { Component, PropTypes } from 'react';
import { SignupContainer } from 'AppContainers';
// STEP 3
export class SignupScene extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    facebook: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    this.onSignupSuccess = ::this.onSignupSuccess;
  }
  onSignupSuccess() {
    this.props.routeScene('FindFriendsMethodScene');
  }
  render() {
    const { routeScene, facebook } = this.props;
    return (
      <SignupContainer
        routeScene={routeScene}
        facebookData={facebook}
        onSuccess={this.onSignupSuccess}
      />
    );
  }
}
