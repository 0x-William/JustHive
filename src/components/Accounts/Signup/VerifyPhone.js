import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import { ActionButton } from 'AppButtons';
import { AuxText } from 'AppFonts';
import { WHITE } from 'AppColors';
import { dismissKeyboard } from 'AppUtilities';
import { styles } from '../styles';

export class VerifyPhone extends Component {
  static propTypes = {
    submitVerification: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
    this.changeCode = ::this.changeCode;
    this.handleSubmit = ::this.handleSubmit;
  }

  changeCode(code) {
    this.setState({ code });
  }

  handleSubmit() {
    const { submitVerification } = this.props;
    const { code } = this.state;
    dismissKeyboard();
    submitVerification(code);
  }

  render() {
    const { code } = this.state;
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={dismissKeyboard}>
        <View style={styles.container}>
          <AuxText upperCase={false} style={[styles.alertLabel, styles.space]}>
            Verify
          </AuxText>
          <AuxText upperCase={false}>Please enter the 4 digit passcode</AuxText>
          <AuxText upperCase={false} style={styles.space}>sent to your phone.</AuxText>
          <View style={[styles.space, styles.alignMiddle]}>
            <TextInput
              style={[styles.input, styles.phoneCode]}
              underlineColorAndroid="transparent"
              placeholder="0000"
              onChangeText={this.changeCode}
              clearButtonMode="while-editing"
              placeholderTextColor={WHITE}
              keyboardType="numeric"
              maxLength={4}
              value={code}
            />
            <View style={[styles.inputWrapper, { width: 100, height: 2 }]} />
          </View>
          <View style={styles.bottomContainer}>
            <ActionButton
              label="SUBMIT"
              isActive={!!code}
              onPress={this.handleSubmit}
              labelStyle={styles.lightText}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
