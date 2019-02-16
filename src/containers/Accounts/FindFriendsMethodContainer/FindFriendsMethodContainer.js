import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { FindFriendsMethod } from 'AppComponents';
import { styles } from '../styles';
import _ from 'lodash';
import { renderHexagonIcons, getHexagonLayout } from 'AppUtilities';
import { HEXAGON_SIZE, HEXAGON_IMAGE_SIZE } from 'AppConstants';
import { YELLOW, BORDER_GRAY } from 'AppColors';

export class FindFriendsMethodContainer extends Component {
  static propTypes = {
    skip: PropTypes.func.isRequired,
    connectToFacebook: PropTypes.func.isRequired,
    searchContacts: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.hexagons = getHexagonLayout(3);
    this.renderHeader = ::this.renderHeader;
  }

  renderHeader() {
    const header = renderHexagonIcons(
      _.flatten(
        this.hexagons.map((arr, i) =>
          arr.map((h, j) => {
            let icon = null;
            let customStyles = {};
            if (i === (this.hexagons.length - 1) && j === Math.floor(arr.length / 2)) {
              icon = require('img/icons/icon_profile_groups.png');
              customStyles = {
                imageStyle: {
                  width: HEXAGON_IMAGE_SIZE / 2,
                  height: HEXAGON_IMAGE_SIZE / 2,
                  tintColor: YELLOW
                }
              };
            }
            return {
              key: `${i},${j}`,
              size: HEXAGON_SIZE,
              center: h.center,
              icon,
              borderWidth: 1,
              color: !!icon ? YELLOW : BORDER_GRAY,
              ...customStyles
            };
          })
        )
      )
    );
    return header;
  }

  render() {
    const { skip, connectToFacebook, searchContacts } = this.props;
    const yPosForLogoRow = this.hexagons[this.hexagons.length - 1][0].center.y;
    const heightStyle = { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 };
    const opacityStyle = { opacity: 0.5 };

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[heightStyle, opacityStyle, { top: -10 }]}>
            {this.renderHeader()}
          </View>
          <FindFriendsMethod
            searchContacts={searchContacts}
            connectToFacebook={connectToFacebook}
            skipToNext={skip}
          />
        </View>
      </View>
    );
  }
}
