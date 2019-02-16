import React, { Component, PropTypes } from 'react';
import { View, ListView, Text, TouchableOpacity } from 'react-native';
import { HexagonImage } from 'AppComponents';
import { styles } from './styles';

export class SearchResults extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })).isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    style: View.propTypes.style,
    onErrorPress: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(props.results),
    };
  }

  componentWillReceiveProps({ results }) {
    const { dataSource } = this.state;
    this.setState({
      dataSource: dataSource.cloneWithRows(results),
    });
  }

  renderMessage(message) {
    const { style } = this.props;
    return (
      <View style={style}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    );
  }

  renderError(error) {
    const { style, onErrorPress } = this.props;
    return (
      <View style={style}>
        <View style={styles.messageContainer}>
          <TouchableOpacity onPress={onErrorPress}>
            <Text style={[styles.message, styles.error]}>{error}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { results, isLoading, error, style } = this.props;
    if (isLoading) {
      return this.renderMessage('Loading...');
    }
    if (error) {
      return this.renderError(error);
    }
    if (!results.length) {
      return this.renderMessage('No results found');
    }
    return (
      <View style={style}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={({ type, imageUrl, label, id }) => (
            <View key={`${type}${id}`} style={styles.listItem}>
              <View style={styles.imageContainer}>
                <HexagonImage imageSource={{ uri: imageUrl }} size={40}  />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{label}</Text>
                <Text style={styles.smallText}>{type}</Text>
              </View>
            </View>
          )}
          style={styles.listView}
        />
      </View>
    );
  }
}
