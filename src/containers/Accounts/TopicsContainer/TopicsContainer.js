import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { connectFeathers } from 'AppConnectors';
import { Topics } from 'AppComponents';
import { renderHexagonIcons, getHexagonLayout } from 'AppUtilities';
import { HEXAGON_IMAGE_SIZE, HEXAGON_SIZE } from 'AppConstants';
import { YELLOW, WHITE, BORDER_GRAY } from 'AppColors';
import { AlertMessage } from 'AppUtilities';
import { styles } from '../styles';
import { CATEGORY_SERVICE, USER_SERVICE } from 'AppServices';

class TopicsContainer extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired
  };
  constructor(...args) {
    super(...args);
    this.state = {
      topics: [],
      isLoading: true,
    };
    this.hexagons = getHexagonLayout(3);
    this.handleSubmit = ::this.handleSubmit;
    this.renderHeader = ::this.renderHeader;
  }
  componentWillMount() {
    const { feathers } = this.props;
    return feathers.service(CATEGORY_SERVICE).find()
      .then(topics => this.setState({ topics, isLoading: false }))
      .catch(err => AlertMessage.fromRequest(err));
  }
  handleSubmit(topics) {
    const { feathers, next } = this.props;
    const userId = feathers.get('user')._id;
    const topicsFollowed = topics.map((topic) => ({ topic }));

    const userService = feathers.service(USER_SERVICE);
    userService.patch(userId, { topicsFollowed })
      .then(() => next())
      .catch((err) => AlertMessage.fromRequest(err));
  }
  renderHeader() {
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
    const { topics, isLoading } = this.state;
    const yPosForLogoRow = this.hexagons[this.hexagons.length - 1][0].center.y;
    const heightStyle = { height: yPosForLogoRow + HEXAGON_IMAGE_SIZE / 2 };

    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={[heightStyle, { top: -10 }]}>
            {this.renderHeader()}
          </View>
          <Topics
            topics={topics}
            loading={isLoading}
            submitTopics={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

export default connectFeathers(TopicsContainer);
