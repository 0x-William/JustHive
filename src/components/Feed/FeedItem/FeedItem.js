import React, { Component, PropTypes } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  PanResponder,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment/src/moment';
import { LikeArea } from './';
import { styles } from './styles';
import {
  UserAvatar,
  ItemImages,
  FeedMultiImagesModal,
  ShareFeed
} from 'AppComponents';
import { AUX_TEXT } from 'AppColors';
import { CommentText, LabelText } from 'AppFonts';
import { WINDOW_WIDTH as width } from 'AppConstants';

export class FeedItem extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    routeComments: PropTypes.func.isRequired,
    votePost: PropTypes.func.isRequired,
    voteImage: PropTypes.func.isRequired,
    routeScene: PropTypes.func,
    votedPosition: PropTypes.array,
    routeBack: PropTypes.func,
    feathers: PropTypes.object,
    createdAgo: PropTypes.string.isRequired,
    currentUserId: PropTypes.number.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      left: new Animated.Value(0),
      images: props.post.images,
      voted: props.post.voted,
      votedPosition: props.post.images[0].votedPosition,
      votedImage: props.post.votedImage,
      voteImageCount: props.post.votesImage,
      voteCount: props.post.votes,
      showFeedMultiImageModal: false,
      showShareView: false,
      showVoteAnimation: false,
      selectedImageIndex: 0,
    };
    this.voteImage = ::this.voteImage;
    this.votePost = :: this.votePost;
    this._handleShouldSet = ::this._handleShouldSet;
    this._handlePanResponderMove = ::this._handlePanResponderMove;
    this._handlePanResponderEnd = ::this._handlePanResponderEnd;
    this._animateBack = ::this._animateBack;
    this.showMultiModalScreen = ::this.showMultiModalScreen;
    this.showShareView = ::this.showShareView;
    this.interval = null;
    this._panResponder = {};
    this._feedItem = null;
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this._handleShouldSet,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
  }

  _handleShouldSet(evt, gestureState) {
    return gestureState.dx < -50;
  }

  _handlePanResponderMove(evt, gestureState) {
    const move = Animated.event([null, {
      dx: this.state.left
    }]);
    return move(evt, gestureState);
  }

  _handlePanResponderEnd(evt, gestureState) {
    if (Math.abs(gestureState.dx) >= width / 2 || gestureState.vx < -1) {
      Animated.timing(
        this.state.left, {
          toValue: -width * 2,
          duration: 200,
        }
      ).start(() => {
        this.props.routeComments();
        this._animateBack();
      });
    } else {
      this._animateBack();
    }
  }

  _animateBack() {
    Animated.timing(
      this.state.left, {
        toValue: 0,
        duration: 200,
      }
    ).start();
  }

  votePost() {
    const { votePost } = this.props;
    const { voted, voteCount } = this.state;
    this.setState({
      voted: !voted,
      voteCount: voted ? voteCount - 1 : voteCount + 1,
    });
    votePost(voted);
  }

  voteImage(imageId, position, heatmap) {
    const { post, voteImage } = this.props;
    const { images, votedImage, voteImageCount } = this.state;
    if (!votedImage && post.expiresAt !== null && moment(post.expiresAt).isAfter()) {
      this.setState({
        votedImage: true,
        voteImageCount: voteImageCount + 1,
        showVoteAnimation: true
      });
      if (heatmap) {
        const votedPosition = this.state.votedPosition.concat(position);
        this.setState({ votedPosition });
      } else {
        images.map((image, index) => image._id === imageId && images[index].voteCount++);
        this.setState({
          images,
        });
      }
      voteImage(imageId, position, heatmap);
    }
  }

  showMultiModalScreen(showFeedMultiImageModal, selectedImageIndex) {
    this.setState({ showFeedMultiImageModal, selectedImageIndex });
  }

  showShareView(showShareView) {
    this.setState({ showShareView });
  }

  renderShareModalScreen() {
    const { post } = this.props;
    return (
      <ShareFeed
        postId={post._id}
        feathers={this.props.feathers}
        dimBackground={true}
        bottom={0}
        onClose={() => this.showShareView(false)}
      />
    );
  }

  renderMultiModalScreen() {
    const {
      showFeedMultiImageModal,
      selectedImageIndex,
      voteCount,
      voted,
      votedImage,
      voteImageCount
    } = this.state;

    if (showFeedMultiImageModal) {
      // StatusBar.setBarStyle('light-content');
      return (
        <FeedMultiImagesModal
          post={this.props.post}
          onClose={this.showMultiModalScreen}
          voteImage={this.voteImage}
          votePost={this.votePost}
          pageIndex={selectedImageIndex}
          votedImage={votedImage}
          createdAgo={this.props.createdAgo}
          votedImage={votedImage}
          voted={voted}
          voteCount={voteCount}
          voteImageCount={voteImageCount}
        />
      );
    }
    // return StatusBar.setBarStyle('default');
  }

  render() {
    const {
      images,
      left,
      votedImage,
      voted,
      voteCount,
      voteImageCount,
      votedImageId,
      showVoteAnimation,
      showShareView,
      votedPosition
    } = this.state;
    const {
      post,
      routeComments,
      routeScene,
      currentUserId,
      createdAgo,
    } = this.props;
    const expires = post.expiresAt !== null;
    const expireText = expires && moment(post.expiresAt).isAfter() ?
      moment(post.expiresAt).fromNow(true) :
      'Expired';
    const userPass = post.createdBy._id !== currentUserId && post.createdBy;
    return (
      <View>
        <Animated.View
          style={[styles.container, { left }]}
          ref={item => this._feedItem = item}
          {...this._panResponder.panHandlers}
        >
          <View style={[styles.row, styles.rowPrimary]}>
            <TouchableOpacity
              style={styles.row}
              onPress={!currentUserId ?
                this.props.routeBack :
                () => routeScene('ProfileScene', { userPass })}
            >
              <UserAvatar
                avatarUrl={post.createdBy.avatarUrl}
                size={50}
                iconStyle={{ width: 22, height: 25 }}
                borderWidth={1}
                borderColor={AUX_TEXT}
              />
              <LabelText style={styles.username} fontSize={16}>
                {post.createdBy.username}
              </LabelText>
            </TouchableOpacity>
            <View style={styles.votes}>
              <Icon name="check" style={styles.icon} />
              { votedImage &&
              <LabelText style={styles.voteText} fontSize={18}>{voteImageCount}</LabelText>
              }
            </View>
          </View>
          <ItemImages
            images={images}
            votedImage={votedImage}
            voteData={votedPosition}
            voteImageCount={voteImageCount}
            showVoteAnimation={showVoteAnimation}
            votedImageId={votedImageId}
            voteImage={this.voteImage}
            showHeatMap={true}
            showMultiModalScreen={this.showMultiModalScreen}
          />
          <LikeArea
            routeComments={routeComments}
            share={() => this.showShareView(true)}
            voteCount={voteCount}
            voteImageCount={voteImageCount}
            commentCount={post.commentCount}
            votePost={this.votePost}
            expireText={expireText}
            voted={voted}
            votedImage={true}
          />
          <View style={styles.metaContainer}>
            <CommentText
              style={styles.title}
              maxLine={1}
              maxLength={30}
            >
              {post.title}
            </CommentText>
            <CommentText
              style={styles.description}
              maxLine={2}
              maxLength={30}
              comment={post.description}
            >
              {post.description}
            </CommentText>
            <LabelText style={styles.ago} fontSize={18}>{createdAgo}</LabelText>
          </View>
        </Animated.View>
        {this.renderMultiModalScreen()}
        {showShareView && this.renderShareModalScreen()}
      </View>
    );
  }
}
