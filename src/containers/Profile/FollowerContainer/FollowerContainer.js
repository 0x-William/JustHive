import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';
import { SimpleTopNav, Follower } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { makeCancelable } from 'AppUtilities';
import { GrayHeader } from 'AppFonts';
import { FOLLOWER_SERVICE } from 'AppServices';
import { styles } from './styles';

class FollowerContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    followers: PropTypes.bool.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      follows: new ListView.DataSource({
        rowHasChanged: (r1, r2) => (r1 !== r2),
      }),
      loading: true,
      hasFollowers: false,
    };
    this.renderFollow = ::this.renderFollow;
    this.followUser = ::this.followUser;
    this.getFollowerPromise = null;
  }

  componentWillMount() {
    const { feathers, userId, followers } = this.props;
    const query = {
      [followers ? 'userId' : 'createdBy']: userId,
      requestType: followers ? 'checkFollowers' : 'checkFollowings',
    };
    this.getFollowerPromise = makeCancelable(feathers.service(FOLLOWER_SERVICE).find({ query }));
    this.getFollowerPromise
    .promise
    .then(follows =>
      this.setState({
        follows: this.state.follows.cloneWithRows(follows),
        hasFollowers: follows.length > 0,
        loading: false,
      })
    )
    .catch(error => console.log(error));
  }

  componentWillUnmount() {
    if (this.getFollowerPromise) {
      this.getFollowerPromise.cancel();
    }
  }

  followUser(userId) {
    this.props.feathers.service(FOLLOWER_SERVICE).create({ userId })
    .catch(error => console.log(error));
  }

  renderFollow(user) {
    const { followers, feathers, routeScene } = this.props;
    const followUser = followers ? user.createdUser : user.followedUser;
    const notCurrentUser = followUser._id !== feathers.get('user')._id;
    return (
      <Follower
        user={followUser}
        followUser={this.followUser}
        currentlyFollowing={user.currentlyFollowing}
        notCurrentUser={notCurrentUser}
        routeScene={routeScene}
      />
    );
  }

  renderListView(centerLabel) {
    if (this.state.hasFollowers) {
      return (
        <ListView
          dataSource={this.state.follows}
          renderRow={this.renderFollow}
        />
      );
    }
    return (
      <GrayHeader style={styles.center}>
        No {centerLabel.toLowerCase()}!
      </GrayHeader>
    );
  }

  render() {
    const { followers, routeBack } = this.props;
    const centerLabel = followers ? 'FOLLOWERS' : 'FOLLOWING';
    return (
      <View style={styles.container}>
        <SimpleTopNav
          leftAction={routeBack}
          centerLabel={centerLabel}
        />
        {!this.state.loading && this.renderListView(centerLabel)}
      </View>
    );
  }
}

export default connectFeathers(FollowerContainer);
