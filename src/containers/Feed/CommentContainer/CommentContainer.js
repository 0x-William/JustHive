import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  Animated,
  PanResponder,
} from 'react-native';
import {
  COMMENT_SERVICE,
  VOTE_SERVICE,
} from 'AppServices';
import {
  ItemImages,
  Comment,
  CommentPullDownBar,
  CommentFullInputView,
  CommentSort,
  SimpleTopNav,
  InputRow,
} from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { makeCancelable } from 'AppUtilities';
import { BG_LIGHT_GRAY, GRAY } from 'AppColors';
import { styles } from './styles';

class CommentContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired,
    isModal: PropTypes.bool.isRequired,
    currentImage: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      comments: [],
      commentsDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      commentCount: props.post.commentCount,
      limit: 10,
      showSend: false,
      showHeatMap: false,
      inputText: '',
      rowHeight: 40,
      activeSortBy: -1,
      height: new Animated.Value(0),
      scale: new Animated.Value(0),
      top: new Animated.Value(-100),
      pullDown: new Animated.Value(0),
      activeBar: false,
      showCommentSortView: false,
      showFullCommentView: false,
      showImageSelectView: false,
      selectedImageIndex: -1,
    };
    this.lastPullDownValue = 0;
    this.insertMessage = ::this.insertMessage;
    this.getComments = ::this.getComments;
    this.renderRow = ::this.renderRow;
    this.commentVote = ::this.commentVote;
    this.showCommentSort = ::this.showCommentSort;
    this.setSortBy = ::this.setSortBy;
    this.activeHeatMap = ::this.activeHeatMap;
    this._handlePanResponderMove = ::this._handlePanResponderMove;
    this._handlePanResponderEnd = ::this._handlePanResponderEnd;
    this.onLayout = ::this.onLayout;
    this.onCommentInputFocus = ::this.onCommentInputFocus;
    this.closeFullCommentView = ::this.closeFullCommentView;
    this.renderFooter = ::this.renderFooter;
    this.updateBarStatus = ::this.updateBarStatus;

    this._panResponder = {};
    this.getCommentsPromise = null;
    this.flagFirstDisplay = true;
    this.commentListView = null;
    this.listHeight = 0;
    this.footerY = 0;

    this._scrollToBottomTimeout = null;
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 30,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    return this.getComments();
  }

  componentWillUnmount() {
    if (this.getCommentsPromise) {
      this.getCommentsPromise.cancel();
    }
    if (this._scrollToBottomTimeout) {
      clearTimeout(this._scrollToBottomTimeout);
      this._scrollToBottomTimeout = null;
    }
  }

  onLayout(event) {
    const layout = event.nativeEvent.layout;
    this.listHeight = layout.height;
    if (this.flagFirstDisplay === true) {
      window.requestAnimationFrame(() => {
        this.flagFirstDisplay = false;
        this.scrollToBottom(false);
      });
    }
  }

  onCommentInputFocus() {
    this.setState({ showFullCommentView: true });
  }

  getComments() {
    const { limit, activeSortBy, activeBar } = this.state;
    const { feathers, isModal, post } = this.props;
    const commentService = feathers.service(COMMENT_SERVICE);
    const sortFields = { };
    switch (activeSortBy) {
      case 1:
        Object.assign(sortFields, { createdAt: -1 });
        break;
      case 2:
        Object.assign(sortFields, { mostControversial: -1 });
        break;
      case 3:
        Object.assign(sortFields, { mostFollowers: -1 });
        break;
      default:
        Object.assign(sortFields, { highestVoted: -1 });
        // Object.assign(sortFields, { relevance: -1 });
        break;
    }
    const query = { targetId: post._id, target: 'post', $sort: sortFields };
    if (activeBar || isModal) {
      const { currentImage } = this.props;
      const { selectedImageIndex } = this.state;
      if (post.images.length > 1) {
        if (isModal) {
          query.imageId = currentImage._id;
        } else {
          query.imageId = post.images[selectedImageIndex]._id;
        }
      }
    }
    this.getCommentsPromise = makeCancelable(commentService.find({ query }));
    this.getCommentsPromise
    .promise
    .then(comments =>
      this.setState({
        comments,
      })
    );
  }

  setSortBy(activeSortBy) {
    this.showCommentSort();
    this.setState({ activeSortBy }, () => {
      this.getComments();
    });
  }

  closeFullCommentView() {
    this.setState({ showFullCommentView: false });
  }

  showCommentSort() {
    const { showCommentSortView } = this.state;
    if (!showCommentSortView) {
      this.setState({ showCommentSortView: true });
    }
    Animated.parallel([
      Animated.timing(
        this.state.scale, {
          toValue: showCommentSortView ? 0 : 1,
          duration: 300,
        }
      ),
      Animated.timing(
        this.state.height, {
          toValue: showCommentSortView ? 0 : 150,
          duration: 300,
        }
      ),
      Animated.timing(
        this.state.top, {
          toValue: showCommentSortView ? -100 : 0,
          duration: 300,
        }
      ),
    ]).start(() => {
      if (showCommentSortView) {
        this.setState({ showCommentSortView: false });
      }
    });
  }

  _handlePanResponderMove(evt, _gestureState) {
    const gestureState = _gestureState;
    const move = Animated.event([
      null, { dy: this.state.pullDown }
    ]);
    gestureState.dy += this.lastPullDownValue;
    if (gestureState.dy < 0) {
      gestureState.dy = 0;
    }
    this.lastPullDownValue = 0;
    return move(evt, gestureState);
  }

  _handlePanResponderEnd(evt, gestureState) {
    // gesture moving case
    if (gestureState.dy > 50 || gestureState.moveY > 50) {
      this.lastPullDownValue = gestureState.dy;
      // recalculate comment view area layout after moving
      this.scrollToBottom(false);
    }
  }

  activeHeatMap(flagActiveHeatMap) {
    // once user tap pane
    const toValue = flagActiveHeatMap ? 300 : 0;
    Animated.timing(
      this.state.pullDown, {
        toValue,
        duration: 300,
      }
    ).start();

    this.lastPullDownValue = toValue;
    this.setState({ showHeatMap: flagActiveHeatMap });
    // recalculate comment view area layout after animation
    this._scrollToBottomTimeout = setTimeout(() => {
      this.scrollToBottom(false);
      this._scrollToBottomTimeout = null;
    }, 400);
  }

  insertMessage(inputText) {
    this.closeFullCommentView();
    const { activeBar, selectedImageIndex, comments, commentCount } = this.state;
    const { post, isModal, currentImage } = this.props;
    const comment = {
      targetId: this.props.post._id,
      postId: this.props.post._id,
      target: 'post',
      comment: inputText,
    };

    if (activeBar || isModal) {
      if (post.images.length > 1) {
        if (isModal) {
          comment.imageId = currentImage._id;
        } else {
          comment.imageId = post.images[selectedImageIndex]._id;
        }
      } else if (post.images.length === 1) {
        comment.position = {
          left: 5,
          top: 5
        };
      }
    }
    this.props.feathers.service(COMMENT_SERVICE).create(comment)
    .then(newComment => this.setState({
      comments: comments.concat(newComment),
      commentCount: commentCount + 1,
    }))
    .catch(error => console.log(error));
  }

  commentVote(type, targetId) {
    const vote = {
      targetId,
      target: 'comment',
      upvoted: type === 'upvote',
      downvoted: type === 'downvote',
    };
    this.props.feathers.service(VOTE_SERVICE).create(vote)
    .catch(error => console.log(error));
  }

  scrollToBottom(flagAnimation) {
    window.requestAnimationFrame(() => {
      if (this.listHeight && this.footerY && this.footerY > this.listHeight) {
        const scrollDistance = this.listHeight - this.footerY;
        const scrollResponder = this.commentListView.getScrollResponder();
        scrollResponder.scrollTo({
          y: -scrollDistance,
          animated: flagAnimation
        });
      }
    });
  }

  updateBarStatus(activeBar, selectedImageIndex, showImageSelectView, activeHeatMap) {
    if (activeHeatMap) {
      this.activeHeatMap(activeBar);
    }
    this.setState({ activeBar, selectedImageIndex, showImageSelectView }, () => {
      this.getComments();
    });
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

  renderRow(comment) {
    const { _id } = this.props.feathers.get('user');
    return (
      <Comment
        {...comment}
        routeScene={this.props.routeScene}
        routeNestedComment={() =>
         this.props.routeScene('NestedCommentScene', { comment, postId: this.props.post._id })}
        commentVote={this.commentVote}
        currentUserId={_id}
      />
    );
  }

  renderPullDownBar() {
    const { isModal, post } = this.props;
    const { activeBar, selectedImageIndex, showImageSelectView } = this.state;
    if (!isModal) {
      return (
        <CommentPullDownBar
          activeBar={activeBar}
          selectedImageIndex={selectedImageIndex}
          showImageSelectView={showImageSelectView}
          updateStatus={this.updateBarStatus}
          images={post.images}
          showCommentSortView={this.state.showCommentSortView}
          showSortBy={this.showCommentSort}
          panResponder={this._panResponder}
        />
      );
    }
    return null;
  }

  renderMainView() {
    const { post, routeBack, isModal } = this.props;
    const {
      activeSortBy,
      showCommentSortView,
      comments,
      commentsDataSource,
      showHeatMap,
    } = this.state;
    const commentRows = commentsDataSource.cloneWithRows(comments);
    const containerStyle = isModal ? styles.modalContainer : styles.container;
    return (
      <View style={containerStyle}>
        <SimpleTopNav
          leftAction={routeBack}
          centerLabel={`COMMENTS ${this.state.commentCount}`}
          backgroundColor={BG_LIGHT_GRAY}
          color={GRAY}
        />
        <View style={styles.absolute}>
          <ItemImages
            images={post.images}
            voteData={post.images.length === 1 && post.images[0].votedPosition || []}
            fromCommentContainer={true}
            showHeatMap={showHeatMap}
          />
        </View>
        <Animated.View
          style={[
            styles.container,
            styles.white,
            { transform: [{ translateY: this.state.pullDown }], paddingBottom: this.state.pullDown }
          ]}
        >
          {this.renderPullDownBar()}
          {showCommentSortView ?
            <Animated.View
              style={{
                height: this.state.height,
                transform: [
                  { scaleY: this.state.scale },
                  { translateY: this.state.top },
                ]
              }}
            >
              <CommentSort
                showFullList={true}
                activeSortBy={activeSortBy}
                setSortBy={this.setSortBy}
              />
            </Animated.View>
            :
            <CommentSort
              showFullList={false}
              activeSortBy={activeSortBy}
            />
          }
          <View style={styles.container}>
            <ListView
              ref={listView => this.commentListView = listView}
              enableEmptySections={true}
              dataSource={commentRows}
              renderRow={this.renderRow}
              onLayout={this.onLayout}
              renderFooter={this.renderFooter}
            />
          </View>
        </Animated.View>
        <InputRow
          placeholder="ADD COMMENT"
          insertMessage={this.insertMessage}
          onFocus={this.onCommentInputFocus}
        />
      </View>
    );
  }

  renderFullInputView() {
    return (
      <CommentFullInputView
        closeView={this.closeFullCommentView}
        insertMessage={this.insertMessage}
        isModal={this.props.isModal}
      />
    );
  }

  render() {
    if (this.state.showFullCommentView) {
      return this.renderFullInputView();
    }
    return this.renderMainView();
  }
}

export default connectFeathers(CommentContainer);
