import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import range from 'lodash/range'
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  STATUSBAR_HEIGHT,
  NAVBAR_HEIGHT,
} from 'AppConstants';
import { YELLOW } from 'AppColors';
import { HexagonGrid } from 'AppComponents';
import { styles } from './styles';

export class Colony360View extends Component {
  static propTypes = {
    colonyName: PropTypes.string.isRequired, // TODO: discuss with Steven - Navigator should handle that
    topics: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string,
      isTrending: PropTypes.bool,
    })).isRequired,
    onTopicPress: PropTypes.func
  }

  render() {
    const { colonyName, topics, onTopicPress } = this.props;
    return (
      <View style={styles.container}>
        <HexagonGrid
          width={WINDOW_WIDTH}
          height={WINDOW_HEIGHT - STATUSBAR_HEIGHT - NAVBAR_HEIGHT}
          spacing={10}
          hexagons={topics.map(topic => ({
            type: 'image',
            imageSource: { uri: topic.imageUrl },
            text: topic.title && topic.title.toUpperCase(),
            textWeight: 'bold',
            textSize: 16,
            textColor: 'white',
            borderWidth: topic.isTrending ? 6 : 0,
            borderColor: YELLOW,
            onPress: () => onTopicPress && onTopicPress(topic),
          }))}
          hexagonSize={160}
          scrollEnabled={true}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>{colonyName.toUpperCase()}</Text>
        </View>
      </View>
    );
  }
}
