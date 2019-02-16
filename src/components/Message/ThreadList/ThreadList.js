import React, { PropTypes } from 'react';
import SwipeableListView from 'SwipeableListView';
import {
  TouchableOpacity,
} from 'react-native';
import { Thread } from 'AppComponents';
import { styles } from './styles';
import { AuxText } from 'AppFonts';
import moment from 'moment/src/moment';

const renderThreadRow = (thread, updateRead, deleteThread, selectMode) => {
  let updatedAt = moment(thread.updatedAt).format('L');
  if (moment(thread.updatedAt).isSame(moment(), 'day')) {
    updatedAt = moment(thread.updatedAt).from(moment());
  } else if (moment(thread.updatedAt).isSame(moment(), 'week')) {
    updatedAt = moment(thread.updatedAt).format('dddd');
  }
  return (
    <Thread
      involvedArray={thread.involvedArray}
      lastMessage={thread.lastMessage.message}
      updatedAt={updatedAt}
      selectMode={selectMode}
      isSelected={thread.isSelected}
      routeMessages={() => updateRead(thread)}
      deleteThread={() => deleteThread(thread._id)}
      readThread={thread.currentUserRead}
    />
  );
};

const renderThreadDelete = (thread, deleteThread) => (
  <TouchableOpacity onPress={() => deleteThread(thread._id)} style={styles.delete}>
    <AuxText style={ styles.threadDeleteText }>Delete</AuxText>
  </TouchableOpacity>
);

export const ThreadList = ({
  threads, getMoreThreads, deleteThread, updateRead, selectMode
}) => {
  const threadDataSource = SwipeableListView.getNewDataSource();
  const items = threadDataSource.cloneWithRowsAndSections({ s1: threads });
  return (
    <SwipeableListView
      enableEmptySections={true}
      dataSource={items}
      renderQuickActions={(thread) => renderThreadDelete(thread, deleteThread)}
      renderRow={(thread) => renderThreadRow(thread, updateRead, deleteThread, selectMode)}
      maxSwipeDistance={100}
      onEndReachedThreshold={300}
      onEndReached={getMoreThreads}
    />
  );
};

ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  getMoreThreads: PropTypes.func.isRequired,
  updateRead: PropTypes.func.isRequired,
  deleteThread: PropTypes.func.isRequired,
  selectMode: PropTypes.bool.isRequired,
};
