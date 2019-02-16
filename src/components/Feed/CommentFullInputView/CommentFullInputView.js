/**
 * Created by nick on 11/06/16.
 */
import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { styles } from './styles';
import {
  SimpleTopNav,
} from 'AppComponents';
import { NAVBAR_HEIGHT } from 'AppConstants';
import { LabelText } from 'AppFonts';
import { GRAY, BG_LIGHT_GRAY, BG_MEDIUM_GRAY } from 'AppColors';

export class CommentFullInputView extends Component {
  static propTypes = {
    closeView: PropTypes.func.isRequired,
    insertMessage: PropTypes.func.isRequired,
    replyTo: PropTypes.string,
    isModal: PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.closeView = ::this.closeView;
    this.insertMessage = ::this.insertMessage;
    this.changeText = ::this.changeText;
    this.state = {
      inputText: ''
    };
  }

  changeText(inputText) {
    this.setState({ inputText });
  }

  insertMessage() {
    this.props.insertMessage(this.state.inputText);
  }

  closeView() {
    this.props.closeView();
  }

  renderHeader() {
    const { replyTo } = this.props;
    if (replyTo) {
      return (
        <View style={styles.headerStyle}>
          <Image
            source={require('img/icons/icon_share.png')}
            style={ styles.headerImage }
          />
          <LabelText style={styles.headerLabel} fontSize={9}>
            {`In Reply to ${replyTo}`}
          </LabelText>
        </View>
      );
    }
    return <View />;
  }
  render() {
    const { replyTo, isModal } = this.props;
    const buttonName = replyTo ? 'Reply' : 'Post';
    const containerStyle = isModal ? styles.modalContainer : styles.container;
    return (
      <View style={containerStyle}>
        {!replyTo &&
          <SimpleTopNav
            leftAction={this.closeView}
            centerLabel="WRITE COMMENT"
            backgroundColor={BG_LIGHT_GRAY}
            color={GRAY}
          />
        }

        <View style={[styles.container, { backgroundColor: BG_MEDIUM_GRAY }]}>
          <View style={styles.inputContainer}>
            {this.renderHeader()}
            <TextInput
              style={ styles.inputStyle }
              multiline={true}
              autoFocus={true}
              blurOnSubmit={true}
              onChangeText={this.changeText}
              enablesReturnKeyAutomatically={true}
              value={this.state.inputText}
            />
          </View>
          <View style={styles.bottomArea}>
            <View style={ styles.bottomAreaView }>
              <Image
                source={require('img/icons/icon_insert_image.png')}
                style={ styles.imageStyle }
              />
            </View>
            <TouchableOpacity
              style={ styles.buttonStyle }
              onPress={this.insertMessage}
            >
              <LabelText style={styles.buttonLabel} fontSize={15}>{buttonName}</LabelText>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardSpacer topSpacing={-NAVBAR_HEIGHT} />
      </View>
    );
  }
}
