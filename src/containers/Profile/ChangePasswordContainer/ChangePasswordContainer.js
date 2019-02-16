import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { connectFeathers } from 'AppConnectors';
import { VALIDATIONS } from 'AppConstants';
import { AUX_TEXT } from 'AppColors';
import { SimpleTopNav, Form, TextInputWithAddons } from 'AppComponents';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProfileButton, Link } from 'AppButtons';
import { styles } from './styles';

class ChangePasswordContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeScene: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { submitting: false };
    this.updatePassword = ::this.updatePassword
  }

  async updatePassword(values) {
    this.setState({ submitting: true });
    try {
      const { feathers } = this.props;
      // TODO
      Alert.alert('Not implemented yet');
    } catch (error) {
      Alert.alert('Failed to update password', error.message);
    }
    this.setState({ submitting: false });
  }

  render() {
    const { routeScene, routeBack } = this.props;
    const { submitting } = this.state;
    const icon = (
      <Icon
        name="lock"
        size={12}
        color={AUX_TEXT}
        style={styles.inputIcon}
      />
    );
    return (
      <View>
        <SimpleTopNav
          centerLabel="CHANGE PASSWORD"
          leftAction={routeBack}
        />
        <Form
          fields={[
            {
              label: 'Current Password',
              name: 'currentPassword',
              input: (
                <TextInputWithAddons
                  secureTextEntry={true}
                  selectTextOnFocus={true}
                  rightAddon={icon}
                />
              ),
              validations: [
                VALIDATIONS.required(),
              ],
            },
            {
              label: 'New Password',
              name: 'newPassword',
              input: (
                <TextInputWithAddons
                  secureTextEntry={true}
                  selectTextOnFocus={true}
                  rightAddon={icon}
                />
              ),
              validations: [
                VALIDATIONS.required(),
              ],
            },
            {
              label: 'Confirm Password',
              name: 'passwordConfirmation',
              input: (
                <TextInputWithAddons
                  secureTextEntry={true}
                  selectTextOnFocus={true}
                  rightAddon={icon}
                />
              ),
              validations: [
                VALIDATIONS.required(),
                (value, { newPassword }) => {
                  return value !== newPassword && `Passwords doesn't match`;
                }
              ],
            }
          ]}
          submitting={submitting}
          renderFooter={({ submit }) => (
            <ProfileButton
              label="Update"
              style={styles.submit}
              labelStyle={styles.submitLabel}
              onPress={submit}
            />
          )}
          style={styles.form}
          labelStyle={styles.label}
          onSubmit={this.updatePassword}
        />
        <Link
          label="Forgot Password?"
          style={styles.forgotPassword}
          onPress={() => routeScene('ForgotPasswordScene')}
        />
      </View>
    );
  }
}

export default connectFeathers(ChangePasswordContainer);
