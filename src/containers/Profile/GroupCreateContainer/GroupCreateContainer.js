import React, { Component, PropTypes } from 'react';
import { View, TextInput, ListView, ActivityIndicator } from 'react-native';
import {
  ProfileTopNav,
  ChangePhotoModal,
  AvatarEdit,
  HorizontalRuler,
  SearchInput,
  SearchResult,
  SuccessDenyButtons,
} from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { makeCancelable } from 'AppUtilities';
import { AuxText, LabelText } from 'AppFonts';
import { FOLLOWER_SERVICE, SEARCH_SERVICE, GROUP_SERVICE } from 'AppServices';
import { styles } from './styles';

class GroupCreateContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      avatarUrl: '',
      name: '',
      searchValue: '',
      users: [],
      groups: [],
      searchResults: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      initialResults: [],
      loading: true,
      searchResultsExist: false,
    };
    this.changeName = ::this.changeName;
    this.changeSearch = ::this.changeSearch;
    this.removeProfilePic = ::this.removeProfilePic;
    this.addToState = ::this.addToState;
    this.renderRow = ::this.renderRow;
    this.renderListView = ::this.renderListView;
    this.saveGroup = ::this.saveGroup;
    this.getSearch = null;
    this.modal = null;
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

  changeName(name) {
    this.setState({ name });
  }

  changeSearch(searchValue) {
    if (searchValue.length === 0) {
      const { searchResults, initialResults, users, groups } = this.state;
      const resultsArray = users.length === 0 && groups.length === 0 ?
        initialResults :
        users.concat(groups);
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
    const lookInto = { users: true, groups: true };
    this.getSearch = makeCancelable(
      this.props.feathers.service(SEARCH_SERVICE).create({ query, lookInto })
    );
    return this.getSearch
    .promise
    .then(results => {
      const users = results.users.map(user => ({ resultType: 'users', ...user }));
      const groups = results.groups.map(group => ({ resultType: 'groups', ...group }));
      const rows = users.concat(groups);
      this.setState({
        searchResults: this.state.searchResults.cloneWithRows(rows),
        loading: false,
        searchResultsExist: rows.length > 0,
      });
    })
    .catch(error => console.log(error));
  }

  addToState(result, resultType) {
    const { users, groups } = this.state;
    const index = resultType === 'users' ?
      users.map(item => item._id).indexOf(result._id) :
      groups.map(item => item._id).indexOf(result._id);
    this.setState({
      [resultType]: index === -1 ?
        users.concat(result) :
        users.slice(0, index).concat(users.slice(index + 1))
    });
  }

  saveGroup() {
    const { feathers } = this.props;
    const { avatarUrl, name, users, groups } = this.state;
    if (name && (users.length + groups.length > 0)) {
      const userArray = users.map(user => user._id);
      const groupArray = groups.map(group => group._id);
      feathers.service(GROUP_SERVICE).create({
        avatarUrl,
        name,
        users: userArray,
        groups: groupArray
      });
    }
  }

  removeProfilePic() {
    this.setState({ avatarUrl: '' });
  }

  renderRow(result) {
    const { routeScene } = this.props;
    const { users, groups } = this.state;
    const inState = result.resultType === 'users' ?
      users.map(user => user._id).indexOf(result._id) > -1 :
      groups.map(group => group._id).indexOf(result._id) > -1;
    return (
      <SearchResult
        result={result}
        addToState={this.addToState}
        inState={inState}
        propsToPass={{ userPass: result }}
        resultType={result.resultType}
        routeScene={routeScene}
        sceneToRoute={'ProfileScene'}
        addedStateIcon={require('img/icons/icon_profile_joinedGroup.png')}
        notAddedStateIcon={require('img/icons/icon_profile_addGroup.png')}
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
    const { routeBack, routeScene } = this.props;
    const { avatarUrl, searchValue, name, loading } = this.state;
    return (
      <View style={styles.container}>
        <ProfileTopNav
          bottomViewable={false}
          leftAction={routeBack}
          centerLabel="Create a New Group"
        />
        <View style={styles.row}>
          <AvatarEdit
            onPress={() => this.modal.toggleModal()}
            avatarUrl={avatarUrl}
          />
          <View>
            <AuxText>Name</AuxText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={this.changeName}
            />
          </View>
        </View>
        <HorizontalRuler />
        <SearchInput
          value={searchValue}
          style={styles.transparent}
          onChange={this.changeSearch}
        />
        <HorizontalRuler />
        <View style={styles.container}>
          {!loading ?
            this.renderListView() :
            <ActivityIndicator style={styles.center} size="large" animating={true} />
          }
        </View>
        <ChangePhotoModal
          ref={modal => this.modal = modal}
          removeProfilePic={this.removeProfilePic}
          routeScene={routeScene}
        />
        <SuccessDenyButtons
          onSuccess={this.saveGroup}
          onDeny={routeBack}
        />
      </View>
    );
  }
}

export default connectFeathers(GroupCreateContainer);
