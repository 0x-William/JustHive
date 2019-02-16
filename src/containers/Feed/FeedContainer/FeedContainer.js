import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  ActivityIndicator
} from 'react-native';
import { EmptyFeedContainer } from 'AppContainers';
import { FeedItem } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import {
  POST_SERVICE,
  POST_VOTE_SERVICE,
  IMAGE_VOTE_SERVICE,
  HEATMAP_VOTE_SERVICE,
} from 'AppServices';
import { makeCancelable } from 'AppUtilities';
import { styles } from './styles';
import moment from 'moment/src/moment';

class FeedContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeScene: PropTypes.func.isRequired,
    hashtag: PropTypes.string,
    handle: PropTypes.string,
    goToHive: PropTypes.func.isRequired,
  };

  static defaultProps = {
    hashtag: '',
    handle: '',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      initialRender: false,
      loading: true,
      limit: 10,
      posts: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      hasPosts: false,
    };
    this.voteImage = ::this.voteImage;
    this.getPosts = ::this.getPosts;
    this.getMorePosts = ::this.getMorePosts;
    this.votePost = ::this.votePost;
    this.renderRow = ::this.renderRow;
    this.getPostPromise = null;
  }

  componentWillMount() {
    this.getPosts();
  }

  componentWillUnmount() {
    if (this.getPostPromise) {
      this.getPostPromise.cancel();
    }
  }

  getPosts() {
    const { feathers, handle, hashtag } = this.props;
    const postService = feathers.service(POST_SERVICE);
    const query = { $sort: { createdAt: -1 } };
    if (handle) {
      query.createdBy = handle;
    }
    if (hashtag) {
      query.hashtags = { $in: [hashtag] };
    }
    this.getPostPromise = makeCancelable(postService.find({ query }));
    this.getPostPromise
    .promise
    .then(posts =>
      this.setState({
        posts: this.state.posts.cloneWithRows(posts.data),
        limit: posts.limit,
        initialRender: true,
        loading: false,
        hasPosts: posts.total > 0,
      })
    );
  }

  getMorePosts() {
    const limit = this.state.limit + 10;
    this.setState({
      limit,
      loading: true,
    });
    this.getPosts(limit);
  }

  voteImage(imageId, position, heatmap) {
    let service = IMAGE_VOTE_SERVICE;
    const voteSchema = {
      imageId,
    };
    if (heatmap) {
      service = HEATMAP_VOTE_SERVICE;
      voteSchema.position = position;
    }
    this.props.feathers.service(service).create(voteSchema)
    .catch(error => console.log(error));
  }

  votePost(postId, hasVoted) {
    const postVoteService = this.props.feathers.service(POST_VOTE_SERVICE);
    if (hasVoted) {
      return postVoteService.remove(null, { query: { postId } })
      .catch(error => console.log(error));
    }
    return postVoteService.create({ postId })
    .catch(error => console.log(error));
  }

  renderRow(post) {
    const createdAt = moment(post.createdAt).fromNow();
    const { id } = this.props.feathers.get('user');
    return (
      <FeedItem
        post={post}
        feathers={this.props.feathers}
        routeComments={() => this.props.routeScene('CommentScene', { post })}
        createdAgo={createdAt}
        votePost={(hasVoted) => this.votePost(post.id, hasVoted)}
        voteImage={this.voteImage}
        routeScene={this.props.routeScene}
        currentUserId={id}
      />
    );
  }

  render() {
    const { initialRender, loading, posts, hasPosts } = this.state;
    if (initialRender && !hasPosts) {
      return (
        <EmptyFeedContainer goToHive={this.props.goToHive} />
      );
    }
    return (
      <View style={styles.wrap}>
        {initialRender &&
          <ListView
            dataSource={posts}
            renderRow={this.renderRow}
            onEndReachedThreshold={300}
            onEndReached={this.getMorePosts}
            enableEmptySections={true}
          />}
        {loading && <ActivityIndicator size="large" animating={true} />}
      </View>
    );
  }
}

export default connectFeathers(FeedContainer);
