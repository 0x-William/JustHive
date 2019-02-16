import React, { Component, PropTypes } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import { FeedContainer, FeedGridContainer } from '../../';
import { connectFeathers } from 'AppConnectors';
import { ProfileInfo, ProfileTopNav, ProfilePostControl } from 'AppComponents';
import { LabelText } from 'AppFonts';
import { FOLLOWER_SERVICE, POST_SERVICE } from 'AppServices';
import { AuxText } from 'AppFonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';

class ProfileContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeScene: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
    userPass: PropTypes.object,
  };

  static defaultProps = {
    userPass: null,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentlyFollowing: false,
      feedStyle: 'tile',
      postCount: 0,
      followerCount: 0,
      followingCount: 0,
      loading: true,
      top: -100,
      height: new Animated.Value(0),
      scale: new Animated.Value(0),
      dropDownActive: false,
    };
    this.setFeedStyle = ::this.setFeedStyle;
    this.followUser = ::this.followUser;
    this.renderTopNav = ::this.renderTopNav;
    this.expandNav = ::this.expandNav;
    this.renderFeed = ::this.renderFeed;
    this.blockUser = ::this.blockUser;
  }

  componentWillMount() {
    const { feathers, userPass } = this.props;
    const followerService = feathers.service(FOLLOWER_SERVICE);
    const postService = feathers.service(POST_SERVICE);
    const { _id } = userPass || feathers.get('user');
    const currentUserId = feathers.get('user')._id;
    const query = {
      $or: [
        { userId: _id },
        { createdBy: _id }
      ],
    };
    let postCount = 0;
    postService.find({ query: { createdBy: _id } })
    .then(posts => (postCount = posts.total))
    .then(() => followerService.find({ query }))
    .then(followers =>
      this.setState({
        followerCount: followers.filter(
          follow => follow.userId === _id
        ).length,
        followingCount: followers.filter(
          follow => follow.createdBy === _id
        ).length,
        postCount,
        currentlyFollowing: followers.filter(
          follow =>
            follow.createdBy === currentUserId &&
            follow.userId === _id
        ).length > 0,
        loading: false,
      })
    );
  }

  setFeedStyle(feedStyle) {
    this.setState({ feedStyle });
  }

  followUser() {
    const { feathers, userPass } = this.props;
    const { followerCount } = this.state;
    const followerService = feathers.service(FOLLOWER_SERVICE);
    const newFollower = { userId: userPass._id };
    followerService.create(newFollower)
    .then(follow => this.setState({
      followerCount: follow.following ? followerCount + 1 : followerCount - 1,
      currentlyFollowing: follow.following,
    }))
    .catch(error => console.log(error));
  }

  expandNav() {
    const { height, scale, dropDownActive } = this.state;
    if (!dropDownActive) {
      this.setState({ top: 0 });
    }
    Animated.parallel([
      Animated.timing(
        scale, {
          toValue: dropDownActive ? 0 : 1,
          duration: 300,
        }
      ),
      Animated.timing(
        height, {
          toValue: dropDownActive ? 0 : 50,
          duration: 300,
        }
      ),
    ]).start(() => this.setState({
      dropDownActive: !dropDownActive,
      top: dropDownActive ? -100 : 0,
    }));
  }

  blockUser() {
    console.log('blocking user');
  }

  renderTopNav(user, isCurrentUser) {
    const { routeScene, routeBack } = this.props;
    const { height, top, scale, currentlyFollowing } = this.state;
    if (isCurrentUser) {
      return (
        <ProfileTopNav
          leftAction={() => routeScene('ProfileEditScene')}
          leftLabel={
            <LabelText style={ styles.leftArrow } upperCase={true}>
              Edit
            </LabelText>
          }
          centerLabel={`@${user.username}`}
          rightAction={() => routeScene('SettingScene')}
          rightLabel={
            <Image
              source={require('img/icons/icon_profile_settings.png')}
              style={ styles.settingsIcon }
            />
          }
          expandNav={this.expandNav}
          leftIconAction={() => routeScene('AnalyticScene')}
          leftIcon={
            <Image
              source={require('img/icons/icon_profile_dashboard.png')}
              style={ styles.dashboardIcon }
            />
          }
          rightIconAction={() => routeScene('ColonyScene')}
          rightIcon={
            <Image
              source={require('img/icons/icon_profile_colony.png')}
              style={ styles.colonyIcon }
            />
          }
          centerIconAction={() => routeScene('GroupScene')}
          centerIcon={
            <Image
              source={require('img/icons/icon_profile_groups.png')}
              style={ styles.groupsIcon }
            />
          }
          height={height}
          top={top}
          scale={scale}
        />
      );
    }
    return (
      <ProfileTopNav
        leftAction={routeBack}
        centerLabel={user.username}
        rightAction={this.followUser}
        rightLabel={currentlyFollowing ?
          <Image
            source={require('img/icons/icon_profile_followed.png')}
            style={ styles.followedIcon }
          /> :
          <Image
            source={require('img/icons/icon_profile_follow.png')}
            style={ styles.followIcon }
          />
        }
        expandNav={this.expandNav}
        leftIconAction={() => routeScene('MessageScene')}
        leftIcon={
          <Image
            source={require('img/icons/icon_profile_message.png')}
            style={ styles.messageIcon }
          />
        }
        rightIconAction={this.blockUser}
        rightIcon={
          <Image
            source={require('img/icons/icon_alert.png')}
            style={ styles.alertIcon }
          />
        }
        centerIconAction={() => routeScene('ColonyScene', { user })}
        centerIcon={
          <Image
            source={require('img/icons/icon_profile_colony.png')}
            style={ styles.colonyIcon }
          />
        }
        height={height}
        top={top}
        scale={scale}
      />
    );
  }

  renderFeed(currentUser) {
    const { routeScene } = this.props;
    switch (this.state.feedStyle) {
      case 'tile':
        return (
          <FeedGridContainer
            handle={currentUser._id}
            routeToFeedItem={routeScene}
          />
        );
      case 'list':
        return (
          <FeedContainer
            handle={currentUser._id}
            routeScene={routeScene}
            routeProfile={() => console.log('already on profile')}
          />
        );
      case '360':
      default:
        return (
          <FeedContainer
            handle={currentUser._id}
            routeScene={routeScene}
            routeProfile={() => console.log('already on profile')}
          />
        );
    }
  }

  render() {
    const {
      feathers,
      userPass,
      routeScene,
    } = this.props;
    const currentUser = userPass || feathers.get('user');
    const { followerCount, followingCount, postCount, loading } = this.state;
    if (loading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={ styles.container }>
        {this.renderTopNav(currentUser, !userPass || userPass._id === feathers.get('user')._id)}
        <ProfileInfo
          {...currentUser}
          routeScene={routeScene}
          setFeedStyle={this.setFeedStyle}
          followerCount={followerCount}
          followingCount={followingCount}
        />
        <ProfilePostControl
          setFeedStyle={this.setFeedStyle}
          postCount={postCount}
        />
        {postCount > 0 ? this.renderFeed(currentUser) : (
          <View style={ styles.container }>
            <View style={ styles.center }>
              <AuxText upperCase={false}>
                Looks like you haven't made any posts.
              </AuxText>
              <AuxText upperCase={false}>
                Start Here.
              </AuxText>
            </View>
            <View style={ styles.arrow } />
            <AuxText upperCase={false} style={ styles.centerSelf }>
              <Icon name="keyboard-arrow-down" size={30} />
            </AuxText>
          </View>
        )}
      </View>
    );
  }
}

export default connectFeathers(ProfileContainer);
