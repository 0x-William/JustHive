import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { connectFeathers } from 'AppConnectors';
import { USER_SERVICE } from 'AppServices';
import { VALIDATIONS } from 'AppConstants';
import { AUX_TEXT } from 'AppColors';
import { SimpleTopNav, Form, TextInputWithAddons } from 'AppComponents';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProfileButton } from 'AppButtons';
import { styles } from './styles';

class UpdateEmailAndPhoneContainer extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    routeScene: PropTypes.func.isRequired,
    routeBack: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      user: props.feathers.get('user'),
      submitting: false
    };
    this.updateEmailAndPhone = ::this.updateEmailAndPhone
  }

  async updateEmailAndPhone(values) {
    this.setState({ submitting: true });
    try {
      const { feathers } = this.props;
      const { user } = this.state;
      await feathers.service(USER_SERVICE).patch(user._id, values);
      Alert.alert('Success', 'Email and phone successfully updated.');
    } catch (error) {
      Alert.alert('Failed to update email and phone', error.message);
    }
    this.setState({ submitting: false });
  }

  render() {
    const { routeScene, routeBack } = this.props;
    const { user, submitting } = this.state;
    return (
      <View>
        <SimpleTopNav
          centerLabel="UPDATE EMAIL & PHONE"
          leftAction={routeBack}
        />
        <Form
          fields={[
            {
              label: 'Email',
              name: 'email',
              input: (
                <TextInputWithAddons
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  rightAddon={(
                    <Icon
                      name="email"
                      size={18}
                      color={AUX_TEXT}
                      style={styles.inputIcon}
                    />
                  )}
                />
              ),
              validations: [
                VALIDATIONS.required(),
                VALIDATIONS.email(),
              ],
            },
            {
              label: 'Phone',
              name: 'phone',
              input: (
                <TextInputWithAddons
                  keyboardType="phone-pad"
                  rightAddon={(
                    <Icon
                      name="phone"
                      size={18}
                      color={AUX_TEXT}
                      style={styles.inputIcon}
                    />
                  )}
                />
              ),
              validations: [
                VALIDATIONS.required(),
                VALIDATIONS.phone(),
              ],
            },
          ]}
          initialValues={user}
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
          onSubmit={this.updateEmailAndPhone}
        />
      </View>
    );
  }
}

export default connectFeathers(UpdateEmailAndPhoneContainer);
