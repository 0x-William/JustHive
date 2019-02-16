import React, { Component, PropTypes } from 'react';
import { ThreadContainer } from 'AppContainers';

export class ThreadScene extends Component {
  static propTypes = {
    routeScene: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.routeMessages = ::this.routeMessages;
    this.routeCreateThread = ::this.routeCreateThread;
    this.routeNotificationDetail = ::this.routeNotificationDetail;
  }

  routeMessages(threadId, involved, callback) {
    this.props.routeScene('MessageScene', { threadId, involved, callback });
  }

  routeCreateThread() {
    this.props.routeScene('ThreadCreateScene');
  }

  routeNotificationDetail(name, passProps) {
    this.props.routeScene(name, passProps);
  }

  render() {
    return (
      <ThreadContainer
        routeMessages={this.routeMessages}
        routeCreateThread={this.routeCreateThread}
        routeNotificationDetail={this.routeNotificationDetail}
      />
    );
  }
}
