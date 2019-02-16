import React, { Component, PropTypes } from 'react';
import { View, TextInput, ListView, Switch, ActivityIndicator } from 'react-native';
import {
  ProfileTopNav,
  HorizontalRuler,
  SearchInput,
  SuccessDenyButtons,
  SearchResult
} from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { LabelText, AuxText } from 'AppFonts';
import { makeCancelable } from 'AppUtilities';
import { FOLLOWER_SERVICE, SEARCH_SERVICE } from 'AppServices';
import { styles } from './styles';

class ColonyCreateContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeScene: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      searchValue: '',
      category: [],
      hashtags: [],
      users: [],
      locations: [],
      groups: [],
      colonyPrivate: false,
      searchResults: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
    this.changePrivate = ::this.changePrivate;
    this.saveColony = ::this.saveColony;
    this.renderListView = ::this.renderListView;
    this.renderRow = ::this.renderRow;
    this.setStateWithArray = ::this.setStateWithArray;
    this.getIndex = ::this.getIndex;
    this.changeName = ::this.changeName;
    this.changeSearch = ::this.changeSearch;
  }

  componentWillMount() {
    const { feathers } = this.props;
    const query = {
      createdBy: feathers.get('user')._id,
      requestType: 'checkFollowings',
    };
    this.getSearch = makeCancelable(feathers.service(FOLLOWER_SERVICE).find({ query }));
    this.getSearch
    .promise
    .then(results => {
      const initialResults = results.map(
        result => ({ ...result.followedUser, resultType: 'users' })
      );
      this.setState({
        initialResults,
        searchResults: this.state.searchResults.cloneWithRows(initialResults),
        searchResultsExist: results.length > 0,
        loading: false,
      });
    })
    .catch(error => console.log(error));
  }

  componentWillUnmount() {
    if (this.getSearch) {
      this.getSearch.cancel();
    }
  }

  setStateWithArray(array, resultType, result) {
    const index = array.map(item => item._id).indexOf(result._id);
    return this.setState({
      [resultType]: index === -1 ?
        array.concat(result) :
        array.slice(0, index).concat(array.slice(index + 1))
    });
  }

  getIndex(array, resultId) {
    return array.map(item => item._id).indexOf(resultId) > -1;
  }

  changeName(name) {
    this.setState({ name });
  }

  changePrivate(colonyPrivate) {
    this.setState({ colonyPrivate });
  }

  changeSearch(searchValue) {
    if (searchValue.length === 0) {
      const { searchResults, initialResults, users, groups, locations, hashtags } = this.state;
      const resultsArray = users.length === 0 &&
        groups.length === 0 &&
        locations.length === 0 &&
        hashtags.length === 0 ?
        initialResults :
        users.concat(groups).concat(locations).concat(hashtags);
      const searchResultsExist = resultsArray.length > 0;
      return this.setState({
        searchValue,
        loading: false,
        searchResultsExist,
        searchResults: searchResults.cloneWithRows(resultsArray),
      });
    }
    this.setState({ searchValue, loading: true });
    const query = searchValue;
    const lookInto = { users: true, groups: true, hashtags: true };
    this.getSearch = makeCancelable(
      this.props.feathers.service(SEARCH_SERVICE).create({ query, lookInto })
    );
    return this.getSearch
    .promise
    .then(results => {
      const users = results.users.map(item => ({ resultType: 'users', ...item }));
      const groups = results.groups.map(item => ({ resultType: 'groups', ...item }));
      // const locations = results.locations.map(item => ({ resultType: 'locations', ...item }));
      const locations = [];
      const hashtags = results.hashtags.map(item => ({ resultType: 'hashtags', ...item }));
      const rows = users.concat(groups).concat(locations).concat(hashtags);
      this.setState({
        searchResults: this.state.searchResults.cloneWithRows(rows),
        loading: false,
        searchResultsExist: rows.length > 0,
      });
    })
    .catch(error => console.log(error));
  }

  addToState(result, resultType) {
    const { users, groups, hashtags, locations } = this.state;
    switch (resultType) {
      case 'hashtags':
        return this.setStateWithArray(hashtags, resultType, result);
      case 'users':
        return this.setStateWithArray(users, resultType, result);
      case 'groups':
        return this.setStateWithArray(groups, resultType, result);
      case 'locations':
        return this.setStateWithArray(locations, resultType, result);
      default:
        return null;
    }
  }

  checkInState(resultType, resultId) {
    const { users, groups, locations, hashtags } = this.state;
    switch (resultType) {
      case 'hashtags':
        return this.getIndex(hashtags, resultId);
      case 'users':
        return this.getIndex(users, resultId);
      case 'groups':
        return this.getIndex(groups, resultId);
      case 'locations':
        return this.getIndex(locations, resultId);
      default:
        return null;
    }
  }

  saveColony() {
    // saving the colony
  }

  renderRow(result) {
    const { routeScene } = this.props;
    const inState = this.checkInState(result.resultType);
    return (
      <SearchResult
        result={result}
        addToState={this.addToState}
        inState={inState}
        propsToPass={{ userPass: result }}
        resultType={result.resultType}
        routeScene={routeScene}
        sceneToRoute={'ProfileScene'}
        addedStateIcon={require('img/icons/icon_profile_colonyAdded.png')}
        notAddedStateIcon={require('img/icons/icon_profile_colonyAdd.png')}
      />
    );
  }

  renderListView() {
    const { searchResultsExist, searchResults } = this.state;
    if (searchResultsExist) {
      return (
        <ListView
          dataSource={searchResults}
          renderRow={this.renderRow}
        />
      );
    }
    return (
      <LabelText style={styles.center}>No Result!</LabelText>
    );
  }

  render() {
    const { routeBack } = this.props;
    const { loading, colonyPrivate, name, searchValue } = this.state;
    return (
      <View style={styles.container}>
        <ProfileTopNav
          bottomViewable={false}
          leftAction={routeBack}
          centerLabel="Create a New Colony"
        />
        <View style={styles.row}>
          <AuxText style={styles.label}>Colony Title</AuxText>
          <TextInput
            style={styles.textInput}
            height={40}
            value={name}
            onChangeText={this.changeName}
            autoCapitalize="characters"
          />
        </View>
        <HorizontalRuler />
        <SearchInput
          value={searchValue}
          style={styles.whiteBack}
          onChange={this.changeSearch}
        />
        <HorizontalRuler />
        <View style={styles.container}>
          {!loading ?
            this.renderListView() :
            <ActivityIndicator style={styles.center} size="large" animating={true} />
          }
        </View>
        <View style={styles.privateRow}>
          <LabelText>Make Colony Public</LabelText>
          <Switch
            onValueChange={this.changePrivate}
            value={colonyPrivate}
          />
        </View>
        <SuccessDenyButtons
          onSuccess={this.saveColony}
          onDeny={this.props.routeBack}
        />
      </View>
    );
  }
}

export default connectFeathers(ColonyCreateContainer);
