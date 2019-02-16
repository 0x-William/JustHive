import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  InteractionManager,
  Text,
  Linking,
} from 'react-native';
import _ from 'lodash';
import { Message, InputRow } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { styles } from './styles';
import { MESSAGE_SERVICE } from 'AppServices';
import { makeCancelable } from 'AppUtilities';

class MessageContainer extends Component {
  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    threadId: PropTypes.string.isRequired,
    feathers: PropTypes.object.isRequired,
    involved: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      messages: [],
      loading: true,
    };
    this.renderRow = ::this.renderRow;
    this.getMessages = ::this.getMessages;
    this.onCreated = ::this.onCreated;
    this.routeLink = ::this.routeLink;
    this.insertMessage = ::this.insertMessage;
    this.renderFooter = ::this.renderFooter;
    this.onLayout = ::this.onLayout;
    this.messageDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.getMessagesPromise = null;

    this.messageListView = null;
    this.flagFirstDisplay = true;
    this.listViewHeight = 0;
    this.footerY = 0;
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      this.getMessages();
    });
  }

  componentDidMount() {
    this.props.feathers.service(MESSAGE_SERVICE).on('created', this.onCreated);
  }

  componentWillUnmount() {
    this.props.feathers.service(MESSAGE_SERVICE).off('created', this.onCreated);
    if (this.getMessagesPromise) {
      this.getMessagesPromise.cancel();
    }
  }

  onCreated(message) {
    const messages = this.state.messages.concat({
      ...message });
    const sortedMessage = _.sortBy(messages, (_message) =>
      new Date(_message.updatedAt).getTime());
    this.setState({
      messages: sortedMessage
    });
  }

  onLayout(event) {
    const layout = event.nativeEvent.layout;
    this.listViewHeight = layout.height;
    if (this.flagFirstDisplay) {
      window.requestAnimationFrame(() => {
        this.flagFirstDisplay = false;
        this.scrollToBottom(false);
      });
    }
  }

  getMessages() {
    const { threadId } = this.props;
    const { feathers } = this.props;
    const messageService = feathers.service(MESSAGE_SERVICE);
    const query = { threadId, $sort: { updatedAt: 1 } };
    this.getMessagesPromise = makeCancelable(messageService.find({ query }));
    this.getMessagesPromise
    .promise
    .then(messages => {
      this.setState({
        messages,
        loading: false,
      });
    });
  }

  scrollToBottom(flagAnimation) {
    window.requestAnimationFrame(() => {
      if (this.listViewHeight && this.footerY && this.footerY > this.listViewHeight) {
        const scrollDistance = this.listViewHeight - this.footerY;
        const scrollResponder = this.messageListView.getScrollResponder();
        scrollResponder.scrollTo({
          y: -scrollDistance,
          animated: flagAnimation
        });
      }
    });
  }

  insertMessage(inputText) {
    const { threadId, feathers } = this.props;
    const messageService = feathers.service(MESSAGE_SERVICE);
    messageService.create({
      threadId,
      message: inputText
    });
  }

  routeLink(path) {
    if (path.type === 'handle') {
      return Promise.resolve(path.user)
      .then(user => this.props.routeScene('ProfileScene', { userPass: user }));
    } else if (path.type === 'hashtag') {
      return this.props.routeScene('FeedScene', { hashtag: path.hashtag });
    }
    return Linking.openURL(path);
  }

  renderFooter() {
    return (
      <View
        onLayout={(event) => {
          this.footerY = event.nativeEvent.layout.y;
          this.scrollToBottom(false);
        }}
      />
    );
  }

  renderRow(message, sectionID, rowID) {
    const { feathers } = this.props;
    const _rowID = window.parseInt(rowID);
    const before = rowID > 0 ? this.state.messages[_rowID - 1] : null;
    const after = rowID < this.state.messages.length - 1 ? this.state.messages[_rowID + 1] : null;

    return (
      <View style={styles.renderRow}>
        <Message
          before={before}
          current={message}
          after={after}
          userId={feathers.get('user')._id}
          routeLink={this.routeLink}
        />
      </View>
    );
  }

  render() {
    const { loading, messages } = this.state;
    const listData = this.messageDataSource.cloneWithRows(messages);
    return (
      <View style={styles.wrap}>
        {loading ? <Text style={styles.wrap}>Loading</Text> :
          <ListView
            style={styles.listView}
            ref={view => this.messageListView = view}
            dataSource={listData}
            renderRow={this.renderRow}
            onLayout={this.onLayout}
            renderFooter={this.renderFooter}
          />
        }
        <InputRow
          placeholder="REPLY"
          hasCommentIcon={false}
          hasCameraIcon={true}
          insertMessage={this.insertMessage}
        />
      </View>
    );
  }
}

export default connectFeathers(MessageContainer);
