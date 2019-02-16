import React, { Component, PropTypes } from 'react';
import { PostContainer } from 'AppContainers';

export class PostScene extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    images: PropTypes.array,
    location: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string
  }
  constructor(props, context) {
    super(props, context);
    this.routeEditPost = ::this.routeEditPost;
    this.completePost = ::this.completePost;
  }
  routeEditPost() {
    this.props.onBack();
  }

  completePost() {
    console.log('Done');
  }

  render() {
    const {
      images,
      location,
      tags,
      title
    } = this.props;
    return (
      <PostContainer
        routeEditPost={this.routeEditPost}
        completePost={this.completePost}
        images={images}
        title={title}
        location={location}
        tags={tags}
      />
    );
  }
}
