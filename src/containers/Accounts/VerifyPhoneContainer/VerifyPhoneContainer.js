import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connectFeathers } from 'AppConnectors';
import _ from 'lodash';
import { Alert } from 'react-native';
import { VerifyPhone } from 'AppComponents';
import { renderHexagonIcons, getHexagonLayout } from 'AppUtilities';
import { HEXAGON_SIZE, HEXAGON_IMAGE_SIZE } from 'AppConstants';
import { TWILIO_SMS_SERVICE } from 'AppServices';
import { YELLOW, BORDER_GRAY } from 'AppColors';
import { styles } from '../styles';

class VerifyPhoneContainer extends Component {
  static propTypes = {
    phone: PropTypes.string.isRequired,
    feathers: PropTypes.object.isRequired,
    navigateToSignup: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.hexagons = getHexagonLayout(3);
    this.renderHeader = ::this.renderHeader;
    this.submitVerification = ::this.submitVerification;
  }

  submitVerification(code) {
    const { feathers, phone, navigateToSignup } = this.props;

    feathers.service(TWILIO_SMS_SERVICE)
      .patch(null, { code, phone })
      .then(() => navigateToSignup())
      .catch(() => Alert.alert('Wrong Verification code'));
  }

  renderHeader() {
    const header = renderHexagonIcons(
      _.flatten(
        this.hexagons.map((arr, i) =>
          arr.map((h, j) => {
            let icon = null;
            if (i === (this.hexagons.length - 1) && j === Math.floor(arr.length / 2)) {
              icon = 'person-outline';
            }
            return {
              key: `${i},${j}`,
              size: HEXAGON_SIZE,
              center: h.center,
              icon,
              borderWidth: 1,
              color: !!icon ? YELLOW : BORDER_GRAY,
            };
          })
        )
      )
    );
    return header;
  }
  render() {
    const yPosForLogoRow = this.hexagons[this.hexagons.length - 1][0].center.y;
    const heightStyle = { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 };
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[heightStyle, { top: -10 }]}>
            {this.renderHeader()}
          </View>
          <VerifyPhone
            submitVerification={this.submitVerification}
          />
        </View>
      </View>
    );
  }
}

export default connectFeathers(VerifyPhoneContainer);
