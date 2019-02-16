import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connectFeathers } from 'AppConnectors';
import { SignupActions } from 'AppComponents';
import { styles } from '../styles';
import _ from 'lodash';
import {
  renderHexagonImages,
  getHexagonLayout
} from 'AppUtilities';
import {
  HEXAGON_SIZE,
  HEXAGON_IMAGE_SIZE,
  HEXAGON_AVATARS,
  HEXAGON_LOGO
} from 'AppConstants';
import { SECONDARY_TEXT } from 'AppColors';

class SignupActionsContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeBack: PropTypes.func.isRequired,
    navigateToSignupMethod: PropTypes.func.isRequired,
    navigateToSignup: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.hexagons = getHexagonLayout(3);
    this.signupWithCustom = ::this.signupWithCustom;
    this.signupWithFacebook = ::this.signupWithFacebook;
    this.renderHeader = ::this.renderHeader;
  }
  signupWithCustom() {
    this.props.navigateToSignupMethod();
  }

  signupWithFacebook(facebookData) {
    const {
      name,
      picture,
      location,
      email,
      birthday,
      gender
    } = facebookData;

    const yearOfBirth = birthday ? parseInt(birthday.substr(-4), 10) : null;
    const splitedLocation = location.name.split(',');
    const city = splitedLocation[0];
    const state = splitedLocation.length === 3 ? splitedLocation[1] : null;
    const country = splitedLocation[2];
    const avatarUrl = picture.data.url;

    const updatedData = {
      name,
      avatarUrl,
      email,
      yearOfBirth,
      gender,
      location: { city, state, country }
    };
    this.props.navigateToSignup(updatedData);
  }

  renderHeader() {
    const header = renderHexagonImages(_.flatten(
      this.hexagons.map((arr, i) =>
        arr.map((h, j) => {
          let src = { uri: HEXAGON_AVATARS[_.random(0, HEXAGON_AVATARS.length - 1)] };
          let imagePadding = 0;
          if (i === (this.hexagons.length - 1) && j === Math.floor(arr.length / 2)) {
            src = HEXAGON_LOGO;
            imagePadding = 30;
          }
          return {
            key: `${i},${j}`,
            size: HEXAGON_SIZE,
            center: h.center,
            imageSource: src,
            imageWidth: HEXAGON_IMAGE_SIZE,
            imageHeight: HEXAGON_IMAGE_SIZE,
            imagePadding,
            borderWidth: 0,
            borderColor: SECONDARY_TEXT,
          };
        })
      )
    ));
    return header;
  }

  render() {
    const { routeBack, feathers } = this.props;
    const yPosForLogoRow = this.hexagons[this.hexagons.length - 1][0].center.y;
    const heightStyle = { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 };
    const opacityStyle = { opacity: 0.5 };
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[heightStyle, opacityStyle, { top: -10 }]}>
            {this.renderHeader()}
          </View>
          <SignupActions
            feathers={feathers}
            goToLogin={routeBack}
            signupWithCustom={this.signupWithCustom}
            signupWithFacebook={this.signupWithFacebook}
          />
        </View>
      </View>
    );
  }
}

export default connectFeathers(SignupActionsContainer);
