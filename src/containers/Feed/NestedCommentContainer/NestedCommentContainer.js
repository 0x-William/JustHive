import React, { Component, PropTypes } from 'react';
import { View, ListView } from 'react-native';
import Triangle from 'react-native-triangle';
import { Comment, InputRow, SimpleTopNav, CommentFullInputView } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { makeCancelable } from 'AppUtilities';
import { COMMENT_SERVICE, VOTE_SERVICE } from 'AppServices';
import { GRAY, WHITE, BG_LIGHT_GRAY, BG_MEDIUM_GRAY } from 'AppColors';
import { styles } from './styles';

class NestedCommentContainer extends Component {
  static propTypes= {
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    feathers: PropTypes.object.isRequired,
    isModal: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      comments: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      inputText: '',
      showSend: false,
      rowHeight: 40,
      commentCount: props.comment.commentCount,
      showFullCommentView: false
    };
    this.getComments = ::this.getComments;
    this.onCreated = ::this.onCreated;
    this.renderRow = ::this.renderRow;
    this.insertMessage = ::this.insertMessage;
    this.commentVote = ::this.commentVote;
    this.replyVote = ::this.replyVote;
    this.onCommentInputFocus = ::this.onCommentInputFocus;
    this.closeFullCommentView = ::this.closeFullCommentView;
    this.comments = null;
    this.getCommentsPromise = null;
  }

  componentWillMount() {
    return this.getComments();
  }

  componentDidMount() {
    const commentService = this.props.feathers.service(COMMENT_SERVICE);
    commentService.on('created', this.onCreated);
  }

  componentWillUnmount() {
    const commentService = this.props.feathers.service(COMMENT_SERVICE);
    this.getCommentsPromise.cancel();
    commentService.off('created', this.onCreated);
  }

  onCreated(comment) {
    const currentUser = this.props.feathers.get('user');
    this.comments = this.comments.concat({
      ...comment, user: currentUser
    }).sort((a, b) => (a.updatedAt < b.updatedAt ? -1 : 1));
    this.setState({
      comments: this.state.comments.cloneWithRows(this.comments),
      commentCount: this.state.commentCount + 1,
    });
  }

  onCommentInputFocus() {
    this.setState({ showFullCommentView: true });
  }

  getComments() {
    const { feathers, comment } = this.props;
    const commentService = feathers.service(COMMENT_SERVICE);
    const query = {
      targetId: comment._id,
      target: 'comment',
      $sort: { relevance: -1, createdAt: 1 }
    };
    this.getCommentsPromise = makeCancelable(commentService.find({ query }));
    this.getCommentsPromise
    .promise
    .then(comments => {
      this.comments = comments;
      this.setState({
        comments: this.state.comments.cloneWithRows(comments),
      });
    });
  }

  closeFullCommentView() {
    return this.setState({ showFullCommentView: false });
  }

  insertMessage(inputText) {
    const comment = {
      target: 'comment',
      targetId: this.props.comment._id,
      postId: this.props.postId,
      comment: inputText,
    };
    this.closeFullCommentView();
    this.props.feathers.service(COMMENT_SERVICE).create(comment)
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

  replyVote(type, targetId) {
    const vote = {
      targetId,
      target: 'reply',
      upvoted: type === 'upvote',
      downvoted: type === 'downvote',
    };
    this.props.feathers.service(VOTE_SERVICE).create(vote)
      .catch(error => console.log(error));
  }

  renderRow(comment) {
    const { _id } = this.props.feathers.get('user');
    return (
      <Comment
        {...comment}
        routeScene={this.props.routeScene}
        commentVote={this.replyVote}
        backgroundColor={BG_LIGHT_GRAY}
        principleComment={true}
        currentUserId={_id}

      />
    );
  }
  renderModalArrow() {
    const { isModal } = this.props;
    if (isModal) {
      return (
        <View style={styles.arrowContainer}>
          <Triangle
            width={18}
            height={12}
            color={BG_MEDIUM_GRAY}
            direction={'down'}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    const { feathers, comment, routeScene, isModal } = this.props;
    const { showFullCommentView } = this.state;
    let { routeBack } = this.props;
    if (showFullCommentView) {
      routeBack = this.closeFullCommentView;
    }
    const containerStyle = isModal ? styles.modalContainer : styles.container;
    const { _id } = feathers.get('user');
    return (
      <View style={containerStyle}>
        <SimpleTopNav
          leftAction={routeBack}
          centerLabel={`REPLIES ${this.state.commentCount}`}
          backgroundColor={GRAY}
          color={WHITE}
        />
        <Comment
          {...comment}
          routeScene={routeScene}
          commentVote={this.commentVote}
          principleComment={true}
          currentUserId={_id}
        />
        {
          !showFullCommentView &&
          <ListView
            enableEmptySections={true}
            dataSource={this.state.comments}
            renderRow={this.renderRow}
          />
        }

        {
          !showFullCommentView &&
          <InputRow
            placeholder="REPLY TO USERNAME"
            placeholderIcon={ require('img/icons/icon_comment_placeholder.png') }
            placeholderIconStyle={ styles.iconCommentPlaceholder }
            insertMessage={this.insertMessage}
            onFocus={this.onCommentInputFocus}
          />
        }

        {
          showFullCommentView &&
          <CommentFullInputView
            replyTo={comment.createdBy.username}
            closeView={this.closeFullCommentView}
            insertMessage={this.insertMessage}
            isModal={false}
          />
        }
        {this.renderModalArrow()}
      </View>
    );
  }
}

export default connectFeathers(NestedCommentContainer);
