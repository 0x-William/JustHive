import React, { Component, PropTypes } from 'react';
import {
  ListView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { LabelText } from 'AppFonts';
import { Separator, HexagonImage } from 'AppComponents';
import _ from 'lodash';

import { styles } from './styles';

const followIcons = {
  people: {
    default: require('img/icons/icon_profile_follow.png'),
    follow: require('img/icons/icon_profile_followed.png')
  },
  groups: {
    default: require('img/icons/icon_profile_groups.png'),
    follow: require('img/icons/icon_profile_joinedGroup.png')
  }
};

export class Suggestions extends Component {
  static propTypes = {
    groups: PropTypes.array.isRequired,
    people: PropTypes.array.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.isSelected !== row2.isSelected
    });

    this.state = {
      groupsDataSource: dataSource.cloneWithRows(props.groups),
      peopleDataSource: dataSource.cloneWithRows(props.people)
    };
    this.data = {
      groups: props.groups,
      people: props.people
    };
    this.selectGroup = ::this.selectGroup;
    this.selectPeople = ::this.selectPeople;
    this.getResult = ::this.getResult;
    this.renderGroupsRow = ::this.renderGroupsRow;
    this.renderPeopleRow = ::this.renderPeopleRow;
    this.renderGroupsFooter = ::this.renderGroupsFooter;
    this.renderPeopleFooter = ::this.renderPeopleFooter;
  }

  getResult() {
    const groups = _.reduce(this.data.groups, (prev, curr) => {
      if (curr.isSelected) {
        return prev.concat([curr._id]);
      }
      return prev;
    }, []);

    const people = _.reduce(this.data.people, (prev, curr) => {
      if (curr.isSelected) {
        return prev.concat([curr._id]);
      }
      return prev;
    }, []);

    return { groups, people };
  }

  selectGroup(id) {
    const { groupsDataSource } = this.state;
    this.data.groups = this.data.groups.map((group) => {
      if (group._id === id) {
        return Object.assign({}, group, { isSelected: !group.isSelected });
      }
      return group;
    });
    return this.setState({
      groupsDataSource: groupsDataSource.cloneWithRows(this.data.groups)
    });
  }

  selectPeople(id) {
    const { peopleDataSource } = this.state;
    this.data.people = this.data.people.map(user => {
      if (user._id === id) {
        return Object.assign({}, user, { isSelected: !user.isSelected });
      }
      return user;
    });
    this.setState({
      peopleDataSource: peopleDataSource.cloneWithRows(this.data.people)
    });
  }

  renderGroupsRow(rowData) {
    return (
      <View style={styles.row}>
        <HexagonImage
          imageSource={{ uri: rowData.img }}
          imageWidth={100}
          imageHeight={100}
          isHorizontal={true}
          style={styles.rowImage}
          size={40}
        />
        <View style={styles.rowContent}>
          <View>
            <Text style={styles.rowMainText}>{rowData.name}</Text>
            <Text style={styles.rowSecondaryText}>{rowData.members} MEMBERS</Text>
          </View>
          <TouchableOpacity onPress={() => this.selectGroup(rowData._id)}>
            <View style={[styles.rowIconContainer, rowData.isSelected ? styles.selected : {}]}>
              <Image
                resizeMode="contain"
                source={rowData.isSelected ? followIcons.groups.follow : followIcons.groups.default}
                style={styles.rowIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderGroupsFooter() {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>view more</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderPeopleRow(rowData) {
    return (
      <View style={styles.row}>
        <HexagonImage
          imageSource={ rowData.avatarUrl ? { uri: rowData.avatarUrl } : require('img/icons/icon_fill_profile.png') }
          imageWidth={100}
          imageHeight={100}
          isHorizontal={true}
          style={styles.rowImage}
          size={40}
        />
        <View style={styles.rowContent}>
          <View>
            <Text style={styles.rowMainText}>{rowData.username}</Text>
            <Text style={styles.rowSecondaryText}>{rowData.name} MEMBERS</Text>
          </View>
          <TouchableOpacity onPress={() => this.selectPeople(rowData._id)}>
            <View style={[styles.rowIconContainer, rowData.isSelected ? styles.selected : {}]}>
              <Image
                resizeMode="contain"
                source={rowData.isSelected ? followIcons.people.follow : followIcons.people.default}
                style={styles.rowIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderPeopleFooter() {
    return (
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>view more</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { groupsDataSource, peopleDataSource } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.groupsContainer}>
            <LabelText
              numberOfLines={1}
              upperCase={true}
              fontWeight="bold"
              style={styles.labelText}
            >
              Groups you might like
            </LabelText>
            <Separator height={0.5} />
            <ListView
              enableEmptySections={true}
              dataSource={groupsDataSource}
              renderRow={this.renderGroupsRow}
              style={{ flex: 1 }}
              renderFooter={this.renderGroupsFooter}
              renderSeparator={() => <Separator height={0.5} style={{ marginTop: 5, marginBottom: 5 }} />}
            />
          </View>
          <View style={styles.groupsContainer}>
            <LabelText
              numberOfLines={1}
              upperCase={true}
              fontWeight="bold"
              style={styles.labelText}
            >
              People to follow
            </LabelText>
            <Separator height={0.5} />
            <ListView
              enableEmptySections={true}
              dataSource={peopleDataSource}
              renderRow={this.renderPeopleRow}
              renderFooter={this.renderPeopleFooter}
              renderSeparator={() => <Separator height={0.5} style={{ marginTop: 5, marginBottom: 5 }} />}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
