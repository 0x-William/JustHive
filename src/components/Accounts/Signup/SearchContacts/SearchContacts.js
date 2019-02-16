/* global fetch */
import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  ActivityIndicator,
  Text,
  Image,
  Alert
} from 'react-native';
import { styles } from './styles';
import { SimpleTopNav, HexagonImage } from 'AppComponents';
import { ActionButton } from 'AppButtons';
import { AuxText } from 'AppFonts';
import { WSOCKET } from 'AppConfig';
import { getContacts } from 'AppUtilities';

const followIcons = {
  follow: require('img/icons/icon_profile_follow.png'),
  following: require('img/icons/icon_profile_followed.png')
};

export class SearchContacts extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: true,
      suggestions: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1.selected !== row2.selected,
      }).cloneWithRows([])
    };
    this.renderRow = ::this.renderRow;
    this.renderHeader = ::this.renderHeader;
    this.addToFollow = ::this.addToFollow;
    this.followAll = ::this.followAll;
    this.submit = ::this.submit;
    this.findFriends = ::this.findFriends;
  }

  componentWillMount() {
    getContacts().then((contacts = []) => this.findFriends(contacts));
  }

  componentDidMount() {}

  addToFollow(user) {
    const { suggestions, dataSource } = this.state;

    const newState = suggestions.map((currentUser) => {
      if (currentUser._id === user._id) {
        return Object.assign({}, currentUser, {
          isSelected: !currentUser.isSelected
        });
      }
      return currentUser;
    });

    this.setState({
      suggestions: newState,
      dataSource: dataSource.cloneWithRows(newState)
    });
  }

  findFriends(contacts) {
    const emails = [];
    const phones = [];
    contacts.forEach((contact) => {
      contact.emailAddresses.forEach((eAddress) => {
        emails.push(eAddress.email);
      });
      contact.phoneNumbers.forEach((phoneNumber) => {
        phones.push(phoneNumber.number.replace(/\(|\)|\-|\s/g, ''));
      });
    });
    // /users?emails=[...]&phones=[...]
    fetch(`${WSOCKET}/find/users?emails=${JSON.stringify(emails)}&phones=${JSON.stringify(phones)}`)
      .then((response) => response.json())
      .then((suggestions) => {
        this.setState({
          suggestions,
          isLoading: false,
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }).cloneWithRows(suggestions)
        });
      })
      .catch((err) => {
        Alert.alert('Something went wrong...', err);
      });
  }

  submit() {
    const { suggestions } = this.state;
    const wantToFollow = suggestions.reduce((prev, current) => {
      if (current.isSelected) {
        return prev.concat([current._id]);
      }
      return prev;
    }, []);
    this.props.onDone(wantToFollow);
  }

  followAll() {
    const { suggestions, dataSource } = this.state;
    const newState = suggestions.map((user) => (
      Object.assign({}, user, {
        isSelected: true
      })
    ));
    this.setState({
      suggestions: newState,
      dataSource: dataSource.cloneWithRows(newState)
    });
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <AuxText
          style={styles.followText}
          upperCase={false}
        >
          {this.state.suggestions.length} Friends on Wonderbee
        </AuxText>
        <ActionButton
          onPress={() => this.followAll()}
          label="+  FOLLOW ALL"
          style={styles.followAll}
          labelStyle={styles.followLabel}
        />
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <HexagonImage
            size={35}
            style={ styles.hexagonImageMarginRight }
            imageSource={ rowData.avatarUrl ?
              { uri: rowData.avatarUrl } :
              require('img/icons/icon_fill_profile.png')}
          />
            <View style={styles.rowTextContent}>
              <Text style={styles.rowMainText}>
                {rowData.username}
              </Text>
              <Text style={styles.rowSecondaryText}>
                {rowData.name}
              </Text>
            </View>
        </View>
        <ActionButton
          onPress={() => this.addToFollow(rowData)}
          label={
            <View style={styles.rowAddButtonContainer}>
              <Image
                resizeMode="contain"
                source={rowData.isSelected ? followIcons.following : followIcons.follow}
                style={styles.rowAddIcon}
              />
            </View>
          }
          style={[
            styles.rowActionButton,
            rowData.isSelected ? styles.following : {}
          ]}
        />
      </View>
    );
  }

  render() {
    const { onBack } = this.props;
    const { dataSource, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <SimpleTopNav
          iconBack={true}
          leftAction={() => onBack()}
          rightLabel="DONE"
          rightAction={() => this.submit()}
          centerLabel="FIND CONTACTS"
          centerFontSize={17}
          sideFontSize={17}
        />
        { isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator
              size="large"
            />
          </View>
        ) : (
          <View style={styles.listViewContainer}>
            <ListView
              renderRow={this.renderRow}
              enableEmptySection={true}
              renderHeader={this.renderHeader}
              dataSource={dataSource}
              style={styles.listView}
            />
          </View>
        ) }
      </View>
    );
  }
}
