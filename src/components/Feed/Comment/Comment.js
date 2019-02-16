import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { isEqual } from 'lodash';
import moment from 'moment/src/moment';
import { HexagonImage, CommentFullView } from 'AppComponents';
import { CommentText, LabelText } from 'AppFonts';
import { CommentActions } from './CommentActions';
import { styles } from './styles';
import { HEX_SIZE } from './constants';

export class Comment extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    createdBy: PropTypes.object.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    routeScene: PropTypes.func.isRequired,
    upvoteCount: PropTypes.number.isRequired,
    downvoteCount: PropTypes.number.isRequired,
    commentVote: PropTypes.func.isRequired,
    upvoted: PropTypes.bool.isRequired,
    downvoted: PropTypes.bool.isRequired,
    commentCount: PropTypes.number.isRequired,
    routeNestedComment: PropTypes.func,
    backgroundColor: PropTypes.string,
    principleComment: PropTypes.bool,
    currentUserId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    backgroundColor: '#FFF',
    principleComment: false
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      upvoteCount: props.upvoteCount,
      downvoteCount: props.downvoteCount,
      upvoted: props.upvoted,
      downvoted: props.downvoted,
      flagShowFullCommentView: false,
    };
    this.commentVote = ::this.commentVote;
    this.showFullCommentView = ::this.showFullCommentView;
    this.closeFullCommentView = ::this.closeFullCommentView;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isEqualProps = isEqual(this.props, nextProps);
    if (isEqualProps && isEqual(this.state, nextState)) {
      return false;
    }
    if (!isEqualProps) {
      this.setState({
        upvoteCount: nextProps.upvoteCount,
        downvoteCount: nextProps.downvoteCount,
        upvoted: nextProps.upvoted,
        downvoted: nextProps.downvoted
      });
    }

    return true;
  }

  showFullCommentView() {
    this.setState({ flagShowFullCommentView: true });
  }

  closeFullCommentView() {
    this.setState({ flagShowFullCommentView: false });
  }

  commentVote(type) {
    const { upvoted, downvoted, upvoteCount, downvoteCount } = this.state;
    const { commentVote, _id } = this.props;
    if (!upvoted && !downvoted) {
      this.setState({
        upvoted: type === 'upvote',
        downvoted: type === 'downvote',
        upvoteCount: type === 'upvote' ? upvoteCount + 1 : upvoteCount,
        downvoteCount: type === 'downvote' ? downvoteCount + 1 : downvoteCount,
      });
      commentVote(type, _id);
    }
  }

  renderTouchBar(principleComment) {
    const {
      routeNestedComment,
      createdAt,
      commentCount
    } = this.props;
    const commentString = `${commentCount} Comment${commentCount !== 1 ? 's' : ''}`;
    const ago = moment(createdAt).fromNow();
    if (!principleComment) {
      return (
        <View
          style={[styles.row, styles.replyContainer]}
        >
          <TouchableOpacity onPress={routeNestedComment}>
            <LabelText style={styles.reply} fontSize={12}>Reply</LabelText>
          </TouchableOpacity>
          <LabelText style={styles.seperator} fontSize={14}>|</LabelText>
          <LabelText style={styles.reply} fontSize={12}>{commentString}</LabelText>
          <LabelText style={styles.seperator} fontSize={14}>|</LabelText>
          <LabelText style={styles.reply} fontSize={12}>Flag</LabelText>
          <LabelText style={styles.ago} fontSize={12} >{ago}</LabelText>
        </View>
      );
    }
    return null;
  }


  render() {
    const {
      comment,
      routeScene,
      backgroundColor,
      principleComment,
      createdAt,
      currentUserId,
    } = this.props;
    const {
      upvoted,
      downvoted,
      downvoteCount,
      upvoteCount,
    } = this.state;
    const ago = moment(createdAt).fromNow();
    const user = this.props.createdBy;
    const userPass = user._id !== currentUserId ? user : null;
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => routeScene('ProfileScene', { userPass })}
          >
            <HexagonImage size={HEX_SIZE} imageSource={{ uri: user.avatarUrl }} />
           </TouchableOpacity>
          <View style={styles.column}>
            <View style={[styles.row, styles.namesRow]}>
              <LabelText style={styles.username} fontSize={14}>{user.username}</LabelText>
            </View>
            <CommentText
              maxLine={3}
              maxLength={10}
              showMore={this.showFullCommentView}
            >
              {comment}
            </CommentText>
          </View>
          <CommentActions
            commentVote={this.commentVote}
            upvoteCount={upvoteCount}
            downvoteCount={downvoteCount}
            upvoted={upvoted}
            downvoted={downvoted}
          />
        </View>
        <View style={[styles.row, styles.actionRow]}>
          {this.renderTouchBar(principleComment)}
        </View>
        { this.state.flagShowFullCommentView &&
          <CommentFullView
            title={user.username}
            subtitle={ago}
            comment={comment}
            onClose={this.closeFullCommentView}
          />
        }

      </View>
    );
  }
}
