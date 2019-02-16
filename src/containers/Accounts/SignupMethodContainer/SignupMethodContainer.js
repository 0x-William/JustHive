import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { SignupMethod } from 'AppComponents';
import _ from 'lodash';
import { renderHexagonIcons, getHexagonLayout, AlertMessage } from 'AppUtilities';
import { HEXAGON_SIZE, HEXAGON_IMAGE_SIZE } from 'AppConstants';
import { connectFeathers } from 'AppConnectors';
import { TWILIO_SMS_SERVICE } from 'AppServices';
import { YELLOW, BORDER_GRAY } from 'AppColors';
import { styles } from '../styles';

class SignupMethodContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    jumpTo: PropTypes.func.isRequired,
    goToNext: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.hexagons = getHexagonLayout(3);
    this.renderHeader = ::this.renderHeader;
    this.determinePhoneVerification = ::this.determinePhoneVerification;
  }

  determinePhoneVerification(emailOrPhone, isPhone) {
    const { goToNext, feathers } = this.props;

    if (!isPhone) {
      return goToNext(emailOrPhone);
    }

    return feathers.service(TWILIO_SMS_SERVICE)
      .create({ to: emailOrPhone })
      .then(() => goToNext(emailOrPhone, isPhone))
      .catch(err => {
        AlertMessage.fromRequest(err);
      });
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
    const { jumpTo, feathers } = this.props;
    const yPosForLogoRow = this.hexagons[this.hexagons.length - 1][0].center.y;
    const heightStyle = { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 };

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[heightStyle, { top: -10 }]}>
            {this.renderHeader()}
          </View>
          <SignupMethod
            feathers={feathers}
            goToLogin={() => jumpTo('LoginScene')}
            goToNext={this.determinePhoneVerification}
          />
        </View>
      </View>
    );
  }
}

export default connectFeathers(SignupMethodContainer);
