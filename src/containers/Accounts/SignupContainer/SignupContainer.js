import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Signup, ActionSheet } from 'AppComponents';
import { styles } from '../styles';
import _ from 'lodash';
import { connectFeathers } from 'AppConnectors';
import { renderHexagonIcons, getHexagonLayout, AlertMessage } from 'AppUtilities';
import { HEXAGON_SIZE, HEXAGON_IMAGE_SIZE } from 'AppConstants';
import { USER_SERVICE } from 'AppServices';
import { WHITE, YELLOW, BORDER_GRAY } from 'AppColors';

class SignupContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    facebookData: PropTypes.object,
    onSuccess: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      actionSheetVisible: false
    };
    this.hexagons = getHexagonLayout(3);
    this.toggleActionSheet = ::this.toggleActionSheet;
    this.renderHeader = ::this.renderHeader;
    this.handleSignup = ::this.handleSignup;
    this.handleActionSheet = ::this.handleActionSheet;
    this.PROFILE_PHOTO_OPTIONS = [{
      label: (
        <View style={styles.actionButtons}>
          <Icon name="camera-roll" style={styles.actionIcon} size={20} />
          <Text style={styles.actionText}>PHOTO LIVRARY</Text>
        </View>
      )
    }, {
      label: (
        <View style={styles.actionButtons}>
          <Icon name="photo-camera" style={styles.actionIcon} size={20} />
          <Text style={styles.actionText}>CAMERA</Text>
        </View>
      )
    }, {
      label: 'CANCEL'
    }];
  }

  handleSignup(data) {
    const { feathers, onSuccess, facebookData } = this.props;
    const { username, password } = data;
    // call S3 service to upload image and get avatar url.
    const user = Object.assign({}, data, facebookData);
    const userService = feathers.service(USER_SERVICE);

    userService.create(user)
      .then(() => feathers.authenticate({ type: 'local', username, password }))
      .then(() => onSuccess())
      .catch(error => AlertMessage.fromRequest(error));
  }

  handleActionSheet(index) {
    if (index === this.PROFILE_PHOTO_OPTIONS.length - 1) {
      this.toggleActionSheet();
    }
  }

  toggleActionSheet() {
    const { actionSheetVisible } = this.state;
    this.setState({ actionSheetVisible: !actionSheetVisible });
  }

  renderHeader() {
    const header = renderHexagonIcons(
      _.flatten(
        this.hexagons.map((arr, i) =>
          arr.map((h, j) => {
            let icon = null;
            const customStyles = {};
            let textAttrs = {};

            if (i === (this.hexagons.length - 1) && j === Math.floor(arr.length / 2)) {
              icon = 'photo-camera';
              textAttrs = {
                text: 'ADD PHOTO',
                textColor: WHITE,
                textSize: 8,
                textWeight: 'bold',
                textStyle: { top: HEXAGON_IMAGE_SIZE / 4 - 5 },
                iconStyle: { color: WHITE, marginTop: -5 },
                onPress: () => this.toggleActionSheet()
              };
            }
            return {
              key: `${i},${j}`,
              size: HEXAGON_SIZE,
              center: h.center,
              icon,
              borderWidth: 1,
              color: !!icon ? YELLOW : BORDER_GRAY,
              ...textAttrs,
              ...customStyles
            };
          })
        )
      )
    );
    return header;
  }
  render() {
    const { feathers, facebookData } = this.props;
    const { actionSheetVisible } = this.state;
    const yPosForLogoRow = this.hexagons[this.hexagons.length - 1][0].center.y;
    const heightStyle = { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 };
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[heightStyle, { top: -10 }]}>
            {this.renderHeader()}
          </View>
          <Signup
            feathers={feathers}
            handleSignup={this.handleSignup}
            facebookData={facebookData}
          />
          { actionSheetVisible && (
            <ActionSheet
              options={this.PROFILE_PHOTO_OPTIONS}
              callback={this.handleActionSheet}
            />
          )}
        </View>
      </View>
    );
  }
}

export default connectFeathers(SignupContainer);
