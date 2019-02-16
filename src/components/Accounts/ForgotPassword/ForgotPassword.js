import React, { Component, PropTypes } from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';
import { AuxText } from 'AppFonts';
import { ActionButton } from 'AppButtons';
import { SECONDARY_TEXT } from 'AppColors';
import { dismissKeyboard } from 'AppUtilities';
import { styles } from '../styles';

export class ForgotPassword extends Component {
  static propTypes = {
    handleSendEmail: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      email: ''
    };
    this.changeUsername = ::this.changeUsername;
    this.changeEmail = ::this.changeEmail;
    this.handleSubmit = ::this.handleSubmit;
  }

  changeUsername(username) {
    this.setState({ username });
  }

  changeEmail(email) {
    this.setState({ email });
  }

  handleSubmit() {
    const { username, email } = this.state;
    const { handleSendEmail } = this.props;

    handleSendEmail({ username, email });
  }

  render() {
    const { username, email } = this.state;
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.adjustTop}>
            <View style={[styles.space, styles.alignMiddle]}>
              <AuxText upperCase={false} style={[styles.containerLabel, styles.space]}>
                Retrieve Account Information
              </AuxText>
              <AuxText upperCase={false}>Enter either your Username or Email</AuxText>
            </View>
            <View style={[styles.space, styles.inputWrapper]}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="username"
                onChangeText={this.changeUsername}
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholderTextColor={SECONDARY_TEXT}
                value={username}
              />
            </View>
            <View style={[styles.space, styles.inputWrapper]}>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="email"
                onChangeText={this.changeEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                tintColor="red"
                clearButtonMode="while-editing"
                placeholderTextColor={SECONDARY_TEXT}
                value={email}
              />
            </View>
            <ActionButton
              label="SEND"
              isActive={!!username && !!email}
              onPress={this.handleSubmit}
              style={styles.space}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
