/**
 * Created by nick on 21/06/16.
 */
import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Modal, Image, TextInput, ListView } from 'react-native';
import { HexagonImage, SocialList } from 'AppComponents';
import { LabelText } from 'AppFonts';
import { connectFeathers } from 'AppConnectors';
import { styles } from './styles';
import {
  USER_SERVICE,
  NOTIFICATION_SERVICE
} from 'AppServices';

class ShareFeed extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    feathers: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    dimBackground: PropTypes.bool.isRequired,
    bottom: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.onClose = ::this.onClose;
    this.state = {
      sendUserName: '',
      users: []
    };
    this.userDataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.userListView = null;
    this.onChangeText = ::this.onChangeText;
    this.renderUserRow = ::this.renderUserRow;
    this.onSocialClick = ::this.onSocialClick;
  }

  onChangeText(sendUserName) {
    const { feathers } = this.props;
    const currentUser = feathers.get('user');
    const userService = feathers.service(USER_SERVICE);
    const query = {
      $or: [
        { name: { $regex: sendUserName, $options: 'i' } },
        { username: { $regex: sendUserName, $options: 'i' } },
      ],
      $limit: 10,
    };
    userService.find({ query })
      .then(results => {
        const users = results.filter(result => result._id !== currentUser._id);
        this.setState({ users });
      });
    this.setState({ sendUserName });
  }

  onSocialClick() {
  }

  onClose() {
    this.props.onClose();
  }

  sharePostToUser(user) {
    const { feathers } = this.props;
    const notificationService = feathers.service(NOTIFICATION_SERVICE);
    const notification = {
      userId: user._id,
      target: 'post',
      targetId: this.props.postId,
      type: 'share'
    };

    notificationService.create(notification)
      .catch(error => console.log(error));
    this.onClose();
  }

  renderUserRow(user) {
    return (
      <TouchableOpacity style={styles.userContainer} onPress={() => this.sharePostToUser(user)}>
        <HexagonImage
          imageWidth={45}
          imageHeight={45}
          border={true}
          isHorizontal={true}
          size={40}
          imageSource={{ uri: user.avatarUrl }}
        />
        <LabelText style={styles.userLabel}>{user.name}</LabelText>
      </TouchableOpacity>
    );
  }

  render() {
    const userRows = this.userDataSource.cloneWithRows(this.state.users);
    const { dimBackground, bottom } = this.props;
    const dimStyle = dimBackground ? styles.dimBackground : null;
    return (
      <Modal transparent={true}>
        <View style={[styles.container, dimStyle]} >
          <TouchableOpacity
            onPress={this.onClose}
            style={styles.modalTouchable}
          />
        </View>
        <View style={[styles.viewContainer, { bottom }]}>
          <View style={styles.searchContainer}>
            <Image
              source={require('img/icons/icon_search.png')}
              style={styles.modalSearchImage}
            />
            <TextInput
              style={styles.input}
              placeholder="Send to..."
              onChangeText={this.onChangeText}
              value={this.state.sendUserName}
            />
          </View>

          <View style={styles.userListContainer}>
            <ListView
              enableEmptySections={true}
              horizontal={true}
              dataSource={userRows}
              renderRow={this.renderUserRow}
            />
          </View>
          <SocialList onPress={this.onSocialClick} />
        </View>
      </Modal>
    );
  }
}

export default connectFeathers(ShareFeed);
