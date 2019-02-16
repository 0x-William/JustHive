/* global fetch */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connectFeathers } from 'AppConnectors';
import { dismissKeyboard } from 'AppUtilities';
import validator from 'validator';
import { ActionButton } from 'AppButtons';
import { AuxText } from 'AppFonts';
import { GUEST_SERVICE } from 'AppServices';
import { SECONDARY_TEXT, INVALID_TEXT, VALID_TEXT } from 'AppColors';
import { styles } from '../styles';

class SignupMethod extends Component {
  static propTypes = {
    feathers: PropTypes.object.isRequired,
    goToNext: PropTypes.func,
    goToLogin: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      phoneValidated: false,
      phoneValidationError: false,
      emailValidated: false,
      emailValidationError: false
    };
    this.changeEmail = ::this.changeEmail;
    this.changePhone = ::this.changePhone;
    this.handleNext = ::this.handleNext;
    this.isValidEmailOrPhone = ::this.isValidEmailOrPhone;
  }

  changeEmail(email) {
    if (!validator.isEmail(email)) {
      return this.setState({
        email,
        emailValidated: false,
        emailValidationError: false
      });
    }
    const request = {
      requestType: 'checkUnique',
      model: 'users',
      checkValues: {
        email,
      },
    };
    this.setState({ email });
    return this.props.feathers.service(GUEST_SERVICE).create(request)
    .then(results => (!results ? (
      this.setState({
        emailValidated: true,
        emailValidationError: false
      })
    ) : (
      this.setState({
        emailValidated: true,
        emailValidationError: true
      })
    )))
    .catch(error => console.log(error));
  }

  changePhone(phone) {
    if (!validator.isMobilePhone(phone.replace(/-/g, ''), 'en-US')) {
      return this.setState({
        phone,
        phoneValidated: false,
        phoneValidationError: false
      });
    }
    const request = {
      requestType: 'checkUnique',
      model: 'users',
      checkValues: {
        phone,
      },
    };
    this.setState({ phone });
    return this.props.feathers.service(GUEST_SERVICE).create(request)
    .then(results => (!results ? (
      this.setState({
        phoneValidated: true,
        phoneValidationError: false
      })
    ) : (
      this.setState({
        phoneValidated: true,
        phoneValidationError: true
      })
    )))
    .catch(error => console.log(error));
  }

  handleNext() {
    const { goToNext } = this.props;
    const { email, phone } = this.state;
    dismissKeyboard();
    goToNext(email || phone, !!phone);
  }

  isValidEmailOrPhone() {
    const {
      phoneValidated,
      phoneValidationError,
      emailValidated,
      emailValidationError
    } = this.state;

    return (phoneValidated && !phoneValidationError) || (emailValidated && !emailValidationError);
  }

  render() {
    const { goToLogin } = this.props;
    const {
      email,
      phone,
      phoneValidated,
      phoneValidationError,
      emailValidated,
      emailValidationError
    } = this.state;
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={dismissKeyboard}>
        <View style={styles.container}>
          <AuxText upperCase={false} style={[styles.containerLabel, styles.space]}>
            Create An Account
          </AuxText>
          <View style={[styles.space, styles.row, styles.inputWrapper]}>
            <TextInput
              style={styles.input}
              editable={!phone}
              underlineColorAndroid="transparent"
              placeholder="email"
              onChangeText={this.changeEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor={SECONDARY_TEXT}
              value={email}
            />
            {emailValidated &&
              <Icon
                name={emailValidationError ? 'close' : 'check'}
                size={25}
                color={emailValidationError ? INVALID_TEXT : VALID_TEXT}
                style={styles.floatRight}
              />
            }
            {emailValidated && emailValidationError &&
              <Text style={[styles.errorText, styles.floatRight]}>
                Email already exists
              </Text>
            }
          </View>
          <AuxText style={styles.space}>OR</AuxText>
          <View style={[styles.space, styles.row, styles.inputWrapper]}>
            <TextInput
              style={styles.input}
              editable={!email}
              underlineColorAndroid="transparent"
              placeholder="phone number"
              onChangeText={this.changePhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholderTextColor={SECONDARY_TEXT}
              value={phone}
            />
            {phoneValidated &&
              <Icon
                name={phoneValidationError ? 'close' : 'check'}
                size={25}
                color={phoneValidationError ? INVALID_TEXT : VALID_TEXT}
                style={styles.floatRight}
              />
            }
            {phoneValidated && phoneValidationError &&
              <Text style={[styles.errorText, styles.floatRight]}>
                Phone already exists
              </Text>
            }
          </View>
          <ActionButton
            label="NEXT"
            isActive={this.isValidEmailOrPhone()}
            onPress={this.handleNext}
            labelStyle={styles.lightText}
          />
          <View style={styles.bottom}>
            <TouchableOpacity onPress={goToLogin}>
              <AuxText upperCase={false}>
                Already have an account?
                <Text style={[styles.lightText, styles.bold]}> Sign In</Text>
              </AuxText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connectFeathers(SignupMethod);
