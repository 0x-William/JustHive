import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  SimpleTopNav,
  ThreadToLine,
  ThreadUserRow,
  InputRow,
} from 'AppComponents';
import {
  USER_SERVICE,
  THREAD_SERVICE,
  MESSAGE_SERVICE
} from 'AppServices';
import { connectFeathers } from 'AppConnectors';
import { MessageContainer } from 'AppContainers';
import { styles } from './styles';

class ThreadCreateContainer extends Component {
  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
      usersSelected: [],
      text: '',
      nameArray: '',
      threadId: '',
      sendDisabled: true,
      centerLabel: 'NEW MESSAGE',
      messageSent: false,
    };
    this.userDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.handlePress = ::this.handlePress;
    this.renderMessage = ::this.renderMessage;
    this.renderRow = ::this.renderRow;
    this.onChangeText = ::this.onChangeText;
    this.insertMessage = ::this.insertMessage;
    this.setMessageSent = ::this.setMessageSent;
  }

  onChangeText(text) {
    this.setState({ text });
    const userService = this.props.feathers.service(USER_SERVICE);
    const { nameArray } = this.state;
    const newText = text.replace(nameArray, '');
    const query = {
      $or: [
        { name: { $regex: newText, $options: 'i' } },
        { username: { $regex: newText, $options: 'i' } },
      ],
      $limit: 10,
    };
    userService.find({ query })
    .then(results => {
      const { usersSelected } = this.state;
      const users = results.filter(result =>
        usersSelected.indexOf(result._id) === -1
      );
      this.setState({ users });
    });
  }

  setMessageSent(thread) {
    const nameArray = this.state.nameArray.split('; ').filter(name => name !== '');
    this.setState({
      threadId: thread.threadId || thread._id,
      messageSent: true,
      rightAction: () => null,
      rightLabel: '',
      centerLabel: nameArray.length > 1 ? 'Group' : nameArray[0].split(' ')[0],
    });
  }

  handlePress(user) {
    const { feathers } = this.props;
    const currentUser = feathers.get('user');
    if (user._id !== currentUser._id) {
      const nameArray = this.state.nameArray.concat(`${user.name}; `);
      const usersSelected = this.state.usersSelected.concat(user._id);
      const threadService = feathers.service(THREAD_SERVICE);
      const query = {
        involved: { $all: [...usersSelected, currentUser._id], $size: usersSelected.length + 1 }
      };
      threadService.find({ query })
        .then(results =>
          this.setState({
            threadId: results.length > 0 ? results[0]._id : '',
            usersSelected,
            nameArray,
            text: nameArray,
            sendDisabled: false,
          })
        )
        .catch(error => console.log(error));
    }
  }

  insertMessage(inputText) {
    const { feathers } = this.props;
    const { threadId, usersSelected } = this.state;
    const messageService = feathers.service(MESSAGE_SERVICE);
    const threadService = feathers.service(THREAD_SERVICE);
    if (threadId) {
      messageService.create({
        threadId,
        message: inputText,
        createdAt: new Date(),
      })
      .then(this.setMessageSent)
      .catch(error => console.log(error));
    } else {
      threadService.create({
        involved: usersSelected,
        firstMessageText: inputText,
      })
      .then(this.setMessageSent)
      .catch(error => console.log(error));
    }
  }

  renderMessage() {
    const { threadId, usersSelected } = this.state;
    const { feathers } = this.props;
    const currentUser = feathers.get('user');
    const messageService = feathers.service(MESSAGE_SERVICE);
    return threadId ? (
      <MessageContainer
        threadId={threadId}
        involved={usersSelected}
        currentUser={currentUser}
        enableEmptySections={true}
        routeScene={this.props.routeScene}
        messageService={messageService}
      />
    ) : (
      null
    );
  }

  renderRow(user) {
    return React.createElement(ThreadUserRow, {
      user,
      handlePress: () => this.handlePress(user)
    });
  }

  render() {
    const {
      text,
      nameArray,
      sendDisabled,
      centerLabel,
      messageSent,
      threadId,
      users
    } = this.state;
    const userListData = this.userDataSource.cloneWithRows(users);
    const newText = text.replace(nameArray, '');

    return (
      <View style={styles.wrap}>
        <SimpleTopNav
          leftAction={this.props.routeBack}
          centerLabel={centerLabel}
          sideFontSize={16}
        />
        {!messageSent && !threadId &&
          <ThreadToLine
            onChangeText={this.onChangeText}
            inputValue={this.state.text}
          />
        }
        {newText.length > 0 ? (
          <ListView
            dataSource={userListData}
            renderRow={this.renderRow}
            enableEmptySections={true}
          />
        ) : (
          <View style={styles.wrap}>
            {this.renderMessage()}
          </View>
        )}
        {!messageSent && !threadId &&
          <InputRow
            insertMessage={this.insertMessage}
            sendDisabled={sendDisabled}
          />
        }
        <KeyboardSpacer topSpacing={-50} />
      </View>
    );
  }
}
export default connectFeathers(ThreadCreateContainer);
