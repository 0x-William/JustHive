import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { SinglePhotoEditView } from 'AppComponents';
import {
  PhotoEditControls,
  SimpleTopNav,
  AddImageOverlay,
  MultiImageLayout,
  EditImageTitleOverlay
} from 'AppComponents';
import { styles } from './styles';
import { connectFeathers } from 'AppConnectors';
import { LabelText, AuxText } from 'AppFonts';

class PhotoEditContainer extends Component {
  static propTypes = {
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    images: PropTypes.array.isRequired,
    feathers: PropTypes.object.isRequired,
    onDeleteImage: PropTypes.func.isRequired,
    onUpdateImageValue: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeFilter: '',
      activeImageIndex: 0,
      showAddImageView: false,
      showEditPhotoView: props.images.length === 1,
      showEditTitleView: false
    };

    this.singlePhotoView = null;
    this.toggleIcon = ::this.toggleIcon;
    this.toggleAddImage = ::this.toggleAddImage;
    this.onAddImage = ::this.onAddImage;
    this.navRightAction = ::this.navRightAction;
    this.navLeftAction = ::this.navLeftAction;
    this.onEditImage = ::this.onEditImage;
    this.onEditTitle = ::this.onEditTitle;
    this.onChangeTitle = ::this.onChangeTitle;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.images.length !== nextProps.images.length) {
      this.setState({ showEditPhotoView: nextProps.images.length === 1 });
    }
  }

  onEditImage(activeImageIndex) {
    this.setState({ activeImageIndex, showEditPhotoView: true });
  }

  onEditTitle(activeImageIndex) {
    this.setState({ activeImageIndex, showEditTitleView: true });
  }

  onAddImage(type) {
    const { routeScene } = this.props;
    const scene = type === 'camera' ? 'CameraScene' : 'CameraRollScene';
    routeScene(scene, { fromPhotoEdit: true });
    this.toggleAddImage();
  }

  onChangeTitle(title) {
    this.props.onUpdateImageValue(this.state.activeImageIndex, 'title', title);
    this.setState({ showEditTitleView: false });
  }

  toggleIcon(activeFilter) {
    if (this.state.activeFilter === activeFilter) {
      return this.setState({
        activeFilter: '',
      });
    }
    return this.setState({
      activeFilter,
      activeInput: '',
    });
  }

  toggleAddImage() {
    const { showAddImageView } = this.state;
    this.setState({ showAddImageView: !showAddImageView });
  }

  imageProcessCompleted(image) {
    const { images, routeScene, onUpdateImageValue } = this.props;
    if (images.length === 1) {
      const newImages = [image];
      routeScene('PostScene', { images: newImages });
    } else {
      onUpdateImageValue(this.state.activeImageIndex, 'uri', image);
      this.setState({ showEditPhotoView: false });
    }
  }

  navLeftAction() {
    const { images, routeBack } = this.props;
    const { showEditPhotoView } = this.state;
    if (images.length > 1 && showEditPhotoView) {
      this.setState({ showEditPhotoView: false });
    } else {
      routeBack();
    }
  }
  navRightAction() {
    const { activeFilter, showEditPhotoView } = this.state;
    if (showEditPhotoView) {
      if (activeFilter !== '') {
        this.setState({ activeFilter: '' });
      } else {
        this.singlePhotoView.captureFrame()
          .then((image) => {
            this.imageProcessCompleted(image);
          });
      }
    }
  }

  renderNavLeft() {
    return (
      <View style={ styles.navLeft }>
        <Image source={require('img/icons/icon_back.png')} style={styles.iconBackward} />
      </View>
    );
  }

  renderNavRight() {
    const { activeFilter, showEditPhotoView } = this.state;
    if (showEditPhotoView) {
      if (activeFilter !== '' || this.props.images.length !== 1) {
        return (
          <View style={ styles.navRightPhotoView }>
            <AuxText style={{ fontSize: 12 }}>Done</AuxText>
          </View>
        );
      }
    }

    return (
      <View style={ styles.navRight }>
        <Image source={require('img/icons/icon_back.png')} style={styles.iconForward} />
      </View>
    );
  }

  renderNavCenter() {
    const { showEditPhotoView } = this.state;
    const centerLabel = !showEditPhotoView ? 'Edit Layout' : 'Edit Photo';
    return (
      <View>
        <LabelText style={ styles.navCenterLabel } fontSize={15}>
          {centerLabel}
        </LabelText>
      </View>
    );
  }

  renderNavBar() {
    return (
      <SimpleTopNav
        leftLabel={this.renderNavLeft()}
        centerLabel={this.renderNavCenter()}
        rightLabel={this.renderNavRight()}
        leftAction={this.navLeftAction}
        rightAction={this.navRightAction}
      />
    );
  }

  renderContent() {
    const { feathers, images, onUpdateImageValue } = this.props;
    const { activeFilter, activeImageIndex, showEditPhotoView } = this.state;
    if (showEditPhotoView) {
      return (
        <SinglePhotoEditView
          ref={(ref) => this.singlePhotoView = ref}
          imageSource={images[activeImageIndex]}
          imageIndex={activeImageIndex}
          onUpdateImageValue={onUpdateImageValue}
          feathers={feathers}
          activeFilter={activeFilter}
        />
      );
    }
    return (
      <MultiImageLayout
        images={images}
        editImage={this.onEditImage}
        deleteImage={this.props.onDeleteImage}
        editTitle={this.onEditTitle}
      />
    );
  }

  render() {
    const {
      activeFilter,
      showAddImageView,
      showEditPhotoView,
      showEditTitleView,
      activeImageIndex
    } = this.state;

    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderContent()}
        <PhotoEditControls
          toggleIcon={this.toggleIcon}
          activeFilter={activeFilter}
          photoEditView={showEditPhotoView}
          navPost={this.toggleAddImage}
        />
        { showAddImageView &&
          <AddImageOverlay
            onClose={this.toggleAddImage}
            onAddImage={this.onAddImage}
          />
        }
        { showEditTitleView &&
          <EditImageTitleOverlay
            title={this.props.images[activeImageIndex].title}
            onChangeTitle={this.onChangeTitle}
          />
        }
      </View>
    );
  }
}

export default connectFeathers(PhotoEditContainer);
