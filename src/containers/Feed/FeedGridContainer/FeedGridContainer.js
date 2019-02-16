import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';
import { PostTile } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { POST_SERVICE } from 'AppServices';
import { makeCancelable } from 'AppUtilities';
import { styles } from './styles';

class FeedGridContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    handle: PropTypes.string.isRequired,
    routeToFeedItem: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      posts: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
    this.findPostsPromise = null;
    this.renderTile = ::this.renderTile;
  }

  componentWillMount() {
    this.getPosts();
  }

  componentWillUnmount() {
    if (this.findPostsPromise) {
      this.findPostsPromise.cancel();
    }
  }

  getPosts() {
    const { feathers, handle } = this.props;
    const { limit } = this.state;
    const postService = feathers.service(POST_SERVICE);
    const query = {
      createdBy: handle,
      $limit: limit,
      $sort: { createdAt: -1 }
    };
    this.getPostPromise = makeCancelable(postService.find({ query }));
    this.getPostPromise
    .promise
    .then(posts =>
      this.setState({
        posts: this.state.posts.cloneWithRows(posts),
        initialRender: true,
        loading: false,
      })
    );
  }

  renderTile(post, section, row) {
    const style = parseInt(row, 10) < 3 ? styles.topRow : {};
    return (
      <PostTile
        images={post.images}
        routeToFeedItem={() => this.props.routeToFeedItem('FeedItemScene', { post })}
        style={style}
      />
    );
  }

  render() {
    return (
      <ListView
        contentContainerStyle={styles.container}
        dataSource={this.state.posts}
        renderRow={this.renderTile}
      />
    );
  }
}

export default connectFeathers(FeedGridContainer);
