import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { SimpleTopNav, SettingList, SettingItem, SettingHeader } from 'AppComponents';
import { connectFeathers } from 'AppConnectors';
import { USER_SERVICE } from 'AppServices';
import { styles } from './styles';

class SettingContainer extends Component {
  static propTypes = {
    routeBack: PropTypes.func.isRequired,
    routeScene: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    const { settings, notificationSettings } = props.feathers.get('user');
    this.state = {
      privateAccount: settings.privateAccount,
      posts: notificationSettings.posts,
      mentionsAndTags: notificationSettings.mentionsAndTags,
      likes: notificationSettings.likes,
      pollResults: notificationSettings.pollResults,
      newFollowers: notificationSettings.newFollowers,
      messages: notificationSettings.messages,
    };
    this.onValueChange = ::this.onValueChange;
  }

  onValueChange(value, field, settingsType = 'notificationSettings') {
    const { feathers } = this.props;
    const newState = { [field]: value };
    const updateSetting = { [`${settingsType}.${field}`]: value };
    this.setState(newState);
    feathers.service(USER_SERVICE).patch(null, updateSetting)
    .catch(error => console.log(error));
  }

  render() {
    const { routeScene, routeBack } = this.props;
    const {
      privateAccount,
      posts,
      mentionsAndTags,
      likes,
      pollResults,
      newFollowers,
      messages,
    } = this.state;
    return (
      <View style={styles.container}>
        <SimpleTopNav
          leftAction={routeBack}
          centerLabel="SETTTINGS"
        />
        <SettingList>
          <SettingHeader label="Account" />
          <SettingItem label="Change Password" onPress={() => routeScene('ChangePasswordScene')} />
          <SettingItem label="Email & Phone Number" onPress={() => routeScene('UpdateEmailAndPhoneScene')} />
          <SettingItem label="Posts You've Liked" />
          <SettingItem label="Linked Accounts" />
          <SettingItem label="Privacy Settings" />
          <SettingItem
            label="Private Account"
            switchItem={true}
            onValueChange={() => this.onValueChange(!privateAccount, 'privateAccount', 'settings')}
            switchValue={privateAccount}
          />
          <SettingHeader label="Notifications" />
          <SettingItem label="Posts"
            switchItem={true}
            onValueChange={() => this.onValueChange(!posts, 'posts')}
            switchValue={posts}
          />
          <SettingItem
            label="Mention & Tags"
            switchItem={true}
            onValueChange={() => this.onValueChange(!mentionsAndTags, 'mentionsAndTags')}
            switchValue={mentionsAndTags}
          />
          <SettingItem
            label="Likes"
            switchItem={true}
            onValueChange={() => this.onValueChange(!likes, 'likes')}
            switchValue={likes}
          />
          <SettingItem
            label="Poll Results"
            switchItem={true}
            onValueChange={() => this.onValueChange(!pollResults, 'pollResults')}
            switchValue={pollResults}
          />
          <SettingItem
            label="New Followers"
            switchItem={true}
            onValueChange={() => this.onValueChange(!newFollowers, 'newFollowers')}
            switchValue={newFollowers}
          />
          <SettingItem
            label="Messages"
            switchItem={true}
            onValueChange={() => this.onValueChange(!messages, 'messages')}
            switchValue={messages}
          />
          <SettingHeader label="Follow People" />
          <SettingItem label="Find Facebook Friends" />
          <SettingItem label="Find Contacts" />
          <SettingItem label="Invite Your Friends" />
          <SettingHeader label="General" />
          {/*<SettingItem label="Badge App Icon" switchItem={true} /> // not until V2*/}
          <SettingItem label="Text Size" />
          <SettingItem label="Help" />
          <SettingItem label="Logout" />
        </SettingList>
      </View>
    );
  }
}

export default connectFeathers(SettingContainer);
