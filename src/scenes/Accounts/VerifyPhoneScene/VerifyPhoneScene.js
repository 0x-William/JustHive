import React, { Component, PropTypes } from 'react';
import { VerifyPhoneContainer } from 'AppContainers';

export class VerifyPhoneScene extends Component {
  static propTypes = {
    phone: PropTypes.string.isRequired,
    routeScene: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.navigateToSignup = ::this.navigateToSignup;
  }
  navigateToSignup() {
    const { routeScene, phone } = this.props;
    return routeScene('SignupScene', { phone });
  }
  render() {
    const { phone } = this.props;
    return (
      <VerifyPhoneContainer
        phone={phone}
        navigateToSignup={this.navigateToSignup}
      />
    );
  }
}
