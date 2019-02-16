import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  SimpleTopNav,
  PostDescription,
  Separator,
  PostTimerBlock,
  PostOnSocials,
  PostTimerView,
  PostDoneView,
  AutoGrowInput
} from 'AppComponents';
import { POST_SERVICE } from 'AppServices';
import { connectFeathers } from 'AppConnectors';
import { LabelText } from 'AppFonts';
import { LIGHT_TEXT } from 'AppColors';
class PostContainer extends Component {
  static propTypes = {
    routeEditPost: PropTypes.func.isRequired,
    completePost: PropTypes.func.isRequired,
    images: PropTypes.array,
    title: PropTypes.string,
    location: PropTypes.string,
    feathers: PropTypes.object.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object)
  }
  static defaultProps = {
    title: 'NO TITLE'
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      description: '',
      titlePost: props.title,
      visibility: 'public',
      isTimerModalOpen: false,
      isDonePostModalOpen: false,
      timer: {}
    };
    this.onDescriptionChange = ::this.onDescriptionChange;
    this.onTitleChange = ::this.onTitleChange;
    this.openTimer = ::this.openTimer;
    this.postOnSocials = ::this.postOnSocials;
    this.complete = ::this.complete;
    this.submitTimer = ::this.submitTimer;
    this.cancelTimer = ::this.cancelTimer;
    this.submitPostModal = ::this.submitPostModal;
    this.cancelPostModal = ::this.cancelPostModal;
  }

  onTitleChange(titlePost) {
    this.setState({ titlePost });
  }

  onDescriptionChange(description) {
    this.setState({ description });
  }

  openTimer() {
    this.setState({
      isTimerModalOpen: true
    });
  }
  // arguments:
  //  Social {String}, enum: [facebook, twitter, instagram, pinterest]
  postOnSocials() {}

  complete() {
    this.setState({ isDonePostModalOpen: true });
  }

  submitTimer({ days, weeks, hours, min }) {
    const timer = { days, weeks, hours, min };
    this.setState({ timer, isTimerModalOpen: false });
  }

  submitPostModal() {
    const {
      captured,
      location,
      title,
      tags
    } = this.props;

    const {
      description,
      timer,
      visibility
    } = this.state;

    const newPost = Object.assign({}, {
      captured,
      location,
      title,
      tags,
      description,
      timer,
      visibility,
    });
    console.log(newPost);
    this.props.feathers.service(POST_SERVICE).create(newPost)
    .then((post) => console.log(post));

    this.setState({ isDonePostModalOpen: false });
  }

  cancelTimer() {
    this.setState({ isTimerModalOpen: false });
  }

  cancelPostModal() {
    this.setState({ isDonePostModalOpen: false });
  }

  renderNavBar() {
    const leftLabel = (
      <View style={ styles.navBarLeftLabel }>
        <Image source={require('img/icons/icon_back.png')} style={styles.iconBackward} />
      </View>
    );
    const rightLabel = <View />;
    const centerLabel = (
      <View>
        <LabelText style={ styles.navBarCenterLabel } fontSize={15}>POST DETAILS</LabelText>
      </View>
    );

    return (
      <SimpleTopNav
        leftLabel={leftLabel}
        centerLabel={centerLabel}
        rightLabel={rightLabel}
        leftAction={this.props.routeEditPost}
      />
    );
  }

  render() {
    const {
      images
    } = this.props;

    const {
      description,
      visibility,
      timer,
      isTimerModalOpen,
      isDonePostModalOpen,
      titlePost,
    } = this.state;

    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <PostTimerView
          onSubmit={(payload) => this.submitTimer(payload)}
          onCancel={() => this.cancelTimer()}
          isVisible={isTimerModalOpen}
        />
        <PostDoneView
          isVisible={isDonePostModalOpen}
          onSubmit={this.submitPostModal}
          onCancel={this.cancelPostModal}
        />
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <AutoGrowInput
              minHeight={30}
              style={styles.title}
              onChangeText={this.onTitleChange}
              value={titlePost}
              placeholder="POST TITLE"
              onChangeHeight={() => {}}
            />
          </View>
          <PostDescription
            images={images}
            description={description}
            type={visibility}
            title={titlePost}
            onDescriptionChange={this.onDescriptionChange}
          />
          <Separator />
          <PostTimerBlock
            onPress={this.openTimer}
            timer={timer}
          />
          <Separator />
          <PostOnSocials onPress={this.postOnSocials} />
          <Separator />
          <TouchableOpacity onPress={() => this.complete()}>
            <View style={styles.complete}>
              <LabelText style={styles.completeText}>
                COMPLETE POST
              </LabelText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connectFeathers(PostContainer);
