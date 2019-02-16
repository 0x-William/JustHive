/* global fetch */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { dismissKeyboard } from 'AppUtilities';
import { ActionButton, IconRadioButton } from 'AppButtons';
import { SECONDARY_TEXT, VALID_TEXT, INVALID_TEXT } from 'AppColors';
import { WSOCKET, GOOGLE_API_KEY } from 'AppConfig';
import { styles, googlePlacesStyles } from '../styles';

export class Signup extends Component {
  static propTypes = {
    handleSignup: PropTypes.func.isRequired,
    facebookData: PropTypes.object
  };

  static defaultProps = {
    facebookData: {}
  }

  constructor(props, context) {
    super(props, context);
    this.state = Object.assign({}, {
      name: '',
      username: '',
      usernameValidated: false,
      usernameError: '',
      password: '',
      passwordValidated: false,
      passwordError: '',
      yearOfBirth: '',
      location: {
        city: '',
        state: '',
        country: '',
        latitude: 0,
        longitude: 0
      },
      yearOfBirthValidated: false,
      yearOfBirthError: '',
      gender: '',
    }, props.facebookData);

    this.changeName = ::this.changeName;
    this.changeUsername = ::this.changeUsername;
    this.validateUsername = ::this.validateUsername;
    this.changePassword = ::this.changePassword;
    this.validatePassword = ::this.validatePassword;
    this.changeGender = ::this.changeGender;
    this.changeYOB = ::this.changeYOB;
    this.validateYOB = ::this.validateYOB;
    this.handleSubmit = ::this.handleSubmit;
    this.isFormValid = ::this.isFormValid;
    this.setLocation = ::this.setLocation;
    this.isPassedProps = ::this.isPassedProps;
  }

  setLocation(selectedLocation, { geometry }) {
    const { description } = selectedLocation;
    const separatedData = description.split(',');
    const { length } = separatedData;

    const { lat: latitude, lng: longitude } = geometry.location;
    const location = {
      city: separatedData[0],
      state: length === 3 ? separatedData[1] : null,
      country: separatedData[length - 1],
      latitude, longitude
    };
    this.setState({ location });
  }

  changeName(name) {
    this.setState({ name });
  }

  changeUsername(username) {
    this.setState({ username, usernameValidated: false });
  }

  validateUsername() {
    const { username } = this.state;
    if (!username) {
      this.setState({ usernameValidated: true, usernameError: 'username must not be empty' });
      return;
    }
    fetch(`${WSOCKET}/user_exists/${username}`)
      .then((res) => res.json())
      .then((res) => this.setState({
        usernameValidated: true,
        usernameError: res.result ? 'username is already taken' : null
      }))
      .catch(error => this.setState({ usernameValidated: true, usernameError: error }));
  }

  changePassword(password) {
    this.setState({ password, passwordValidated: false });
  }

  validatePassword() {
    let passwordError = null;
    if (this.state.password.length < 5) {
      passwordError = 'password must be 5 characters or more';
    }
    this.setState({ passwordValidated: true, passwordError });
  }

  changeYOB(yearOfBirth) {
    this.setState({ yearOfBirth, yearOfBirthValidated: false });
  }

  validateYOB() {
    const year = parseInt(this.state.yearOfBirth, 10);
    let yearOfBirthError = null;
    if (!(year >= 1900 && year <= (new Date().getFullYear()))) {
      yearOfBirthError = 'please enter a valid year';
    }
    this.setState({ yearOfBirthValidated: true, yearOfBirthError });
  }

  isFormValid() {
    const {
      name, gender,
      usernameValidated, usernameError,
      passwordValidated, passwordError,
      yearOfBirthValidated, yearOfBirthError,
    } = this.state;

    return !!name && !!gender &&
      usernameValidated && !usernameError &&
      passwordValidated && !passwordError &&
      (yearOfBirthValidated || this.isPassedProps('yearOfBirth')) && !yearOfBirthError;
  }

  isPassedProps(key) {
    const { facebookData } = this.props;
    return facebookData.hasOwnProperty(key);
  }

  changeGender(gender) {
    this.setState({ gender: gender[0] });
  }

  handleSubmit() {
    const {
      name,
      username,
      password,
      yearOfBirth,
      location,
      gender,
      avatarUrl
    } = this.state;
    const { handleSignup } = this.props;
    const userData = {
      name, gender, username,
      password, location, avatarUrl: avatarUrl || '',
      yearOfBirth: parseInt(yearOfBirth, 10)
    };
    handleSignup(userData);
  }

  render() {
    const { name, gender,
      username, usernameValidated, usernameError,
      password, passwordValidated, passwordError,
      yearOfBirth, yearOfBirthValidated, yearOfBirthError } = this.state;

    return (
      <TouchableWithoutFeedback style={styles.container} onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View style={styles.space} />
          {!this.isPassedProps('name') && <View style={[styles.space, styles.inputWrapper]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="full name"
              autoCapitalize="words"
              clearButtonMode="while-editing"
              placeholderTextColor={SECONDARY_TEXT}
              onChangeText={this.changeName}
              value={name}
            />
          </View>}
          <View style={[styles.space, styles.row, styles.inputWrapper]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="username"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              placeholderTextColor={SECONDARY_TEXT}
              onChangeText={this.changeUsername}
              onEndEditing={this.validateUsername}
              value={username}
            />
            {usernameValidated &&
              <Icon
                name={usernameError ? 'close' : 'check'}
                size={25}
                color={usernameError ? INVALID_TEXT : VALID_TEXT}
                style={styles.floatRight}
              />
            }
            {usernameValidated && usernameError &&
              <Text style={[styles.errorText, styles.floatRight]}>
                {usernameError}
              </Text>
            }
          </View>
          <View style={[styles.space, styles.row, styles.inputWrapper]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="password"
              secureTextEntry={true}
              clearButtonMode="while-editing"
              placeholderTextColor={SECONDARY_TEXT}
              onChangeText={this.changePassword}
              onEndEditing={this.validatePassword}
              value={password}
            />
            {passwordValidated &&
              <Icon
                name={passwordError ? 'close' : 'check'}
                size={25}
                color={passwordError ? INVALID_TEXT : VALID_TEXT}
                style={styles.floatRight}
              />
            }
            {passwordValidated && passwordError &&
              <Text style={[styles.errorText, styles.floatRight]}>
                {passwordError}
              </Text>
            }
          </View>
          {!this.isPassedProps('yearOfBirth') && (
            <View style={[styles.space, styles.row, styles.inputWrapper]}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="What year were you born?"
              maxLength={4}
              keyboardType="numeric"
              clearButtonMode="while-editing"
              placeholderTextColor={SECONDARY_TEXT}
              onChangeText={this.changeYOB}
              onEndEditing={this.validateYOB}
              value={yearOfBirth}
            />
            {yearOfBirthValidated &&
              <Icon
                name={yearOfBirthError ? 'close' : 'check'}
                size={25}
                color={yearOfBirthError ? INVALID_TEXT : VALID_TEXT}
                style={styles.floatRight}
              />
            }
            {yearOfBirthValidated && yearOfBirthError &&
              <Text style={[styles.errorText, styles.floatRight]}>
                {yearOfBirthError}
              </Text>
            }
          </View>
        )}
          {!this.isPassedProps('location') && <View style={[styles.space, styles.row]}>
            <GooglePlacesAutocomplete
              placeholder="Where are you live now ?"
              minLength={2}
              autoFocus={false}
              fetchDetails={true}
              currentLocation={false}
              enablePoweredByContainer={false}
              currentLocationLabel="Current Location"
              styles={googlePlacesStyles}
              textInputProps={{
                placeholderTextColor: SECONDARY_TEXT,
                autoCapitalize: 'none',
                autoCorrect: false,
                underlineColorAndroid: 'transparent'
              }}
              query={{
                key: GOOGLE_API_KEY,
                language: 'en',
                types: '(cities)'
              }}
              onPress={this.setLocation}
            />
          </View>}
          <View style={styles.space} />

          {!this.isPassedProps('gender') && (
            <View style={[styles.space, styles.innerSpacingHoriz, styles.row, styles.twoInputs]}>
            <IconRadioButton
              isActive={gender === 'male'}
              label="male"
              icon={require('img/icons/icon_signup_male.png')}
              onPress={() => this.setState({ gender: 'male' })}
            />
            <IconRadioButton
              isActive={gender === 'female'}
              label="female"
              icon={require('img/icons/icon_signup_female.png')}
              onPress={() => this.setState({ gender: 'female' })}
            />
          </View>
        )}
          <View style={styles.bottomContainer}>
            <ActionButton
              label="NEXT"
              isActive={this.isFormValid()}
              onPress={this.handleSubmit}
              labelStyle={styles.lightText}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
