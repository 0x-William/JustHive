import React, { Component, PropTypes } from 'react';
import { View, Image, ListView } from 'react-native';
import { ProfileTopNav, Group } from 'AppComponents';
import { LabelText, GrayHeader } from 'AppFonts';
import { connectFeathers } from 'AppConnectors';
import { makeCancelable } from 'AppUtilities';
import { GROUP_SERVICE } from 'AppServices';
import { styles } from './styles';

class GroupContainer extends Component {
  static propTypes = {
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      groups: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      loading: true,
      hasGroups: false,
    };
    this.renderRow = ::this.renderRow;
    this.renderListView = ::this.renderListView;
    this.joinGroup = :: this.joinGroup;
    this.getGroupsPromise = null;
  }

  componentWillMount() {
    this.getGroupsPromise = makeCancelable(this.props.feathers.service(GROUP_SERVICE).find());
    this.getGroupsPromise
    .promise
    .then(groups =>
      this.setState({
        groups: this.state.groups.cloneWithRows(groups),
        loading: false,
        hasGroups: groups.length > 0,
      })
    )
    .catch(error => console.log(error));
  }

  componentWillUnmount() {
    if (this.getGroupsPromise) {
      this.getGroupsPromise.cancel();
    }
  }

  joinGroup(id) {
    this.props.feathers(GROUP_SERVICE).patch(id);
  }


  renderRow(group) {
    return (
      <Group
        {...group}
        joinGroup={this.joinGroup}
        routeEditScene={() => this.props.routeScene('GroupEditScene')}
      />
    );
  }

  renderListView() {
    if (this.state.hasGroups) {
      return (
        <ListView
          dataSource={this.state.groups}
          renderRow={this.renderRow}
        />
      );
    }
    return (
      <GrayHeader style={styles.center}>
        No Groups!
      </GrayHeader>
    );
  }

  render() {
    const { routeBack, routeScene } = this.props;
    return (
      <View style={styles.container}>
        <ProfileTopNav
          bottomViewable={false}
          leftAction={routeBack}
          centerLabel="GROUPS"
          rightAction={() => routeScene('GroupCreateScene')}
          rightLabel={
            <Image
              source={require('img/icons/icon_profile_addGroup.png')}
              style={ styles.iconAddGroup }
            />
          }
        />
        {!this.state.loading && this.renderListView()}
      </View>
    );
  }
}

export default connectFeathers(GroupContainer);
