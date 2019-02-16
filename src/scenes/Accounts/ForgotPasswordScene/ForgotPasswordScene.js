import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { ForgotPasswordContainer } from 'AppContainers';
import { getHexagonLayout, renderHexagonIcons } from 'AppUtilities';
import { YELLOW, BORDER_GRAY } from 'AppColors';
import { HEXAGON_SIZE, HEXAGON_IMAGE_SIZE } from 'AppConstants';
import { styles } from '../styles';

export default class ForgotPasswordScene extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { viewTop: 0 };
    this.hexagons = getHexagonLayout(3);
  }

  renderHexagons() {
    return renderHexagonIcons(
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
  }

  render() {
    const { onBack } = this.props;
    const { viewTop } = this.state;
    const yPosForLogoRow = this.hexagons[this.hexagons.length - 1][0].center.y;
    const heightStyle = { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 };
    return (
      <View style={[styles.container, { marginTop: viewTop }]}>
        <View style={heightStyle}>
          {this.renderHexagons()}
        </View>
        <ForgotPasswordContainer
          routeBack={onBack}
        />
        <KeyboardSpacer
          topSpacing={0}
          onToggle={(isShow, space) => this.setState({ viewTop: -space / 5 })}
        />
      </View>
    );
  }
}
