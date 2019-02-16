import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ActionButton } from 'AppButtons';
import { AuxText } from 'AppFonts';
import { SECONDARY_TEXT } from 'AppColors';
import { dismissKeyboard } from 'AppUtilities';
import { styles } from '../styles';

export class Login extends Component {
  static propTypes = {
    routeForgotPassword: PropTypes.func.isRequired,
    routeSignup: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      username: '',
      password: '',
    };
    this.changeUsername = ::this.changeUsername;
    this.changePassword = ::this.changePassword;
    this.handleSubmit = ::this.handleSubmit;
  }

  changeUsername(username) {
    this.setState({ username });
  }

  changePassword(password) {
    this.setState({ password });
  }

  handleSubmit() {
    const { username, password } = this.state;
    const { handleLogin } = this.props;

    handleLogin({ username, password });
  }

  render() {
    const { username, password } = this.state;
    const { routeForgotPassword, routeSignup } = this.props;
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={dismissKeyboard}>
        <View style={styles.container}>
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
              placeholder="password"
              onChangeText={this.changePassword}
              clearButtonMode="while-editing"
              secureTextEntry={true}
              placeholderTextColor={SECONDARY_TEXT}
              value={password}
            />
          </View>
          <ActionButton
            label="LOGIN"
            isActive = {!!username && !!password}
            onPress={this.handleSubmit}
            style={styles.space}
          />
          <TouchableOpacity onPress={routeForgotPassword} style={styles.space}>
            <AuxText upperCase={false} style={[styles.lightText, styles.bold]}>
              Forgot your Username or Password?
            </AuxText>
          </TouchableOpacity>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={routeSignup}>
              <AuxText upperCase={false}>
                Don't have an account? <Text style={[styles.lightText, styles.bold]}>Sign Up</Text>
              </AuxText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
