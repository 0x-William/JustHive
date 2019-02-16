import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import { UserAvatar } from 'AppComponents';
import { GrayHeader, AuxText } from 'AppFonts';
import { YELLOW } from 'AppColors';
import { styles } from './styles';

export class Group extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    isMember: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    joinGroup: PropTypes.func.isRequired,
    routeEditScene: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentMember: props.isMember,
      users: props.users.length,
    };
    this.joinGroup = ::this.joinGroup;
  }

  joinGroup() {
    const { currentMember, users } = this.state;
    this.setState({
      currentMember: !currentMember,
      users: users - 1,
    });
    const { joinGroup, _id } = this.props;
    return joinGroup(_id);
  }

  render() {
    const { avatarUrl, name, isAdmin } = this.props;
    const { users, currentMember } = this.state;
    const imgSource = currentMember ?
      require('img/icons/icon_profile_joinedGroup.png') :
      require('img/icons/icon_profile_addGroup.png');
    return (
      <View style={[styles.container, styles.row]}>
        <View style={styles.row}>
          <UserAvatar
            avatarUrl={avatarUrl}
            size={50}
            iconStyle={{ width: 22, height: 25 }}
          />
          <View style={styles.heading}>
            <GrayHeader>{name}</GrayHeader>
            <AuxText>{users} Members</AuxText>
          </View>
        </View>
        <TouchableHighlight
          style={styles.button}
          underlayColor={YELLOW}
        >
          {isAdmin ?
            <Image
              source={require('img/icons/icon_profile_settings.png')}
              style={styles.settings}
            /> :
            <Image
              source={imgSource}
              style={styles.group}
            />
          }
        </TouchableHighlight>
      </View>
    );
  }
}
