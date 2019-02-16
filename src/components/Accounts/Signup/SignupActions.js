import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { ActionButton } from 'AppButtons';
import {
  WelcomeBanner,
  FacebookModal
} from 'AppComponents';
import { AuxText } from 'AppFonts';
import { LIGHT_TEXT } from 'AppColors';
import { styles } from '../styles';

export class SignupActions extends Component {
  static propTypes = {
    goToLogin: PropTypes.func.isRequired,
    signupWithCustom: PropTypes.func.isRequired,
    signupWithFacebook: PropTypes.func.isRequired,
    feathers: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      isFacebookModalVisible: false,
    };
    this.openFacebookModal = ::this.openFacebookModal;
    this.handleFacebookSignup = ::this.handleFacebookSignup;
    this.handleFacebookCancel = ::this.handleFacebookCancel;
  }

  componentWillMount() {
    const { io } = this.props.feathers;
    const { signupWithFacebook } = this.props;

    io.on('fb:gettingUserData', () => {
      this.setState({ isFacebookModalVisible: false });
    });
    io.on('fb:userData', (data) => {
      signupWithFacebook(data);
    });
    io.on('fb:error', (err) => {
      this.setState({ isFacebookModalVisible: false });
      Alert.alert('Something went wrong', JSON.stringify(err));
    });
  }

  componentWillUnmount() {
    const { io } = this.props.feathers;
    io.removeListener('fb:userData');
    io.removeListener('fb:gettingUserData');
    io.removeListener('fb:error');
  }

  openFacebookModal() {
    this.setState({ isFacebookModalVisible: true });
  }

  handleFacebookCancel() {
    this.setState({ isFacebookModalVisible: false });
  }

  handleFacebookSignup() {}

  render() {
    const { goToLogin, signupWithCustom } = this.props;
    const { isFacebookModalVisible } = this.state;
    return (
      <View style={styles.container}>
        <WelcomeBanner />
        <AuxText
          upperCase={false}
          style={[styles.fitLabel, styles.signupHeaderLabel, styles.space]}
        >
          Sign up & start creating some buzz
        </AuxText>
        <ActionButton
          label={
            <View style={[styles.row, styles.alignMiddle]}>
              <Icon name="facebook-official" size={20} color={LIGHT_TEXT} style={styles.icon} />
              <AuxText upperCase={false} style={styles.lightText}> Sign Up With Facebook</AuxText>
            </View>
          }
          isActive={true}
          upperCase={false}
          onPress={this.openFacebookModal}
          labelStyle={styles.lightText}
        />
        <AuxText style={styles.innerSpacing}>OR</AuxText>
        <ActionButton
          label="Sign Up With Phone or Email"
          isActive={true}
          upperCase={false}
          onPress={signupWithCustom}
          labelStyle={styles.lightText}
        />
        <View style={styles.bottom}>
          <TouchableOpacity onPress={goToLogin}>
            <AuxText upperCase={false}>
              Already have an account? <Text style={[styles.lightText, styles.bold]}>Sign In</Text>
            </AuxText>
          </TouchableOpacity>
        </View>
        <FacebookModal
          isVisible={isFacebookModalVisible}
          onSuccess={this.handleFacebookSignup}
          onFail={this.handleFacebookCancel}
        />
      </View>
    );
  }
}
