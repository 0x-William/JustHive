/**
 * Created by nick on 20/07/16.
 */
import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { LabelText } from 'AppFonts';
import { BORDER_GRAY, WHITE } from 'AppColors';
import { styles } from './styles';
import _ from 'lodash';
export class MultiImageLayout extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    editImage: PropTypes.func.isRequired,
    editTitle: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      orientation: true // true: horizontal, false: vertical
    };
    this.onChangeOrientation = this.onChangeOrientation.bind(this);
  }

  onChangeOrientation(orientation) {
    this.setState({ orientation });
  }
  renderTopArea() {
    const { images } = this.props;
    const { orientation } = this.state;
    const horizonTintColor = orientation ? WHITE : BORDER_GRAY;
    const verticalTintColor = !orientation ? WHITE : BORDER_GRAY;

    if (images.length === 2) {
      return (
        <View style={styles.row}>
          <View style={[styles.row, { marginTop: 10 }]}>
            <LabelText style={styles.labelOrientation} fontSize={15}>
              CHANGE ORIENTATION
            </LabelText>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => this.onChangeOrientation(true)}
            >
              <Image
                source={require('img/icons/icon_orientation_horizontal.png')}
                style={{ width: 28, height: 28, tintColor: horizonTintColor }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onChangeOrientation(false)}
              style={ styles.orientationChange }
            >
              <Image
                source={require('img/icons/icon_orientation_vertical.png')}
                style={{ width: 28, height: 28, tintColor: verticalTintColor }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }

  renderImage(image, index) {
    const { editImage, deleteImage, editTitle } = this.props;
    if (image) {
      return (
        <TouchableOpacity style={ styles.imageLayout } onPress={() => editImage(index)}>
          <Image style={ styles.imageLayout } source={{ uri: image.uri }} resizeMode="cover" />
          <TouchableOpacity style={styles.imageDeleteArea} onPress={() => deleteImage(index)}>
            <Image
              source={require('img/icons/icon_cancel.png')}
              style={ styles.iconCancel }
            />
          </TouchableOpacity>
          <View style={styles.imageBottomArea}>
            <View style={styles.labelImageTitle}>
              <LabelText style={ styles.imageTitle }>
                {image.title}
              </LabelText>
            </View>
            <TouchableOpacity style={styles.iconEditImage} onPress={() => editTitle(index)}>
              <Image
                source={require('img/icons/icon_edit.png')}
                style={ styles.iconEdit }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.emptyImageContainer}>
        <Image
          source={require('img/icons/icon_logo.png')}
          style={styles.emptyImage}
          resizeMode="contain"
        />
      </View>
    );
  }

  renderImages() {
    const { images } = this.props;
    const { orientation } = this.state;
    if (images.length === 2) {
      const flexDirection = orientation ? 'column' : 'row';
      const borderStyle = !orientation ? styles.rightBorder : styles.bottomBorder;
      return (
        <View style={{ flex: 1, flexDirection }}>
          <View style={[borderStyle, styles.imageLayout]}>
            {this.renderImage(images[0], 0)}
          </View>
          <View style={{ flex: 1 }}>
            {this.renderImage(images[1], 1)}
          </View>
        </View>
      );
    } else if (images.length > 2) {
      const components = _.map(_.range(0, 4), (index) => {
        const uri = index < images.length ? images[index] : null;
        return (
          <View key={index} style={styles.gridItem}>
            {this.renderImage(uri, index)}
          </View>
        );
      });
      return (
        <View style={styles.imageGrid}>
          {components}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {this.renderTopArea()}
        </View>
        <View style={styles.imageContainer}>
          {this.renderImages()}
        </View>
        <View style={styles.row}>
          <LabelText style={styles.bottomLabel} fontSize={12}>
            Move images within the frame to change crop.
          </LabelText>
          <LabelText style={styles.bottomLabel} fontSize={12}>
            To switch sections, hold and drag image up/down or left/right.
          </LabelText>
          <LabelText style={styles.bottomLabel} fontSize={12}>
            Double tap on an image to edit it.
          </LabelText>
        </View>
      </View>
    );
  }
}
