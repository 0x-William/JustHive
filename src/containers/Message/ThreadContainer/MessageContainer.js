/**
 * Created by nick on 02/07/16.
 */
import React, { Component, PropTypes } from 'react';
import {
  InteractionManager,
} from 'react-native';
import { ThreadList } from 'AppComponents';
import { GROUP_SERVICE } from 'AppServices';
import { makeCancelable } from 'AppUtilities';

class MessageContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeMessages: PropTypes.func.isRequired,
    routeCreateThread: PropTypes.func.isRequired,
    selectMode: PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      threads: [],
      loading: true,
    };
    this.deleteThread = ::this.deleteThread;
    this.getThreads = ::this.getThreads;
    this.getMoreThreads = ::this.getMoreThreads;
    this.updateRead = ::this.updateRead;
    this.deleteThreads = ::this.deleteThreads;
    this.selectAllThread = ::this.selectAllThread;
    this.getThreadPromise = null;
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getThreads();
    });
  }

  componentWillUnmount() {
    if (this.getThreadPromise) {
      this.getThreadPromise.cancel();
    }
  }

  getThreads() {
    const { feathers } = this.props;
    const groupService = feathers.service(GROUP_SERVICE);
    this.getThreadPromise = makeCancelable(groupService.find());
    this.getThreadPromise
      .promise
      .then(_threads => {
        const threads = _threads.filter(thread => !thread.deleted);
        this.setState({
          threads,
          loading: false,
        });
      })
      .catch(error => console.log(error));
  }

  getMoreThreads() {
    if (this.state.threads.length > this.state.limit - 3) {
      this.setState({
        limit: this.state.limit + 10,
        loading: true,
      });
      return this.getThreads();
    }
    return null;
  }

  deleteThread(threadId, skipUpdateState) {
    const { feathers } = this.props;
    const groupService = feathers.service(GROUP_SERVICE);
    const currentUser = this.props.feathers.get('user');
    groupService.patch(threadId, { deleted: [currentUser._id] });
    if (!skipUpdateState) {
      let threads = this.state.threads.concat();
      threads = threads.filter(thread =>
        thread._id !== threadId
      );
      const newArray = threads.map((thread) => ({ ...thread, deleted: false }));
      this.setState({
        threads: newArray,
      });
    }
  }

  updateRead(thread) {
    const { _id, involvedArray, currentUserRead } = thread;
    if (!this.props.selectMode) {
      if (!currentUserRead) {
        this.props.feathers.service(GROUP_SERVICE).patch(_id, { readBy: [] });
      }
      const threads = this.state.threads.concat();
      threads.forEach((_thread) => {
        if (_thread._id === _id) {
          _thread.currentUserRead = true;
        }
      });
      this.setState({ threads });
      this.props.routeMessages(_id, involvedArray);
    } else {
      const threads = this.state.threads.concat();
      threads.forEach((_thread) => {
        if (_thread._id === _id) {
          if (!_thread.isSelected) {
            _thread.isSelected = true;
          } else {
            _thread.isSelected = false;
          }
        }
      });
      this.setState({ threads });
    }
  }

  selectAllThread() {
    const threads = this.state.threads.concat();
    threads.forEach((thread) => thread.isSelected = true);
    this.setState({ threads });
  }

  deleteThreads() {
    const threadIds = [];
    let threads = this.state.threads.concat();
    threads.forEach((thread) =>
      thread.isSelected === true && threadIds.push(thread._id)
      && this.deleteThread(thread._id, true)
    );

    threads = threads.filter(thread =>
      threadIds.indexOf(thread._id) === -1
    );
    const newArray = threads.map((thread) => ({ ...thread, deleted: false }));
    this.setState({
      threads: newArray,
    });
  }

  render() {
    const { threads } = this.state;
    return (
      <ThreadList
        threads={threads}
        selectMode={this.props.selectMode}
        getMoreThreads={this.getMoreThreads}
        updateRead={this.updateRead}
        deleteThread={this.deleteThread}
      />
    );
  }

}

export default MessageContainer;
