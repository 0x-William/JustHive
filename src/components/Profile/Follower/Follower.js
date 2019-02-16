import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { UserAvatar } from 'AppComponents';
import { LabelText } from 'AppFonts';
import { styles } from './styles';

export class Follower extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    followUser: PropTypes.func.isRequired,
    currentlyFollowing: PropTypes.bool.isRequired,
    notCurrentUser: PropTypes.bool.isRequired,
    routeScene: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentlyFollowing: props.currentlyFollowing,
    };
    this.followUser = ::this.followUser;
  }

  followUser(userId) {
    this.setState({ currentlyFollowing: !this.state.currentlyFollowing });
    this.props.followUser(userId);
  }

  render() {
    const { user, notCurrentUser, routeScene } = this.props;
    const { currentlyFollowing } = this.state;
    const imgSource = currentlyFollowing ?
      require('img/icons/icon_profile_followed.png') :
      require('img/icons/icon_profile_follow.png');
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => routeScene('ProfileScene', { userPass: user })}
        >
          <UserAvatar
            avatarUrl={user.avatarUrl}
            size={50}
            iconStyle={{ width: 22, height: 25 }}
          />
          <LabelText upperCase={true} style={styles.username}>{user.username}</LabelText>
        </TouchableOpacity>
        {notCurrentUser && <TouchableHighlight
          style={[styles.button, currentlyFollowing && styles.following]}
          onPress={() => this.followUser(user._id)}
          underlayColor="#FFF"
        >
          <Image
            source={imgSource}
            style={[styles.image, currentlyFollowing && styles.followingImage]}
          />
        </TouchableHighlight>}
      </View>
    );
  }
}
