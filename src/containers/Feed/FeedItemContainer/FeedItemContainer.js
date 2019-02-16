import React, { Component, PropTypes } from 'react';
import { View, ScrollView } from 'react-native';
import { SimpleTopNav, FeedItem } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { VOTE_SERVICE } from 'AppServices';
import moment from 'moment/src/moment';
import { styles } from './styles';

class FeedItemContainer extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    routeBack: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired,
    routeScene: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.votePost = ::this.votePost;
    this.voteImage = ::this.voteImage;
  }

  voteImage(targetId, imageInfo, imageCount) {
    const voteSchema = {
      targetId,
      target: 'post',
      isImageVote: true,
    };
    if (imageCount === 1) {
      voteSchema.position = {
        left: imageInfo.x,
        top: imageInfo.y
      };
    } else if (imageCount > 1) {
      voteSchema.imageId = imageInfo._id;
    }

    this.props.feathers.service(VOTE_SERVICE).create(voteSchema)
    .catch(error => console.log(error));
  }

  votePost(targetId) {
    const vote = {
      targetId,
      target: 'post',
    };
    this.props.feathers.service(VOTE_SERVICE).create(vote)
    .catch(error => console.log(error));
  }

  render() {
    const { post, routeBack, feathers } = this.props;
    const createdAt = moment(post.createdAt).fromNow();
    const currentUserId = feathers.get('user')._id;
    return (
      <View style={styles.container}>
        <SimpleTopNav
          leftAction={routeBack}
          centerLabel={post.createdBy.username}
        />
        <ScrollView>
          <FeedItem
            post={post}
            routeComments={() => this.props.routeScene('CommentScene', { post })}
            createdAgo={createdAt}
            votePost={() => this.votePost(post._id)}
            voteImage={this.voteImage}
            routeBack={this.props.routeBack}
            currentUserId={currentUserId}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connectFeathers(FeedItemContainer);
