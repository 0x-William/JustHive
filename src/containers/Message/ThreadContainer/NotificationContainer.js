/**
 * Created by nick on 02/07/16.
 */
import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
} from 'react-native';
import { NotificationList } from 'AppComponents';
import { NOTIFICATION_SERVICE, POST_SERVICE, COMMENT_SERVICE } from 'AppServices';
import { makeCancelable } from 'AppUtilities';

class NotificationContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeNotificationDetail: PropTypes.func.isRequired,
    selectMode: PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      notifications: [],
      limit: 10,
      loading: true,
      selectMode: props.selectMode
    };
    this.deleteNotification = ::this.deleteNotification;
    this.getNotifications = ::this.getNotifications;
    this.getMoreNotifications = ::this.getMoreNotifications;
    this.updateRead = ::this.updateRead;
    this.selectAllNotification = ::this.selectAllNotification;
    this.deleteNotifications = ::this.deleteNotifications;
    this.getNotificationPromise = null;
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getNotifications();
    });
  }

  componentWillUnmount() {
    if (this.getNotificationPromise) {
      this.getNotificationPromise.cancel();
    }
  }

  getNotifications() {
    const { feathers } = this.props;
    const { limit } = this.state;
    const currentUser = this.props.feathers.get('user');
    const notificationService = feathers.service(NOTIFICATION_SERVICE);
    const query = {
      userId: currentUser._id,
      read: false,
      $limit: limit,
      $sort: { updatedAt: -1 }
    };
    this.getNotificationPromise = makeCancelable(notificationService.find({ query }));
    this.getNotificationPromise
      .promise
      .then(_notifications => {
        const notifications = _notifications.filter(notification => !notification.deleted);
        this.setState({
          notifications,
          loading: false,
        });
      })
      .catch(error => console.log(error));
  }

  getMoreNotifications() {
    if (this.state.notifications.length > this.state.limit - 3) {
      this.setState({
        limit: this.state.limit + 10,
        loading: true,
      });
      return this.getNotifications();
    }
    return null;
  }

  deleteNotification(notificationId, skipUpdateState) {
    const { feathers } = this.props;
    const notificationService = feathers.service(NOTIFICATION_SERVICE);
    notificationService.patch(notificationId, { deleted: true });
    if (!skipUpdateState) {
      let notifications = this.state.notifications.concat();
      notifications = notifications.filter(notification =>
        notification._id !== notificationId
      );
      const newArray = notifications.map((notification) => ({ ...notification, deleted: false }));
      this.setState({
        notifications: newArray,
      });
    }
  }

  updateRead(notification) {
    const { _id, target } = notification;
    this.props.feathers.service(NOTIFICATION_SERVICE).patch(_id, { read: true });
    if (target === 'post') {
      const query = { _id: notification.targetId };
      // this.props.routeNotificationDetail('FeedItemScene', { post: notification.post });
      this.props.feathers.service(POST_SERVICE).find({ query })
        .then((post) => {
          this.props.routeNotificationDetail('FeedItemScene', { post: post[0] });
        });
    } else if (target === 'comment') {
      const query = { _id: notification.comment.targetId };
      this.props.feathers.service(POST_SERVICE).find({ query })
        .then((post) => {
          this.props.routeNotificationDetail('CommentScene', { post: post[0] });
        });
    } else if (target === 'reply') {
      const query = { _id: notification.reply.targetId };
      this.props.feathers.service(COMMENT_SERVICE).find({ query })
        .then((comment) => {
          this.props.routeNotificationDetail('NestedCommentScene',
            { comment: comment[0], postId: notification.reply.postId });
        });
    }
  }

  selectAllNotification() {
    const notifications = this.state.notifications.concat();
    notifications.forEach((notification) => notification.isSelected = true);
    this.setState({ notifications });
  }

  deleteNotifications() {
    const notificationIds = [];
    let notifications = this.state.notifications.concat();
    notifications.forEach((notification) =>
      notification.isSelected === true && notificationIds.push(notification._id)
      && this.deleteNotification(notification._id, true)
    );

    notifications = notifications.filter(notification =>
      notificationIds.indexOf(notification._id) === -1
    );
    const newArray = notifications.map((notification) => ({ ...notification, deleted: false }));
    this.setState({
      notifications: newArray,
    });
  }

  render() {
    const { notifications } = this.state;
    return (
      <NotificationList
        notifications={notifications}
        selectMode={this.props.selectMode}
        getMoreNotifications={this.getMoreNotifications}
        updateRead={this.updateRead}
        deleteNotification={this.deleteNotification}
      />
    );
  }

}

export default NotificationContainer;
