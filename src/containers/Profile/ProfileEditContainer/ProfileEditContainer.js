import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  ProfileEditForm,
  SimpleTopNav,
  AvatarEdit,
  ChangePhotoModal,
} from 'AppComponents';
import { ProfileButton } from 'AppButtons';
import { connectFeathers } from 'AppConnectors';
import { USER_SERVICE } from 'AppServices';
import { styles } from './styles';


class ProfileEditContainer extends Component {
  static propTypes = {
    routeScene: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      user: props.feathers.get('user'),
      submitting: false,
    };
    this.normalizeLocation = ::this.normalizeLocation;
    this.saveProfile = ::this.saveProfile;
    this.removeProfilePic = ::this.removeProfilePic;
    this.modal = null;
  }

  normalizeLocation(location, toStr = true) {
    if (toStr) {
      return `${location.city}, ${location.state}`;
    }
    const [city, state] = String(location).split(',').map(str => str.trim());
    return { city, state };
  }

  removeProfilePic() {
    // TODO
  }

  async saveProfile(values) {
    this.setState({ submitting: true });
    try {
      const { feathers } = this.props;
      const { user } = this.state;
      await feathers.service(USER_SERVICE).patch(user._id, {
        ...values,
        location: this.normalizeLocation(values.location, false),
      });
      Alert.alert('Success', 'Profile successfully updated.');
    } catch (error) {
      Alert.alert('Failed to update profile', error.message);
    }
    this.setState({ submitting: false });
  }

  render() {
    const {
      user: { name, location, bio, avatarUrl },
      submitting,
    } = this.state;
    return (
      <View>
        <SimpleTopNav
          centerLabel="EDIT PROFILE"
          leftAction={this.props.routeBack}
        />
        <View>
          <AvatarEdit
            style={styles.margin}
            avatarUrl={avatarUrl}
            onPress={() => this.modal.toggleModal()}
          />
          <ProfileEditForm
            name={name}
            location={this.normalizeLocation(location)}
            bio={bio}
            submitting={submitting}
            onSubmit={this.saveProfile}
          />
        </View>
        <ChangePhotoModal
          ref={modal => this.modal = modal}
          removeProfilePic={this.removeProfilePic}
          routeScene={this.props.routeScene}
        />
      </View>
    );
  }
}

export default connectFeathers(ProfileEditContainer);
