import React, { PropTypes } from 'react';
import SwipeableListView from 'SwipeableListView';
import {
  TouchableOpacity,
} from 'react-native';
import { NotificationItem } from 'AppComponents';
import { styles } from './styles';
import { AuxText } from 'AppFonts';
import moment from 'moment/src/moment';

const renderRow = (notification, updateRead, selectMode) => {
  const updatedAt = moment(notification.updatedAt).fromNow();
  return (
    <NotificationItem
      notification={notification}
      updatedAt={updatedAt}
      selectMode={selectMode}
      routeNotification={() => updateRead(notification)}
    />
  );
};

const renderDelete = (notification, action) => (
  <TouchableOpacity onPress={() => action(notification._id)} style={styles.delete}>
    <AuxText style={ styles.deleteText }>Delete</AuxText>
  </TouchableOpacity>
);

export const NotificationList = ({
  notifications, getMoreNotifications, deleteNotification, updateRead, selectMode
}) => {
  const notificationDataSource = SwipeableListView.getNewDataSource();
  const items = notificationDataSource.cloneWithRowsAndSections({ s1: notifications });
  return (
    <SwipeableListView
      enableEmptySections={true}
      dataSource={items}
      renderQuickActions={(item) => renderDelete(item, deleteNotification)}
      renderRow={(item) => renderRow(item, updateRead, selectMode)}
      maxSwipeDistance={100}
      onEndReachedThreshold={300}
      onEndReached={getMoreNotifications}
    />
  );
};

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  getMoreNotifications: PropTypes.func.isRequired,
  updateRead: PropTypes.func.isRequired,
  deleteNotification: PropTypes.func.isRequired,
  selectMode: PropTypes.bool.isRequired,
};
