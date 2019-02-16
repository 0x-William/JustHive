import React, { Component, PropTypes } from 'react';
import { NotificationContainer } from 'AppContainers';

export class NotificationScene extends Component {
  static propTypes = {
    routeScene: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.routeTarget = ::this.routeTarget;
  }

  routeTarget(notification, prop) {
    switch (notification.from) {
      case 'message': {
        return this.props.routeScene('MessageScene', {
          threadId: notification.targetId,
          involved: prop
        });
      }
      case 'follower':
        return this.props.routeScene('ProfileScene', { userPass: prop });
      default:
        return null;
    }
  }

  render() {
    return (
      <NotificationContainer
        routeBack={this.props.onBack}
        routeTarget={this.routeTarget}
      />
    );
  }
}
