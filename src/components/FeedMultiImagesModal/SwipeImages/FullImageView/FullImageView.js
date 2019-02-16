/**
 * Created by nick on 20/06/16.
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { CLICK_DURATION } from './constants';
import { LabelText } from 'AppFonts';

export class FullImageView extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    voteImage: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
    this.showLabel = ::this.showLabel;
    this.onPanResponderRelease = ::this.onPanResponderRelease;
    this._panResponder = {};
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: this.onPanResponderRelease
    });
  }

  onPanResponderRelease() {
    if (this.selectTimeout) {
      clearTimeout(this.selectTimeout);
      this.selectTimeout = null;
      this.doubleTapImage();
    } else {
      this.selectTimeout = setTimeout(
        () => {}, CLICK_DURATION
      );
    }
    return true;
  }

  doubleTapImage() {
    this.props.voteImage();
  }

  singleTapImage() {
  }

  showLabel() {

  }

  renderVotedIcon() {
    const { image } = this.props;
    if (image.voted) {
      return (
        <View style={styles.checkedIconContainer}>
          <Image
            source={require('img/icons/icon_check_vote.png')}
            style={styles.imgCheckIcon}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    const { image } = this.props;
    const initialRotate = image.editState.rotate + image.editStateModified.rotate;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.row}>
            <Image
              source={require('img/icons/icon_location.png')}
              style={styles.imgLocation}
            />
            <LabelText
              numberOfLines={3}
              style={[styles.text, styles.topText]}
              fontSize={15}
            >
              {image.title}
            </LabelText>
          </View>
        </View>
        <View style={styles.middle}>
          <Image
            source={{ uri: image.url }}
            resizeMode="cover"
            style={[styles.flex, {
              transform: [
                { rotate: `${initialRotate}deg` }
              ]
            }]}
            {...this._panResponder.panHandlers}
          />
          <TouchableOpacity onPress={this.showLabel} style={styles.imgProfileContainer} >
            <Image
              source={require('img/icons/icon_fill_profile.png')}
              style={styles.imgProfile}
            />
          </TouchableOpacity>
          {this.renderVotedIcon()}
        </View>
        <View style={styles.bottom}>
          <LabelText
            numberOfLines={3}
            style={styles.text}
            fontSize={15}
          >
            {image.title}
          </LabelText>
        </View>
      </View>
    );
  }
}
