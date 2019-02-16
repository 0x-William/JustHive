import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Navigator
} from 'react-native';
import Triangle from 'react-native-triangle';
import { SwipeImages } from './SwipeImages';
import { LikeArea } from './LikeArea';
import { Close } from 'AppComponents';
import { styles } from './styles';
import { ShareFeed } from 'AppComponents';
import { BG_MEDIUM_GRAY } from 'AppColors';
import {
  CommentScene,
  NestedCommentScene
} from 'AppScenes';

export class FeedMultiImagesModal extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    voteImage: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    pageIndex: PropTypes.number.isRequired,
    createdAgo: PropTypes.string.isRequired,
    votedImage: PropTypes.bool.isRequired,
    voted: PropTypes.bool.isRequired,
    voteCount: PropTypes.number.isRequired,
    voteImageCount: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentRoute: 'SwipeView',
      showShareView: false,
      currentImage: props.post.images[props.pageIndex],
    };
    this.onClose = ::this.onClose;
    this.showComments = ::this.showComments;
    this.renderNavigatorScene = ::this.renderNavigatorScene;
    this.navigatorDidFocus = ::this.navigatorDidFocus;
    this.showShareView = ::this.showShareView;
    this.voteImage = ::this.voteImage;
    this.onImageSwiped = ::this.onImageSwiped;
    this.navigator = null;
  }

  onPanResponderRelease() {
    return true;
  }

  onClose() {
    const { onClose } = this.props;
    return onClose && onClose(false);
  }

  onImageSwiped(currentImage) {
    this.setState({ currentImage });
  }

  showComments() {
    if (this.state.currentRoute === 'SwipeView') {
      this.navigator.push('CommentScene');
    }
  }

  showShareView(showShareView) {
    this.setState({ showShareView });
  }

  navigatorDidFocus(route) {
    const currentRoute = typeof route === 'string' ? { name: route } : route;
    this.setState({
      currentRoute: currentRoute.name
    });
  }

  voteImage() {
    this.props.voteImage(this.state.currentImage);
  }

  renderNavigatorScene(route, navigator) {
    const {
      pageIndex,
      post,
    } = this.props;
    const currentRoute = typeof route === 'string' ? { name: route } : route;
    switch (currentRoute.name) {
      case 'SwipeView':
        return (
          <SwipeImages
            images={post.images}
            pageIndex={pageIndex}
            onSwipe={this.onImageSwiped}
            voteImage={this.voteImage}
          />
        );
      case 'CommentScene':
        return (
          <CommentScene
            navigator={navigator}
            currentImage={this.state.currentImage}
            post={this.props}
            isModal={true}
            updateModalStatus={this.updateModalStatus}
            onBack={() => navigator.pop()}
          />
        );
      case 'NestedCommentScene':
        return (
          <NestedCommentScene
            navigator={navigator}
            {...route.passProps}
            isModal={true}
            onBack={() => navigator.pop()}
          />
        );
      default:
        break;
    }
    return null;
  }

  renderShareModalScreen() {
    if (this.state.showShareView) {
      return (
        <ShareFeed
          dimBackground={false}
          bottom={50}
          onClose={() => this.showShareView(false)}
        />
      );
    }
    return null;
  }
  renderBottomTriangle() {
    let flagShowTriangle = false;
    let marginLeft = 80;
    let triangleColor = BG_MEDIUM_GRAY;
    const { showShareView, currentRoute } = this.state;

    if (showShareView) {
      flagShowTriangle = true;
      marginLeft = 140;
      triangleColor = '#E8E8E8';
    }

    if (currentRoute === 'CommentScene' || currentRoute === 'NestedCommentScene') {
      flagShowTriangle = true;
    }

    if (flagShowTriangle) {
      return (
        <View style={[styles.arrowContainer, { marginLeft }]}>
          <Triangle
            width={18}
            height={12}
            color={triangleColor}
            direction={'down'}
          />
        </View>
      );
    }
    return null;
  }
  render() {
    const { voted, voteCount, createdAgo } = this.props;
    return (
      <Modal transparent={true} animationType="fade" onRequestClose={() => console.log('closing')}>
        <View style={styles.container}>
          <Navigator
            ref={el => this.navigator = el}
            initialRoute={{ name: 'SwipeView' }}
            renderScene={this.renderNavigatorScene}
            onWillFocus={this.navigatorDidFocus}
          />
          {
            this.state.currentRoute === 'SwipeView' &&
            <View style={styles.topBarContainer}>
              <Close close={this.onClose} style={styles.modalClose} />
            </View>
          }

          <View style={styles.likeAreaContainer}>
            <LikeArea
              voted={voted}
              votePost={this.props.votePost}
              voteCount={voteCount}
              voteImage={this.voteImage}
              commentCount={this.state.currentImage.commentCount}
              createdAgo={createdAgo}
              routeComments={this.showComments}
              share={() => this.showShareView(true)}
            />
          </View>
          {this.renderShareModalScreen()}
        </View>
        {this.renderBottomTriangle()}
      </Modal>
    );
  }
}
