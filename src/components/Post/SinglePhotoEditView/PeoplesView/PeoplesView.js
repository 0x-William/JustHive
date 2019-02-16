import React, { Component, PropTypes } from 'react';
import {
  View,
   Text,
   Image,
   TouchableOpacity,
   TextInput,
   ListView
 } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import _ from 'lodash';
import { USER_SERVICE } from 'AppServices';

export class PeoplesView extends Component {
  static propTypes = {
    peoples: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
    onTextChanged: PropTypes.func,
    placeholder: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired
  };
  static defaultProps = {
    peoples: [],
    onTextChanged: () => {},
    placeholder: 'Type Person name'
  }
  constructor(props, context) {
    super(props, context);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (prev, next) => prev._id !== next._id
    });

    this.state = {
      query: '',
      peoples: dataSource.cloneWithRows([])
    };

    this.renderRow = ::this.renderRow;
    this.onTextChange = ::this.onTextChange;
    this.dataSourceAsDefault = ::this.dataSourceAsDefault;
  }

  onTextChange(query) {
    if (!query.length) {
      return this.dataSourceAsDefault();
    }

    const { feathers } = this.props;
    const { peoples } = this.state;

    const mongoQuery = {
      query: {
        name: {
          $regex: query,
        },
        deleted: false
      }
    };

    _.debounce(() => {
      feathers.service(USER_SERVICE).find(mongoQuery).then(data => {
        const newState = peoples.cloneWithRows(data);
        this.setState({ peoples: newState });
      });
    }, 300)();

    return this.props.onTextChanged(query);
  }

  dataSourceAsDefault() {
    const { peoples: dataSource } = this.state;
    const peoples = dataSource.cloneWithRows([]);
    this.setState({ peoples });
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity onPress={() => this.props.onSelect(rowData)}>
        <View style={styles.row}>
          <Image source={{ uri: rowData.avatarUrl }} style={styles.personAvatar} />
          <Text style={styles.personName}>
            {rowData.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            style={styles.queryInput}
            onChangeText={this.onTextChange}
            placeholder={this.props.placeholder}
            placeholderTextColor="white"
            autoCapitalize="words"
            autoCorrect={false}
            autoFocus={true}
          />
          <View style={styles.listViewContainer}>
            <ListView
              dataSource={this.state.peoples}
              renderRow={this.renderRow}
              style={styles.listView}
              showsVerticalScrollIndicator={true}
              enableEmptySections={true}
            />
          </View>
          <TouchableOpacity onPress={this.props.onClose} style={styles.closeIconContainer} >
            <Icon name="highlight-off" size={30} style={styles.closeButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
