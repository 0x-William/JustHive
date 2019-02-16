import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, StyleSheet, Platform } from 'react-native';
import {
  LoginScene,
  SignupActionsScene,
  SignupScene,
  SignupMethodScene,
  VerifyPhoneScene,
  SearchContactsScene,
  SuggestionsScene,
  TopicsScene,
  FindFriendsMethodScene,
  ForgotPasswordScene,
  FeedScene,
  FeedItemScene,
  CommentScene,
  NestedCommentScene,
  ThreadScene,
  MessageScene,
  ThreadCreateScene,
  CameraScene,
  CameraRollScene,
  PhotoEditScene,
  PostScene,
  ProfileScene,
  ProfileEditScene,
  FollowerScene,
  SettingScene,
  ChangePasswordScene,
  UpdateEmailAndPhoneScene,
  NotificationScene,
  SearchScene,
  ProfileCameraScene,
  ColonyScene,
  GroupScene,
  ColonyCreateScene,
  GroupCreateScene,
} from 'AppScenes';
import { MainLayout } from 'AppLayouts';
import { STATUSBAR_HEIGHT } from 'AppConstants';

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        marginTop: STATUSBAR_HEIGHT,
      },
    }),
    backgroundColor: 'white',
  },
});

export class RoutingContainer extends Component {
  static propTypes = {
    onNavChange: PropTypes.func.isRequired,
    navigationState: PropTypes.object.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.renderScene = ::this.renderScene;
    this.renderOverlay = ::this.renderOverlay;
    this.routeBack = ::this.routeBack;
  }

  routeBack() {
    const { navigationState } = this.props;
    const currentScene = navigationState.routes[navigationState.index].name;
    switch (currentScene) {
      case 'FeedScene':
      case 'ProfileScene':
      case 'ThreadScene':
      case 'TopicsScene':
      case 'SearchScene':
      case 'CameraScene':
        return null;
      default:
        return this.props.onNavChange('pop');
    }
  }

  renderScene(sceneProps) {
    const route = sceneProps.scene.route;
    const methods = {
      onBack: () => this.props.onNavChange('pop'),
      routeScene: (name, passProps, key) =>
        this.props.onNavChange('push', { name, passProps, key }),
      // jumpTo: (key) => this.props.onNavChange('jumpTo', { key }),
      resetRouteStack: (routeIndex) => this.props.onNavChange('resetRouteStack', { routeIndex }),
      jumpTo: (scene) => this.props.onNavChange('jumpTo', { scene }),
    };
    switch (sceneProps.scene.route.name) {
      case 'LoginScene':
        return (
          <LoginScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'SignupActionsScene':
        return (
          <SignupActionsScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'SignupScene':
        return (
          <SignupScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'SignupMethodScene':
        return (
          <SignupMethodScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'TopicsScene':
        return (
          <TopicsScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'VerifyPhoneScene':
        return (
          <VerifyPhoneScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'FindFriendsMethodScene':
        return (
          <FindFriendsMethodScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'SearchContactsScene':
        return (
          <SearchContactsScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'SuggestionsScene':
        return (
          <SuggestionsScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'ForgotPasswordScene':
        return (
          <ForgotPasswordScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'FeedScene':
        return (
          <FeedScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'FeedItemScene':
        return (
          <FeedItemScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'CommentScene':
        return (
          <CommentScene
            {...route.passProps}
            isModal={false}
            {...methods}
          />
        );
      case 'NestedCommentScene':
        return (
          <NestedCommentScene
            {...route.passProps}
            {...methods}
            isModal={false}
          />
        );
      case 'ThreadScene':
        return (
          <ThreadScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'MessageScene':
        return (
          <MessageScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'ThreadCreateScene':
        return (
          <ThreadCreateScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'CameraScene':
        return (
          <CameraScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'CameraRollScene':
        return (
          <CameraRollScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'PhotoEditScene':
        return (
          <PhotoEditScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'PostScene':
        return (
          <PostScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'ProfileScene':
        return (
          <ProfileScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'FollowerScene':
        return (
          <FollowerScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'SettingScene':
        return (
          <SettingScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'ChangePasswordScene':
        return (
          <ChangePasswordScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'UpdateEmailAndPhoneScene':
        return (
          <UpdateEmailAndPhoneScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'NotificationScene':
        return (
          <NotificationScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'SearchScene':
        return (
          <SearchScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'ProfileEditScene':
        return (
          <ProfileEditScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'ProfileCameraScene':
        return (
          <ProfileCameraScene
            {...methods}
          />
        );
      case 'ColonyScene':
        return (
          <ColonyScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'GroupScene':
        return (
          <GroupScene
            {...route.passProps}
            {...methods}
          />
        );
      case 'ColonyCreateScene':
        return (
          <ColonyCreateScene
            {...methods}
          />
        );
      case 'GroupCreateScene':
        return (
          <GroupCreateScene
            {...methods}
          />
        );
      default:
        return (
          <LoginScene
            {...route.passProps}
            {...methods}
          />
        );
    }
  }

  renderOverlay(sceneProps) {
    const methods = {
      routeScene: (name) => this.props.onNavChange('push', { name }),
      resetRouteStack: (routeIndex) => this.props.onNavChange('resetRouteStack', { routeIndex }),
    };
    const activeScene = sceneProps.scenes.filter(scene => scene.isActive)[0].route.name;
    switch (activeScene) {
      case 'LoginScene':
      case 'SignupScene':
      case 'SignupActionsScene':
      case 'SignupMethodScene':
      case 'VerifyPhoneScene':
      case 'FindFriendsMethodScene':
      case 'SearchContactsScene':
      case 'TopicsScene':
      case 'SuggestionsScene':
      case 'ForgotPasswordScene':
      case 'CameraScene':
      case 'PhotoEditScene':
      case 'CameraRollScene':
      case 'ColonyCreateScene':
      case 'GroupCreateScene':
        return null;
      default:
        return (
          <MainLayout {...methods} activeScene={activeScene} />
        );
    }
  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.props.navigationState}
        onNavigateBack={this.routeBack}
        renderScene={this.renderScene}
        renderOverlay={this.renderOverlay}
        cardStyle={styles.container}
      />
    );
  }
}
