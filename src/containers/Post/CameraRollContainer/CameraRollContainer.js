import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Image,
  CameraRoll,
  TouchableOpacity,
  InteractionManager,
  LayoutAnimation
} from 'react-native';
import _ from 'lodash';
import { SimpleTopNav, ImageCrop } from 'AppComponents';
import { styles } from './styles';
import { LabelText, AuxText } from 'AppFonts';
export class CameraRollContainer extends Component {
  static propTypes = {
    routeImage: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      chosenImage: false,
      images: [],
      fetchParams: {
        first: 10,
        after: undefined,
      }
    };
    this.fetchImages = ::this.fetchImages;
    this.storeImages = ::this.storeImages;
    this.chooseImage = ::this.chooseImage;
    this.nextImages = ::this.nextImages;
  }

  componentWillMount() {
    LayoutAnimation.easeInEaseOut();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.fetchImages(this.state.fetchParams);
    });
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: this.state.images.concat(images),
      chosenImage: !this.state.chosenImage ? images[0] : this.state.chosenImage,
    });
  }

  nextImages({ nativeEvent }) {
    const { contentOffset, contentInset } = nativeEvent;
    if (contentOffset.y > contentInset.top) {
      const { images, fetchParams } = this.state;
      const lastImage = images[images.length - 1];
      const newFetchParams = {
        first: 25,
        after: lastImage.uri
      };
      if (fetchParams.after !== newFetchParams.after) {
        this.setState({ fetchParams: newFetchParams });
        this.fetchImages(newFetchParams);
      }
    }
  }

  fetchImages(fetchParams) {
    CameraRoll.getPhotos(fetchParams)
    .then(this.storeImages)
    .catch(error => console.log(error));
  }

  chooseImage(chosenImage) {
    this.setState({ chosenImage });
  }

  renderSelected(image) {
    const { chosenImage } = this.state;
    if (chosenImage.uri === image.uri) {
      return (<View style={styles.imageSelected} />);
    }
    return <View />;
  }

  renderNavBar() {
    const leftLabel = (
      <View style={ styles.leftLabelView }>
        <AuxText style={ styles.leftLabelText }>Back</AuxText>
      </View>
    );
    const rightLabel = (
      <View style={ styles.rightLabelView }>
        <AuxText style={ styles.rightLabelText }>Next</AuxText>
      </View>
    );
    const centerLabel = (
      <View>
        <LabelText style={ styles.centerLabelText } fontSize={15}>CHOOSE PHOTO</LabelText>
      </View>
    );

    return (
      <SimpleTopNav
        leftLabel={leftLabel}
        rightLabel={rightLabel}
        centerLabel={centerLabel}
        leftAction={this.props.routeBack}
        rightAction={() => this.props.routeImage(this.state.chosenImage.uri)}
      />
    );
  }
  render() {
    const { images } = this.state;
    const imageNodes = images.map((image, index) =>
      <TouchableOpacity key={index} onPress={() => this.chooseImage(image)} style={styles.image}>
        <Image style={styles.image} resizeMode="stretch" source={{ uri: image.uri }} />
        {this.renderSelected(image)}
      </TouchableOpacity>
    );
    let start = 0;
    let end = 0;
    if (images.length < 15) {
      start = images.length;
      end = 15;
    } else if (images.length % 3 > 0) {
      start = 0;
      end = 3 - images.length % 3;
    }
    const emptyItems = _.map(_.range(start, end), (index) =>
      <View key={index} style={[styles.image, styles.emptyContainer]}>
        <Image source={require('img/icons/icon_camera_roll.png')} style={styles.iconCameraRoll} />
      </View>
    );
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <View style={styles.cameraRoll}>
          <ScrollView
            bounces={false}
            scrollEventThrottle={5}
            onScroll={this.nextImages}
          >
            <View style={styles.imageGrid}>
              {imageNodes}
              {emptyItems}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
