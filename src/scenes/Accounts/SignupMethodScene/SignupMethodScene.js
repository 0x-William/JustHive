import React, { Component, PropTypes } from 'react';
import { SignupMethodContainer } from 'AppContainers';

export class SignupMethodScene extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    jumpTo: PropTypes.func.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.goToNext = ::this.goToNext;
  }
  goToNext(emailOrPhone, isPhone) {
    const { routeScene } = this.props;
    if (isPhone) {
      return routeScene('VerifyPhoneScene', { phone: emailOrPhone });
    }
    return routeScene('SignupScene', { email: emailOrPhone });
  }
  render() {
    return (
      <SignupMethodContainer
        jumpTo={this.props.jumpTo}
        goToNext={this.goToNext}
      />
    );
  }
}
